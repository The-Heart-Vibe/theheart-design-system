import { SlideShell } from "./SlideShell";

export interface SWOTGridProps {
  title: string;
  strengths:     string[];
  weaknesses:    string[];
  opportunities: string[];
  threats:       string[];
  pageNumber?: number;
  totalPages?: number;
}

const QUAD = [
  { key: "strengths",     label: "Strengths",     bg: "bg-th-green",     text: "text-white" },
  { key: "weaknesses",    label: "Weaknesses",    bg: "bg-th-red-light", text: "text-white" },
  { key: "opportunities", label: "Opportunities", bg: "bg-th-blue",      text: "text-white" },
  { key: "threats",       label: "Threats",       bg: "bg-th-primary",   text: "text-white" },
] as const;

export function SWOTGrid(props: SWOTGridProps) {
  const { title, pageNumber, totalPages, ...sections } = props;
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="SWOT">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 h-[80%]">
        {QUAD.map(q => (
          <div key={q.key} className="overflow-hidden rounded-md border border-th-gray-2 flex flex-col">
            <div className={`px-4 py-2 text-th-supporting font-heading font-semibold uppercase tracking-wide ${q.bg} ${q.text}`}>
              {q.label}
            </div>
            <ul className="flex-1 p-4 space-y-2 text-th-supporting text-th-black">
              {((sections as Record<string, string[]>)[q.key] ?? []).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
