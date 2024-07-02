"use client";

import { logout } from "@/actions/logout";

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = () => {
    logout();
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
