import horizontalSrc from "./assets/th-horizontal.png";
import verticalSrc   from "./assets/th-vertical.png";
import iconSrc       from "./assets/th-icon.png";
import { LOGO_RATIOS } from "./aspect-ratios";

/**
 * The Heart logo.
 *
 *   <Logo variant="horizontal" height={32} />
 *   <Logo variant="vertical"   width={180}  theme="white" />
 *   <Logo variant="icon"       height={64} />
 *
 * - `variant` picks the asset (horizontal banner, vertical lock-up, or icon).
 * - `theme` re-tints the logo for dark backgrounds:
 *     - "color" (default) — uses the source asset as-is (brand red)
 *     - "white" — inverts brightness for use on dark surfaces
 *     - "black" — converts to monochrome black (use on top of light photos)
 * - Provide ONE dimension (`width` OR `height`) — the other is computed from
 *   the real PNG aspect ratio so the logo is never stretched.
 */
export type LogoVariant = "horizontal" | "vertical" | "icon";
export type LogoTheme   = "color" | "white" | "black";

export interface LogoProps {
  variant?: LogoVariant;
  theme?:   LogoTheme;
  width?:   number;
  height?:  number;
  className?: string;
  title?:   string;
}

const SOURCES: Record<LogoVariant, string> = {
  horizontal: horizontalSrc,
  vertical:   verticalSrc,
  icon:       iconSrc,
};

const FILTERS: Record<LogoTheme, string | undefined> = {
  color: undefined,
  // brightness(0) + invert(1) → solid white silhouette that respects transparency
  white: "brightness(0) invert(1)",
  // brightness(0) → solid black silhouette that respects transparency
  black: "brightness(0)",
};

export function Logo({
  variant = "horizontal",
  theme   = "color",
  width,
  height,
  className,
  title = "The Heart",
}: LogoProps) {
  const ratio = LOGO_RATIOS[variant];

  // Derive the missing dimension from the real PNG ratio.
  let finalWidth  = width;
  let finalHeight = height;
  if (width === undefined && height === undefined) {
    finalHeight = 32;
  }
  if (finalWidth === undefined && finalHeight !== undefined) {
    finalWidth = finalHeight * ratio;
  }
  if (finalHeight === undefined && finalWidth !== undefined) {
    finalHeight = finalWidth / ratio;
  }

  return (
    <img
      src={SOURCES[variant]}
      alt={title}
      width={finalWidth}
      height={finalHeight}
      className={className}
      style={{
        filter: FILTERS[theme],
        display: "inline-block",
        objectFit: "contain",
      }}
    />
  );
}
