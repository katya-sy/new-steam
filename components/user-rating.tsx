import { useEffect, useState } from "react";
import { Rating } from "@/components/rating";
import { toast } from "sonner";
import { ErrorToast } from "./error-toast";
import { Profile } from "@/types/user-type";
import { useUserStore } from "@/store/user-store";
import { createScore, updateScore } from "@/api/user-api";

interface Props {
  prof: Profile;
}

export const UserRating = ({ prof }: Props) => {
  const [rating, setRating] = useState(0);
  const userScores = useUserStore((state) => state.userScores);
  const setUserScores = useUserStore((state) => state.setUserScores);

  useEffect(() => {
    setRating(prof?.rating);
  }, [prof]);

  const updateRating = async (score: number) => {
    const existUserScore = userScores?.find(
      (userScore) => userScore?.rated_user === prof?.user.id,
    );
    if (existUserScore && existUserScore?.score === score) {
      toast(
        <ErrorToast
          error={{
            message: "Невозможно оценить пользователя снова",
            statusCode: 400,
          }}
        />,
      );
    } else if (existUserScore && existUserScore?.score !== score) {
      const { success, data, error } = await updateScore(
        { score },
        existUserScore?.id,
      );

      if (success && data) {
        setRating(rating - existUserScore?.score + data?.score);
        toast(`Вы изменили оценку пользователя ${prof?.user.username}`);

        if (userScores) {
          setUserScores(
            userScores.map((userScore) =>
              userScore?.id === existUserScore?.id
                ? { ...userScore, score: data?.score }
                : userScore,
            ),
          );
        }
      } else {
        toast(<ErrorToast error={error} />);
      }
    } else {
      const { success, data, error } = await createScore({
        score,
        rated_user: prof?.user.id,
      });
      if (success && data) {
        setRating(rating + data?.score);
        toast(`Вы оценили пользователя ${prof?.user.username}`);

        if (userScores) {
          setUserScores([...userScores, data]);
        }
      } else {
        toast(<ErrorToast error={error} />);
      }
    }
  };

  return <Rating updateRating={updateRating} rating={rating} />;
};
