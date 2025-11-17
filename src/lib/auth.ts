import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { sendResetPasswordEmail } from "./utils";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    // sendResetPassword: async ({ user, url, token }, request) => {
    //   try {
    //     const { email, name } = user;

    //     const res = await sendResetPasswordEmail({
    //       name,
    //       email,
    //     });

    //     if (!res.error) {
    //       console.log(`Successfully sent reset link to ${email}`);
    //     } else {
    //       console.log(`Failed to send reset link to ${email}`, res.error);
    //     }
    //   } catch (error) {
    //     console.log(`Failed to send reset link to ${user.email}`, error);
    //   }
    // },

    // onPasswordReset: async ({ user }) => {
    //   console.log(`Password for user ${user.email} has been reset.`);
    // },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
