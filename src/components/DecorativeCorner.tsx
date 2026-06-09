/* Decorative polygon triangle network anchored to a slide corner.
 * Uses the canonical branded artwork (trojkaty.png) by default.
 * Use variant="svg" for a lightweight inline fallback (no image fetch).
 */
import trojkatyPng from "../assets/trojkaty.png";

export type DecorativeCornerPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export type DecorativeCornerVariant  = "image" | "svg";

export interface DecorativeCornerProps {
  position?: DecorativeCornerPosition;
  size?:     number;
  opacity?:  number;
  /** "image" (default) uses trojkaty.png; "svg" uses an inline SVG approximation. */
  variant?:  DecorativeCornerVariant;
}

const POSITION_CLASS: Record<DecorativeCornerPosition, string> = {
  "top-right":    "absolute top-0 right-0",
  "top-left":     "absolute top-0 left-0",
  "bottom-right": "absolute bottom-0 right-0",
  "bottom-left":  "absolute bottom-0 left-0",
};

// trojkaty.png triangle cluster sits in the bottom-left of the canvas.
// Flip axes so the cluster anchors correctly to each corner.
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

export function DecorativeCorner({
  position = "top-right",
  size     = 260,
  opacity  = 0.35,
  variant  = "image",
}: DecorativeCornerProps) {
  if (variant === "svg") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        className={POSITION_CLASS[position]}
        style={{ opacity, pointerEvents: "none" }}
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
        opacity,
        pointerEvents: "none",
        transform: PNG_TRANSFORM[position],
        transformOrigin: "center",
      }}
      draggable={false}
      aria-hidden
      alt=""
    />
  );
}
