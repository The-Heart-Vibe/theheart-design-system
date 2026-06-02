import { SlideShell } from "./SlideShell";

export interface JourneyStep {
  label: string;
  body:  string;
}

export interface CustomerJourneyProps {
  title: string;
  steps: JourneyStep[];
  pageNumber?: number;
  totalPages?: number;
}

export function CustomerJourney({ title, steps, pageNumber, totalPages }: CustomerJourneyProps) {
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="Customer journey">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      <div className="relative mt-12 grid gap-6" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        <div className="absolute left-0 right-0 top-6 h-px bg-th-gray-2" />
        {steps.map((s, i) => (
          <div key={i} className="relative flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-th-primary text-white flex items-center justify-center font-heading font-bold text-th-h2">
              {i + 1}
            </div>
            <div className="text-th-h2 font-heading font-semibold text-th-black">{s.label}</div>
            <p className="text-th-supporting text-th-gray-1">{s.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
