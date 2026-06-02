import { SlideShell } from "./SlideShell";
import { ComparisonRow } from "../components/ComparisonRow";

export interface CompetitiveMatrixProps {
  title: string;
  columns: string[];                                  // first column = our product
  rows: { label: string; values: (boolean | string)[] }[];
  pageNumber?: number;
  totalPages?: number;
}

export function CompetitiveMatrix({ title, columns, rows, pageNumber, totalPages }: CompetitiveMatrixProps) {
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="Competition">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      <div className="mt-6">
        <div
          className="grid items-center pb-2"
          style={{ gridTemplateColumns: `200px repeat(${columns.length}, 1fr)` }}
        >
          <div />
          {columns.map((c, i) => (
            <div
              key={i}
              className={`text-center text-th-supporting font-heading font-semibold uppercase tracking-wide py-2 ${
                i === 0 ? "bg-th-primary text-white rounded-sm" : "text-th-black"
              }`}
            >
              {c}
            </div>
          ))}
        </div>
        {rows.map((row, i) => (
          <ComparisonRow key={i} label={row.label} values={row.values} />
        ))}
      </div>
    </SlideShell>
  );
}
