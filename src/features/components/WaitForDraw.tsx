export default function WaitForDraw({
  currentPlayerNickname,
}: {
  currentPlayerNickname: string;
}) {
  return (
    <>
      <div className="relative">
        <div className="w-40 h-56 md:w-48 md:h-64 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-2xl mx-auto shadow-2xl shadow-purple-500/30 border border-purple-400/30 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
          <div className="text-6xl md:text-7xl">🎴</div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
        </div>
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-3xl blur-xl animate-pulse" />
      </div>
      {/* 抽到鬼牌就好玩了，{nickname} 別猶豫！ */}
      <div className="text-center space-y-3">
        <p className="text-xl text-gray-300">
          <span className="text-cyan-400 font-bold">
            {currentPlayerNickname}
          </span>{" "}
          快選啦，大家等著吃瓜
        </p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
    </>
  );
}
