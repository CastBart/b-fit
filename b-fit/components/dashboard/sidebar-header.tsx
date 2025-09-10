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
import { useCurrentUser } from "@/hooks/use-current-user";
import { Skeleton } from "../ui/skeleton";

interface SidebarHeaderProps {}

export default function Sidebar_Header() {
  const user = useCurrentUser();

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
                  {user ? <AvatarImage src={user.image || ""} /> : null}
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col ">
                  {user ? (
                    <h1>{user.name}</h1>
                  ) : (
                    <Skeleton className="h-4 w-20" />
                  )}
                  {user ? (
                    <span className="text-muted-foreground text-sm">
                      {user.email}
                    </span>
                  ) : (
                    <Skeleton className="h-4 w-[165px] mt-1" />
                  )}
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
