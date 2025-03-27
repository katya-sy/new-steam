import { apiInstance } from "./api-instance";
import { Profile, UserScore } from "@/types/user-type";

export const login = async (data: { username: string; password: string }) => {
  return apiInstance<{ key: string }>("/user/auth/login", {
    method: "POST",
    body: data,
  });
};

export const register = async (data: FormData) => {
  return apiInstance<{
    token: string;
    profile: Profile;
  }>("/user/register", {
    method: "POST",
    body: data,
  });
};

export const logout = async () => {
  return apiInstance<{ detail: string }>("/user/auth/logout", {
    method: "POST",
  });
};

export const getProfile = async () => {
  return apiInstance<Profile>("/user/", {
    method: "GET",
  });
};

export const getUserById = async (id: number) => {
  return apiInstance<Profile>(`/user/${id}`, {
    method: "GET",
  });
};

export const getUserScores = async () => {
  return apiInstance<UserScore[]>("/user/user-score", {
    method: "GET",
  });
};

export const createScore = async (data: {
  score: number;
  rated_user: number;
}) => {
  return apiInstance<UserScore>("/user/user-score", {
    method: "POST",
    body: data,
  });
};

export const updateScore = async (
  data: {
    score: number;
  },
  id: number,
) => {
  return apiInstance<UserScore>(`/user/user-score/${id}`, {
    method: "PATCH",
    body: data,
  });
};
