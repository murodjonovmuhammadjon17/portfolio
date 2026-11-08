const imageFields = `"src": asset->url, alt, caption`;

const projectFields = `
  "slug": slug.current,
  title,
  shortDescription,
  categories,
  featured,
  displayOrder,
  role,
  "type": projectType,
  tools,
  scope,
  overview,
  prototypeUrl,
  highlights[]{title, text},
  coverImage{${imageFields}},
  gallery[]{${imageFields}},
  "caseStudySlug": *[_type == "caseStudy" && project._ref == ^._id][0].slug.current
`;

export const allProjectsQuery = `*[_type == "project" && defined(slug.current)] | order(displayOrder asc){${projectFields}}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{${projectFields}}`;

const caseFields = `
  "slug": slug.current,
  "projectSlug": project->slug.current,
  title,
  summary,
  overview,
  problem,
  users,
  prototypeUrl,
  coverImage{${imageFields}},
  goals[]{kicker, title, text},
  research[]{kicker, title, text},
  decisions[]{kicker, title, text},
  outcomes[]{kicker, title, text},
  process[]{${imageFields}},
  finalUI[]{${imageFields}},
  designSystem{text, "image": image{${imageFields}}}
`;

export const allCaseStudiesQuery = `*[_type == "caseStudy" && defined(slug.current)]{${caseFields}}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0]{${caseFields}}`;
