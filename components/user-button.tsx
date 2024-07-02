"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GoGear } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaUser, FaLock } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./auth/logout-button";
import { GiExitDoor } from "react-icons/gi";
import { Button } from "./ui/button";
import Link from "next/link";
import LoginButton from "./auth/login-button";

export const UserButton = () => {
  const user = useCurrentUser();

  if (!user) {
    return (
      <LoginButton mode="redirect" asChild>
        <Button>Sign in</Button>
      </LoginButton>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-primary">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          {user.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <FaLock className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <RxAvatar className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <GoGear className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <LogoutButton>
          <DropdownMenuItem>
            <GiExitDoor className="h-4 w-4 mr-2" /> Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
