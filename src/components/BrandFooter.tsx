/* Replicates the footer that appears on every blank.pptx content slide:
 *
 *      The Heart. All rights reserved.            <page> / <total>
 *
 * Sits flush above the red accent bar drawn by SlideShell.
 */
export interface BrandFooterProps {
  copyright?:  string;
  pageNumber?: number;
  totalPages?: number;
}

export function BrandFooter({
  copyright = "The Heart. All rights reserved.",
  pageNumber,
  totalPages,
}: BrandFooterProps) {
  return (
    <div className="absolute inset-x-12 bottom-3 flex items-center justify-between text-th-caption text-th-gray-1">
      <span>{copyright}</span>
      {pageNumber !== undefined && (
        <span>
          {pageNumber}
          {totalPages ? ` / ${totalPages}` : ""}
        </span>
      )}
    </div>
  );
}
