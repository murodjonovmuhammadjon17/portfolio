type Props = {
  id?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

export function Section({ id, title, intro, children }: Props) {
  return (
    <section
      id={id}
      className="border-t border-line px-6 py-12 md:px-12 md:py-16"
    >
      <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
      {intro && <p className="mt-2 text-sm text-muted">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}