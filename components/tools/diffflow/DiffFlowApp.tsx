"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Download, Minus, Plus, RotateCcw, Pencil } from "lucide-react";
import FileDropZone from "./FileDropZone";
import {
  parseFile,
  diffTables,
  buildDiffWorkbook,
  getFreeRowLimit,
  type ParsedTable,
  type DiffResult,
} from "@/lib/diffflow/engine";

const FREE_ROW_LIMIT = getFreeRowLimit();

type Step = "upload" | "configure" | "result";

export default function DiffFlowApp() {
  const [oldTable, setOldTable] = useState<ParsedTable | null>(null);
  const [newTable, setNewTable] = useState<ParsedTable | null>(null);
  const [keyColumn, setKeyColumn] = useState<string>("");
  const [ignoreColumns, setIgnoreColumns] = useState<string[]>([]);
  const [result, setResult] = useState<DiffResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const step: Step = result ? "result" : oldTable && newTable ? "configure" : "upload";

  const sharedHeaders = useMemo(() => {
    if (!oldTable || !newTable) return [];
    return oldTable.headers.filter((h) => newTable.headers.includes(h));
  }, [oldTable, newTable]);

  async function handleFile(which: "old" | "new", file: File) {
    setError(null);
    try {
      const parsed = await parseFile(file);
      if (parsed.rows.length > FREE_ROW_LIMIT) {
        setError(
          `無料版は1ファイルあたり${FREE_ROW_LIMIT.toLocaleString()}行までです。「${file.name}」は${parsed.rows.length.toLocaleString()}行あります。`
        );
        return;
      }
      if (which === "old") {
        setOldTable(parsed);
      } else {
        setNewTable(parsed);
      }
      setResult(null);
      setKeyColumn("");
      setIgnoreColumns([]);
    } catch (e) {
      setError("ファイルを読み込めませんでした。形式を確認してください。");
    }
  }

  function runCompare() {
    if (!oldTable || !newTable || !keyColumn) return;
    setBusy(true);
    // 大きめのファイルでもUIが固まって見えないよう1フレーム逃がす
    setTimeout(() => {
      const diff = diffTables(oldTable, newTable, keyColumn, ignoreColumns);
      setResult(diff);
      setBusy(false);
    }, 30);
  }

  function handleExport() {
    if (!result) return;
    const blob = buildDiffWorkbook(result);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diffflow-result-${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function reset() {
    setOldTable(null);
    setNewTable(null);
    setKeyColumn("");
    setIgnoreColumns([]);
    setResult(null);
    setError(null);
  }

  return (
    <div className="space-y-8">
      {/* Step 1: ファイル投入 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FileDropZone
          label="旧ファイル"
          fileName={oldTable?.fileName ?? null}
          rowCount={oldTable?.rows.length ?? null}
          onFile={(f) => handleFile("old", f)}
        />
        <FileDropZone
          label="新ファイル"
          fileName={newTable?.fileName ?? null}
          rowCount={newTable?.rows.length ?? null}
          onFile={(f) => handleFile("new", f)}
        />
      </div>

      {error && (
        <p className="flex items-start gap-2 rounded-card border border-stamp/40 bg-stamp/5 p-3 font-body text-sm text-stamp">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      {/* Step 2: 比較条件 */}
      {step !== "upload" && oldTable && newTable && (
        <div className="catalog-card space-y-5 p-5">
          <div>
            <span className="index-tab">比較キー</span>
            <p className="mt-2 font-body text-xs text-ink-soft">
              2つのファイルで同じ行を突き合わせる列を選んでください(例：ID、顧客番号)
            </p>
            <select
              value={keyColumn}
              onChange={(e) => setKeyColumn(e.target.value)}
              className="mt-2 w-full rounded-card border border-line bg-paper-card px-3 py-2 font-mono text-sm text-ink focus:border-stamp focus:outline-none"
            >
              <option value="">選択してください</option>
              {sharedHeaders.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {keyColumn && (
            <div>
              <span className="index-tab">比較から除外する列(任意)</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {sharedHeaders
                  .filter((h) => h !== keyColumn)
                  .map((h) => {
                    const active = ignoreColumns.includes(h);
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() =>
                          setIgnoreColumns((prev) =>
                            active ? prev.filter((c) => c !== h) : [...prev, h]
                          )
                        }
                        className={
                          "rounded-card border px-3 py-1 font-mono text-xs transition-colors " +
                          (active
                            ? "border-line bg-line/40 text-ink-soft line-through"
                            : "border-moss/50 bg-moss-light text-moss")
                        }
                      >
                        {h}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              disabled={!keyColumn || busy}
              onClick={runCompare}
              className="rounded-card bg-ink px-5 py-2 font-body text-sm text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? "比較中…" : "比較する"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1 font-body text-sm text-ink-soft hover:text-stamp"
            >
              <RotateCcw size={14} /> やり直す
            </button>
          </div>
        </div>
      )}

      {/* Step 3: 結果 */}
      {result && (
        <div className="space-y-6">
          <div className="catalog-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="index-tab">照合済</span>
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center gap-1.5 rounded-card border border-ink px-4 py-1.5 font-body text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <Download size={14} /> Excelで出力
              </button>
            </div>
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              <Stat label="追加" value={result.added.length} accent="moss" icon={<Plus size={14} />} />
              <Stat label="削除" value={result.removed.length} accent="stamp" icon={<Minus size={14} />} />
              <Stat label="変更" value={result.changed.length} accent="ink" icon={<Pencil size={14} />} />
              <Stat label="変更なし" value={result.unchangedCount} accent="soft" />
              <Stat label="要確認" value={result.riskyCount} accent="stamp" icon={<AlertTriangle size={14} />} />
            </dl>
          </div>

          {result.changed.length > 0 && (
            <ResultTable title={`変更 (${result.changed.length}件)`}>
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-line text-left text-ink-soft">
                    <th className="py-2 pr-3">{result.keyColumn}</th>
                    <th className="py-2 pr-3">列</th>
                    <th className="py-2 pr-3">変更前</th>
                    <th className="py-2 pr-3">変更後</th>
                  </tr>
                </thead>
                <tbody>
                  {result.changed.slice(0, 200).flatMap((row) =>
                    row.changes.map((c, i) => (
                      <tr key={`${row.key}-${c.column}-${i}`} className="border-b border-line/60">
                        <td className="py-1.5 pr-3 text-ink">{i === 0 ? row.key : ""}</td>
                        <td className="py-1.5 pr-3 text-ink-soft">
                          {c.column}
                          {c.risky && (
                            <AlertTriangle size={11} className="ml-1 inline text-stamp" />
                          )}
                        </td>
                        <td className="py-1.5 pr-3 text-ink-soft line-through">{c.before || "(空欄)"}</td>
                        <td className="py-1.5 pr-3 text-moss">{c.after || "(空欄)"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {result.changed.length > 200 && (
                <p className="mt-3 font-body text-xs text-ink-soft">
                  画面表示は200件までです。全件は「Excelで出力」からご確認ください。
                </p>
              )}
            </ResultTable>
          )}

          {result.added.length > 0 && (
            <ResultTable title={`追加 (${result.added.length}件)`}>
              <SimpleRowList rows={result.added} keyColumn={result.keyColumn} tone="moss" />
            </ResultTable>
          )}

          {result.removed.length > 0 && (
            <ResultTable title={`削除 (${result.removed.length}件)`}>
              <SimpleRowList rows={result.removed} keyColumn={result.keyColumn} tone="stamp" />
            </ResultTable>
          )}
        </div>
      )}

      <p className="font-mono text-[11px] text-ink-soft/70">
        無料版は1ファイル{FREE_ROW_LIMIT.toLocaleString()}行まで。ファイルはサーバーに送信されず、すべてこのブラウザ内で処理されます。
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: number;
  accent: "moss" | "stamp" | "ink" | "soft";
  icon?: React.ReactNode;
}) {
  const color =
    accent === "moss"
      ? "text-moss"
      : accent === "stamp"
      ? "text-stamp"
      : accent === "ink"
      ? "text-ink"
      : "text-ink-soft";
  return (
    <div>
      <dt className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft/70">
        {icon}
        {label}
      </dt>
      <dd className={`font-display text-2xl font-semibold ${color}`}>{value.toLocaleString()}</dd>
    </div>
  );
}

function ResultTable({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="catalog-card p-5">
      <span className="index-tab">{title}</span>
      <div className="mt-3 overflow-x-auto">{children}</div>
    </div>
  );
}

function SimpleRowList({
  rows,
  keyColumn,
  tone,
}: {
  rows: Record<string, string>[];
  keyColumn: string;
  tone: "moss" | "stamp";
}) {
  const shown = rows.slice(0, 100);
  return (
    <>
      <ul className="grid gap-1.5 font-mono text-xs sm:grid-cols-2">
        {shown.map((r, i) => (
          <li
            key={i}
            className={
              "rounded-card border px-2.5 py-1.5 " +
              (tone === "moss" ? "border-moss/40 bg-moss-light text-moss" : "border-stamp/30 bg-stamp/5 text-stamp")
            }
          >
            {r[keyColumn] || "(キーなし)"}
          </li>
        ))}
      </ul>
      {rows.length > 100 && (
        <p className="mt-3 font-body text-xs text-ink-soft">
          画面表示は100件までです。全件は「Excelで出力」からご確認ください。
        </p>
      )}
    </>
  );
}
