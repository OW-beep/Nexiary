"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Download,
  Minus,
  Plus,
  RotateCcw,
  Pencil,
  ArrowRightLeft,
  BookmarkPlus,
  Trash2,
  ListChecks,
  History,
} from "lucide-react";
import FileDropZone from "./FileDropZone";
import {
  loadWorkbook,
  parseSheet,
  diffTables,
  diffHeaders,
  columnLabel,
  unionColumns,
  buildDiffWorkbook,
  getFreeRowLimit,
  getFreeColumnLimit,
  getFreeColumnLimitLabel,
  type LoadedWorkbook,
  type ParsedTable,
  type DiffResult,
} from "@/lib/diffflow/engine";
import { loadRules, saveRule, deleteRule, touchRule, type SavedRule } from "@/lib/diffflow/rules";
import { loadHistory, addHistoryEntry, clearHistory, type HistoryEntry } from "@/lib/diffflow/history";

const FREE_ROW_LIMIT = getFreeRowLimit();
const FREE_COLUMN_LIMIT = getFreeColumnLimit();
const FREE_COLUMN_LIMIT_LABEL = getFreeColumnLimitLabel();

type Step = "upload" | "configure" | "result";

export default function DiffFlowApp() {
  const [oldLoaded, setOldLoaded] = useState<LoadedWorkbook | null>(null);
  const [newLoaded, setNewLoaded] = useState<LoadedWorkbook | null>(null);
  const [oldSheet, setOldSheet] = useState<string | null>(null);
  const [newSheet, setNewSheet] = useState<string | null>(null);
  const [oldTable, setOldTable] = useState<ParsedTable | null>(null);
  const [newTable, setNewTable] = useState<ParsedTable | null>(null);

  const [keyColumns, setKeyColumns] = useState<string[]>([]);
  const [ignoreColumns, setIgnoreColumns] = useState<string[]>([]);
  const [result, setResult] = useState<DiffResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [savedRules, setSavedRules] = useState<SavedRule[]>([]);
  const [pendingRule, setPendingRule] = useState<SavedRule | null>(null);
  const [appliedRuleName, setAppliedRuleName] = useState<string | null>(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [ruleNameInput, setRuleNameInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setSavedRules(loadRules());
    setHistory(loadHistory());
  }, []);

  const step: Step = result ? "result" : oldTable && newTable ? "configure" : "upload";

  const headerDiff = useMemo(() => {
    if (!oldTable || !newTable) return null;
    return diffHeaders(oldTable, newTable);
  }, [oldTable, newTable]);

  const sharedHeaders = headerDiff?.common ?? [];
  const allHeaders = useMemo(() => {
    if (!oldTable || !newTable) return [];
    return unionColumns(oldTable, newTable);
  }, [oldTable, newTable]);

  // 保存済みルールを適用中で、両ファイルが読み込まれたら比較条件を自動反映する
  useEffect(() => {
    if (!pendingRule || !oldTable || !newTable) return;
    const validKeys = pendingRule.keyColumns.filter((k) => sharedHeaders.includes(k));
    if (validKeys.length > 0) {
      setKeyColumns(validKeys);
      setIgnoreColumns(pendingRule.ignoreColumns.filter((c) => allHeaders.includes(c)));
      setAppliedRuleName(pendingRule.name);
    }
    setPendingRule(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRule, oldTable, newTable]);

  function applyRule(rule: SavedRule) {
    setPendingRule(rule);
    setAppliedRuleName(null);
    setSavedRules(touchRule(rule.id));
  }

  function removeRule(id: string) {
    setSavedRules(deleteRule(id));
  }

  function openSaveForm() {
    setRuleNameInput(appliedRuleName ?? "");
    setShowSaveForm(true);
  }

  function confirmSaveRule() {
    if (!ruleNameInput.trim() || !oldLoaded || !newLoaded || !oldSheet || !newSheet) return;
    const next = saveRule({
      name: ruleNameInput.trim(),
      keyColumns,
      ignoreColumns,
      oldFileName: oldLoaded.fileName,
      newFileName: newLoaded.fileName,
      oldSheetName: oldSheet,
      newSheetName: newSheet,
    });
    setSavedRules(next);
    setShowSaveForm(false);
    setAppliedRuleName(ruleNameInput.trim());
  }

  function tryApplyTable(which: "old" | "new", loaded: LoadedWorkbook, sheetName: string) {
    const table = parseSheet(loaded, sheetName);
    if (table.rows.length > FREE_ROW_LIMIT) {
      setError(
        `無料版は1ファイルあたり${FREE_ROW_LIMIT.toLocaleString()}行までです。「${loaded.fileName}」(${sheetName})は${table.rows.length.toLocaleString()}行あります。`
      );
      return;
    }
    if (table.columns.length > FREE_COLUMN_LIMIT) {
      setError(
        `無料版は${FREE_COLUMN_LIMIT_LABEL}列までです。「${loaded.fileName}」(${sheetName})は${table.columns.length.toLocaleString()}列(${table.columns[table.columns.length - 1].letter}列まで)あります。`
      );
      return;
    }
    setError(null);
    if (which === "old") {
      setOldSheet(sheetName);
      setOldTable(table);
    } else {
      setNewSheet(sheetName);
      setNewTable(table);
    }
    setResult(null);
    if (!pendingRule) {
      setKeyColumns([]);
      setIgnoreColumns([]);
      setAppliedRuleName(null);
    }
  }

  async function handleFile(which: "old" | "new", file: File) {
    setError(null);
    try {
      const loaded = await loadWorkbook(file);
      const firstSheet = loaded.sheetNames[0];
      if (which === "old") {
        setOldLoaded(loaded);
      } else {
        setNewLoaded(loaded);
      }
      tryApplyTable(which, loaded, firstSheet);
    } catch (e) {
      setError("ファイルを読み込めませんでした。形式を確認してください。");
    }
  }

  function handleSheetChange(which: "old" | "new", sheetName: string) {
    const loaded = which === "old" ? oldLoaded : newLoaded;
    if (!loaded) return;
    tryApplyTable(which, loaded, sheetName);
  }

  function toggleKeyColumn(h: string) {
    setKeyColumns((prev) => (prev.includes(h) ? prev.filter((c) => c !== h) : [...prev, h]));
    setIgnoreColumns((prev) => prev.filter((c) => c !== h));
    setAppliedRuleName(null);
  }

  function runCompare() {
    if (!oldTable || !newTable || keyColumns.length === 0 || !oldLoaded || !newLoaded || !oldSheet || !newSheet) return;
    setBusy(true);
    // 大きめのファイルでもUIが固まって見えないよう1フレーム逃がす
    setTimeout(() => {
      const diff = diffTables(oldTable, newTable, keyColumns, ignoreColumns);
      setResult(diff);
      setHistory(
        addHistoryEntry({
          ruleName: appliedRuleName,
          keyColumns: diff.keyColumns,
          oldFileName: oldLoaded.fileName,
          newFileName: newLoaded.fileName,
          oldSheetName: oldSheet,
          newSheetName: newSheet,
          totalOld: diff.totalOld,
          totalNew: diff.totalNew,
          added: diff.added.length,
          removed: diff.removed.length,
          changed: diff.changed.length,
          unchangedCount: diff.unchangedCount,
          riskyCount: diff.riskyCount,
        })
      );
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
    setOldLoaded(null);
    setNewLoaded(null);
    setOldSheet(null);
    setNewSheet(null);
    setOldTable(null);
    setNewTable(null);
    setKeyColumns([]);
    setIgnoreColumns([]);
    setResult(null);
    setError(null);
    setPendingRule(null);
    setAppliedRuleName(null);
    setShowSaveForm(false);
  }

  return (
    <div className="space-y-8">
      {/* 保存済みルール一覧 */}
      {savedRules.length > 0 && step === "upload" && (
        <div className="catalog-card space-y-3 p-5">
          <span className="index-tab">
            <ListChecks size={11} className="mr-1 inline" />
            保存済みルール
          </span>
          <div className="grid gap-2 sm:grid-cols-2">
            {[...savedRules]
              .sort((a, b) => b.lastUsedAt - a.lastUsedAt)
              .map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-start justify-between gap-2 rounded-card border border-line/70 p-3 transition-colors hover:border-ink-soft"
                >
                  <button type="button" onClick={() => applyRule(rule)} className="min-w-0 flex-1 text-left">
                    <p className="truncate font-body text-sm text-ink">{rule.name}</p>
                    <p className="mt-0.5 truncate font-mono text-[11px] text-ink-soft">
                      キー: {rule.keyColumns.join(" / ")}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-[11px] text-ink-soft/70">
                      旧: {rule.oldFileName} ／ 新: {rule.newFileName}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeRule(rule.id)}
                    aria-label="ルールを削除"
                    className="shrink-0 p-1 text-ink-soft/50 transition-colors hover:text-stamp"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 比較履歴 */}
      {history.length > 0 && step === "upload" && (
        <div className="catalog-card space-y-3 p-5">
          <div className="flex items-center justify-between">
            <span className="index-tab">
              <History size={11} className="mr-1 inline" />
              比較履歴
            </span>
            <button
              type="button"
              onClick={() => setHistory(clearHistory())}
              className="font-mono text-[11px] text-ink-soft/70 underline hover:text-stamp"
            >
              すべて削除
            </button>
          </div>
          <ul className="space-y-2">
            {history.slice(0, 10).map((h) => (
              <li key={h.id} className="rounded-card border border-line/60 p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="font-mono text-xs text-ink">
                    {formatHistoryDate(h.ranAt)}
                    <span className="ml-2 text-ink-soft">{h.ruleName ?? "手動比較"}</span>
                  </p>
                  <p className="font-mono text-[11px] text-ink-soft">
                    追加{h.added} ／ 削除{h.removed} ／ 変更{h.changed}
                    {h.riskyCount > 0 && <span className="ml-1 text-stamp">／ 要確認{h.riskyCount}</span>}
                  </p>
                </div>
                <p className="mt-1 truncate font-mono text-[11px] text-ink-soft/70">
                  旧: {h.oldFileName} ／ 新: {h.newFileName}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {pendingRule && (
        <p className="rounded-card border border-line/70 bg-paper-card p-3 font-body text-sm text-ink-soft">
          「{pendingRule.name}」を適用中です。旧ファイルに「{pendingRule.oldFileName}」、新ファイルに「
          {pendingRule.newFileName}」を選んでください。
          <button
            type="button"
            onClick={() => setPendingRule(null)}
            className="ml-2 font-mono text-xs text-ink-soft underline hover:text-stamp"
          >
            適用を取り消す
          </button>
        </p>
      )}

      {/* Step 1: ファイル投入(シート選択含む) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FileDropZone
          label="旧ファイル"
          fileName={oldLoaded?.fileName ?? null}
          rowCount={oldTable?.rows.length ?? null}
          sheetNames={oldLoaded?.sheetNames ?? []}
          selectedSheet={oldSheet}
          onFile={(f) => handleFile("old", f)}
          onSheetChange={(s) => handleSheetChange("old", s)}
        />
        <FileDropZone
          label="新ファイル"
          fileName={newLoaded?.fileName ?? null}
          rowCount={newTable?.rows.length ?? null}
          sheetNames={newLoaded?.sheetNames ?? []}
          selectedSheet={newSheet}
          onFile={(f) => handleFile("new", f)}
          onSheetChange={(s) => handleSheetChange("new", s)}
        />
      </div>

      {error && (
        <p className="flex items-start gap-2 rounded-card border border-stamp/40 bg-stamp/5 p-3 font-body text-sm text-stamp">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      {/* Step 1.5: 列構成の差分(構造差分) */}
      {headerDiff && (headerDiff.onlyOld.length > 0 || headerDiff.onlyNew.length > 0) && (
        <div className="catalog-card space-y-3 p-5">
          <span className="index-tab">
            <ArrowRightLeft size={11} className="mr-1 inline" />
            列構成の差分
          </span>
          <p className="font-body text-xs text-ink-soft">
            2つのファイルで列の名前が異なっています。名称変更の可能性もあるので確認してください。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {headerDiff.onlyOld.length > 0 && (
              <div>
                <p className="font-mono text-[11px] text-stamp">旧のみ(削除された列)</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {headerDiff.onlyOld.map((h) => (
                    <span key={h} className="rounded-card border border-stamp/30 bg-stamp/5 px-2 py-0.5 font-mono text-xs text-stamp">
                      {h} ({oldTable!.columns.find((c) => c.name === h)?.letter})
                    </span>
                  ))}
                </div>
              </div>
            )}
            {headerDiff.onlyNew.length > 0 && (
              <div>
                <p className="font-mono text-[11px] text-moss">新のみ(追加された列)</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {headerDiff.onlyNew.map((h) => (
                    <span key={h} className="rounded-card border border-moss/40 bg-moss-light px-2 py-0.5 font-mono text-xs text-moss">
                      {h} ({newTable!.columns.find((c) => c.name === h)?.letter})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: 比較条件 */}
      {step !== "upload" && oldTable && newTable && (
        <div className="catalog-card space-y-5 p-5">
          {appliedRuleName && (
            <p className="rounded-card border border-moss/40 bg-moss-light px-3 py-2 font-body text-xs text-moss">
              「{appliedRuleName}」の条件を適用しました。
            </p>
          )}
          <div>
            <span className="index-tab">比較キー(複数選択可)</span>
            <p className="mt-2 font-body text-xs text-ink-soft">
              2つのファイルで同じ行を突き合わせる列を選んでください。複数選ぶと「都道府県+顧客ID」のような複合キーで突き合わせます。(キーは両ファイルに存在する列のみ選べます)
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {sharedHeaders.map((h) => {
                const active = keyColumns.includes(h);
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => toggleKeyColumn(h)}
                    className={
                      "rounded-card border px-3 py-1 font-mono text-xs transition-colors " +
                      (active ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink-soft")
                    }
                  >
                    {columnLabel(oldTable, newTable, h)}
                  </button>
                );
              })}
            </div>
          </div>

          {keyColumns.length > 0 && (
            <div>
              <span className="index-tab">比較から除外する列(任意)</span>
              <p className="mt-2 font-body text-xs text-ink-soft">
                キー以外の列は、データがある列(片方のファイルにしかない列も含む)がすべて対象です。ここで外さない限り同時に比較されます。片方にしかない列は、値がない側を空欄として比較します。
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {allHeaders
                  .filter((h) => !keyColumns.includes(h))
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
                        {columnLabel(oldTable, newTable, h)}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              disabled={keyColumns.length === 0 || busy}
              onClick={runCompare}
              className="rounded-card bg-ink px-5 py-2 font-body text-sm text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? "比較中…" : "比較する"}
            </button>
            {keyColumns.length > 0 && !showSaveForm && (
              <button
                type="button"
                onClick={openSaveForm}
                className="flex items-center gap-1 font-body text-sm text-ink-soft hover:text-ink"
              >
                <BookmarkPlus size={14} /> ルールとして保存
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1 font-body text-sm text-ink-soft hover:text-stamp"
            >
              <RotateCcw size={14} /> やり直す
            </button>
          </div>

          {showSaveForm && (
            <div className="flex flex-wrap items-center gap-2 rounded-card border border-line/70 p-3">
              <input
                type="text"
                value={ruleNameInput}
                onChange={(e) => setRuleNameInput(e.target.value)}
                placeholder="ルール名(例：毎月顧客マスタ比較)"
                className="min-w-[200px] flex-1 rounded-card border border-line bg-paper-card px-3 py-1.5 font-body text-sm text-ink focus:border-stamp focus:outline-none"
              />
              <button
                type="button"
                disabled={!ruleNameInput.trim()}
                onClick={confirmSaveRule}
                className="rounded-card bg-ink px-4 py-1.5 font-body text-sm text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                保存
              </button>
              <button
                type="button"
                onClick={() => setShowSaveForm(false)}
                className="font-body text-sm text-ink-soft hover:text-stamp"
              >
                キャンセル
              </button>
            </div>
          )}
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
            <p className="mb-3 font-mono text-[11px] text-ink-soft/70">
              比較キー: {result.keyColumns.join(" / ")} ／ 比較列: {result.comparedColumns.length}列を同時比較
            </p>
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
              <div className="space-y-3">
                {result.changed.slice(0, 100).map((row, idx) => {
                  const riskyInRow = row.changes.filter((c) => c.risky).length;
                  return (
                    <div key={`${row.keyLabel}-${idx}`} className="rounded-card border border-line/70 p-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="font-mono text-xs font-medium text-ink">
                          {row.keyLabel}
                          <span className="ml-2 font-normal text-ink-soft/70">
                            (旧 行{row.oldRowNumber} → 新 行{row.newRowNumber})
                          </span>
                        </p>
                        <p className="font-mono text-[11px] text-ink-soft">
                          {row.changes.length}項目変更
                          {riskyInRow > 0 && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 text-stamp">
                              <AlertTriangle size={11} /> 要確認{riskyInRow}件
                            </span>
                          )}
                        </p>
                      </div>
                      <ul className="mt-2 space-y-1 border-t border-line/60 pt-2">
                        {row.changes.map((c, i) => (
                          <li key={i} className="flex flex-wrap items-baseline gap-x-2 font-mono text-xs">
                            <span className="w-36 shrink-0 text-ink-soft">
                              {c.columnLetter}{row.newRowNumber}
                              <span className="ml-1 text-ink-soft/70">({c.column})</span>
                              {c.risky && <AlertTriangle size={11} className="ml-1 inline text-stamp" />}
                            </span>
                            <span className="text-ink-soft line-through">{c.before || "(空欄)"}</span>
                            <span className="text-ink-soft/60">→</span>
                            <span className="text-moss">{c.after || "(空欄)"}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              {result.changed.length > 100 && (
                <p className="mt-3 font-body text-xs text-ink-soft">
                  画面表示は100件までです。全件は「Excelで出力」からご確認ください。
                </p>
              )}
            </ResultTable>
          )}

          {result.added.length > 0 && (
            <ResultTable title={`追加 (${result.added.length}件)`}>
              <SimpleRowList rows={result.added} keyColumns={result.keyColumns} tone="moss" />
            </ResultTable>
          )}

          {result.removed.length > 0 && (
            <ResultTable title={`削除 (${result.removed.length}件)`}>
              <SimpleRowList rows={result.removed} keyColumns={result.keyColumns} tone="stamp" />
            </ResultTable>
          )}
        </div>
      )}

      <p className="font-mono text-[11px] text-ink-soft/70">
        無料版は1ファイル{FREE_ROW_LIMIT.toLocaleString()}行・{FREE_COLUMN_LIMIT_LABEL}列まで。ファイルはサーバーに送信されず、すべてこのブラウザ内で処理されます。
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

function formatHistoryDate(ts: number): string {
  return new Date(ts).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SimpleRowList({
  rows,
  keyColumns,
  tone,
}: {
  rows: { rowNumber: number; values: Record<string, string> }[];
  keyColumns: string[];
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
            <span className="text-ink-soft/70">行{r.rowNumber}: </span>
            {keyColumns.map((k) => r.values[k] ?? "").join(" / ") || "(キーなし)"}
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
