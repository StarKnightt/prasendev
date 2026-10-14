export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A to Z" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export function parseSortKey(value: string | null | undefined): SortKey {
  return SORT_OPTIONS.some((o) => o.value === value) ? (value as SortKey) : "featured";
}

export type SortItem = { key: string; title: string; dates?: string };

type ParsedDates = { start: number; end: number; ongoing: boolean } | null;

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const ONGOING = /^(present|ongoing|now|current)$/i;

function parseMonth(part: string): number | null {
  const year = part.match(/\b(\d{4})\b/);
  if (!year) return null;
  const word = part.match(/[a-z]{3,}/i)?.[0].toLowerCase().slice(0, 3);
  const month = word ? MONTHS.indexOf(word) : 0;
  return Number(year[1]) * 12 + (month === -1 ? 0 : month);
}

/** "October 2026", "Jan 2025 - Present", "March 2025 - June 2026"; months are optional. */
export function parseDates(dates?: string): ParsedDates {
  if (!dates?.trim()) return null;
  const [from, to] = dates.split(/\s+[-–—]\s+|\s+to\s+/i).map((s) => s.trim());
  const start = parseMonth(from);
  if (start === null) return null;
  if (to && ONGOING.test(to)) return { start, end: Infinity, ongoing: true };
  const end = to ? parseMonth(to) : null;
  return { start, end: end ?? start, ongoing: false };
}

/** Returns item keys in display order. Ties and undated items keep the hand-curated order; undated go last. */
export function sortKeys(items: readonly SortItem[], sort: SortKey): string[] {
  if (sort === "featured") return items.map((i) => i.key);
  const rows = items.map((item, index) => ({ item, index, d: parseDates(item.dates) }));
  rows.sort((a, b) => {
    if (sort === "az") {
      return a.item.title.localeCompare(b.item.title, "en", { sensitivity: "base", numeric: true }) || a.index - b.index;
    }
    if (!a.d || !b.d) return a.d ? -1 : b.d ? 1 : a.index - b.index;
    if (sort === "oldest") return a.d.start - b.d.start || a.index - b.index;
    if (a.d.ongoing !== b.d.ongoing) return a.d.ongoing ? -1 : 1;
    if (a.d.ongoing) return b.d.start - a.d.start || a.index - b.index;
    return b.d.end - a.d.end || b.d.start - a.d.start || a.index - b.index;
  });
  return rows.map((r) => r.item.key);
}
