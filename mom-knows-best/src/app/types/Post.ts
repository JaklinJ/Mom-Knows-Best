import { User } from "./User"

export interface Post {
    "_id": {},
    "title": string,
    "type": string,
    "location": string,
    "imageUrl": string,
    "rating": string,
    "description": string,
    "author": User,
    "likes": [],
    "date": {},
    "__v": number,
  }