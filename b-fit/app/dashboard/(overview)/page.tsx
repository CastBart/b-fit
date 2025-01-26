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
import MenuItemCard from "@/components/dashboard/overview/dashboard-item-card";

const links: Pages = {
  calorieCounter: {
    name: "Calorie Calculator",
    link: "/dashboard/caloriecalculator",
    icon: CalculatorIcon,
  },
  exercises: {
    name: "Exercises",
    link: "/dashboard/exercises",
    icon: BoltIcon,
  },
  workouts: {
    name: "Workouts",
    link: "/dashboard/workouts",
    icon: ClipboardDocumentListIcon,
  },
  plans: {
    name: "Plans",
    link: "/dashboard/plans",
    icon: PencilSquareIcon,
  },
};

export default function Page() {
  // console.log("Session user: ", session?.user);
  const user = useCurrentUser();
  return (
    <section>
      <ul className="flex-grow flex flex-wrap gap-10">
        {Object.entries(links).map(([key, link]) => {
          const Icon = link.icon;
          return (
            <li key={key} className="">
              {/* <Link href={link.link}>
                <Button
                  // variant=""
                  // className="flex flex-col w-[200px] bg-gray-800 h-full text-white hover:text-[#5a7be9]"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {link.name}
                </Button>
              </Link> */}
              <Link href={link.link}>
                <MenuItemCard headerTitle={link.name} href={link.link}>
                  <div className="w-full flex justify-center items-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </MenuItemCard>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
