import { Logo } from "../logos/Logo";
import { PhotoContext, selectPhoto } from "../assets/office-catalog";

export interface SectionDividerProps {
  /** Small eyebrow line, e.g. "INVESTMENT MEMO · MAY 2026 · CONFIDENTIAL" */
  eyebrow?: string;
  /** First segment of headline (plain white) */
  title: string;
  /** Words rendered in brand red (#E61B25), inserted after title */
  titleAccent?: string;
  /** Continuation of headline after the accent */
  titleSuffix?: string;
  /** Body copy below the headline */
  subtitle?: string;

  /** Explicit image src (URL or imported asset path). Takes precedence over context. */
  photo?: string;
  /** Context key for automatic photo selection from the office catalog */
  context?: PhotoContext;
  /** 0-based index into matching photos — increment for consecutive dividers in the same context */
  photoIndex?: number;
  /** Prefer hero-prominence photos when auto-selecting (default: true) */
  preferHero?: boolean;
  /** Base URL / path prepended to catalog filenames, e.g. "/assets/office/" */
  baseUrl?: string;

  /** Bottom-left footer text */
  footerLeft?: string;
  /** Bottom-right footer text */
  footerRight?: string;
  /** Dark overlay opacity 0–1 (default: 0.6) */
  overlayOpacity?: number;
}

/** Transition slide between major presentation sections.
 *  Full-bleed office photo with dark scrim, white headline, optional red accent word, footer.
 *  Pass context for auto-selection or photo for an explicit src.
 */
export function SectionDivider({
  eyebrow,
  title,
  titleAccent,
  titleSuffix,
  subtitle,
  photo,
  context,
  photoIndex = 0,
  preferHero = true,
  baseUrl = "",
  footerLeft = "The Heart Group. All rights reserved.",
  footerRight = "For discussion purposes only",
  overlayOpacity = 0.6,
}: SectionDividerProps) {
  const resolvedSrc: string | undefined = photo
    ? photo
    : context
    ? `${baseUrl}${selectPhoto(context, photoIndex, preferHero).filename}`
    : undefined;

  const hi = Math.min(overlayOpacity + 0.2, 0.85);
  const lo = Math.max(overlayOpacity - 0.15, 0.1);

  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden bg-th-black font-body"
      style={
        resolvedSrc
          ? {
              backgroundImage: `url("${resolvedSrc}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Gradient scrim — heavier bottom-left where text lives */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg,
            rgba(0,0,0,${hi}) 0%,
            rgba(0,0,0,${overlayOpacity}) 55%,
            rgba(0,0,0,${lo}) 100%)`,
        }}
      />

      {/* Logo — top-left */}
      <div className="absolute left-12 top-8">
        <Logo variant="horizontal" theme="white" height={28} />
      </div>

      {/* Main text block — lower-left */}
      <div className="absolute left-12 right-12 bottom-14" style={{ maxWidth: "58%" }}>
        {eyebrow && (
          <p
            className="mb-5 font-heading font-semibold uppercase text-white/65"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            {eyebrow}
          </p>
        )}

        <h1
          className="font-heading font-bold text-white"
          style={{ fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1.08 }}
        >
          {title}
          {titleAccent && (
            <> <span className="text-th-primary">{titleAccent}</span></>
          )}
          {titleSuffix && <> {titleSuffix}</>}
        </h1>

        {subtitle && (
          <p
            className="mt-5 font-light text-white/80"
            style={{ fontSize: "14px", lineHeight: 1.55 }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Footer */}
      <div
        className="absolute inset-x-12 bottom-4 flex items-center justify-between font-body text-white/50"
        style={{ fontSize: "10px" }}
      >
        <span>{footerLeft}</span>
        <span>{footerRight}</span>
      </div>
    </div>
  );
}
