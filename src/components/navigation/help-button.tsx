import { Button } from "../ui/button";
import { CircleQuestionMark } from "lucide-react";

const HelpButton = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 lg:h-12 lg:w-12 rounded-full shrink-0 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      aria-label="Help"
    >
      <CircleQuestionMark className="h-5 w-5 text-slate-600 dark:text-slate-400" />
    </Button>
  );
};

export default HelpButton;
