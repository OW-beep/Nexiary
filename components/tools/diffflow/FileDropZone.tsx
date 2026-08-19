"use client";

import { useCallback, useState } from "react";
import { clsx } from "clsx";
import { FileSpreadsheet, Upload } from "lucide-react";

export default function FileDropZone({
  label,
  fileName,
  rowCount,
  onFile,
}: {
  label: string;
  fileName: string | null;
  rowCount: number | null;
  onFile: (file: File) => void;
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
  );
}
