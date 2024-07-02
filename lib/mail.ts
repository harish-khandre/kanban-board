import { TwoFA } from "@/emails/2fa";
import ResetPasswordEmail from "@/emails/reset-password";
import { VerificationEmail } from "@/emails/verification-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Breedit@breedit.co.in",
    to: email,
    subject: "Your two-factor authentication code",
    react: TwoFA({ token }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "Breedit@breedit.co.in",
    to: email,
    subject: "Reset your password",
    react: ResetPasswordEmail({ url }),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;
  try {
    await resend.emails.send({
      from: "Breedit@breedit.co.in",
      to: email,
      subject: "Verify your email address",
      react: VerificationEmail({ confirmationUrl }),
    });
  } catch (error) {
    console.log("sendVerificationEmail error:", error);
  }
};
