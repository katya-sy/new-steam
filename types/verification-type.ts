import { Profile, User } from "./user-type";

export type Verification = {
  id: number;
  user: User;
  profile: Profile;
  date: string;
};
