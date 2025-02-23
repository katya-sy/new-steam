import { UserPicture } from '@/types/picture-type'

export type User = {
  id: number
  username: string
  email: string
  is_staff: boolean
}

export type Favorite = {
  id: number
  user: User
  favorite_user_details: User
}

export type Profile = {
  id: number
  user: User
  birth_date: string
  rating: number
  favorites: Favorite[]
  favorited_by: Favorite[]
  pictures: UserPicture[]
  is_verify: boolean
  is_archive: boolean
}
