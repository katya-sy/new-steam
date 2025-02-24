import { CommentType } from "@/types/comment-type";
import { apiInstance } from "./api-instance";

export const createComment = async (data: { game: number; text: string }) => {
  return apiInstance<CommentType>("/comment/", {
    method: "POST",
    body: data,
  });
};
