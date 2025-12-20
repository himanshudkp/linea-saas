import { cn } from "@/utils";
import Link from "next/link";

interface TabLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
}

const TabLink = ({ label, href, icon, active }: TabLink) => {
  return (
    <Link
      key={label}
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-200",
        active
          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700"
          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent"
      )}
    >
      <span className={cn("shrink-0", active ? "opacity-100" : "opacity-70")}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};

export default TabLink;
