export type HistoryEntry = {
  id: string;
  ranAt: number;
  ruleName: string | null; // 保存済みルールを使った場合はその名前、手動なら null
  keyColumns: string[];
  oldFileName: string;
  newFileName: string;
  oldSheetName: string;
  newSheetName: string;
  totalOld: number;
  totalNew: number;
  added: number;
  removed: number;
  changed: number;
  unchangedCount: number;
  riskyCount: number;
};

const STORAGE_KEY = "diffflow:history";
const MAX_ENTRIES = 50;

/** 比較履歴を読み込む(ブラウザのlocalStorageのみ・ログイン不要) */
export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export type AddHistoryInput = Omit<HistoryEntry, "id" | "ranAt">;

export function addHistoryEntry(input: AddHistoryInput): HistoryEntry[] {
  const entry: HistoryEntry = {
    id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    ranAt: Date.now(),
    ...input,
  };
  const next = [entry, ...loadHistory()].slice(0, MAX_ENTRIES);
  persist(next);
  return next;
}

export function clearHistory(): HistoryEntry[] {
  persist([]);
  return [];
}

export function deleteHistoryEntry(id: string): HistoryEntry[] {
  const next = loadHistory().filter((h) => h.id !== id);
  persist(next);
  return next;
}
