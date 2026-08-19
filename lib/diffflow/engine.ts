import * as XLSX from "xlsx";

export type ParsedTable = {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
};

export type CellChange = {
  column: string;
  before: string;
  after: string;
  risky: boolean; // 「値が消えた」等、要確認フラグ
};

export type ChangedRow = {
  key: string;
  changes: CellChange[];
};

export type DiffResult = {
  keyColumn: string;
  comparedColumns: string[];
  added: Record<string, string>[];
  removed: Record<string, string>[];
  changed: ChangedRow[];
  unchangedCount: number;
  totalOld: number;
  totalNew: number;
  riskyCount: number;
};

const FREE_ROW_LIMIT = 5000;

export function getFreeRowLimit() {
  return FREE_ROW_LIMIT;
}

/** ファイル(.xlsx/.xls/.csv)を読み込み、ヘッダー行と行データに分解する */
export async function parseFile(file: File): Promise<ParsedTable> {
  const isCsv = /\.csv$/i.test(file.name);
  let workbook: XLSX.WorkBook;

  if (isCsv) {
    const text = await file.text();
    workbook = XLSX.read(text, { type: "string" });
  } else {
    const buffer = await file.arrayBuffer();
    workbook = XLSX.read(buffer, { type: "array" });
  }

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const raw: string[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
    defval: "",
  });

  const headerRow = raw[0] ?? [];
  const headers = headerRow.map((h, i) => (h && h.trim() ? h.trim() : `列${i + 1}`));

  const rows: Record<string, string>[] = raw.slice(1).map((line) => {
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = (line[i] ?? "").toString().trim();
    });
    return row;
  });

  return { fileName: file.name, headers, rows };
}

/** 削除・空欄化など「確認すべき変更」かどうかの簡易判定 */
function isRiskyChange(before: string, after: string): boolean {
  if (before !== "" && after === "") return true; // 値が消えた
  const beforeDigits = before.replace(/[^0-9]/g, "");
  const afterDigits = after.replace(/[^0-9]/g, "");
  if (beforeDigits.length >= 8 && afterDigits.length > 0 && afterDigits.length < beforeDigits.length - 3) {
    return true; // 桁数が大きく減った(電話番号などの破損疑い)
  }
  return false;
}

export function diffTables(
  oldTable: ParsedTable,
  newTable: ParsedTable,
  keyColumn: string,
  ignoreColumns: string[]
): DiffResult {
  const compareColumns = oldTable.headers.filter(
    (h) => h !== keyColumn && !ignoreColumns.includes(h) && newTable.headers.includes(h)
  );

  const oldByKey = new Map<string, Record<string, string>>();
  oldTable.rows.forEach((r) => {
    const k = r[keyColumn];
    if (k) oldByKey.set(k, r);
  });

  const newByKey = new Map<string, Record<string, string>>();
  newTable.rows.forEach((r) => {
    const k = r[keyColumn];
    if (k) newByKey.set(k, r);
  });

  const added: Record<string, string>[] = [];
  const removed: Record<string, string>[] = [];
  const changed: ChangedRow[] = [];
  let unchangedCount = 0;
  let riskyCount = 0;

  newByKey.forEach((newRow, key) => {
    const oldRow = oldByKey.get(key);
    if (!oldRow) {
      added.push(newRow);
      return;
    }
    const changes: CellChange[] = [];
    compareColumns.forEach((col) => {
      const before = oldRow[col] ?? "";
      const after = newRow[col] ?? "";
      if (before !== after) {
        const risky = isRiskyChange(before, after);
        if (risky) riskyCount += 1;
        changes.push({ column: col, before, after, risky });
      }
    });
    if (changes.length > 0) {
      changed.push({ key, changes });
    } else {
      unchangedCount += 1;
    }
  });

  oldByKey.forEach((oldRow, key) => {
    if (!newByKey.has(key)) {
      removed.push(oldRow);
    }
  });

  return {
    keyColumn,
    comparedColumns: compareColumns,
    added,
    removed,
    changed,
    unchangedCount,
    totalOld: oldTable.rows.length,
    totalNew: newTable.rows.length,
    riskyCount,
  };
}

/** 差分結果をExcelファイル(Blob)として書き出す */
export function buildDiffWorkbook(result: DiffResult): Blob {
  const wb = XLSX.utils.book_new();

  const summary = [
    ["DiffFlow 比較レポート"],
    ["比較キー", result.keyColumn],
    [],
    ["総件数(旧)", result.totalOld],
    ["総件数(新)", result.totalNew],
    ["追加", result.added.length],
    ["削除", result.removed.length],
    ["変更", result.changed.length],
    ["変更なし", result.unchangedCount],
    ["要確認", result.riskyCount],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summary);
  XLSX.utils.book_append_sheet(wb, summarySheet, "サマリー");

  const changedRows = [
    [result.keyColumn, "列", "変更前", "変更後", "要確認"],
    ...result.changed.flatMap((row) =>
      row.changes.map((c) => [row.key, c.column, c.before, c.after, c.risky ? "⚠" : ""])
    ),
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(changedRows), "変更");

  const addedHeaders = result.added[0] ? Object.keys(result.added[0]) : [result.keyColumn];
  const addedSheetData = [addedHeaders, ...result.added.map((r) => addedHeaders.map((h) => r[h] ?? ""))];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(addedSheetData), "追加");

  const removedHeaders = result.removed[0] ? Object.keys(result.removed[0]) : [result.keyColumn];
  const removedSheetData = [removedHeaders, ...result.removed.map((r) => removedHeaders.map((h) => r[h] ?? ""))];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(removedSheetData), "削除");

  const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Blob([out], { type: "application/octet-stream" });
}
