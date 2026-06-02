export interface ComparisonRowProps {
  label: string;
  values: (boolean | string)[];
}

export function ComparisonRow({ label, values }: ComparisonRowProps) {
  return (
    <div
      className="grid items-center border-b border-th-gray-2 py-3"
      style={{ gridTemplateColumns: `200px repeat(${values.length}, 1fr)` }}
    >
      <div className="text-th-supporting font-heading font-semibold text-th-black">{label}</div>
      {values.map((v, i) => (
        <div key={i} className="text-center text-th-supporting font-body">
          {typeof v === "boolean" ? (
            <span className={v ? "text-th-green" : "text-th-primary"} style={{ fontSize: 22 }}>
              {v ? "✔" : "✘"}
            </span>
          ) : (
            <span className="text-th-black">{v}</span>
          )}
        </div>
      ))}
    </div>
  );
}
