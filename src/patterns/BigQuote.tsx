export interface BigQuoteProps {
  quote: string;
  attribution?: string;
}

export function BigQuote({ quote, attribution }: BigQuoteProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-th-primary p-16 text-white font-body">
      <div className="text-[160px] leading-none font-heading font-bold opacity-30 -mb-8">"</div>
      <blockquote className="text-th-title font-heading font-semibold max-w-[80%]">
        {quote}
      </blockquote>
      {attribution && (
        <div className="mt-10 text-th-h2 font-light opacity-80">— {attribution}</div>
      )}
    </div>
  );
}
