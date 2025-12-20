import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User2 } from "lucide-react";

interface UserAvatarProps {
  image?: string;
  name?: string;
}

const UserAvatar = ({ image, name }: UserAvatarProps) => {
  return (
    <Avatar className="h-10 w-10 lg:h-12 lg:w-12 shrink-0 border-2 border-slate-200 dark:border-slate-700">
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="bg-slate-200 dark:bg-slate-800">
        <User2 className="h-5 w-5 text-slate-600 dark:text-slate-400" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
