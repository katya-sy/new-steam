import { apiInstance } from "./api-instance";
import { Profile } from "@/types/user-type";

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
