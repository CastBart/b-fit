import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { handleLogOut } from "@/actions/logout";

interface SidebarHeaderProps {
  imgSrc?: string;
  name?: string;
  email?: string;
}

export default function Sidebar_Header({
  imgSrc,
  name,
  email,
}: SidebarHeaderProps) {
  function SignOut() {
    handleLogOut();
  }
  return (
    <SidebarHeader
    // className="flex flex-row justify-center items-center space-x-2"
    >
      <SidebarMenu>
        <SidebarMenuItem className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex flex-row justify-center items-center space-x-1 h-full min-h-[56px]">
                <Avatar>
                  <AvatarImage src={imgSrc} />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col ">
                  <h1>{name}</h1>
                  <span className="text-muted-foreground text-sm">{email}</span>
                </div>
                <ChevronDownIcon className="w-3 h-3" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width]"
              align="start"
            >
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={SignOut}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
