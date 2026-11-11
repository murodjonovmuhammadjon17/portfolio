"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { label: string; href: string };

export function Header({ name, items }: { name: string; items: Item[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="px-6 py-5 md:px-12">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-serif text-xl md:text-2xl">
          {name}
        </Link>

        <nav
          aria-label="Main"
          className="hidden gap-8 font-serif text-xl md:flex"
        >
          {items.map((item) => (
            <Link key={item.label} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="relative -mr-2 h-10 w-10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 -ml-3 -mt-px block h-0.5 w-6 bg-ink transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[7px]"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 -ml-3 -mt-px block h-0.5 w-6 bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 -ml-3 -mt-px block h-0.5 w-6 bg-ink transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[7px]"
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav
          aria-label="Mobile"
          inert={!open}
          className="min-h-0 overflow-hidden"
        >
          <div className="flex flex-col gap-4 pt-6 font-serif text-[22px]">
            {items.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`transition duration-300 ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}