import { useState } from "react";
import { toast } from "sonner";

export default function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Code Copied!", {
        description: "Room code copied to clipboard",
      });

      setCopied(true);

      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      toast.error("Failed to copy text");
      console.error("Failed to copy text:", err);
    }
  };

  return { copied, copyToClipboard };
}
