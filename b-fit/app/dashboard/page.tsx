import { Pages } from "@/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CalculatorIcon,
  PencilSquareIcon,
  ClipboardDocumentListIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import { CalendarDays } from "lucide-react";

const links: Pages = {
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
  sessions: {
    name: "Sessions",
    link: "/dashboard/sessions",
    icon: CalendarDays,
    description: "View your past session in a calendar view",
  },
  calorieCounter: {
    name: "Calorie Calculator",
    link: "/dashboard/caloriecalculator",
    icon: CalculatorIcon,
    description: "Check your daily calories",
  },
};

export default function Page() {
  return (
    <section className="p-4">
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch">
        {Object.entries(links).map(([key, link]) => {
          const Icon = link.icon;
          return (
            <li key={key} className="h-full">
              <Button asChild className="w-full h-full p-4">
                <Link
                  href={link.link}
                  className="flex flex-col items-center justify-center space-y-4 text-center h-full"
                >
                  <Icon className="w-12 h-12 shrink-0" />
                  <h1 className="text-xl font-semibold">{link.name}</h1>
                  <p className="break-words whitespace-normal">
                    {link.description}
                  </p>
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
