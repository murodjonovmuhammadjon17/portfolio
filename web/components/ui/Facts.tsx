import type { Project } from "@/types/content";

type Fact = { label: string; value?: string };

export function projectFacts(p: Project): Fact[] {
  return [
    { label: "Role", value: p.role },
    { label: "Type", value: p.type },
    { label: "Tools", value: p.tools?.join(", ") },
    { label: "Scope", value: p.scope },
  ];
}

export function Facts({ items }: { items: Fact[] }) {
  const visible = items.filter((i) => i.value);
  if (visible.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
      {visible.map((i) => (
        <div key={i.label}>
          <dt className="text-[11px] uppercase tracking-wide text-muted">
            {i.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}