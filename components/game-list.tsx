import { GameCard } from "./game-card";

export const GameList = () => {
  return (
    <div className="gap-5 grid grid-cols-5">
      {[1, 2, 3, 4, 5].map((item) => (
        <GameCard key={item} />
      ))}
    </div>
  );
};
