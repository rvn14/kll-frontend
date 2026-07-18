import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/shop", "/offers", "/about", "/contact", "/delivery", "/warranty", "/privacy", "/terms"].map((path) => ({ url: `https://klltraders.lk${path}`, lastModified: new Date(), changeFrequency: path === "" ? "daily" : "weekly", priority: path === "" ? 1 : .7 }));
}
