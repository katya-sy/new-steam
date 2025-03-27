import { create } from "zustand";
import { ListType, UserGame } from "@/types/user-game-type";

interface UserGameState {
  userGames: UserGame[] | null;
  otherUserGames: UserGame[] | null;
  lists: ListType[] | null;
  setUserGames: (userGames: UserGame[] | null) => void;
  setOtherUserGames: (userGames: UserGame[] | null) => void;
  setLists: (lists: ListType[] | null) => void;
}

export const useUserGameStore = create<UserGameState>((set) => ({
  userGames: [],
  otherUserGames: [],
  lists: [],

  setUserGames: (userGames) => set({ userGames }),
  setOtherUserGames: (userGames) => set({ otherUserGames: userGames }),
  setLists: (lists) => set({ lists }),
}));
