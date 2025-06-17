import { Ghost } from "lucide-react";
import type { PropsWithChildren } from "react";

export default function QuestionSection({ children }: PropsWithChildren) {
  return (
    <div className="w-full max-w-2xl animate-in zoom-in duration-700">
      <div className="bg-gradient-to-r from-red-900/50 via-purple-900/50 to-red-900/50 backdrop-blur-sm border border-red-500/50 rounded-2xl p-6 shadow-2xl shadow-red-500/20">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Ghost className="h-8 w-8 text-red-400 animate-bounce" />
            <h3 className="text-2xl md:text-3xl font-bold text-red-400">
              題目
            </h3>
            <Ghost
              className="h-8 w-8 text-red-400 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent" />
          <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
