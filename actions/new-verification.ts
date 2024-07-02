"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(exisitingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const user = await getUserByEmail(exisitingToken.email);

  if (!user) {
    return { error: "User not found!" };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: exisitingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: "Email verified!" };
};
