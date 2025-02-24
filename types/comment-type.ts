import { User } from "./user-type";

export type CommentType = {
  id: number;
  game: number;
  user: User;
  text: string;
  date: string;
  current_play_time: number;
  rating: number;
  replies: CommentType[];
};
