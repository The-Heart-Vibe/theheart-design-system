import { SlideShell } from "./SlideShell";

export interface Segment {
  name: string;
  pain: string;
  gain: string;
}

export interface ValuePropProps {
  title: string;
  segments: Segment[];
  pageNumber?: number;
  totalPages?: number;
}

export function ValueProp({ title, segments, pageNumber, totalPages }: ValuePropProps) {
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="Value proposition">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      <div className="mt-6 grid gap-4" style={{ gridTemplateColumns: `repeat(${segments.length}, 1fr)` }}>
        {segments.map((s, i) => (
          <div key={i} className="rounded-md border border-th-gray-2 bg-white overflow-hidden flex flex-col">
            <div className="bg-th-primary text-white text-center py-3 text-th-h2 font-heading font-semibold">
              {s.name}
            </div>
            <div className="p-5 flex flex-col gap-4 flex-1">
              <div>
                <div className="text-th-caption font-heading font-semibold text-th-gray-1">PAIN</div>
                <div className="text-th-supporting text-th-black">{s.pain}</div>
              </div>
              <div>
                <div className="text-th-caption font-heading font-semibold text-th-green">GAIN</div>
                <div className="text-th-supporting text-th-black">{s.gain}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
