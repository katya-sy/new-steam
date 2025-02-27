import { useEffect, useState } from "react";
import { Rating } from "@/components/rating";
import { Game } from "@/types/game-type";
import { createGameScore, updateGameScore } from "@/api/game-api";
import { useGameStore } from "@/store/game-store";
import { toast } from "sonner";
import { ErrorToast } from "./error-toast";

interface Props {
  game: Game;
}

export const GameRating = ({ game }: Props) => {
  const [rating, setRating] = useState(0);
  const gameScores = useGameStore((state) => state.gameScores);
  const setGameScores = useGameStore((state) => state.setGameScores);

  useEffect(() => {
    setRating(game?.rating);
  }, [game]);

  const updateRating = async (score: number) => {
    const existGameScore = gameScores?.find(
      (gameScore) => gameScore?.game === game?.id,
    );
    if (existGameScore && existGameScore?.score === score) {
      toast(
        <ErrorToast
          error={{ message: "Невозможно оценить игру снова", statusCode: 400 }}
        />,
      );
    } else if (existGameScore && existGameScore?.score !== score) {
      const { success, data, error } = await updateGameScore(
        { score },
        existGameScore?.id,
      );

      if (success && data) {
        setRating(rating - existGameScore?.score + data?.score);
        toast(`Оценка ${game?.name} изменена`);

        if (gameScores) {
          setGameScores(
            gameScores.map((gameScore) =>
              gameScore?.id === existGameScore?.id
                ? { ...gameScore, score: data?.score }
                : gameScore,
            ),
          );
        }
      } else {
        toast(<ErrorToast error={error} />);
      }
    } else {
      const { success, data, error } = await createGameScore({
        score,
        game: game?.id,
      });
      if (success && data) {
        setRating(rating + data?.score);
        toast(`Оценка ${game?.name} добавлена`);

        if (gameScores) {
          setGameScores([...gameScores, data]);
        }
      } else {
        toast(<ErrorToast error={error} />);
      }
    }
  };

  return <Rating updateRating={updateRating} rating={rating} />;
};
