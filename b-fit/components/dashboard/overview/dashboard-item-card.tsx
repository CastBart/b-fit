import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface MenuItemCardProps {
  children: React.ReactNode;
  headerTitle: string;
  headerDescription?: string;
  href: string;
}

export default function MenuItemCard({
  children,
  headerTitle,
  headerDescription,
  href,
}: MenuItemCardProps) {
  return (
    <Card className="w-[250px]">
      <CardHeader className="flex flex-col space-y-2 justify-center items-center">
        <CardTitle>{headerTitle}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
    </Card>
  );
}
