"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@/components/ui/input";

interface ExerciseSearchProps {
  setSearchTerm: (term: string) => void;
}

export default function ExerciseSearch({ setSearchTerm }: ExerciseSearchProps) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 px-10 rounded border"
      />
    </div>
  );
}
