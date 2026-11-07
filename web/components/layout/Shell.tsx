import { Header } from "./Header";
import { Footer } from "./Footer";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-3 md:px-8 md:py-8">
      <div className="mx-auto max-w-[1304px] overflow-hidden rounded-md bg-surface">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
