import { AlignJustify, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AlignJustify />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} align="start">
        <DropdownMenuLabel className="text-orange-500">설정</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-orange-200" />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>자유게시판</DropdownMenuItem>
        <DropdownMenuSeparator className="bg-orange-200" />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
