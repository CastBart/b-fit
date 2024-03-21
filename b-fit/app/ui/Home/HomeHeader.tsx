"use client";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { HomeNavBarItem } from "@/app/lib/definitions";

const navItems: HomeNavBarItem[] = [
  { id: "0", href: "#home", text: "Home" },
  { id: "1", href: "#caloriecalculator", text: "Calorie Calculator" },
  { id: "2", href: "#singleworkouts", text: "Single Workouts" },
  { id: "3", href: "#workoutplans", text: "Workout Plans" },
  { id: "4", href: "#exercises", text: "Exercies" },
];

export default function HomeHeader() {
  //state to manage visibility of navbar
  const [nav, setNav] = useState(false);
  //toggle function to manage navbar display
  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="bg-black flex justify-between item-center max-w-[1240px] mx-auto text-white">
      {/** Logo */}
      <h1 className="p-2 text-3xl font-bold text-[#5a7be9]">B-Fit</h1>

      {/** Desktop Nav */}
      <ul className="hidden md:flex">
        {navItems.map((item) => {
          return (
            <a key={item.id} href={item.href} className="p-4 hover:bg-[#5a7be9] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
              <li>
                {item.text}
              </li>
            </a>
          );
        })}
      </ul>
      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      {/**Mobile Navigation Menu*/}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/** Mobile Logo */}
        <h1 className="p-2 w-full text-3xl font-bold text-[#5a7be9] m-4">
          B-Fit
        </h1>
        {navItems.map((item) => {
          return (
            <a key={item.id} href={item.href}>
              <li className="p-4 border-b rounded-xl hover:bg-[#5a7be9] duration-300 hover:text-black cursor-pointer border-gray-600">
                {item.text}
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
}
