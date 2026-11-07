import { InfoCard } from "@/components/ui/InfoCard";
import type { CaseCard } from "@/types/content";

type Props = { cards: CaseCard[]; kickerPrefix?: string };

export function CardGrid({ cards, kickerPrefix }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c, i) => {
        const n = String(i + 1).padStart(2, "0");
        const fallback = kickerPrefix ? `${kickerPrefix} ${n}` : n;
        return (
          <InfoCard
            key={`${c.title}-${i}`}
            kicker={c.kicker ?? fallback}
            title={c.title}
            text={c.text}
          />
        );
      })}
    </div>
  );
}
