import { createClient } from "next-sanity";

// The project ID is public (it is visible in every request the site makes),
// so a fallback is safe. The env variable still wins when it is set.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rp6ucumv";

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});