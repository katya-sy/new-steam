import { Status } from "@/types/game-type";
import { create } from "zustand";

interface StatusState {
  statuses: Status[];
  setStatuses: (statuses: Status[]) => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  statuses: [],

  setStatuses: (statuses) => set(() => ({ statuses: statuses })),
}));
