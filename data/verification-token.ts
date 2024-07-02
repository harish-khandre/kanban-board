import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    console.log("getVerificationTokenByToken sent!");
    return verificationToken;
  } catch (error) {
    console.log("getVerificationTokenByToken Error:", error);
    return null;
  }
};
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    console.log("getVerificationTokenByEmail  token sent!");
    return verificationToken;
  } catch (error) {
    console.log("getVerificationTokenByEmail Error:", error);
    return null;
  }
};
