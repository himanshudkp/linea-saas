"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { type ReactNode } from "react";
import { CircleQuestionMark, Hash, LayoutTemplate, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RootState, useAppSelector } from "@/store";
import { CreateProject } from "../project";
import { useUserProject } from "@/store/query/use-project-query";

interface TabProps {
  label: string;
  href: string;
  icon: ReactNode;
}

const TopNavigationBar = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const projectId = params.get("project");
  const hasCanvas = pathname.includes("canvas");
  const hasStyleGuide = pathname.includes("style-guide");
  const { data: project, error, isLoading } = useUserProject(projectId!);

  const user = useAppSelector((store) => store.profile);

  const TABS: TabProps[] = [
    {
      label: "Canvas",
      href: `/dashboard/${user?.name}/canvas?${projectId}`,
      icon: <Hash className="h-4 w-4" />,
    },
    {
      label: "Style Guide",
      href: `/dashboard/${user?.name}/style-guide?project/${projectId}`,
      icon: <LayoutTemplate className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 p-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard/${user?.name}`}
          className="w-8 h-8 rounded-full border-3 border-white bg-black flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full bg-white" />
        </Link>
        {!hasCanvas ||
          (!hasStyleGuide && (
            <div className="lg:inline-block hidden rounded-full text-primary/60 border border-white[0.12] backdrop-blur-xl bg-white[0.08] px-4 py-2 text-sm saturate-150">
              Project / {project?.data?.title}
            </div>
          ))}
      </div>
      <div className="lg:flex hidden items-center justify-center gap-2">
        <div className="flex items-center gap-2 backdrop-blur-xl bg-white[0.08] border border-white[0.12] rounded-full p-2 saturate-150">
          {TABS.map((tab) => {
            const { label, href, icon } = tab;
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition duration-300",
                  `${pathname}?project=${projectId}` === href
                    ? "bg-white[0.12] text-white border border-white[0.16] backdrop-blur-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white[0.06] border border-transparent"
                )}
              >
                <span
                  className={
                    `${pathname}?project=${projectId}` === href
                      ? "opacity-100"
                      : "opacity-70 group-hover:opacity-90"
                  }
                >
                  {icon}
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <span className="text-sm text-white/50">TODO: credits</span>
        <Button
          variant={"secondary"}
          className="rounded-full h-12 w-12 flex items-center justify-center backdrop-blur-xl bg-white[0.08] border border-white[0.12] saturate-150 hover:bg-white[0.12]"
        >
          <CircleQuestionMark className="size-5 text-white" />
        </Button>
        <Avatar className="size-12 ml-2">
          <AvatarImage src={user?.image} />
          <AvatarFallback>
            <User2 className="size-5 text-black" />
          </AvatarFallback>
        </Avatar>
        {/* {hasCanvas && <AutoSave />} */}
        {!hasCanvas && !hasStyleGuide && <CreateProject />}
      </div>
    </div>
  );
};

export default TopNavigationBar;
