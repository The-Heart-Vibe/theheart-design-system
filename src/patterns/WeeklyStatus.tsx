import { SlideShell } from "./SlideShell";
import { StatusPill } from "../components/StatusPill";
import type { StatusKey } from "../components/types";

export interface Stream {
  name:    string;
  status:  StatusKey;
  summary: string;
}

export interface WeeklyStatusProps {
  title: string;
  streams: Stream[];
  pageNumber?: number;
  totalPages?: number;
}

export function WeeklyStatus({ title, streams, pageNumber, totalPages }: WeeklyStatusProps) {
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="Workstream RAG">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      <div className="mt-6 divide-y divide-th-gray-2">
        {streams.map((s, i) => (
          <div key={i} className="py-4 grid items-center gap-4" style={{ gridTemplateColumns: "200px 120px 1fr" }}>
            <div className="text-th-h2 font-heading font-semibold text-th-black">{s.name}</div>
            <StatusPill status={s.status} />
            <div className="text-th-supporting text-th-black">{s.summary}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
