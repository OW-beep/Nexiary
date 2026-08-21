export type SavedRule = {
  id: string;
  name: string;
  keyColumns: string[];
  ignoreColumns: string[];
  oldFileName: string;
  newFileName: string;
  oldSheetName: string;
  newSheetName: string;
  createdAt: number;
  lastUsedAt: number;
};

const STORAGE_KEY = "diffflow:rules";

/** 保存済みルールを読み込む(ブラウザのlocalStorageのみ・ログイン不要) */
export function loadRules(): SavedRule[] {
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

function persist(rules: SavedRule[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
}

export type SaveRuleInput = {
  name: string;
  keyColumns: string[];
  ignoreColumns: string[];
  oldFileName: string;
  newFileName: string;
  oldSheetName: string;
  newSheetName: string;
};

export function saveRule(input: SaveRuleInput): SavedRule[] {
  const now = Date.now();
  const rule: SavedRule = {
    id: `rule_${now}_${Math.random().toString(36).slice(2, 8)}`,
    ...input,
    createdAt: now,
    lastUsedAt: now,
  };
  const next = [rule, ...loadRules()];
  persist(next);
  return next;
}

export function deleteRule(id: string): SavedRule[] {
  const next = loadRules().filter((r) => r.id !== id);
  persist(next);
  return next;
}

export function touchRule(id: string): SavedRule[] {
  const next = loadRules().map((r) => (r.id === id ? { ...r, lastUsedAt: Date.now() } : r));
  persist(next);
  return next;
}
