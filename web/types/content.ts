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

// Карточка внутри кейса: цель, находка, решение, урок и т.д.
export type CaseCard = {
  kicker?: string; // подпись над заголовком, например "Goal" или "Limit"
  title: string;
  text: string;
};

// Кейс. Роль, инструменты и объём берутся из связанного проекта.
export type CaseStudy = {
  slug: string;
  projectSlug: string; // к какому проекту относится кейс
  title: string;
  summary: string; // одно предложение: проблема и что сделано
  coverImage?: ProjectImage;
  overview?: string;
  problem?: string;
  goals?: CaseCard[];
  users?: string;
  research?: CaseCard[];
  process?: ProjectImage[]; // user flow и wireframes
  decisions?: CaseCard[];
  finalUI?: ProjectImage[];
  designSystem?: { text?: string; image?: ProjectImage };
  prototypeUrl?: string;
  outcomes?: CaseCard[];
};
