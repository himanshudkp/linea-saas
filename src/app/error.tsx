"use client";

import { useEffect, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Copy, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const isDevelopment = process.env.NODE_ENV === "development";

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isDevelopment) {
      console.error("Application error:", error);
    }
  }, [error]);

  const handleCopyError = useCallback(async () => {
    const errorText = `${error.message}${
      error.digest ? `\nError ID: ${error.digest}` : ""
    }`;
    try {
      await navigator.clipboard.writeText(errorText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy error:", err);
    }
  }, [error]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleGoHome = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-50 to-zinc-100 px-4 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in-50 slide-in-from-top-4 duration-300">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4 dark:bg-red-950">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          We encountered an unexpected error. Please try again or return home.
        </p>

        {isDevelopment && (
          <div className="mb-6 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex w-full items-center justify-between gap-2 text-left hover:opacity-75 transition-opacity"
              aria-expanded={isExpanded}
            >
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Error Details
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-3">
                <div className="rounded bg-zinc-50 p-3 dark:bg-zinc-900">
                  <p className="wrap-break-word font-mono text-xs text-red-600 dark:text-red-400">
                    {error.message}
                  </p>
                </div>

                {error.digest && (
                  <div className="rounded bg-zinc-50 p-3 dark:bg-zinc-900">
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold">ID:</span> {error.digest}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleCopyError}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy Error"}
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleReset}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            size="lg"
          >
            Try Again
          </Button>
          <Button
            onClick={handleGoHome}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
