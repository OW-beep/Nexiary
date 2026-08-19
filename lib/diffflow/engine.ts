import * as XLSX from "xlsx";

export type ColumnInfo = {
  name: string;
  letter: string; // Excelの列アルファベット(A, B, ... AA)
};

export type ParsedRow = {
  rowNumber: number; // 実際のシート上の行番号(見出し行を1として、データは2行目から)
  values: Record<string, string>;
};

export type ParsedTable = {
  fileName: string;
  sheetName: string;
  columns: ColumnInfo[];
  headers: string[];
  rows: ParsedRow[];
};

export type LoadedWorkbook = {
  fileName: string;
  workbook: XLSX.WorkBook;
  sheetNames: string[];
};

export type CellChange = {
  column: string;
  columnLetter: string; // 変更後ファイル基準の列アルファベット
  before: string;
  after: string;
  risky: boolean; // 「値が消えた」等、要確認フラグ
};

export type ChangedRow = {
  keyLabel: string;
  oldRowNumber: number;
  newRowNumber: number;
  changes: CellChange[];
};

export type AddedRow = { rowNumber: number; values: Record<string, string> };
export type RemovedRow = { rowNumber: number; values: Record<string, string> };

export type HeaderDiff = {
  common: string[];
  onlyOld: string[]; // 旧ファイルにのみ存在する列(削除された列)
  onlyNew: string[]; // 新ファイルにのみ存在する列(追加された列)
};

export type DiffResult = {
  keyColumns: string[];
  comparedColumns: string[];
  added: AddedRow[];
  removed: RemovedRow[];
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
  const columns: ColumnInfo[] = headerRow.map((h, i) => ({
    name: h && h.trim() ? h.trim() : `列${i + 1}`,
    letter: XLSX.utils.encode_col(i),
  }));
  const headers = columns.map((c) => c.name);

  // データは見出し行(スプレッドシート上は1行目)の次から。実際の行番号を保持しておく。
  const rows: ParsedRow[] = raw.slice(1).map((line, idx) => {
    const values: Record<string, string> = {};
    columns.forEach((col, i) => {
      values[col.name] = (line[i] ?? "").toString().trim();
    });
    return { rowNumber: idx + 2, values };
  });

  return { fileName: loaded.fileName, sheetName, columns, headers, rows };
}

/** 列名から、その表におけるExcel列アルファベットを引く(存在しなければnull) */
function letterOf(table: ParsedTable, name: string): string | null {
  return table.columns.find((c) => c.name === name)?.letter ?? null;
}

/** 列名を「見出しテキスト (列アルファベット)」の表示用ラベルにする。旧新で位置が違う/片方にしかない場合はその旨を表示する */
export function columnLabel(oldTable: ParsedTable, newTable: ParsedTable, name: string): string {
  const oldLetter = letterOf(oldTable, name) ?? "―";
  const newLetter = letterOf(newTable, name) ?? "―";
  if (oldLetter === newLetter) return `${name} (${newLetter})`;
  return `${name} (旧${oldLetter}/新${newLetter})`;
}

/** 2ファイルの列を合わせた一覧(和集合)を、旧ファイルの並び→新ファイルのみの列の順で返す */
export function unionColumns(oldTable: ParsedTable, newTable: ParsedTable): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  [...oldTable.headers, ...newTable.headers].forEach((h) => {
    if (!seen.has(h)) {
      seen.add(h);
      result.push(h);
    }
  });
  return result;
}

/** 2ファイルの列構成(見出し行)そのものを比較する */
export function diffHeaders(oldTable: ParsedTable, newTable: ParsedTable): HeaderDiff {
  const oldHeaders = oldTable.headers;
  const newHeaders = newTable.headers;
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

function buildKey(values: Record<string, string>, keyColumns: string[]): string {
  return keyColumns.map((k) => values[k] ?? "").join(KEY_SEPARATOR);
}

function keyLabelOf(values: Record<string, string>, keyColumns: string[]): string {
  return keyColumns.map((k) => values[k] ?? "").join(" / ");
}

export function diffTables(
  oldTable: ParsedTable,
  newTable: ParsedTable,
  keyColumns: string[],
  ignoreColumns: string[]
): DiffResult {
  // 比較対象は「両ファイルの列の和集合」から、キー・除外を除いたもの。
  // 片方のファイルにしかない列も、無視されずに比較対象として選べる(存在しない側は空欄として扱う)。
  const compareColumns = unionColumns(oldTable, newTable).filter(
    (h) => !keyColumns.includes(h) && !ignoreColumns.includes(h)
  );

  const oldByKey = new Map<string, ParsedRow>();
  oldTable.rows.forEach((r) => {
    const k = buildKey(r.values, keyColumns);
    if (k.replace(new RegExp(KEY_SEPARATOR, "g"), "")) oldByKey.set(k, r);
  });

  const newByKey = new Map<string, ParsedRow>();
  newTable.rows.forEach((r) => {
    const k = buildKey(r.values, keyColumns);
    if (k.replace(new RegExp(KEY_SEPARATOR, "g"), "")) newByKey.set(k, r);
  });

  const added: AddedRow[] = [];
  const removed: RemovedRow[] = [];
  const changed: ChangedRow[] = [];
  let unchangedCount = 0;
  let riskyCount = 0;

  newByKey.forEach((newRow, key) => {
    const oldRow = oldByKey.get(key);
    if (!oldRow) {
      added.push({ rowNumber: newRow.rowNumber, values: newRow.values });
      return;
    }
    const changes: CellChange[] = [];
    // 複数列を同時に(1行の中で全列まとめて)比較する
    compareColumns.forEach((col) => {
      const before = oldRow.values[col] ?? "";
      const after = newRow.values[col] ?? "";
      if (before !== after) {
        const risky = isRiskyChange(before, after);
        if (risky) riskyCount += 1;
        const columnLetter = letterOf(newTable, col) ?? letterOf(oldTable, col) ?? "?";
        changes.push({ column: col, columnLetter, before, after, risky });
      }
    });
    if (changes.length > 0) {
      changed.push({
        keyLabel: keyLabelOf(newRow.values, keyColumns),
        oldRowNumber: oldRow.rowNumber,
        newRowNumber: newRow.rowNumber,
        changes,
      });
    } else {
      unchangedCount += 1;
    }
  });

  oldByKey.forEach((oldRow, key) => {
    if (!newByKey.has(key)) {
      removed.push({ rowNumber: oldRow.rowNumber, values: oldRow.values });
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
    [keyLabel, "旧の行", "新の行", "変更項目数", "列", "セル(新)", "変更前", "変更後", "要確認"],
    ...result.changed.flatMap((row) =>
      row.changes.map((c, i) => [
        i === 0 ? row.keyLabel : "",
        i === 0 ? row.oldRowNumber : "",
        i === 0 ? row.newRowNumber : "",
        i === 0 ? row.changes.length : "",
        c.column,
        `${c.columnLetter}${row.newRowNumber}`,
        c.before,
        c.after,
        c.risky ? "⚠" : "",
      ])
    ),
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(changedRows), "変更");

  const addedHeaders = result.added[0] ? Object.keys(result.added[0].values) : result.keyColumns;
  const addedSheetData = [
    ["行", ...addedHeaders],
    ...result.added.map((r) => [r.rowNumber, ...addedHeaders.map((h) => r.values[h] ?? "")]),
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(addedSheetData), "追加");

  const removedHeaders = result.removed[0] ? Object.keys(result.removed[0].values) : result.keyColumns;
  const removedSheetData = [
    ["行", ...removedHeaders],
    ...result.removed.map((r) => [r.rowNumber, ...removedHeaders.map((h) => r.values[h] ?? "")]),
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(removedSheetData), "削除");

  const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Blob([out], { type: "application/octet-stream" });
}
