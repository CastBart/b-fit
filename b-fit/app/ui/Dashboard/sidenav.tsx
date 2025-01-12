"use client";
import { Pages } from "@/app/lib/definitions";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  CalculatorIcon,
  PencilSquareIcon,
  ClipboardDocumentListIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import { handleLogOut } from "@/app/lib/actions/logout";

const links: Pages = {
  calorieCounter: {
    name: "Calorie Calculator",
    link: "/dashboard/caloriecalculator",
    icon: CalculatorIcon,
  },
  exercises: {
    name: "All Exercises",
    link: "/dashboard/exercises",
    icon: BoltIcon,
  },
  workouts: {
    name: "All Workouts",
    link: "/dashboard/workouts",
    icon: ClipboardDocumentListIcon,
  },
  plans: {
    name: "All Plans",
    link: "/dashboard/plans",
    icon: PencilSquareIcon,
  },
};

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleNav}
        className={`fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-md md:hidden ${
          isOpen ? "bg-gray-600" : ""
        }`}
      >
        {isOpen ? (
          <XMarkIcon className="w-10 h-10" />
        ) : (
          <Bars3Icon className="w-10 h-10" />
        )}
      </button>
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-4 flex flex-col transition-transform duration-300 ease-in-out z-40 md:relative md:h-full md:translate-x-0 md:w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex-grow flex flex-col">
          {Object.entries(links).map(([key, link]) => {
            const Icon = link.icon;
            return (
              <Link href={link.link} className={`block`} key={key}>
                <li
                  className={`flex h-[48px] items-center justify-start gap-4 m-2 rounded-md p-3 ${
                    pathname === link.link
                      ? "bg-gray-700"
                      : "hover:bg-[#5a7be9]"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {link.name}
                </li>
              </Link>
            );
          })}
        </ul>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex h-[48px] w-full items-center justify-start gap-4 m-2 rounded-md p-3 hover:bg-[#5a7be9]"
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
          <div className="block">Sign Out</div>
        </button>
      </nav>
    </div>
  );
}
