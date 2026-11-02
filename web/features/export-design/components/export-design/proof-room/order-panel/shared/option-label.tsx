type OptionLabelProps = {
  label: string;
  value?: string;
};

// An option's small-caps name, with the current choice spelled out on the right.
export function OptionLabel({ label, value }: OptionLabelProps) {
  return (
    <p className="flex items-baseline justify-between gap-3 text-sm">
      <span className="label-caps text-muted-foreground">{label}</span>
      {value && <span className="font-medium">{value}</span>}
    </p>
  );
}
