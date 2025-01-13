interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1>B-Fit</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
