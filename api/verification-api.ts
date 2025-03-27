import { apiInstance } from "./api-instance";
import { Verification } from "@/types/verification-type";

export const createVerificationRequest = async () => {
  return apiInstance<Verification>("/user/verification-request", {
    method: "POST",
  });
};

export const getAllVerifications = async () => {
  return apiInstance<Verification[]>(`/user/verification-request`, {
    method: "GET",
  });
};

export const acceptVerificationRequest = async (id: number) => {
  return apiInstance<{ detail: string }>(
    `/user/verification-request/accept/${id}`,
    {
      method: "POST",
    },
  );
};

export const rejectVerificationRequest = async (id: number) => {
  return apiInstance<{ detail: string }>(
    `/user/verification-request/reject/${id}`,
    {
      method: "POST",
    },
  );
};
