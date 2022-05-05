type Debounce = <T>(
  fn: (...args: T[]) => void,
  ms?: number,
) => (...args: T[]) => void

export const debounce: Debounce = (fn, ms = 300) => {
  let timer: NodeJS.Timeout

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}
