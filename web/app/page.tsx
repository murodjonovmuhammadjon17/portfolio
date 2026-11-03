export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="mx-auto max-w-4xl rounded-md bg-surface p-8 md:p-12">
        <nav className="font-serif text-xl">Projects · About · Contact</nav>

        <h1 className="mt-12 text-3xl font-bold italic md:text-5xl">
          I am Muhammad, a product designer
        </h1>
        <p className="mt-4 text-muted">
          Temporary check page for design tokens.
        </p>

        <a
          href="#"
          className="mt-8 inline-block rounded-pill bg-ink px-6 py-3 text-surface"
        >
          View projects
        </a>

        <div className="mt-12 flex gap-2">
          <span className="rounded-pill bg-chip px-3 py-1 text-sm">
            Product design
          </span>
          <span className="rounded-pill bg-chip px-3 py-1 text-sm text-accent">
            Student project
          </span>
        </div>
      </div>
    </main>
  );
}
