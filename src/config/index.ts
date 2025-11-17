import type { Provider, ProviderConfig } from "@/types";

export const PROVIDERS: Provider[] = ["google", "github"];

export const providerConfig: Record<Provider, ProviderConfig> = {
  google: {
    label: "Google",
    ariaLabel: "Sign in with Google",
  },
  github: {
    label: "GitHub",
    ariaLabel: "Sign in with GitHub",
  },
};
