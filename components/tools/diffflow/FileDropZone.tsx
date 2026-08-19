"use client";

import { useCallback, useState } from "react";
import { clsx } from "clsx";
import { FileSpreadsheet, Upload } from "lucide-react";

export default function FileDropZone({
  label,
  fileName,
  rowCount,
  sheetNames,
  selectedSheet,
  onFile,
  onSheetChange,
}: {
  label: string;
  fileName: string | null;
  rowCount: number | null;
  sheetNames: string[];
  selectedSheet: string | null;
  onFile: (file: File) => void;
  onSheetChange: (sheetName: string) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <div className="space-y-2">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={clsx(
          "catalog-card flex min-h-[168px] cursor-pointer flex-col items-center justify-center gap-2 p-6 text-center transition-colors",
          dragOver ? "border-stamp bg-stamp/5" : "hover:border-ink-soft"
        )}
      >
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
          }}
        />
        <span className="index-tab">{label}</span>
        {fileName ? (
          <>
            <FileSpreadsheet size={28} strokeWidth={1.5} className="mt-1 text-moss" />
            <p className="font-body text-sm text-ink">{fileName}</p>
            {rowCount !== null && (
              <p className="font-mono text-xs text-ink-soft">{rowCount.toLocaleString()} 行</p>
            )}
            <p className="font-mono text-[11px] text-ink-soft/70">クリックで差し替え</p>
          </>
        ) : (
          <>
            <Upload size={28} strokeWidth={1.5} className="mt-1 text-ink-soft" />
            <p className="font-body text-sm text-ink-soft">
              クリックまたはドラッグ&ドロップ
            </p>
            <p className="font-mono text-[11px] text-ink-soft/70">.xlsx / .xls / .csv</p>
          </>
        )}
      </label>

      {sheetNames.length > 1 && (
        <div className="flex items-center gap-2 px-1">
          <span className="font-mono text-[11px] text-ink-soft/70 shrink-0">シート</span>
          <select
            value={selectedSheet ?? ""}
            onChange={(e) => onSheetChange(e.target.value)}
            className="w-full rounded-card border border-line bg-paper-card px-2 py-1 font-mono text-xs text-ink focus:border-stamp focus:outline-none"
          >
            {sheetNames.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
