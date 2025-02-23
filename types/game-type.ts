import { Profile, User } from './user-type'
import { GamePicture } from './picture-type'

export type Status = {
  id: number
  name: string
  play: boolean
}

export type Tag = {
  id: number
  name: string
}

export type Game = {
  id: number
  status: Status
  user: User
  profile: Profile
  date: string
  name: string
  rating: number
  description: string
  video_source: string
  resource: string
  tags: Tag[]
  pictures: GamePicture[]
  comments: Comment[]
}
