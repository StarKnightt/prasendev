import type { Root } from "mdast";

// Inline syntax: [[highlight:text]], [[circle:text]], [[underline:text]]
// Rendered as <mark data-type data-order>, which page.tsx maps to <Highlight />.
const MARK_RE = /\[\[(highlight|circle|underline):([^\]]+)\]\]/g;

interface Node {
  type: string;
  value?: string;
  children?: Node[];
  data?: Record<string, unknown>;
}

export function stripMarks(text: string) {
  return text.replace(MARK_RE, "$2");
}

export function remarkMarks() {
  return (tree: Root) => {
    let order = 0;

    const walk = (node: Node) => {
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (child.type !== "text" || !child.value) {
          walk(child);
          return [child];
        }

        const parts: Node[] = [];
        let last = 0;
        for (const match of child.value.matchAll(MARK_RE)) {
          const [raw, type, text] = match;
          const start = match.index ?? 0;
          if (start > last) parts.push({ type: "text", value: child.value.slice(last, start) });
          parts.push({
            type: "mark",
            data: { hName: "mark", hProperties: { dataType: type, dataOrder: order++ } },
            children: [{ type: "text", value: text }],
          });
          last = start + raw.length;
        }
        if (!parts.length) return [child];
        if (last < child.value.length) parts.push({ type: "text", value: child.value.slice(last) });
        return parts;
      });
    };

    walk(tree as Node);
  };
}
