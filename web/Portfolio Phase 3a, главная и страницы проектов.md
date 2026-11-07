# Portfolio: Phase 3a, главная и страницы проектов

Nov 2, 2026 · @muhammadjon

Фаза 3a собирает публичную часть сайта по макету Figma на временных данных: главную страницу и страницу проекта `/projects/[slug]`. Документ написан так, чтобы по нему мог продолжить любой помощник.

## Что строим и в каком порядке

- **Сверено с Figma:** Home Page (десктоп и мобильная версия), Project Page, Components, Design System. **Case Study Template, Admin CMS Wireframes и User Flow я пока не смотрел**, поэтому страница `/case-studies/[slug]` в этот этап не входит.
- **Данные пока лежат в файлах** `lib/content/*`, а не в Sanity. Их форма совпадает с будущей схемой, а функции доступа уже асинхронные. В Phase 4 поменяются только тела этих функций, страницы и компоненты останутся прежними.
- **Ничего не выдумано.** Тексты взяты из макета. Поля, которых в макете нет (почта, ссылки на соцсети, CV, фото, город), оставлены пустыми и на странице не показываются, пока ты их не заполнишь.
- **Отложено:** Case Study (этап 3b), страница `/projects` с полкой «книг» и анимациями, проверка на телефоне после публикации.

## Что макет говорит о будущей схеме CMS

На странице Project Page под блоками подписаны поля CMS. Они расходятся с моей схемой из Phase 1, поэтому в Phase 4 схему придётся поправить.

| Блок на макете | Поле | Что делать в Phase 4 |
| --- | --- | --- |
| Теги над названием | `categories` (массив) | В схеме было одно поле `category`, меняем на массив строк |
| Название и подпись | `title`, `shortDescription` | Как планировали |
| Role, Type, Tools, Scope | `role`, `type`, `tools`, `scope` | Поля `type` и `scope` добавить (Scope есть на макете, но без подписи) |
| Overview | `overview` | Форматированный текст (Portable Text) |
| What is inside | `highlights[]`: `title`, `text` | Новое поле |
| Selected screens | `gallery[]`: `image`, `alt`, `caption` | Порядок перетаскиванием, alt обязателен |
| Open prototype | ссылка на прототип | Это `externalLinks` из схемы Phase 1 |
| Read case study / Case study soon | связь с кейсом | Выводится из наличия опубликованного кейса |

## Шаг 0. Папки и файлы

Открой терминал в папке `portfolio` и выполни (проверь место командой `pwd`):

```powershell
cd web
mkdir types, lib\content, components\ui, components\layout, components\cards
mkdir "app\projects\[slug]"
```

Файлы создаются так: в Solution Explorer (режим **Folder View**) правый клик по папке → **Add → New File**, вводишь имя, вставляешь код, сохраняешь **Ctrl+S**. Ниже у каждого файла указан полный путь от папки `web`. Файлы, которые уже есть (`layout.tsx`, `page.tsx`, `globals.css`), открываешь и заменяешь содержимое.

Код в `web` будет использовать импорт вида `@/components/...`. Значок `@` означает корень папки `web`, это настроено стартовым шаблоном.

## Шаг 1. Типы данных: `types/content.ts`

Это «договор» о форме данных. Если в проекте или карточке чего-то не хватает, TypeScript подсветит ошибку ещё до запуска. Знак `?` значит «поле необязательное»: страница обязана переживать его отсутствие.

```ts
export type Highlight = {
  title: string;
  text: string;
};

export type ProjectImage = {
  src?: string; // в CMS это будет изображение Sanity, пока может быть пустым
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  categories: string[];
  featured: boolean;
  displayOrder: number;
  role?: string;
  type?: string;
  tools?: string[];
  scope?: string;
  overview?: string;
  highlights?: Highlight[];
  gallery?: ProjectImage[];
  coverImage?: ProjectImage;
  caseStudySlug?: string; // есть значение: показываем кнопку «Read case study»
  prototypeUrl?: string; // есть значение: показываем кнопку «Open prototype»
};
```

## Шаг 2. Данные сайта

### `lib/site.ts`, общие настройки

В Phase 4 это переедет в CMS (запись `siteSettings`). Пустая строка значит «пока нет»: такая кнопка или ссылка на сайте не появится. Заполни, когда будут реальные адреса. Адреса я не придумывал.

```ts
export const siteConfig = {
  name: "Muhammad Murodjonov",
  tagline: "Product designer with an IT background",
  description:
    "Portfolio of Muhammad Murodjonov, product designer with an IT background.",
  nav: [
    { label: "Projects", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  links: {
    email: "", // например "mailto:name@example.com"
    linkedin: "", // полный адрес профиля
    telegram: "", // полный адрес профиля
    cv: "", // например "/cv.pdf", файл положить в web/public
  },
};
```

### `lib/content/home.ts`, тексты главной

Все тексты взяты из макета Home Page. Города, языков и фото в макете нет (там подсказки-заглушки), поэтому в About их нет.

```ts
export const home = {
  hero: {
    headline: "I am Muhammad, a product designer with an IT background.",
    accent: "I turn user flows into clean interfaces.",
    status:
      "Open to UX/UI internships · Kazan Federal University (IT) · School 21",
  },
  workIntro:
    "Three projects, from research to interface. Case studies are in progress.",
  whatIDo: [
    {
      title: "Research and UX",
      text: "User flows, personas and heuristic analysis to understand the problem before drawing screens.",
    },
    {
      title: "Interface design",
      text: "Screens for mobile and desktop, built from a UI kit with consistent type, colour and spacing.",
    },
    {
      title: "Design systems",
      text: "Components with variants, styles, variables and light and dark themes in Figma.",
    },
    {
      title: "Prototyping and testing",
      text: "Interactive prototypes, UX-copy tests and usability testing with a clear protocol.",
    },
  ],
  tools: ["Figma", "FigJam", "Python", "Google Colab", "Frontend basics"],
  howIWork: [
    { title: "Understand", text: "The problem, the users and the constraints." },
    { title: "Structure", text: "Flows and wireframes before visual design." },
    { title: "Design", text: "Screens built from a shared UI kit and tokens." },
    { title: "Test and refine", text: "Prototype, test with real users and improve." },
  ],
  about: {
    text: "I design digital products from user flows to interface details, and I understand how they are built. Currently looking for an internship in UX/UI and product design.",
    education: "Kazan Federal University (branch), Information Technologies",
    study: "School 21, UX/UI design",
  },
};
```

Фраза про «Three projects» зашита в текст. Если число проектов изменится, поправь её здесь.

### `lib/content/projects.ts`, проекты

Проект Traveller заполнен по макету. Для Lunch Box и SquadDrop в макете есть только карточки, поэтому роль, инструменты и описания я не придумывал: их поля пропущены, и блоки на странице просто не появятся. Строка `caseStudySlug` закомментирована до этапа 3b, иначе кнопка вела бы на несуществующую страницу.

```ts
import type { Project } from "@/types/content";

const projects: Project[] = [
  {
    slug: "traveller",
    title: "Traveller",
    shortDescription:
      "Travel and booking app. Mobile and desktop screens, UI kit and a design system.",
    categories: ["Product design", "Student project"],
    featured: true,
    displayOrder: 1,
    role: "Product designer (UX/UI)",
    type: "Student project",
    tools: ["Figma", "FigJam"],
    scope: "Mobile and desktop screens, UI kit, design system",
    overview:
      "Traveller is a travel and booking app designed as a UX/UI course project. The work covers a UI kit, components with variants, a design system with tokens for light and dark themes, and screens for mobile and desktop.",
    highlights: [
      { title: "UI kit", text: "Colours, type, buttons, inputs, cards and icons." },
      { title: "Components", text: "Variants, states and instance-swap icons." },
      { title: "Tokens", text: "Light and dark design tokens for every screen." },
    ],
    gallery: [
      { alt: "Traveller screen 1" },
      { alt: "Traveller screen 2" },
      { alt: "Traveller screen 3" },
      { alt: "Traveller screen 4" },
    ],
    // caseStudySlug: "traveller", // раскомментировать в этапе 3b
  },
  {
    slug: "lunch-box",
    title: "Lunch Box",
    shortDescription:
      "Food app concept that combines a restaurant lunch subscription with a marketplace of home-cooked meals.",
    categories: ["Concept", "UX/UI"],
    featured: true,
    displayOrder: 2,
  },
  {
    slug: "squaddrop",
    title: "SquadDrop",
    shortDescription:
      "Sci-fi styled app. Wireframes, component kit and a library of components in Figma.",
    categories: ["Wireframes", "Component kit"],
    featured: true,
    displayOrder: 3,
  },
];

// Phase 4: тела этих функций заменим запросами к Sanity, сигнатуры останутся.
export async function getAllProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getAdjacentProjects(slug: string) {
  const all = await getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined,
  };
}
```

## Шаг 3. Базовые элементы интерфейса

Это мелкие кирпичики из страницы Components в Figma. Все цвета и скругления берутся из токенов Phase 2 (`bg-surface`, `rounded-md`, `text-muted` и так далее). Если где-то видишь прямой цвет вроде `#fff`, это ошибка.

### `components/ui/Button.tsx`

Две вариации из макета: Primary (чёрная) и Outline. Внутренние адреса идут через `Link` из Next.js (быстрые переходы), внешние через обычный `<a>`. Ссылки на http открываются в новой вкладке с `rel="noopener noreferrer"` (защита от доступа новой вкладки к твоей). Видимая рамка при фокусе с клавиатуры нужна для доступности.

```tsx
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
```

### `components/ui/Tag.tsx`

```tsx
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-pill bg-chip px-3 py-1 text-xs">{children}</span>
  );
}
```

### `components/ui/CoverImage.tsx`

Одна рамка для всех картинок: обложка, экраны, галерея. Если картинки нет, показывается бежевая заглушка с подписью, как в макете. Если картинка есть, подключается `next/image`: он сам уменьшает файл и подгружает его по мере прокрутки. Параметр `sizes` подсказывает браузеру, какой ширины файл нужен.

```tsx
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
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-xs text-muted">
          {label}
        </div>
      )}
    </div>
  );
}
```

### `components/ui/Section.tsx`

Обёртка секции: верхняя линия, заголовок Lora и необязательная подпись. Каждая секция получает `id`, чтобы на неё вела ссылка из меню (например, `/#work`).

```tsx
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
```

### `components/ui/InfoCard.tsx`

Карточка «01 · заголовок · текст» из блоков What I do, How I work и What is inside.

```tsx
type Props = { kicker: string; title: string; text: string };

export function InfoCard({ kicker, title, text }: Props) {
  return (
    <div className="rounded-md border border-line bg-surface p-6">
      <p className="text-xs text-accent">{kicker}</p>
      <h3 className="mt-2 font-serif text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}
```

### `components/ui/Facts.tsx`

Блок «ROLE / TYPE / TOOLS / SCOPE». Показываются только заполненные факты, поэтому у Lunch Box и SquadDrop он просто не появится. `projectFacts` собирает список из проекта.

```tsx
import type { Project } from "@/types/content";

type Fact = { label: string; value?: string };

export function projectFacts(p: Project): Fact[] {
  return [
    { label: "Role", value: p.role },
    { label: "Type", value: p.type },
    { label: "Tools", value: p.tools?.join(", ") },
    { label: "Scope", value: p.scope },
  ];
}

export function Facts({ items }: { items: Fact[] }) {
  const visible = items.filter((i) => i.value);
  if (visible.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
      {visible.map((i) => (
        <div key={i.label}>
          <dt className="text-[11px] uppercase tracking-wide text-muted">
            {i.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
```

Пока ничего запускать не нужно: страницы, которые используют эти файлы, появятся в следующих шагах.

## Шаг 4. Карточка проекта: `components/cards/ProjectCard.tsx`

Карточка из блока Selected work и из «Next project». Вся карточка кликабельна, но ссылка в разметке одна, на заголовке. Класс `after:absolute after:inset-0` растягивает невидимый слой ссылки на всю карточку. Так экранный диктор читает одну ссылку, а мышь и палец ловят всю площадь. Подпись внизу пока всегда «Case study soon», потому что `caseStudySlug` ещё закомментирован.

```tsx
import Link from "next/link";
import type { Project } from "@/types/content";
import { Tag } from "@/components/ui/Tag";
import { CoverImage } from "@/components/ui/CoverImage";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative flex h-full flex-col rounded-md border border-line bg-surface p-4">
      <CoverImage
        src={project.coverImage?.src}
        alt={project.coverImage?.alt ?? ""}
        label="Cover image"
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {project.categories.map((c) => (
          <Tag key={c}>{c}</Tag>
        ))}
      </div>
      <h3 className="mt-3 font-serif text-2xl">
        <Link
          href={`/projects/${project.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-accent"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted">
        {project.shortDescription}
      </p>
      <p className="mt-4 text-sm font-semibold text-accent">
        {project.caseStudySlug ? "View case study →" : "Case study soon"}
      </p>
    </article>
  );
}
```

## Шаг 5. Каркас страницы: шапка, подвал, обёртка

В макете весь сайт это белая закруглённая карточка на бежевом фоне, внутри неё шапка, содержимое и подвал. Эту карточку делает одна обёртка `Shell`, подключённая в `layout.tsx`, поэтому на каждой странице шапка и подвал появляются сами.

### `components/layout/Header.tsx`

Файл начинается со строки `"use client"`: меню на телефоне открывается кнопкой, а состояние «открыто или закрыто» хранится в браузере. Всё остальное на сайте остаётся серверным и быстрым. Ссылка CV появляется, только если в `siteConfig.links.cv` есть адрес. Кнопка меню имеет `aria-expanded` и подпись, чтобы её понимали программы чтения с экрана.

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const items = [
    ...siteConfig.nav,
    ...(siteConfig.links.cv
      ? [{ label: "CV", href: siteConfig.links.cv }]
      : []),
  ];

  return (
    <header className="px-6 py-5 md:px-12">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-serif text-xl md:text-2xl">
          {siteConfig.name}
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
```

### `components/layout/Footer.tsx`

Ссылки в подвале берутся из того же `siteConfig` и пустые не показываются.

```tsx
import { siteConfig } from "@/lib/site";

export function Footer() {
  const links = [
    { label: "LinkedIn", href: siteConfig.links.linkedin },
    { label: "Telegram", href: siteConfig.links.telegram },
    { label: "Email", href: siteConfig.links.email },
    { label: "CV", href: siteConfig.links.cv },
  ].filter((l) => l.href);

  return (
    <footer className="flex flex-col gap-6 border-t border-line px-6 py-8 md:flex-row md:items-end md:justify-between md:px-12">
      <div>
        <p className="font-serif text-xl">{siteConfig.name}</p>
        <p className="mt-1 text-xs text-muted">{siteConfig.tagline}</p>
        <p className="mt-4 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
      {links.length > 0 && (
        <ul className="flex flex-wrap gap-4 text-xs font-semibold">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </footer>
  );
}
```

### `components/layout/Shell.tsx`

Ширина карточки `1304px` измерена по макету приблизительно (карточка занимает около трёх четвертей кадра 1728 px). Если на экране она кажется слишком широкой или узкой, поменяй это число.

```tsx
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
```

### `app/layout.tsx` (заменить целиком)

Изменения по сравнению с Phase 2: подключена обёртка `Shell`, а заголовок страницы строится по шаблону. Страница проекта задаёт только своё название, а шаблон `%s | ...` добавляет имя сайта, получается «Traveller | Muhammad Murodjonov».

```tsx
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
```

### По желанию: фон «мятая бумага»

В макете под белой карточкой лежит фотография мятой бумаги. Чтобы получить её: в Figma выбери слой с этим фоном, в панели Export поставь JPG, ширину около 1600 px, экспортируй, сожми файл до 300 КБ и сохрани как `web/public/paper.jpg`. Потом в `app/globals.css` замени правило `body` на это:

```css
body {
  background: var(--color-paper-1) url("/paper.jpg") center / cover fixed;
  color: var(--color-ink);
}
```

Бежевый цвет остаётся запасным: если файла нет или он ещё грузится, сайт выглядит нормально.

## Шаг 6. Главная страница: `app/page.tsx` (заменить целиком)

Это сборка всех блоков макета Home: Hero, Selected work, What I do, Featured case, How I work, About, Contact. Страница серверная и асинхронная, данные получает через функции из шага 2. Блок Selected work показывает проекты с `featured: true`, Featured case берёт первый из них. Если в `siteConfig.links` пока пусто, блок Contact остаётся без кнопок, это нормально.

```tsx
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Section } from "@/components/ui/Section";
import { InfoCard } from "@/components/ui/InfoCard";
import { CoverImage } from "@/components/ui/CoverImage";
import { Facts, projectFacts } from "@/components/ui/Facts";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { getAllProjects } from "@/lib/content/projects";
import { home } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

const num = (i: number) => String(i + 1).padStart(2, "0");

export default async function HomePage() {
  const projects = await getAllProjects();
  const selected = projects.filter((p) => p.featured);
  const featured = selected[0];

  const contactLinks = [
    { label: "Email", href: siteConfig.links.email },
    { label: "LinkedIn", href: siteConfig.links.linkedin },
    { label: "Telegram", href: siteConfig.links.telegram },
    { label: "Download CV", href: siteConfig.links.cv },
  ].filter((l) => l.href);

  return (
    <>
      <section className="px-6 pb-12 pt-10 md:px-12 md:pb-20 md:pt-16">
        <h1 className="max-w-3xl text-[28px] font-bold italic leading-tight md:text-5xl">
          {home.hero.headline}{" "}
          <span className="text-muted">{home.hero.accent}</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/#work">View projects</Button>
          <Button href="/#contact" variant="outline">
            Contact
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted">{home.hero.status}</p>
      </section>

      <Section id="work" title="Selected work" intro={home.workIntro}>
        <div className="grid gap-6 md:grid-cols-3">
          {selected.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section
        id="what-i-do"
        title="What I do"
        intro="Four areas I work in, from the first sketch to a design system developers can use."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {home.whatIDo.map((item, i) => (
            <InfoCard
              key={item.title}
              kicker={num(i)}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">Tools</span>
          {home.tools.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>

      {featured && (
        <Section
          id="featured"
          title={`Featured case: ${featured.title}`}
          intro={featured.shortDescription}
        >
          <CoverImage
            src={featured.coverImage?.src}
            alt={featured.coverImage?.alt ?? ""}
            label="Cover image: key screens"
            aspect="aspect-[16/9]"
            sizes="(min-width: 1304px) 1200px, 100vw"
          />
          <div className="mt-6">
            <Facts items={projectFacts(featured)} />
          </div>
          {featured.overview && (
            <p className="mt-6 max-w-3xl">{featured.overview}</p>
          )}
          <div className="mt-6">
            {featured.caseStudySlug ? (
              <Button
                href={`/case-studies/${featured.caseStudySlug}`}
                variant="outline"
              >
                Read case study →
              </Button>
            ) : (
              <Button href={`/projects/${featured.slug}`} variant="outline">
                View project →
              </Button>
            )}
          </div>
        </Section>
      )}

      <Section
        id="how-i-work"
        title="How I work"
        intro="A simple loop I repeat on every project."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {home.howIWork.map((step, i) => (
            <InfoCard
              key={step.title}
              kicker={num(i)}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
      </Section>

      <Section id="about" title="About">
        <div className="grid gap-8 md:grid-cols-2">
          <p className="max-w-xl text-lg">{home.about.text}</p>
          <Facts
            items={[
              { label: "Education", value: home.about.education },
              { label: "Study", value: home.about.study },
            ]}
          />
        </div>
      </Section>

      <Section
        id="contact"
        title="Contact"
        intro="Open to internships in UX/UI and product design."
      >
        {contactLinks.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {contactLinks.map((l, i) => (
              <Button
                key={l.label}
                href={l.href}
                variant={i === 0 ? "primary" : "outline"}
              >
                {l.label}
              </Button>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
```

## Шаг 7. Страница проекта и страница 404

### `app/projects/[slug]/page.tsx`

Скобки в названии папки `[slug]` значат «здесь подставляется любой адрес»: по одному файлу Next.js строит `/projects/traveller`, `/projects/lunch-box` и так далее, отдельных страниц вручную нет. Пояснения по ключевым функциям:

- `generateStaticParams` говорит Next.js, какие адреса собрать заранее при сборке сайта. Так страницы открываются мгновенно.
- `generateMetadata` формирует title и description страницы из данных проекта. Так выглядит будущий SEO, который в Phase 4 будет брать данные из CMS.
- `params` в новых версиях Next.js это обещание (`Promise`), поэтому перед использованием стоит `await`.
- `notFound()` показывает страницу 404 и отдаёт код ответа 404, если такого проекта нет.
- Блоки Overview, What is inside и Selected screens показываются, только если в проекте есть данные. У Lunch Box и SquadDrop страница будет короче, и это правильно: выдуманных данных нет.

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Section } from "@/components/ui/Section";
import { InfoCard } from "@/components/ui/InfoCard";
import { CoverImage } from "@/components/ui/CoverImage";
import { Facts, projectFacts } from "@/components/ui/Facts";
import { ProjectCard } from "@/components/cards/ProjectCard";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/content/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.shortDescription };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);
  const neighbour = next ?? prev;

  return (
    <>
      <section className="px-6 pb-12 pt-4 md:px-12">
        <Link href="/#work" className="text-xs font-semibold hover:underline">
          ← Back to projects
        </Link>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-bold italic md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{project.shortDescription}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.caseStudySlug && (
            <Button href={`/case-studies/${project.caseStudySlug}`}>
              Read case study
            </Button>
          )}
          {project.prototypeUrl && (
            <Button href={project.prototypeUrl} variant="outline">
              Open prototype
            </Button>
          )}
        </div>

        <div className="mt-8">
          <CoverImage
            src={project.coverImage?.src}
            alt={project.coverImage?.alt ?? ""}
            label="Cover image: hero screens"
            aspect="aspect-[16/9]"
            sizes="(min-width: 1304px) 1200px, 100vw"
          />
        </div>
        <div className="mt-6">
          <Facts items={projectFacts(project)} />
        </div>
      </section>

      {project.overview && (
        <Section title="Overview">
          <p className="max-w-3xl text-lg">{project.overview}</p>
        </Section>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <Section title="What is inside">
          <div className="grid gap-4 md:grid-cols-3">
            {project.highlights.map((h, i) => (
              <InfoCard
                key={h.title}
                kicker={String(i + 1).padStart(2, "0")}
                title={h.title}
                text={h.text}
              />
            ))}
          </div>
        </Section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <Section title="Selected screens">
          <div className="grid gap-4 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <figure key={i}>
                <CoverImage
                  src={img.src}
                  alt={img.alt}
                  label={`Screen ${String(i + 1).padStart(2, "0")}`}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                {img.caption && (
                  <figcaption className="mt-2 text-xs text-muted">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section title={next ? "Next project" : "Previous project"}>
        {neighbour && (
          <div className="max-w-sm">
            <ProjectCard project={neighbour} />
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {prev && (
            <Button href={`/projects/${prev.slug}`} variant="outline">
              ← Previous
            </Button>
          )}
          <Button href="/#work" variant="outline">
            All projects
          </Button>
          {next && <Button href={`/projects/${next.slug}`}>Next →</Button>}
        </div>
      </Section>
    </>
  );
}
```

### `app/not-found.tsx`

Страница для несуществующих адресов. Next.js сам отдаёт для неё HTTP-статус 404, это важно для поисковиков.

```tsx
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
```

## Шаг 8. Проверка и публикация

В папке `web` запусти `npm run dev` и пройди по списку:

- [ ] http://localhost:3000 показывает шапку с именем, Hero, три карточки, блоки What I do, Featured case, How I work, About и Contact, подвал.
- [ ] Пункты меню Projects, About и Contact прокручивают страницу к нужному блоку.
- [ ] Клик по карточке Traveller открывает `/projects/traveller` с тегами, фактами, Overview, тремя карточками What is inside и четырьмя заглушками экранов.
- [ ] `/projects/lunch-box` открывается и короче: без фактов, Overview и галереи.
- [ ] `/projects/abc` показывает страницу «Page not found».
- [ ] Уменьши окно браузера до ширины телефона: появляется кнопка ☰, меню открывается и закрывается, карточки идут в один столбец.
- [ ] Табуляция (клавиша Tab) последовательно проходит по ссылкам, и у каждой видна рамка фокуса.

Потом остановись сервер (**Ctrl+C**) и проверь рабочую сборку, она строже обычного запуска:

```powershell
npm run lint
npm run build
```

Оба должны закончиться без ошибок. В конце `build` Next.js покажет список страниц, среди которых должны быть `/`, `/projects/traveller`, `/projects/lunch-box`, `/projects/squaddrop`. Если всё хорошо, публикуй (из папки `portfolio`):

```powershell
cd ..
git add .
git commit -m "Phase 3a: home and project pages with mock content"
git push
```

Vercel сам запустит деплой. Через пару минут открой `*.vercel.app` и пройди те же пункты на боевом адресе.

### Частые проблемы

| Что видишь | Причина | Что сделать |
| --- | --- | --- |
| `Module not found: Can't resolve '@/components/...'` | Опечатка в имени файла или папки, регистр букв | Сверь имя с этим документом, оно регистрозависимо |
| Красное подчёркивание у `Project` или `home` | Файл не сохранён или в нём опечатка | Сохрани все файлы, перезапусти `npm run dev` |
| `params should be awaited` | Старая версия Next.js | Покажи версию из `web/package.json`, код подстроим |
| Нет скругления у кнопок, класс `rounded-pill` не работает | Tailwind v3 вместо v4 | Вернись к проверке первой строки `globals.css` в Phase 2 |
| Ошибка про `next/image` и неизвестный хост | Появилась картинка с внешнего адреса | Это Phase 4: адрес нужно разрешить в `next.config.ts` |
| Деплой упал на Vercel | Ошибка сборки, которую `npm run build` показал бы локально | Выполни `npm run build` локально и пришли первую красную ошибку |

## Что дальше

1. **Этап 3b:** страница Case Study `/case-studies/[slug]`. Для неё нужно сначала сверить с макетом страницу Case Study Template, и я не буду писать код вслепую.
2. **Страница `/projects` с полкой «книг»:** анимации описаны на странице Design System в таблице Motion. Это отдельный этап после 3b.
3. **Phase 4:** создание проекта Sanity, схемы `project`, `caseStudy`, `siteSettings` с полями из таблицы выше и замена тел функций в `lib/content/projects.ts`.
4. **Чем можно заняться сейчас:** подготовить адреса почты, LinkedIn и Telegram, файл CV и фотографию для About. Их нужно будет вписать в `lib/site.ts`, и блоки Contact и подвал оживут.
