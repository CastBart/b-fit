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
export type HeroIcon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
>;
export type Page = {
  name: string;
  link: string;
  icon: HeroIcon;
  description?: string;
};
//Webiste Links
export const websiteLinks: Pages = {
  home: { name: "Home", link: "/", icon: HomeIcon },
  welcome: { name: "Welcome", link: "/welcome", icon: HomeIcon },
  login: { name: "Login", link: "/auth/login", icon: HomeIcon },
  register: { name: "Register", link: "/register", icon: HomeIcon },
  services: { name: "Services", link: "/services", icon: HomeIcon },
};

// Exercise Types
// Enum for Exercise Equipment
enum ExerciseEquipment {
  Cable = "Cable",
  Barbell = "Barbell",
  Dumbbells = "Dumbbells",
  Machine = "Machine",
  Bodyweight = "Bodyweight",
  SmithMachine = "Smith Machine",
  TrapBar = "Trap Bar",
  EzBar = "EZ Bar",
  Kettlebells = "Kettlebells",
  ResistanceBands = "Resistance Bands",
  TRX = "TRX",
}

// Enum for Muscle Groups
enum MuscleGroup {
  Traps = "Traps",
  Front_Delts = "Front Delts",
  Side_Delts = "Side Delts",
  Rear_Delts = "Rear Delts",
  Chest = "Chest",
  Upper_Back = "Upper Back",
  Lats = "Lats",
  Core = "Core",
  Biceps = "Biceps",
  Triceps = "Triceps",
  Forearms = "Forearms",
  Lower_Back = "Lower Back",
  Abductors = "Abductors",
  Adductors = "Adductors",
  Glutes = "Glutes",
  Quads = "Quads",
  Hamstrings = "Hamstrings",
  Calves = "Calves",
}

// Enum for Exercise Type
enum ExerciseType {
  Small = "Small exercise",
  Medium = "Medium exercise",
  Large = "Large exercise",
}
enum ExerciseOwnership {
  BFit = "BFit",
  Custom = "Custom",
}


// Exercise Interface
export interface Exercise {
  id: string;
  owner: ExerciseOwnership;
  name: string;
  equipment: ExerciseEquipment;
  primaryMuscle: MuscleGroup; 
  auxiliaryMuscles: MuscleGroup[]; 
  type: ExerciseType; 
  notes?: string;
  instructions?: string;
}

// Export enums for use in other files
export { ExerciseEquipment, MuscleGroup, ExerciseType, ExerciseOwnership };

// fucntion to convert frontend enums values into backend
export function getEnumKeyByValue<T extends Record<string, string>>(
  enumObj: T,
  value: string
): keyof T | undefined {
  return Object.keys(enumObj).find(
    (key) => enumObj[key as keyof T] === value
  ) as keyof T | undefined;
}

// fucntion to convert multi frontend enums values into backend
export function getEnumKeysByValues<T extends Record<string, string>>(
  enumObj: T,
  values: string[]
): (keyof T)[] {
  return values
    .map(
      (value) =>
        Object.keys(enumObj).find(
          (key) => enumObj[key as keyof T] === value
        ) as keyof T | undefined
    )
    .filter((key): key is keyof T => key !== undefined); // Filters out undefined values
}

export function getEnumValueByKey<T extends Record<string, string>>(
  enumObj: T,
  key: string
): T[keyof T] {
  return (enumObj[key as keyof T] || key) as T[keyof T]; // Ensures the return type is from the enum
}

export function getEnumValuesByKeys<T extends Record<string, string>>(
  enumObj: T,
  keys: string[]
): T[keyof T][] {
  return keys.map((key) => (enumObj[key as keyof T] || key) as T[keyof T]);
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  exercises: Exercise[]; // Store full exercise details
}

export interface WorkoutExercise{
  exerciseID: string;
  nexId?: string;
  prevId?: string;
}


