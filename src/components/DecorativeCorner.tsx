/* Decorative polygon triangle network anchored to a slide corner.
 * Uses the canonical branded artwork (trojkaty.png) by default.
 *
 * IMPORTANT — visibility on white slides:
 * trojkaty.png has near-white triangle lines on a white/transparent background.
 * Without correction this is invisible at low opacity on white slides.
 * Solution: theme="light-bg" applies mix-blend-mode:multiply so the white PNG
 * background vanishes against the slide, leaving the grey triangle lines visible.
 * Use theme="dark-bg" for photo overlays and dark-background slides.
 */
import trojkatyPng from "../assets/trojkaty.png";
import { CSSProperties } from "react";

export type DecorativeCornerPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export type DecorativeCornerVariant  = "image" | "svg";
export type DecorativeCornerTheme    = "light-bg" | "dark-bg";

export interface DecorativeCornerProps {
  position?: DecorativeCornerPosition;
  size?:     number;
  /** Leave undefined to use the theme-appropriate default opacity. */
  opacity?:  number;
  /** "image" (default) uses trojkaty.png; "svg" uses an inline SVG approximation. */
  variant?:  DecorativeCornerVariant;
  /**
   * "light-bg" (default) — white or light-coloured slides.
   *   Applies mix-blend-mode:multiply so the near-white PNG background
   *   disappears and the grey triangle lines remain readable.
   * "dark-bg" — photo overlays, dark-background slides.
   *   No blending; light triangles read naturally against dark surfaces.
   */
  theme?:    DecorativeCornerTheme;
}

const POSITION_CLASS: Record<DecorativeCornerPosition, string> = {
  "top-right":    "absolute top-0 right-0",
  "top-left":     "absolute top-0 left-0",
  "bottom-right": "absolute bottom-0 right-0",
  "bottom-left":  "absolute bottom-0 left-0",
};

// trojkaty.png cluster is in bottom-left; flip to anchor each corner.
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

// mix-blend-mode:multiply on a white/transparent PNG against a white slide:
// white PNG areas become invisible, grey triangle lines remain visible.
const THEME_BLEND: Record<DecorativeCornerTheme, CSSProperties["mixBlendMode"]> = {
  "light-bg": "multiply",
  "dark-bg":  "normal",
};

// Theme-appropriate default opacity.
// light-bg: higher because multiply handles the contrast; raw value is perceivable.
// dark-bg:  lower because the light triangles are already high-contrast on dark.
const THEME_DEFAULT_OPACITY: Record<DecorativeCornerTheme, number> = {
  "light-bg": 0.70,
  "dark-bg":  0.22,
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
      src={trojkatyPng}
      width={size}
      height={size}
      className={POSITION_CLASS[position]}
      style={{
        opacity:        resolvedOpacity,
        mixBlendMode:   THEME_BLEND[theme],
        pointerEvents:  "none",
        transform:      PNG_TRANSFORM[position],
        transformOrigin:"center",
      }}
      draggable={false}
      aria-hidden
      alt=""
    />
  );
}
