'use server'

import { cookies } from 'next/headers'

export const setCookie = async (key: string, value: string) => {
  const cookieStore = cookies()

  cookieStore.set(key, value)
}

export const getCookie = async (key: string) => {
  const cookieStore = cookies()

  return cookieStore.get(key)
}

export const deleteCookie = async (key: string) => {
  const cookieStore = cookies()

  return cookieStore.delete(key)
}
