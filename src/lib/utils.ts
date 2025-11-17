import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sendResetPasswordEmail({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const response = await fetch("/api/reset-password-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });

  return response.json();
}
