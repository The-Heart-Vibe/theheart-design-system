import { IconName } from "./IconName";
import { ICON_SVGS } from "./icon-svgs";
import manifest from "./icon-manifest.json";

/**
 * Brand-tinted icon. Renders one of the bundled Lucide SVGs and overrides
 * `currentColor` so the stroke matches the requested colour.
 *
 *   <Icon name="building-2" />                        // brand primary
 *   <Icon name="shield"     color="var(--th-color-black)" size={32} />
 *
 * `name` accepts either a canonical icon name (`building-2`) or any alias
 * declared in `icon-manifest.json` (`bank`, `organization`, ...).
 */
export interface IconProps {
  name:   IconName | string;
  size?:  number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

type IconManifest = { aliases: Record<string, string>; categories?: Record<string, string[]> };

export function Icon({
  name,
  size = 24,
  color = "var(--th-color-primary)",
  strokeWidth,
  className,
}: IconProps) {
  const canonical = resolveName(name, manifest as IconManifest);
  const raw = ICON_SVGS[canonical];
  if (!raw) {
    return <span aria-hidden style={{ display: "inline-block", width: size, height: size }} />;
  }
  let svg = raw
    .replace(/stroke="currentColor"/g, `stroke="${color}"`)
    .replace(/stroke:currentColor/g,   `stroke:${color}`)
    .replace(/width="[^"]*"/,   `width="${size}"`)
    .replace(/height="[^"]*"/,  `height="${size}"`);
  if (strokeWidth !== undefined) {
    svg = svg.replace(/stroke-width="[^"]*"/, `stroke-width="${strokeWidth}"`);
  }
  return (
    <span
      aria-hidden
      className={className}
      style={{ display: "inline-flex", width: size, height: size }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function resolveName(name: string, manifest: IconManifest): string {
  if (name in manifest.aliases) return manifest.aliases[name];
  return name;
}
