'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useUserStore } from '@/store/user-store'
import { getCookie } from '@/lib/cookie'
import { getProfile } from '@/api/user-api'
import { Loader } from '@/components/ui/loader'

interface Props {
  children: ReactNode
}

export const AuthCheck = ({ children }: Props) => {
  const profile = useUserStore((state) => state.profile)
  const setProfile = useUserStore((state) => state.setProfile)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!profile) {
        const token = await getCookie('token')
        if (token) {
          const { success, data } = await getProfile()
          if (success) {
            setProfile(data)
          }
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [setProfile, profile])

  if (loading) {
    return <Loader />
  } else {
    return <>{children}</>
  }
}
