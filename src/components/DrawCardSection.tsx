import JokerCard from "./JokerCard";
import SafeCard from "./SafeCard";

interface DrawCardSectionProps {
  flippingCard: number | null;
  flippedCards: Record<number, "joker" | "safe">;
  selectedCard: number | null;
  onSelect: (cardIndex: number) => void;
}

export default function DrawCardSection({
  flippingCard,
  flippedCards,
  selectedCard,
  onSelect,
}: DrawCardSectionProps) {
  const getCardContent = (cardIndex: number) => {
    const cardType = flippedCards[cardIndex];

    return cardType === "joker" ? <JokerCard /> : <SafeCard />;
  };

  return (
    <div className="flex space-x-8">
      {[0, 1, 2].map((cardNum) => {
        const isFlipping = flippingCard === cardNum;
        const isFlipped = flippedCards[cardNum] !== undefined;
        const isSelected = selectedCard === cardNum;
        const cardType = flippedCards[cardNum];

        return (
          <div
            key={cardNum}
            onClick={() => onSelect(cardNum)}
            className={`w-32 h-48 cursor-pointer transform transition-all duration-300 card-3d relative ${
              isFlipping ? "card-flip" : ""
            } ${
              isSelected && cardType === "joker"
                ? "card-glow-joker shake"
                : isSelected && cardType === "safe"
                  ? "card-glow-safe"
                  : "hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]"
            } ${isFlipped ? "card-flipped" : ""}`}
            style={{
              pointerEvents:
                flippingCard !== null && flippingCard !== cardNum
                  ? "none"
                  : "auto",
            }}
          >
            {/* Card Back */}
            <div className="card-face card-back transition-transform duration-800 ease-in-out">
              <CardBack />
            </div>

            {/* Card Front */}
            <div className="card-face card-front transition-transform duration-800 ease-in-out">
              {getCardContent(cardNum)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CardBack() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg border-2 border-cyan-400 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20" />
      <div className="text-6xl">🎴</div>
      <div className="absolute top-2 left-2 text-cyan-400 text-xs font-bold">
        JOKER
      </div>
      <div className="absolute bottom-2 right-2 text-cyan-400 text-xs font-bold transform rotate-180">
        JOKER
      </div>
    </div>
  );
}
