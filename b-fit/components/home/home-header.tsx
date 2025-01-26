"use client";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { websiteLinks } from "@/lib/definitions";
import { navItems } from "@/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomeHeader() {
  const [nav, setNav] = useState(false);

  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="flex justify-between item-center max-w-[1240px] max-h-[70px] p-4 mx-auto text-white sticky top-0">
      {/* Logo */}
      <Link href="/" className="text-3xl font-bold text-[#5a7be9] ">
        {/* <h1 className="p-2 text-3xl font-bold text-[#5a7be9]">B-Fit</h1> */}
        B-Fit
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex items-center">
        {navItems.map((item) => (
          <li key={item.id} className="m-2">
            <Button
              variant="ghost"
              size="lg"
              className="hover:bg-[#5a7be9] h-full hover:text-black py-2 px-4"
            >
              <Link href={item.href}>{item.text}</Link>
            </Button>
          </li>
        ))}
      </ul>
      {/* <a
        className="hidden lg:block p-4 hover:bg-[#5a7be9] rounded-xl cursor-pointer duration-300 hover:text-black"
        href={websiteLinks.login.link}
      >
        Login/Sign Up
      </a> */}
      <Button
        variant="ghost"
        size="lg"
        className="hidden lg:block hover:bg-[#5a7be9] h-full hover:text-black p-2"
      >
        <Link href={websiteLinks.login.link}>Sign in/Sign Up</Link>
      </Button>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block self-center lg:hidden">
        {nav ? <XMarkIcon className="w-10 h-10" /> : <Bars3Icon  className="w-10 h-10"/>}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`fixed lg:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 ${nav ? "" : "left-[-100%]"}`}
      >
        {/* Mobile Logo */}
        <li className="m-4">
          <h1 className="p-2 w-full text-3xl font-bold text-[#5a7be9]">
            B-Fit
          </h1>
        </li>
        {navItems.map((item) => (
          <li key={item.id} className="border-gray-600 mx-2 my-4">
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="hover:bg-[#5a7be9] h-full hover:text-black p-4"
            >
              <Link href={item.href}>{item.text}</Link>
            </Button>
          </li>
        ))}
        <li key="login_button" className="border-gray-600 mx-2 my-4">
          <Button
            variant="ghost"
            size="lg"
            className="hover:bg-[#5a7be9] h-full hover:text-black p-4"
          >
            <Link href={websiteLinks.login.link}>Sign in/Sign Up</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
