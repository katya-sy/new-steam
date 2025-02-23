import { apiInstance } from "@/api/api-instance";
import { Tag } from "@/types/game-type";

export const getTags = async () => {
  return apiInstance<Tag[]>("/game/tag", {
    method: "GET",
  });
};
