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
}));
