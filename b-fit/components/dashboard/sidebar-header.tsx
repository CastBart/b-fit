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
              <SidebarMenuButton className="flex flex-row items-center space-x-2 h-full min-h-[56px]">
                <Avatar className="flex-shrink-0">
                  {user ? <AvatarImage src={user.image || ""} /> : null}
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  {user ? (
                    <h1 className="truncate max-w-[150px] font-medium">
                      {user.name}
                    </h1>
                  ) : (
                    <Skeleton className="h-4 w-20" />
                  )}
                  {user ? (
                    <span className="truncate max-w-[150px] text-muted-foreground text-sm">
                      {user.email}
                    </span>
                  ) : (
                    <Skeleton className="h-4 w-[165px] mt-1" />
                  )}
                </div>
                <ChevronDownIcon className="w-3 h-3 ml-auto" />
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
