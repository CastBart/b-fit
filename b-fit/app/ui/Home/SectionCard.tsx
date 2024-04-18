import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
}

export default function SectionCard({ children }: SectionCardProps) {
  return (
    <section className="py-4 my-10 rounded-3xl shadow-xl bg-gray-500">{children}</section>
  );
}
