import { apiInstance } from "./api-instance";
import { Verification } from "@/types/verification-type";

export const createVerificationRequest = async () => {
  return apiInstance<Verification>("/user/verification-request", {
    method: "POST",
  });
};
