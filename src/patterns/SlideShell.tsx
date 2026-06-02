import { ReactNode } from "react";

import { BrandFooter } from "../components/BrandFooter";
import { DecorativeCorner } from "../components/DecorativeCorner";

export interface SlideShellProps {
  children: ReactNode;
  pageNumber?:    number;
  totalPages?:    number;
  sectionLabel?:  string;
  copyright?:     string;
  decorations?:   boolean;     // toggle the abstract corner artwork
}

/** Standard content-slide chrome:
 *  - thin vertical red bar on the left
 *  - section label eyebrow top-left
 *  - decorative grey corner top-right
 *  - red icon corner badge
 *  - bottom red accent bar + brand footer with copyright + page number
 *
 *  Mirrors slide 11 of blank.pptx (the canonical guideline slide).
 */
export function SlideShell({
  children,
  pageNumber,
  totalPages,
  sectionLabel,
  copyright,
  decorations = true,
}: SlideShellProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-white p-12 font-body text-th-black">
      {/* Left vertical red bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-th-primary" />

      {sectionLabel && (
        <div className="absolute left-12 top-6 text-th-caption font-heading font-semibold uppercase tracking-wide text-th-primary">
          {sectionLabel}
        </div>
      )}

      {decorations && <DecorativeCorner position="top-right" size={260} opacity={0.35} />}

      <div className="relative h-full pt-6">{children}</div>

      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-th-primary" />
      <BrandFooter copyright={copyright} pageNumber={pageNumber} totalPages={totalPages} />
    </div>
  );
}
