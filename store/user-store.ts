import { create } from 'zustand'
import { Profile } from '@/types/user-type'

interface UserState {
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,

  setProfile: (profile: Profile | null) => set({ profile: profile }),
}))
