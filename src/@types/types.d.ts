type InferArgType<T> = T extends (arg: infer R) => void ? R : never

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type Type = keyof Post
type Order = 'asc' | 'desc'
