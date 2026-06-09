/* Decorative polygon triangle network anchored to a slide corner.
 * Uses the canonical branded artwork (triangles.png / trojkaty.png).
 *
 * RENDERING APPROACH — filter: brightness(0) / brightness(0) invert(1):
 * The source PNG has near-white triangle lines on a white/transparent
 * background. The cleanest way to make them visible regardless of background:
 *   light-bg: brightness(0)            → collapses all content to solid black;
 *             opacity then controls the grey level (0.26 ≈ clear grey texture).
 *   dark-bg:  brightness(0) invert(1)  → solid white lines on dark surfaces;
 *             higher opacity (0.55) because white on black needs less contrast.
 * This is simpler and more predictable than mix-blend-mode:multiply.
 */
import trianglesPng from "../assets/trojkaty.png";
import { CSSProperties } from "react";

export type DecorativeCornerPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export type DecorativeCornerVariant  = "image" | "svg";
export type DecorativeCornerTheme    = "light-bg" | "dark-bg";

export interface DecorativeCornerProps {
  position?: DecorativeCornerPosition;
  size?:     number;
  /** Leave undefined to use the theme-appropriate default opacity. */
  opacity?:  number;
  /** "image" (default) uses triangles PNG; "svg" uses an inline SVG approximation. */
  variant?:  DecorativeCornerVariant;
  /**
   * "light-bg" (default) — white or light slides.
   *   filter:brightness(0) collapses the near-white PNG to solid black;
   *   opacity then dials it to a readable grey texture.
   * "dark-bg" — photo overlays, dark backgrounds.
   *   filter:brightness(0) invert(1) produces white triangle lines.
   */
  theme?:    DecorativeCornerTheme;
}

const POSITION_CLASS: Record<DecorativeCornerPosition, string> = {
  "top-right":    "absolute top-0 right-0",
  "top-left":     "absolute top-0 left-0",
  "bottom-right": "absolute bottom-0 right-0",
  "bottom-left":  "absolute bottom-0 left-0",
};

// Source PNG cluster is in the bottom-left; flip to anchor each corner.
const PNG_TRANSFORM: Record<DecorativeCornerPosition, string> = {
  "top-right":    "scale(-1,-1)",
  "top-left":     "scaleY(-1)",
  "bottom-right": "scaleX(-1)",
  "bottom-left":  "none",
};

const SVG_TRANSFORM: Record<DecorativeCornerPosition, string> = {
  "top-right":    "translate(0,0)",
  "top-left":     "translate(0,0) scale(-1,1)",
  "bottom-right": "translate(0,0) scale(1,-1)",
  "bottom-left":  "translate(0,0) scale(-1,-1)",
};

const THEME_FILTER: Record<DecorativeCornerTheme, CSSProperties["filter"]> = {
  "light-bg": "brightness(0)",           // → solid black rendered as grey via opacity
  "dark-bg":  "brightness(0) invert(1)", // → white lines on dark backgrounds
};

const THEME_DEFAULT_OPACITY: Record<DecorativeCornerTheme, number> = {
  "light-bg": 0.26,
  "dark-bg":  0.55,
};

export function DecorativeCorner({
  position = "top-right",
  size     = 260,
  opacity,
  variant  = "image",
  theme    = "light-bg",
}: DecorativeCornerProps) {
  const resolvedOpacity = opacity ?? THEME_DEFAULT_OPACITY[theme];

  if (variant === "svg") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        className={POSITION_CLASS[position]}
        style={{ opacity: resolvedOpacity, pointerEvents: "none" }}
        aria-hidden
      >
        <g transform={SVG_TRANSFORM[position]} fill="none" stroke="var(--th-color-gray-1)" strokeWidth={1}>
          <polyline points="240,30 170,80 220,140" />
          <polyline points="240,90 200,130 240,170" />
          <polygon  points="160,40 200,90 140,90"   />
          <polyline points="230,180 180,200 220,230" strokeDasharray="3 4" />
          <polygon  points="120,20 150,50 100,60"   />
        </g>
      </svg>
    );
  }

  return (
    <img
      src={trianglesPng}
      width={size}
      height={size}
      className={POSITION_CLASS[position]}
      style={{
        opacity:         resolvedOpacity,
        filter:          THEME_FILTER[theme],
        pointerEvents:   "none",
        transform:       PNG_TRANSFORM[position],
        transformOrigin: "center",
      }}
      draggable={false}
      aria-hidden
      alt=""
    />
  );
}
