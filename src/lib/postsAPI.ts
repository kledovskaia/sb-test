const BASE = 'https://jsonplaceholder.typicode.com'

export const fetchAllPosts = async () => {
  try {
    const response = await fetch(`${BASE}/posts`)
    const result: Post[] = await response.json()
    return result
  } catch {
    throw new Error('Error fetching posts')
  }
}
