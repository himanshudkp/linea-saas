import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import {
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
  sendVerificationEmail,
} from "../email";
import { prisma } from "../prisma";
import {
  AUTH_ERROR_MESSAGES,
  BASE_URL,
  BETTER_AUTH_COOKIE_PREFIX,
  BETTER_AUTH_DB_PROVIDER,
} from "../contants";
import { SESSION_CONFIG } from "../config";
import type { BetterAuthCallback, Response } from "@/lib/types";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

async function handlePasswordReset({
  user,
  url,
}: BetterAuthCallback): Promise<void> {
  try {
    await validateAccountCredential(user.id);

    await sendPasswordResetEmail({
      email: user.email,
      url,
      name: user.name,
    });
  } catch (error) {
    console.error(
      `${AUTH_ERROR_MESSAGES.PASSWORD_RESET_ERROR_MESSAGE}: `,
      error
    );

    throw error;
  }
}

async function handlePasswordResetSuccess({ user }: BetterAuthCallback) {
  try {
    await sendPasswordResetSuccessEmail({
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error(`${AUTH_ERROR_MESSAGES.PASSWORD_RESET_SUCCESS}: `, error);
    throw error;
  }
}

async function handleVerificationEmail({ user, url }: BetterAuthCallback) {
  try {
    await sendVerificationEmail({
      email: user.email,
      url,
      name: user.name,
    });
  } catch (error) {
    console.error(`${AUTH_ERROR_MESSAGES.EMAIL_VERIFICATION}: `, error);
    throw error;
  }
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: BETTER_AUTH_DB_PROVIDER,
  }),

  baseURL: BASE_URL,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    sendResetPassword: handlePasswordReset,
    onPasswordReset: handlePasswordResetSuccess,
  },

  emailVerification: {
    sendVerificationEmail: handleVerificationEmail,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  plugins: [nextCookies()],

  session: SESSION_CONFIG,

  advanced: {
    cookiePrefix: BETTER_AUTH_COOKIE_PREFIX,
  },
});

export const validateAccountCredential = async (userId: string) => {
  const account = await prisma.account.findFirst({
    where: { userId, providerId: "credential" },
    select: { providerId: true },
  });

  if (!account) {
    throw new Error(AUTH_ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
  }

  if (account.providerId !== "credential") {
    throw new Error(AUTH_ERROR_MESSAGES.PASSWORD_RESET_ERROR_MESSAGE);
  }
};

export const generateGradientThumbnail = () => {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  ];

  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];
  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${
            randomGradient.match(/#[a-fA-F0-9]{6}/g)?.[0] || "#667eea"
          }" />
          <stop offset="100%" style="stop-color:${
            randomGradient.match(/#[a-fA-F0-9]{6}/g)?.[1] || "#764ba2"
          }" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <circle cx="150" cy="100" r="30" fill="white" opacity="0.8" />
      <path d="M140 90 L160 90 L160 110 L140 110 Z" fill="white" opacity="0.6" />
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const extractNameFromEmail = (email: string): string => {
  return email
    .split("@")[0]
    .split(/[._-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

export const combinedSlug = (name: string, max = 80): string => {
  const existingName = name;
  if (!existingName) return "untitled";
  let s = existingName
    .normalize("NFKD".replace(/\p{M}+/gu, ""))
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
  if (!s) return (s = "untitled");
  if (s.length > max) return (s = s.slice(0, max));
  return s;
};

export const isSubscriptionActive = (
  status: string | null | undefined,
  currentPeriodEnd: number | null | undefined | bigint
): boolean => {
  if (!status || status.toLowerCase() !== "active") return false;
  return currentPeriodEnd == null || currentPeriodEnd > Date.now();
};

export function successResponse<T>(data: T, status = 200): Response<T> {
  return { status, data };
}
