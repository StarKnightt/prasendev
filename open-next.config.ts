import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// R2-backed incremental cache + memory queue so time-based ISR
// (`export const revalidate = ...` on the API routes and SSG pages)
// refreshes at runtime instead of being frozen at build time.
//
// Why not doQueue: this OpenNext version can retry-loop on revalidation
// confirmations it misreads as failures (opennextjs-cloudflare#662) — the
// Durable Object kept retrying already-succeeded jobs around the clock and
// burned the free-plan daily DO duration allowance (Aug 2026, seen on all
// three workers on this account). The memory queue does the same direct
// revalidation HEAD fetch via WORKER_SELF_REFERENCE without a DO; worst
// case without cross-isolate dedupe is a rare duplicate render, and a
// missed revalidation is retried by the next stale request.
//
// No tag cache: the app only uses time-based revalidation (`/api/revalidate`
// calls revalidatePath, which stays a no-op without a tag cache —
// acceptable, it was already ineffective before).
// See https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: memoryQueue,
});
