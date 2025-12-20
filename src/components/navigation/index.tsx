"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useCallback, type ReactNode } from "react";
import { Hash, LayoutTemplate } from "lucide-react";
import { type RootState, useAppSelector } from "@/store";
import { CreateProject } from "../project";
import { useUserProject } from "@/store/query/use-project-query";
import TabLink from "./tab-link";
import UserAvatar from "./user-avatar";
import HelpButton from "./help-button";
import GoToDashboard from "./go-to-dashboard";
import ProjectTitle from "./project-title";
import CreditInfo from "./credit-info";

interface TabProps {
  label: string;
  href: string;
  icon: ReactNode;
}

const TopNavigationBar = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const projectId = params.get("project");
  const user = useAppSelector((state) => state.profile);

  const { data: project, error, isLoading } = useUserProject(projectId!);

  const pathChecks = useMemo(
    () => ({
      hasCanvas: pathname.includes("canvas"),
      hasStyleGuide: pathname.includes("style-guide"),
    }),
    [pathname]
  );

  const TABS = useMemo<TabProps[]>(
    () => [
      {
        label: "Canvas",
        href: `/dashboard/${user?.name}/canvas?project=${projectId}`,
        icon: <Hash className="h-4 w-4" />,
      },
      {
        label: "Style Guide",
        href: `/dashboard/${user?.name}/style-guide?project=${projectId}`,
        icon: <LayoutTemplate className="h-4 w-4" />,
      },
    ],
    [user?.name, projectId]
  );

  const isTabActive = useCallback(
    (href: string) => {
      return `${pathname}?project=${projectId}` === href;
    },
    [pathname, projectId]
  );

  const projectTitle = project?.data?.title;
  const shouldShowProjectName =
    !pathChecks.hasCanvas && !pathChecks.hasStyleGuide;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <GoToDashboard userName={user?.name} />

          {shouldShowProjectName && projectTitle && (
            <ProjectTitle projectTitle={projectTitle} />
          )}
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="flex items-center gap-1 backdrop-blur-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1">
            {TABS.map(({ label, href, icon }) => {
              const active = isTabActive(href);
              return (
                <TabLink
                  key={label}
                  label={label}
                  href={href}
                  icon={icon}
                  active={active}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 lg:gap-4">
          <CreditInfo />
          <HelpButton />
          <UserAvatar image={user?.image} name={user?.name} />
          {!pathChecks.hasCanvas && !pathChecks.hasStyleGuide && (
            <CreateProject />
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavigationBar;
