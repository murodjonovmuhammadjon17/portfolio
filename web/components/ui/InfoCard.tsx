type Props = { kicker: string; title: string; text: string };

export function InfoCard({ kicker, title, text }: Props) {
  return (
    <div className="rounded-md border border-line bg-surface p-6">
      <p className="text-xs text-accent">{kicker}</p>
      <h3 className="mt-2 font-serif text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}