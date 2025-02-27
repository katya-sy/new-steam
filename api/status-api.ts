import { Status } from "@/types/game-type";
import { apiInstance } from "./api-instance";

export const getStatuses = async () => {
  return apiInstance<Status[]>("/game/status", {
    method: "GET",
  });
};
