export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "black" | "gray" | "outline";
}

const variantClass: Record<Required<BadgeProps>["variant"], string> = {
  primary: "bg-th-primary text-white",
  black:   "bg-th-black text-white",
  gray:    "bg-th-gray-3 text-th-black",
  outline: "border border-th-gray-2 text-th-black",
};

export function Badge({ children, variant = "primary" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-th-caption font-heading font-semibold uppercase tracking-wide ${variantClass[variant]}`}
    >
      {children}
    </span>
  );
}
