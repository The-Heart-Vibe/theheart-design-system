/* Standalone symbols from the brand guideline (slide 11):
 *   ✔   green check
 *   ✘   red cross
 *   ⬤   amber (red-light) dot
 *
 * Use these inline (in body text) where a StatusPill would be too heavy.
 */
export type SymbolKind = "check" | "cross" | "dot";

export interface SymbolProps {
  kind:  SymbolKind;
  size?: number;
}

const GLYPH: Record<SymbolKind, string> = {
  check: "✔",
  cross: "✘",
  dot:   "⬤",
};

const COLOR: Record<SymbolKind, string> = {
  check: "var(--th-color-green)",
  cross: "var(--th-color-primary)",
  dot:   "var(--th-color-red-light)",
};

export function Symbol({ kind, size = 18 }: SymbolProps) {
  return (
    <span
      aria-hidden
      style={{
        fontSize: size,
        color: COLOR[kind],
        lineHeight: 1,
        display: "inline-block",
        verticalAlign: "middle",
      }}
    >
      {GLYPH[kind]}
    </span>
  );
}
