import type { StatusKey } from "./types";

type TrendDirection = "up" | "down" | "flat";

export interface KPITileProps {
  value: string;
  label: string;
  trend?: string;               // e.g. "+12%" or "-3d"
  trendDirection?: TrendDirection;
  status?: StatusKey;
}

const trendArrow: Record<TrendDirection, string> = {
  up: "↑",
  down: "↓",
  flat: "→",
};

const trendClass: Record<TrendDirection, string> = {
  up:   "text-th-green",
  down: "text-th-primary",
  flat: "text-th-gray-1",
};

export function KPITile({ value, label, trend, trendDirection = "flat", status }: KPITileProps) {
  const valueClass = trend ? trendClass[trendDirection] : "text-th-primary";
  return (
    <div className="rounded-md border border-th-gray-2 bg-white p-4 flex flex-col gap-1">
      <div className={`text-th-h1 font-heading font-semibold ${valueClass}`}>
        {value}
        {trend && (
          <span className="ml-2 text-th-h2 font-body">
            {trendArrow[trendDirection]} {trend}
          </span>
        )}
      </div>
      <div className="text-th-supporting text-th-gray-1 font-body">{label}</div>
    </div>
  );
}
