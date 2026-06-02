export interface DividerProps {
  color?: string;
  thickness?: number;
}

export function Divider({ color = "var(--th-color-gray-2)", thickness = 1 }: DividerProps) {
  return <div style={{ height: thickness, background: color, width: "100%" }} />;
}
