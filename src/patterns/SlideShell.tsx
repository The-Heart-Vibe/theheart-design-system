import { ReactNode } from "react";

import { BrandFooter } from "../components/BrandFooter";
import { DecorativeCorner, DecorativeCornerPosition, DecorativeCornerTheme } from "../components/DecorativeCorner";

export interface SlideShellProps {
  children: ReactNode;
  pageNumber?:         number;
  totalPages?:         number;
  sectionLabel?:       string;
  copyright?:          string;
  decorations?:        boolean;
  decorationPosition?: DecorativeCornerPosition;
  decorationOpacity?:  number;
  decorationSize?:     number;
  /**
   * "light-bg" (default) — white slides. Uses mix-blend-mode:multiply so
   * the near-white PNG artwork stays visible against white backgrounds.
   * "dark-bg" — photo overlays, dark slides. No blend mode.
   */
  decorationTheme?:    DecorativeCornerTheme;
}

export function SlideShell({
  children,
  pageNumber,
  totalPages,
  sectionLabel,
  copyright,
  decorations        = true,
  decorationPosition = "top-right",
  decorationOpacity,
  decorationSize     = 260,
  decorationTheme    = "light-bg",
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

      {decorations && (
        <DecorativeCorner
          position={decorationPosition}
          size={decorationSize}
          opacity={decorationOpacity}
          theme={decorationTheme}
        />
      )}

      <div className="relative h-full pt-6">{children}</div>

      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-th-primary" />
      <BrandFooter copyright={copyright} pageNumber={pageNumber} totalPages={totalPages} />
    </div>
  );
}
