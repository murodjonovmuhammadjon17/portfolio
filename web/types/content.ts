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