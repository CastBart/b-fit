'use client'
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { HomeNavBarItem } from "@/app/lib/definitions";

const navItems: HomeNavBarItem[] = [
  { id: "0", href: "#home", text: "Home" },
  { id: "1", href: "#caloriecalculator", text: "Calorie Calculator" },
  { id: "2", href: "#exercises", text: "Exercises" },
  { id: "3", href: "#singleworkouts", text: "Single Workouts" },
  { id: "4", href: "#workoutplans", text: "Workout Plans" },
];

export default function HomeHeader() {
  const [nav, setNav] = useState(false);

  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="bg-[#0F172A]/80 flex justify-between item-center max-w-[1240px] max-h-[70px] p-2 mx-auto text-white sticky top-0">
      {/* Logo */}
      <h1 className="p-2 text-3xl font-bold text-[#5a7be9]">B-Fit</h1>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center">
        {navItems.map((item) => (
          <li key={item.id} className="m-2">
            <a href={item.href} className="p-4 hover:bg-[#5a7be9] rounded-xl cursor-pointer duration-300 hover:text-black">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
      <a className="p-4 hover:bg-[#5a7be9] rounded-xl cursor-pointer duration-300 hover:text-black">Login/Register</a>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul className={`fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 ${nav ? "" : "left-[-100%]"}`}>
        {/* Mobile Logo */}
        <li className="m-4">
          <h1 className="p-2 w-full text-3xl font-bold text-[#5a7be9]">B-Fit</h1>
        </li>
        {navItems.map((item) => (
          <li key={item.id} className="border-b border-gray-600">
            <a href={item.href} className="p-4 rounded-xl hover:bg-[#5a7be9] duration-300 hover:text-black cursor-pointer">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
