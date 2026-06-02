export interface BigStatProps {
  value: string;
  caption: string;
  color?: string;     // CSS colour; defaults to brand primary
  align?: "left" | "center" | "right";
}

export function BigStat({ value, caption, color, align = "center" }: BigStatProps) {
  const alignClass = { left: "text-left", center: "text-center", right: "text-right" }[align];
  return (
    <div className={`${alignClass}`}>
      <div
        className="font-heading font-bold leading-none"
        style={{ fontSize: 80, color: color ?? "var(--th-color-primary)" }}
      >
        {value}
      </div>
      <div className="mt-3 text-th-supporting font-body text-th-gray-1">{caption}</div>
    </div>
  );
}
