import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="px-6 py-24 md:px-12">
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="mt-3 text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </section>
  );
}
