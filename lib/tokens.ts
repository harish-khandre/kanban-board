import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 600000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  try {
    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    console.log("passwordResetToken generated!");
    return passwordResetToken;
  } catch (error) {
    console.log(error);
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expirationTime = new Date(Date.now() + 3600 * 1000); // 1 hour from now

  // Check if an existing verification token exists for the email
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    // If a token exists, delete it before creating a new one
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Create a new verification token

  try {
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires: expirationTime,
      },
    });

    console.log("generateVerificationToken success");
    return verificationToken;
  } catch (error) {
    console.log("generateVerificationToken error:", error);
  }
};
