/**
 * One MDX file on disk (`mdx`) may be exposed under multiple /blog/:name paths.
 * `canonical` is the preferred URL for rel=canonical, sitemap, RSS, and listings.
 */
export const BLOG_SLUG_GROUPS: { canonical: string; mdx: string }[] = [
  {
    canonical: 'run-redis-on-k8s-kuaishou-solution-with-kubeblocks',
    mdx: 'manage-large-scale-redis-on-k8s-with-kubeblocks',
  },
];

const mdxBasenameToCanonical = new Map(
  BLOG_SLUG_GROUPS.map((g) => [g.mdx, g.canonical]),
);

const canonicalToMdxBasename = new Map(
  BLOG_SLUG_GROUPS.map((g) => [g.canonical, g.mdx]),
);

/** Basename of the .mdx file to load (no extension). */
export function resolveBlogMdxSlug(urlSlug: string): string {
  return canonicalToMdxBasename.get(urlSlug) ?? urlSlug;
}

/** Preferred /blog/:slug for metadata, JSON-LD, sitemap, and feeds. */
export function getBlogCanonicalSlug(urlSlug: string): string {
  const fromMdx = mdxBasenameToCanonical.get(urlSlug);
  if (fromMdx) return fromMdx;
  if (canonicalToMdxBasename.has(urlSlug)) return urlSlug;
  return urlSlug;
}

/** Extra route names (no .mdx on disk) to pre-render. */
export function getBlogAliasRouteSlugs(): string[] {
  return BLOG_SLUG_GROUPS.filter((g) => g.canonical !== g.mdx).map((g) => g.canonical);
}
