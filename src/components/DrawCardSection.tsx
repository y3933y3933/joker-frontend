import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";

export default function DrawCardSection() {
  return (
    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-6 px-12 text-xl rounded-lg shadow-lg shadow-yellow-500/25 border border-yellow-400 transition-all duration-300 hover:shadow-yellow-400/50 hover:scale-105">
      <Shuffle className="mr-2 h-6 w-6" />
      Draw Card
    </Button>
  );
}
