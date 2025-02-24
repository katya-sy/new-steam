import { User } from "./user-type";

export type Verification = {
  id: number;
  user: User;
  date: string;
};
