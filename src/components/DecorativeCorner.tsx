/* Abstract grey triangles + line fragments anchored to a corner.
 * Mirrors the decorative element in the top-right of every blank.pptx
 * content slide. Pure SVG so it scales cleanly.
 */
export type DecorativeCornerPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface DecorativeCornerProps {
  position?: DecorativeCornerPosition;
  size?:     number;   // px square
  opacity?:  number;
}

const TRANSFORMS: Record<DecorativeCornerPosition, string> = {
  "top-right":    "translate(0, 0)",
  "top-left":     "translate(0, 0) scale(-1, 1)",
  "bottom-right": "translate(0, 0) scale(1, -1)",
  "bottom-left":  "translate(0, 0) scale(-1, -1)",
};

const POSITION_CLASS: Record<DecorativeCornerPosition, string> = {
  "top-right":    "absolute top-0 right-0",
  "top-left":     "absolute top-0 left-0",
  "bottom-right": "absolute bottom-0 right-0",
  "bottom-left":  "absolute bottom-0 left-0",
};

export function DecorativeCorner({
  position = "top-right",
  size = 240,
  opacity = 0.35,
}: DecorativeCornerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={POSITION_CLASS[position]}
      style={{ opacity, pointerEvents: "none" }}
      aria-hidden
    >
      <g transform={TRANSFORMS[position]} fill="none" stroke="var(--th-color-gray-1)" strokeWidth={1}>
        {/* Stylised line fragments + triangles, mirroring the guideline corner */}
        <polyline points="240,30 170,80 220,140" />
        <polyline points="240,90 200,130 240,170" />
        <polygon  points="160,40 200,90 140,90"   />
        <polyline points="230,180 180,200 220,230" strokeDasharray="3 4" />
        <polygon  points="120,20 150,50 100,60"   />
      </g>
    </svg>
  );
}
