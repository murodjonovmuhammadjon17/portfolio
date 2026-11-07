type Item = { id: string; label: string };

export function SectionNav({ items }: { items: Item[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
      {items.map((i) => (
        <a
          key={i.id}
          href={`#${i.id}`}
          className="rounded-pill bg-chip px-3 py-1 text-xs hover:bg-paper-1 focus-visible:outline-2 focus-visible:outline-accent"
        >
          {i.label}
        </a>
      ))}
    </nav>
  );
}
