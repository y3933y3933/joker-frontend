import { User2Icon } from "lucide-react";

export default function EmptyPlayerSlot() {
  return (
    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border-2 border-dashed  border-gray-700/50 animate-pulse">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <User2Icon className="text-gray-600 w-5 h-5" />
      </div>
      <span className="flex-1 text-white font-medium">Waiting...</span>
    </div>
  );
}
