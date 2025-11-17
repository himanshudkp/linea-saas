"use client";

import { SocialSignInButtons } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

export default function SignInPage() {
  const { signInForm, handleSignIn, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = signInForm;

  const password = watch("password");

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            <h1 className="mb-1 text-xl font-semibold">Sign In to Linea</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className="space-y-6 mt-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                required
                id="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                {/* <Button asChild variant="link" size="sm">
                  <a href="/forget-password" className="text-sm">
                    Forgot your Password?
                  </a>
                </Button> */}
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "password" : "text"}
                  required
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password")}
                  className={
                    errors.password ? "pr-10 border-destructive" : "pr-10"
                  }
                />
                {errors.password && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute right-3  -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors ${
                    errors ? "top-4" : "top-1/2"
                  }`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={password.length === 0}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.root?.message && (
                <p className="text-xs text-destructive text-center">
                  {errors.root.message}
                </p>
              )}

              <hr className="my-4 border-dashed" />

              <SocialSignInButtons />
            </div>
            {errors.root?.message && (
              <p className="text-xs text-destructive text-center">
                {errors.root.message}
              </p>
            )}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className=" w-4 h-4 animate-spin" />} Sign
              In
            </Button>
          </div>
        </div>
        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account?
            <Button asChild variant="link" className="px-2">
              <a href="/sign-up">Create account</a>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
