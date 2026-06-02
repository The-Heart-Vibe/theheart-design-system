export interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="text-th-caption font-heading font-semibold uppercase tracking-wide text-th-primary">
      {children}
    </span>
  );
}
