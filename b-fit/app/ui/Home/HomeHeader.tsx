'use client'
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { HomeNavBarItem, websiteLinks } from "@/lib/definitions";
import { navItems } from "@/lib/definitions";



export default function HomeHeader() {
  const [nav, setNav] = useState(false);

  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="flex justify-between item-center max-w-[1240px] max-h-[70px] p-2 mx-auto text-white sticky top-0">
      {/* Logo */}
      <h1 className="p-2 text-3xl font-bold text-[#5a7be9]">B-Fit</h1>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex items-center">
        {navItems.map((item) => (
          <li key={item.id} className="m-2">
            <a href={item.href} className="p-4 hover:bg-[#5a7be9] rounded-xl cursor-pointer duration-300 hover:text-black">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
      <a className="hidden lg:block p-4 hover:bg-[#5a7be9] rounded-xl cursor-pointer duration-300 hover:text-black" href={websiteLinks.login.link}>Login/Sign Up</a>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block self-center lg:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul className={`fixed lg:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 ${nav ? "" : "left-[-100%]"}`}>
        {/* Mobile Logo */}
        <li className="m-4">
          <h1 className="p-2 w-full text-3xl font-bold text-[#5a7be9]">B-Fit</h1>
        </li>
        {navItems.map((item) => (
          <li key={item.id} className="border-gray-600 mx-2 my-4">
            <a href={item.href} className="p-2 rounded-xl hover:bg-[#5a7be9] duration-300 hover:text-black cursor-pointer">
              {item.text}
            </a>
          </li>
        ))}
        <li key='login_button' className="border-gray-600 mx-2 my-4">
            <a href={websiteLinks.login.link} className="p-2 rounded-xl hover:bg-[#5a7be9] duration-300 hover:text-black cursor-pointer">
              Login/Sign Up
            </a>
          </li>
      </ul>
    </div>
  );
}
