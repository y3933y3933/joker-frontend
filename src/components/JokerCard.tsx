export default function JokerCard() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-lg border-2 border-red-400 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/30 to-red-600/30" />
      <div className="text-6xl mb-2 animate-bounce">🃏</div>
      <div className="text-red-100 font-bold text-lg">JOKER</div>
      <div className="text-red-200 text-xs mt-1">REVEAL!</div>
    </div>
  );
}
