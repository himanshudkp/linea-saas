const ProjectTitle = ({ projectTitle }: { projectTitle: string }) => {
  return (
    <div className="hidden lg:flex items-center gap-2 rounded-full text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 backdrop-blur-sm bg-slate-50 dark:bg-slate-900/50 px-4 py-2 text-sm max-w-xs truncate">
      <span className="text-slate-500 dark:text-slate-500">Project</span>
      <span className="text-slate-900 dark:text-slate-100 font-medium truncate">
        {projectTitle}
      </span>
    </div>
  );
};

export default ProjectTitle;
