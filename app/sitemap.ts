import type { MetadataRoute } from "next";
import { languages } from "./languages";
import { getCanonicalPath, getHreflang, pageRoutes } from "./seo";
import { guides } from "./guides";
import { business } from "./business";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...languages.flatMap(lang => Object.values(pageRoutes).map(page => ({
      url: getCanonicalPath(lang, page),
      alternates: { languages: getHreflang(page) },
    }))),
    ...guides.map(guide => ({ url: `${business.url}/en/${guide.slug}/` })),
  ];
}
