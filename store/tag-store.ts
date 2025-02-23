import { Tag } from "@/types/game-type";
import { create } from "zustand";

interface TagState {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

export const useTagStore = create<TagState>((set) => ({
  tags: [],

  setTags: (tags) => set(() => ({ tags: tags })),
}));
