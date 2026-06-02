import { SlideShell } from "./SlideShell";

export interface BeforeAfterProps {
  title: string;
  before: { heading: string; bullets: string[] };
  after:  { heading: string; bullets: string[] };
  pageNumber?: number;
  totalPages?: number;
}

export function BeforeAfter({ title, before, after, pageNumber, totalPages }: BeforeAfterProps) {
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="Before / After">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      <div className="mt-8 grid grid-cols-[1fr_60px_1fr] gap-4 items-stretch">
        <div className="rounded-md border border-th-gray-2 p-6 flex flex-col gap-3">
          <div className="text-th-supporting font-heading font-semibold text-th-gray-1">{before.heading}</div>
          <ul className="space-y-2 text-th-supporting">
            {before.bullets.map((b, i) => <li key={i}>• {b}</li>)}
          </ul>
        </div>
        <div className="flex items-center justify-center text-5xl font-bold text-th-primary">→</div>
        <div className="rounded-md border border-th-primary p-6 flex flex-col gap-3">
          <div className="text-th-supporting font-heading font-semibold text-th-primary">{after.heading}</div>
          <ul className="space-y-2 text-th-supporting">
            {after.bullets.map((b, i) => <li key={i}>• {b}</li>)}
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}
