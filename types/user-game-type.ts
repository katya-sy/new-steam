import { Game } from "@/types/game-type";

export type ListType = {
  id: number;
  name: string;
};

export type UserGame = {
  id: number;
  user: number;
  game: Game;
  list: ListType;
  start_date: string;
  end_date: string;
};
