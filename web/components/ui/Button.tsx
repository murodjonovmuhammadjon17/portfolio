import Link from "next/link";

type Props = {
  href: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
};

const base =
  "inline-flex items-center rounded-pill px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const styles = {
  primary: "bg-ink text-surface hover:bg-muted",
  outline: "border border-ink text-ink hover:bg-chip",
};

export function Button({ href, variant = "primary", children }: Props) {
  const className = `${base} ${styles[variant]}`;
  const isHttp = href.startsWith("http");
  const isPlain =
    isHttp || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isPlain) {
    return (
      <a
        href={href}
        className={className}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}