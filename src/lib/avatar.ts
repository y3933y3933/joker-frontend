const emojiPool = [
  "😈",
  "👻",
  "🤖",
  "🐵",
  "🦊",
  "🐸",
  "🐼",
  "🐙",
  "🧠",
  "🧟",
  "👽",
  "🎃",
  "🐲",
  "🦄",
  "🐧",
  "🦖",
];

export function generateAvatar() {
  const index = Math.floor(Math.random() * emojiPool.length);
  return emojiPool[index];
}
