import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PlayerAvatarProps {
  name: string;
  isOnline?: boolean;
}

export default function PlayerAvatar({
  name,
  isOnline = true,
}: PlayerAvatarProps) {
  const firstLetter = name.length > 0 ? name[0].toUpperCase() : "";
  return (
    <div className="relative text-black">
      <Avatar>
        <AvatarImage src="./avatar-80-07.jpg" alt={name} />
        <AvatarFallback>{firstLetter}</AvatarFallback>
      </Avatar>

      <span
        className={cn(
          "border-background  absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2",
          isOnline ? "bg-emerald-500" : "bg-muted-foreground",
        )}
      >
        <span className="sr-only">{isOnline ? "Online" : "Offline"}</span>
      </span>
    </div>
  );
}
