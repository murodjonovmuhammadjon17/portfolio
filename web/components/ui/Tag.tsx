export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-pill bg-chip px-3 py-1 text-xs">{children}</span>
  );
}