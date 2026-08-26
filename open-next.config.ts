import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Pilot setup: no R2 (wrangler unauthenticated on this machine, so R2
// availability could not be verified). The static-assets incremental cache
// serves the prerendered SSG pages (blog, rss, sitemap) from build output.
// It is READ-ONLY: on-demand revalidation (/api/revalidate) will not persist
// on Workers until an R2/KV incremental cache is configured.
// See https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
