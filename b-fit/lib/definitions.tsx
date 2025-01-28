//Home Nav Bar Item Definition
export type HomeNavBarItem = {
  id: string;
  href: string;
  text: string;
};
//Home NavBar Items
export const navItems: HomeNavBarItem[] = [
  { id: "0", href: "#home", text: "Home" },
  { id: "1", href: "#caloriecalculator", text: "Calorie Calculator" },
  { id: "2", href: "#exercises", text: "Exercises" },
  { id: "3", href: "#singleworkouts", text: "Single Workouts" },
  { id: "4", href: "#workoutplans", text: "Workout Plans" },
];

//Start User Type
export interface User {
  id: string;
  name: string | null; // Allow null
  email: string;
  emailVerified: Date | null;
  password: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}



export type Pages = {
  [key: string]: Page;
};
// Start Page Definitions
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
export type HeroIcon = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
export type Page = {
  name: string;
  link: string;
  icon: HeroIcon;
  description?: string;
};
//Webiste Links
export const websiteLinks: Pages = {
  home: { name: "Home", link: "/", icon: HomeIcon},
  welcome: {name: "Welcome", link: "/welcome", icon: HomeIcon},
  login: { name: "Login", link: "/login", icon: HomeIcon},
  register: {name: "Register", link: "/register", icon: HomeIcon},
  services: { name: "Services", link: "/services", icon: HomeIcon},
};


