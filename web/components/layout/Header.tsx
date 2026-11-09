"use client";

import Link from "next/link";
import { useState } from "react";

type Item = { label: string; href: string };

export function Header({ name, items }: { name: string; items: Item[] }) {
  const [open, setOpen] = useState(false);

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
          className="rounded-sm px-2 py-1 text-2xl md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mt-6 flex flex-col gap-4 font-serif text-[22px] md:hidden"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
