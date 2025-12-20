"use client";

import { Loader2, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useProject } from "@/hooks/use-project";

export const CreateProject = () => {
  const { canCreate, isCreating, createProject } = useProject();
  return (
    <Button
      variant={"default"}
      onClick={() => createProject()}
      disabled={!canCreate || isCreating}
      className="flex items-center gap-2 cursor-pointer rounded-full"
    >
      {isCreating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
      {isCreating ? "Creating..." : "Create New Project"}
    </Button>
  );
};
