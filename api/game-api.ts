import { apiInstance } from "./api-instance";
import { Game } from "@/types/game-type";

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
