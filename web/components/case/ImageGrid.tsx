import { CoverImage } from "@/components/ui/CoverImage";
import type { ProjectImage } from "@/types/content";

const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3" } as const;

type Props = {
  images: ProjectImage[];
  columns: 2 | 3;
  label: string;
  aspect?: string;
};

export function ImageGrid({
  images,
  columns,
  label,
  aspect = "aspect-[4/3]",
}: Props) {
  const sizes =
    columns === 3
      ? "(min-width: 768px) 33vw, 100vw"
      : "(min-width: 768px) 50vw, 100vw";
  return (
    <div className={`grid gap-4 ${cols[columns]}`}>
      {images.map((img, i) => (
        <figure key={i}>
          <CoverImage
            src={img.src}
            alt={img.alt}
            label={`${label} ${String(i + 1).padStart(2, "0")}`}
            aspect={aspect}
            sizes={sizes}
          />
          {img.caption && (
            <figcaption className="mt-2 text-xs text-muted">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
