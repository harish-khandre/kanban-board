"use server";

import { currentUserRole } from "@/lib/user-from-server";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentUserRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed!" };
  }

  return {error: "Forbidden!"}
};
