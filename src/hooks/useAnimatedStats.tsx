import { useEffect, useState } from "react";

interface Stats {
  totalRounds: number;
  jokerCards: number;
}

export const useAnimatedStats = ({ totalRounds, jokerCards }: Stats) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalRounds: 0,
    jokerCards: 0,
  });

  useEffect(() => {
    let roundsCount = 0;
    let jokerCount = 0;

    const interval = setInterval(() => {
      let updated = false;

      if (roundsCount < totalRounds) {
        roundsCount++;
        updated = true;
      }

      if (jokerCount < jokerCards) {
        jokerCount++;
        updated = true;
      }

      if (updated) {
        setAnimatedStats({
          totalRounds: roundsCount,
          jokerCards: jokerCount,
        });
      }

      if (roundsCount >= totalRounds && jokerCount >= jokerCards) {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [totalRounds, jokerCards]);

  return animatedStats;
};
