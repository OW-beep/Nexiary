import * as XLSX from "xlsx";

export type ParsedTable = {
  fileName: string;
  sheetName: string;
  headers: string[];
  rows: Record<string, string>[];
};

export type LoadedWorkbook = {
  fileName: string;
  workbook: XLSX.WorkBook;
  sheetNames: string[];
};

export type CellChange = {
  column: string;
  before: string;
  after: string;
  risky: boolean; // 「値が消えた」等、要確認フラグ
};

export type ChangedRow = {
  keyLabel: string;
  changes: CellChange[];
};

export type HeaderDiff = {
  common: string[];
  onlyOld: string[]; // 旧ファイルにのみ存在する列(削除された列)
  onlyNew: string[]; // 新ファイルにのみ存在する列(追加された列)
};

export type DiffResult = {
  keyColumns: string[];
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
const KEY_SEPARATOR = "␟";

export function getFreeRowLimit() {
  return FREE_ROW_LIMIT;
}

/** ファイル(.xlsx/.xls/.csv)を読み込み、シート名一覧を取得する(まだ行データには変換しない) */
export async function loadWorkbook(file: File): Promise<LoadedWorkbook> {
  const isCsv = /\.csv$/i.test(file.name);
  let workbook: XLSX.WorkBook;

  if (isCsv) {
    const text = await file.text();
    workbook = XLSX.read(text, { type: "string" });
  } else {
    const buffer = await file.arrayBuffer();
    workbook = XLSX.read(buffer, { type: "array" });
  }

  return { fileName: file.name, workbook, sheetNames: workbook.SheetNames };
}

/** 読み込み済みワークブックから、指定シートをヘッダー行+行データに分解する */
export function parseSheet(loaded: LoadedWorkbook, sheetName: string): ParsedTable {
  const sheet = loaded.workbook.Sheets[sheetName];
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

  return { fileName: loaded.fileName, sheetName, headers, rows };
}

/** 2ファイルの列構成(見出し行)そのものを比較する */
export function diffHeaders(oldHeaders: string[], newHeaders: string[]): HeaderDiff {
  return {
    common: oldHeaders.filter((h) => newHeaders.includes(h)),
    onlyOld: oldHeaders.filter((h) => !newHeaders.includes(h)),
    onlyNew: newHeaders.filter((h) => !oldHeaders.includes(h)),
  };
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

function buildKey(row: Record<string, string>, keyColumns: string[]): string {
  return keyColumns.map((k) => row[k] ?? "").join(KEY_SEPARATOR);
}

function keyLabelOf(row: Record<string, string>, keyColumns: string[]): string {
  return keyColumns.map((k) => row[k] ?? "").join(" / ");
}

export function diffTables(
  oldTable: ParsedTable,
  newTable: ParsedTable,
  keyColumns: string[],
  ignoreColumns: string[]
): DiffResult {
  const compareColumns = oldTable.headers.filter(
    (h) => !keyColumns.includes(h) && !ignoreColumns.includes(h) && newTable.headers.includes(h)
  );

  const oldByKey = new Map<string, Record<string, string>>();
  oldTable.rows.forEach((r) => {
    const k = buildKey(r, keyColumns);
    if (k.replace(new RegExp(KEY_SEPARATOR, "g"), "")) oldByKey.set(k, r);
  });

  const newByKey = new Map<string, Record<string, string>>();
  newTable.rows.forEach((r) => {
    const k = buildKey(r, keyColumns);
    if (k.replace(new RegExp(KEY_SEPARATOR, "g"), "")) newByKey.set(k, r);
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
    // 複数列を同時に(1行の中で全列まとめて)比較する
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
      changed.push({ keyLabel: keyLabelOf(newRow, keyColumns), changes });
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
    keyColumns,
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
  const keyLabel = result.keyColumns.join(" / ");

  const summary = [
    ["DiffFlow 比較レポート"],
    ["比較キー", keyLabel],
    [],
    ["総件数(旧)", result.totalOld],
    ["総件数(新)", result.totalNew],
    ["追加", result.added.length],
    ["削除", result.removed.length],
    ["変更", result.changed.length],
    ["変更なし", result.unchangedCount],
    ["要確認", result.riskyCount],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summary), "サマリー");

  const changedRows = [
    [keyLabel, "変更項目数", "列", "変更前", "変更後", "要確認"],
    ...result.changed.flatMap((row) =>
      row.changes.map((c, i) => [
        i === 0 ? row.keyLabel : "",
        i === 0 ? row.changes.length : "",
        c.column,
        c.before,
        c.after,
        c.risky ? "⚠" : "",
      ])
    ),
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(changedRows), "変更");

  const addedHeaders = result.added[0] ? Object.keys(result.added[0]) : result.keyColumns;
  const addedSheetData = [addedHeaders, ...result.added.map((r) => addedHeaders.map((h) => r[h] ?? ""))];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(addedSheetData), "追加");

  const removedHeaders = result.removed[0] ? Object.keys(result.removed[0]) : result.keyColumns;
  const removedSheetData = [removedHeaders, ...result.removed.map((r) => removedHeaders.map((h) => r[h] ?? ""))];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(removedSheetData), "削除");

  const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Blob([out], { type: "application/octet-stream" });
}
