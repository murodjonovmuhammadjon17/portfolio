import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  label: string;
  aspect?: string;
  sizes?: string;
};

export function CoverImage({
  src,
  alt,
  label,
  aspect = "aspect-[3/2]",
  sizes = "100vw",
}: Props) {
  return (
    <div className={`relative overflow-hidden rounded-sm bg-cover ${aspect}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-xs text-muted">
          {label}
        </div>
      )}
    </div>
  );
}