import { apiInstance } from "./api-instance";
import { ListType, UserGame } from "@/types/user-game-type";

export const getUserGames = async () => {
  return apiInstance<UserGame[]>("/user-game/", {
    method: "GET",
  });
};

export const getOtherUserGames = async (id: number) => {
  return apiInstance<UserGame[]>(`/user-game/other/${id}`, {
    method: "GET",
  });
};

export const createUserGame = async (data: {
  game_id: number;
  list_id: number;
}) => {
  return apiInstance<UserGame>("/user-game/", {
    method: "POST",
    body: data,
  });
};

export const updateUserGame = async (
  data: {
    list_id: number;
  },
  id: number,
) => {
  return apiInstance<UserGame>(`/user-game/${id}`, {
    method: "PATCH",
    body: data,
  });
};

export const deleteUserGame = async (id: number) => {
  return apiInstance<UserGame>(`/user-game/${id}`, {
    method: "DELETE",
  });
};

export const getLists = async () => {
  return apiInstance<ListType[]>("/user-game/list", {
    method: "GET",
  });
};
