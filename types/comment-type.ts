import { Profile, User } from "./user-type";

export type CommentType = {
  id: number;
  game: number;
  user: User;
  profile: Profile;
  text: string;
  date: string;
  current_play_time: number;
  rating: number;
  replies: CommentType[];
};
