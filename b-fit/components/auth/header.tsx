import Link from "next/link";

interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link href="/">
        <h1 className="text-2xl">B-Fit</h1>
      </Link>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
