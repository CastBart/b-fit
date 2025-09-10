"use client";
import { Pages } from "@/lib/definitions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import {
  HomeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import { Button } from "@/components/ui/button";

const links: Pages = {
  dashboardHome: {
    name: "Dashboard",
    link: "/dashboard",
    icon: HomeIcon,
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
      {/* Sidebar for Large Screens */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-4  flex-col z-40 md:relative md:h-full md:w-64 hidden md:flex`}
      >
        <ul className="flex-grow flex flex-col">
          {Object.entries(links).map(([key, link]) => {
            const Icon = link.icon;
            return (
              <Link href={link.link} className={`block`} key={key}>
                <Button
                  // variant="customlink"
                  className={`flex h-[48px] w-full items-center justify-start gap-4 my-2 rounded-md p-3 ${
                    pathname === link.link
                      ? "bg-gray-700"
                      : "hover:bg-[#5a7be9]"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </ul>
        <Link href="/dashboard/settings" className="">
          <Button
            variant="customlink"
            className={`flex h-[48px] w-full items-center justify-start gap-4 my-2 rounded-md p-3 ${
              pathname === "/dashboard/settings"
                ? "bg-gray-700"
                : "hover:bg-[#5a7be9]"
            }`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            <span>Settings</span>
          </Button>
        </Link>
      </nav>

      {/* Bottom Navbar for Small Screens */}
      <nav
        className={`fixed bottom-0 left-0 w-full h-[100px] bg-gray-800 text-white flex items-center justify-around p-2 md:hidden`}
      >
        {Object.entries(links).map(([key, link]) => {
          const Icon = link.icon;
          return (
            <Link href={link.link} key={key} className="flex flex-col items-center">
              <Button
                variant="customlink"
                className={`flex flex-col h-full items-center justify-center gap-1 text-sm ${
                  pathname === link.link
                    ? "text-blue-500"
                    : "hover:text-blue-400"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                {link.name}
              </Button>
            </Link>
          );
        })}

        <Link href="/dashboard/settings" className="flex flex-col items-center">
          <Button
            variant="customlink"
            className={`flex flex-col items-center justify-center gap-1 text-sm ${
              pathname === "/dashboard/settings"
                ? "text-blue-500"
                : "hover:text-[#5a7be9]"
            }`}
          >
            <Cog6ToothIcon className="w-6 h-6" />
            <span>Settings</span>
          </Button>
        </Link>
      </nav>
    </div>
  );
}
