"use client";

import { Pages } from "@/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CalculatorIcon,
  PencilSquareIcon,
  ClipboardDocumentListIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import { useCurrentUser } from "@/hooks/use-current-user";

const links: Pages = {
  calorieCounter: {
    name: "Calorie Calculator",
    link: "/dashboard/caloriecalculator",
    icon: CalculatorIcon,
    description: "Check your daily calories",
  },
  exercises: {
    name: "Exercises",
    link: "/dashboard/exercises",
    icon: BoltIcon,
    description: "View or create new exercises",
  },
  workouts: {
    name: "Workouts",
    link: "/dashboard/workouts",
    icon: ClipboardDocumentListIcon,
    description: "View or create new workouts",
  },
  plans: {
    name: "Plans",
    link: "/dashboard/plans",
    icon: PencilSquareIcon,
    description: "View and create new workout plans",
  },
};

export default function Page() {
  const user = useCurrentUser();

  return (
    <section className="p-4">
      <ul
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {Object.entries(links).map(([key, link]) => {
          const Icon = link.icon;
          return (
            <li key={key}>
              <Button asChild className="w-full h-full p-4">
                <Link href={link.link}>
                  <div className="w-full flex flex-col items-center space-y-4 text-center">
                    <Icon className="w-12 h-12" />
                    <h1 className="text-xl font-semibold">{link.name}</h1>
                    <p className="">{link.description}</p>
                  </div>
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
