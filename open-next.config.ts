import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

// R2-backed incremental cache + Durable Object revalidation queue so
// time-based ISR (`export const revalidate = ...` on the API routes and
// SSG pages) actually refreshes at runtime instead of being frozen at
// build time. No tag cache: the app only uses time-based revalidation
// (`/api/revalidate` calls revalidatePath, which stays a no-op without a
// tag cache — acceptable, it was already ineffective before).
// See https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
});
