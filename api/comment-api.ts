import { CommentType } from "@/types/comment-type";
import { apiInstance } from "./api-instance";

export const createComment = async (data: { game: number; text: string }) => {
  return apiInstance<CommentType>("/comment/", {
    method: "POST",
    body: data,
  });
};

export const replyComment = async (data: {
  comment: number;
  replied_comment: number;
}) => {
  return apiInstance<{
    id: number;
    comment: number;
    replied_comment: number;
  }>("/comment/reply", {
    method: "POST",
    body: data,
  });
};
