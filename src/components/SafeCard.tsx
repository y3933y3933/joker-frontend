export default function SafeCard() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 rounded-lg border-2 border-green-400 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-green-600/30" />
      <div className="text-6xl mb-2">🛡️</div>
      <div className="text-green-100 font-bold text-lg">SAFE</div>
      <div className="text-green-200 text-xs mt-1">HIDDEN</div>
    </div>
  );
}
