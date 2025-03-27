import { create } from "zustand";
import { Profile, UserScore } from "@/types/user-type";

interface UserState {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;

  userScores: UserScore[] | null;
  setUserScores: (userScores: UserScore[] | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  userScores: [],

  setUserScores: (userScores: UserScore[] | null) => set({ userScores }),
  setProfile: (profile: Profile | null) => set({ profile: profile }),
}));
