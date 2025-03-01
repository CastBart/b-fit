import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;
export async function sendTwoFactorTokenEmail(email: string, token: string) {

  await resend.emails.send({
    from: "mail@b-fit.co",
    to: email,
    subject: "2FA Code",
    html: `<p>Here is your 2FA code: ${token}</p>`,
  });
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@b-fit.co",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@b-fit.co",
    to: email,
    subject: "Confrim your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
}
