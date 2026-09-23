"use client";

// Next 15 disallows `ssr: false` with next/dynamic inside Server Components;
// these client-side wrappers keep the browser-only rendering behavior for the
// homepage (visitor counter and GitHub contributions calendar).
import dynamic from "next/dynamic";
import { GithubSkeleton } from "@/components/skeletons/github-skeleton";

export const VisitorCounter = dynamic(
  () => import("@/components/visitor-counter"),
  { ssr: false }
);

export const GithubContributionsPlain = dynamic(
  () =>
    import("@/components/github-calendar").then((mod) => {
      const Plain = () => <mod.GithubContributions plain />;
      return Plain;
    }),
  { ssr: false, loading: () => <div className="h-[150px] w-full rounded-lg bg-muted/50" /> }
);

export const GithubContributions = dynamic(
  () => import("@/components/github-calendar").then((mod) => mod.GithubContributions),
  { ssr: false, loading: () => <GithubSkeleton /> }
);
