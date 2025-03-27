import { create } from 'zustand'
import { Verification } from '@/types/verification-type'

interface VerifState {
  verifications: Verification[]
  setVerifications: (ver: Verification[]) => void
}

export const useVerificationStore = create<VerifState>((set) => ({
  verifications: [],
  setVerifications: (ver) => set({ verifications: ver }),
}))
