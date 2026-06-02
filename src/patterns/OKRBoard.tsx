import { SlideShell } from "./SlideShell";
import { StatusPill } from "../components/StatusPill";
import type { StatusKey } from "../components/types";

export interface KeyResult {
  label:   string;
  current: string;
  target:  string;
  status:  StatusKey;
}

export interface OKRBoardProps {
  title:     string;
  objective: string;
  keyResults: KeyResult[];
  pageNumber?: number;
  totalPages?: number;
}

export function OKRBoard({ title, objective, keyResults, pageNumber, totalPages }: OKRBoardProps) {
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="OKR">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      <div className="mt-4">
        <div className="text-th-caption font-heading font-semibold uppercase text-th-primary">Objective</div>
        <p className="mt-1 text-th-h2 font-heading font-semibold text-th-black">{objective}</p>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-6">
        {keyResults.slice(0, 3).map((kr, i) => (
          <div key={i} className="rounded-md border border-th-gray-2 bg-white p-5 flex flex-col gap-3">
            <div className="text-th-caption font-heading font-semibold text-th-gray-1">KR {i + 1}</div>
            <div className="text-th-supporting font-heading font-semibold text-th-black">{kr.label}</div>
            <div className="text-th-h1 font-heading font-bold text-th-primary">
              {kr.current} <span className="text-th-gray-1 font-light">/</span> {kr.target}
            </div>
            <div className="text-th-caption text-th-gray-1">current / target</div>
            <StatusPill status={kr.status} />
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
