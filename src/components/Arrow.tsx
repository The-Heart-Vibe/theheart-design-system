/* Brand guideline (slide 11) ships two arrow styles: solid and dotted.
 * Both render in black to keep the visual neutral; use the colour prop
 * sparingly when you really need an emphasis.
 */
export type ArrowStyle = "solid" | "dotted";
export type ArrowDirection = "right" | "left" | "up" | "down";

export interface ArrowProps {
  style?:     ArrowStyle;
  direction?: ArrowDirection;
  length?:    number;   // px
  color?:     string;
}

const ROTATION: Record<ArrowDirection, number> = {
  right: 0, down: 90, left: 180, up: 270,
};

export function Arrow({
  style = "solid",
  direction = "right",
  length = 120,
  color = "var(--th-color-black)",
}: ArrowProps) {
  const head = 12;
  const lineY = 10;
  const dash = style === "dotted" ? "3 5" : undefined;
  return (
    <svg
      width={length}
      height={20}
      viewBox={`0 0 ${length} 20`}
      style={{ transform: `rotate(${ROTATION[direction]}deg)` }}
    >
      <line
        x1={0} y1={lineY} x2={length - head} y2={lineY}
        stroke={color} strokeWidth={2}
        strokeDasharray={dash}
        strokeLinecap="round"
      />
      <polygon
        points={`${length - head},${lineY - 6} ${length},${lineY} ${length - head},${lineY + 6}`}
        fill={color}
      />
    </svg>
  );
}
