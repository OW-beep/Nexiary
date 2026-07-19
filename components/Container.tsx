import { clsx } from "clsx";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-5xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}
