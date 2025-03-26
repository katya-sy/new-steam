import { Game, GameScore } from "@/types/game-type";
import { create } from "zustand";

interface GameState {
  games: Game[];
  setGames: (games: Game[]) => void;
  addGame: (game: Game) => void;
  updateGame: (id: number, updatedGame: Partial<Game>) => void;
  removeGame: (id: number) => void;
  getGameById: (id: number) => Game | undefined;

  gameScores: GameScore[] | null;
  setGameScores: (gameScores: GameScore[] | null) => void;

  showAllGames: boolean;
  setShowAllGames: (showAllGames: boolean) => void;
  search: string;
  searchTags: string[];
  searchGames: Game[];
  setSearch: (search: string) => void;
  setSearchTags: (tags: string[]) => void;
  setSearchGames: (games: Game[]) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  games: [],

  setGames: (games) => set(() => ({ games: games })),
  addGame: (game) => set((state) => ({ games: [...state.games, game] })),
  updateGame: (id, updatedGame) =>
    set((state) => ({
      games: state.games.map((game) =>
        game.id === id ? { ...game, ...updatedGame } : game,
      ),
    })),
  removeGame: (id) =>
    set((state) => ({ games: state.games.filter((game) => game.id !== id) })),
  getGameById: (id) => get().games.find((game) => game.id === id),

  gameScores: [],
  setGameScores: (gameScores: GameScore[] | null) => set({ gameScores }),

  showAllGames: false,
  setShowAllGames: (showAllGames) => set({ showAllGames }),

  search: "",
  searchTags: [],
  searchGames: [],
  setSearchGames: (games) =>
    set((state) => ({
      searchGames: games.filter((game) =>
        game?.name.toLowerCase().includes(state.search.toLowerCase()),
      ),
    })),
  setSearchTags: (tags: string[]) =>
    set((state) => ({
      searchTags: tags,
      searchGames: state.games.filter((game) => {
        const matchesSearch = game.name
          .toLowerCase()
          .includes(state.search.toLowerCase());

        const matchesTags =
          tags.length === 0
            ? true
            : tags.every((tag) =>
                game.tags.some((gameTag) => gameTag.name === tag),
              );

        return matchesSearch && matchesTags;
      }),
      currentPage: 1,
    })),
  setSearch: (search) => {
    set((state) => ({
      search: search,
      searchGames: state.games.filter((game) => {
        const matchesSearch = game.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesTags =
          state.searchTags.length === 0
            ? true
            : state.searchTags.every((tag) =>
                game.tags.some((gameTag) => gameTag.name === tag),
              );

        return matchesSearch && matchesTags;
      }),
      currentPage: 1,
    }));
  },
}));
