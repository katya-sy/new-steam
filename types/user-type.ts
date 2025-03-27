import { UserPicture } from "@/types/picture-type";

export type User = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
};

export type Favorite = {
  id: number;
  user: User;
  favorite_user_details: User;
  user_pictures: UserPicture[];
  favorite_user_pictures: UserPicture[];
};

export type Profile = {
  id: number;
  user: User;
  birth_date: string;
  rating: number;
  favorites: Favorite[];
  favorited_by: Favorite[];
  pictures: UserPicture[];
  is_verify: boolean;
  is_archive: boolean;
};

export type UserScore = {
  id: number;
  user: User;
  rated_user: number;
  score: number;
};
