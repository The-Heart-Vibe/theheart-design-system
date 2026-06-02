export interface CoverProps {
  title: string;
  subtitle?: string;
}

export function Cover({ title, subtitle }: CoverProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-white p-16 font-body">
      <h1 className="text-th-title font-heading font-bold text-th-black max-w-[70%]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-6 text-th-h2 font-light text-th-gray-1 max-w-[70%]">{subtitle}</p>
      )}
      {/* signature red triangle bottom-right */}
      <div className="absolute bottom-0 right-0 h-1/3 w-1/3 bg-th-primary"
           style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
    </div>
  );
}
