import { apiInstance } from "./api-instance";
import { Game, GameScore } from "@/types/game-type";

export const getGames = async () => {
  return apiInstance<Game[]>("/game/", {
    method: "GET",
  });
};

export const getGameById = async (id: number) => {
  return apiInstance<Game>(`/game/${id}`, {
    method: "GET",
  });
};

export const getGameScores = async () => {
  return apiInstance<GameScore[]>("/game/game-score", {
    method: "GET",
  });
};

export const createGameScore = async (data: {
  score: number;
  game: number;
}) => {
  return apiInstance<GameScore>("/game/game-score", {
    method: "POST",
    body: data,
  });
};

export const updateGameScore = async (
  data: {
    score: number;
  },
  id: number,
) => {
  return apiInstance<GameScore>(`/game/game-score/${id}`, {
    method: "PATCH",
    body: data,
  });
};
