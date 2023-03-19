export const delayTimeout = async (ms: number = 0): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
  })
}
