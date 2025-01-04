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
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


export type Pages = {
  [key: string]: Page;
};
// Start Page Definitions
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
import { HomeSolid } from "@graywolfai/react-heroicons";
export type HeroIcon = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
export type Page = {
  name: string;
  link: string;
  icon: HeroIcon;
};
//Webiste Links
export const websiteLinks: Pages = {
  home: { name: "Home", link: "/", icon: HomeSolid},
  welcome: {name: "Welcome", link: "/welcome", icon: HomeSolid},
  login: { name: "Login", link: "/login", icon: HomeSolid},
  register: {name: "Register", link: "/register", icon: HomeSolid},
  services: { name: "Services", link: "/services", icon: HomeSolid},
};


