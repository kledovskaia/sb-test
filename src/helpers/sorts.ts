type Sort<T> = {
  [key in Order]: (a: T, b: T) => number
}

const sortBy = (type: Type): Sort<Post> => ({
  asc: (a, b) => (a[type] > b[type] ? 1 : a[type] === b[type] ? 0 : -1),
  desc: (a, b) => (b[type] > a[type] ? 1 : a[type] === b[type] ? 0 : -1),
})

export const id = sortBy('id')
export const title = sortBy('title')
export const body = sortBy('body')
export const userId = sortBy('userId')
