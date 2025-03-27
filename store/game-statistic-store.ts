import { GameStatistic } from '@/types/game-type'
import { create } from 'zustand'

interface GameState {
  statistic: GameStatistic[]
  setStatistic: (st: GameStatistic[]) => void
}

export const useGameStatisticStore = create<GameState>((set) => ({
  statistic: [],

  setStatistic: (st) => set(() => ({ statistic: st })),
}))
