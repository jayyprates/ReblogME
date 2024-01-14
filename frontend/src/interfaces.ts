export interface Post {
  id: number
  content: string
  blogger: Blogger,
  comments: any[],
  created_at: string,
  updated_at: string
}

export interface Blogger {
  id: number,
  email: string,
  username: string,
  password: string,
  created_at: string,
  updated_at: string
}
