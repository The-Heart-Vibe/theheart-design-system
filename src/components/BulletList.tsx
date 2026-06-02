import { ReactNode } from "react";

/* Brand guideline (slide 11 of blank.pptx) defines four bullet styles:
 *
 *   filled-circle   ● heading  → ○ child
 *   filled-square   ■ heading  → □ child
 *   numbered        1. heading → ● child
 *   plain           bullets without hierarchy
 *
 * Each `BulletItem` can carry nested `children` which are auto-rendered
 * with the matching secondary marker.
 */
export type BulletKind = "filled-circle" | "filled-square" | "numbered" | "plain";

export interface BulletItem {
  text:      ReactNode;
  children?: BulletItem[];
}

export interface BulletListProps {
  kind?:  BulletKind;
  items:  BulletItem[];
  depth?: number;   // internal — caller leaves it 0
}

const PRIMARY = {
  "filled-circle": "●",
  "filled-square": "■",
  "numbered":      null,  // rendered as "1.", "2." inline
  "plain":         "•",
} satisfies Record<BulletKind, string | null>;

const NESTED = {
  "filled-circle": "○",
  "filled-square": "□",
  "numbered":      "●",
  "plain":         "○",
} satisfies Record<BulletKind, string>;

export function BulletList({ kind = "filled-circle", items, depth = 0 }: BulletListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => {
        const marker =
          kind === "numbered" && depth === 0
            ? `${i + 1}.`
            : depth === 0
              ? PRIMARY[kind]
              : NESTED[kind];
        return (
          <li key={i} className="flex items-start gap-2">
            <span
              aria-hidden
              className={`flex-none w-5 text-th-body font-heading font-semibold ${
                depth === 0 && (kind === "filled-circle" || kind === "filled-square")
                  ? "text-th-primary"
                  : "text-th-black"
              }`}
            >
              {marker}
            </span>
            <div className="flex-1 text-th-body text-th-black">
              <div>{item.text}</div>
              {item.children && item.children.length > 0 && (
                <div className="mt-2 ml-2">
                  <BulletList kind={kind} items={item.children} depth={depth + 1} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
