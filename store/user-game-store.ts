import { create } from 'zustand'
import { ListType, UserGame } from '@/types/user-game-type'

interface UserGameState {
  userGames: UserGame[] | null
  lists: ListType[] | null
  setUserGames: (userGames: UserGame[] | null) => void
  setLists: (lists: ListType[] | null) => void
}

export const useUserGameStore = create<UserGameState>((set) => ({
  userGames: [],
  lists: [],

  setUserGames: (userGames) => set({ userGames }),
  setLists: (lists) => set({ lists }),
}))
