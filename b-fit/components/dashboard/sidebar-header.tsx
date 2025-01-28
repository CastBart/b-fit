import { UserIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarHeader } from "../ui/sidebar";

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
  return (
    <SidebarHeader className=" flex flex-row justify-center items-center space-x-2">
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
    </SidebarHeader>
  );
}
