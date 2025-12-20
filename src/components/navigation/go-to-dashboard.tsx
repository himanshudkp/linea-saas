import Link from "next/link";

const GoToDashboard = ({ userName }: { userName: string }) => {
  return (
    <Link
      href={`/dashboard/${userName}`}
      className="shrink-0 w-10 h-10 rounded-full border-2 border-slate-900 dark:border-white bg-slate-900 dark:bg-white flex items-center justify-center hover:opacity-80 transition-opacity"
      aria-label="Dashboard Home"
    >
      <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-900" />
    </Link>
  );
};

export default GoToDashboard;
