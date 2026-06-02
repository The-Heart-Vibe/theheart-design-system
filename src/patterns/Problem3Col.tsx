import { SlideShell } from "./SlideShell";

export interface Problem3ColProps {
  title: string;
  subtitle?: string;
  columns: { heading: string; body: string }[];
  pageNumber?: number;
  totalPages?: number;
}

export function Problem3Col({ title, subtitle, columns, pageNumber, totalPages }: Problem3ColProps) {
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="Problem">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      {subtitle && <p className="mt-2 text-th-supporting text-th-gray-1">{subtitle}</p>}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {columns.slice(0, 3).map((c, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="text-th-title font-heading font-bold text-th-primary">{c.heading}</div>
            <p className="text-th-supporting text-th-black">{c.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
