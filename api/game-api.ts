import { apiInstance } from "./api-instance";
import { Game } from "@/types/game-type";

export const getGames = async () => {
  return apiInstance<Game[]>("/game/", {
    method: "GET",
  });
};
