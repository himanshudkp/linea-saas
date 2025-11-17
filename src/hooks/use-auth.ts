import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, signInSocial, signOut, signUp } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.email("Invalid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 character.")
    .max(20, { message: "Password must be at most 20 characters long" }),
});

const signInSocialSchema = z.object({
  provider: z.enum(["google", "github"]),
});

export const signUpSchema = z.object({
  firstname: z.string().min(2, "Firstname is required"),
  lastname: z.string().min(2, "Lastname is required"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Password is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters long")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[!@#$%^&*]/, "Password must contain a special character"),
});

// const forgotPasswordSchema = z.object({
//   email: z.string().email("Invalid email address"),
// });

// export const resetPasswordSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .max(20, "Password must be at most 20 characters long")
//       .regex(/[A-Z]/, "Password must contain an uppercase letter")
//       .regex(/[0-9]/, "Password must contain a number")
//       .regex(/[!@#$%^&*]/, "Password must contain a special character"),
//     confirmPassword: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .max(20, "Password must be at most 20 characters long")
//       .regex(/[A-Z]/, "Password must contain an uppercase letter")
//       .regex(/[0-9]/, "Password must contain a number")
//       .regex(/[!@#$%^&*]/, "Password must contain a special character"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;
type SignInSocialData = z.infer<typeof signInSocialSchema>;
// type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
// type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // const forgetPasswordForm = useForm<ForgotPasswordData>({
  //   resolver: zodResolver(forgotPasswordSchema),
  //   defaultValues: {
  //     email: "",
  //   },
  //   mode: "onChange",
  //   reValidateMode: "onChange",
  // });

  // const resetPasswordForm = useForm<ResetPasswordData>({
  //   resolver: zodResolver(resetPasswordSchema),
  //   defaultValues: {
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   mode: "onChange",
  //   reValidateMode: "onChange",
  // });

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSignIn = async ({ email, password }: SignInData) => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error: ", error);
      signInForm.setError("password", {
        message: "Invalid email or password.",
      });
      toast.error("Invalid email or password.", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSocial = async ({ provider }: SignInSocialData) => {
    setIsLoading(true);
    try {
      const { url } = await signInSocial(provider);

      if (url) {
        window.location.href = url;
      } else {
        console.log("No redirect URL found.");
      }
    } catch (error) {
      console.error("Error caught:", error);
      toast.error(`Failed to login with ${provider}.`, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async ({
    email,
    password,
    firstname,
    lastname,
  }: SignUpData) => {
    setIsLoading(true);
    try {
      const name = `${firstname} ${lastname}`.trim();
      await signUp(email, password, name);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error: ", error);
      signUpForm.setError("root", {
        message: "Failed to create account. Email already exist",
      });
      toast.error("Failed to create account. Email already exist", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Failed to sign out.");
    }
  };

  return {
    handleSignIn,
    handleSignOut,
    handleSignUp,
    isLoading,
    signInForm,
    signUpForm,
    handleSignInSocial,
    // forgetPasswordForm,
    // resetPasswordForm,
  };
};
