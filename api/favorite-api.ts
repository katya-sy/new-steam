import { apiInstance } from "@/api/api-instance";
import { Favorite } from "@/types/user-type";

export const createFavorite = async (data: { favorite_user: number }) => {
  return apiInstance<Favorite>("/user/favorite", {
    method: "POST",
    body: data,
  });
};

export const deleteFavorite = async (id: number) => {
  return apiInstance<Favorite>(`/user/favorite/${id}`, {
    method: "DELETE",
  });
};
