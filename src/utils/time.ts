/**
 * 时间格式化
 * @param timeSecond
 * @returns
 */
export const formateTime = (timeSecond: number) => {
  const hour = Math.floor(timeSecond / 3600)
  const minutes = Math.floor(timeSecond / 60) % 60
  const seconds = timeSecond % 60

  return `${hour <= 9 ? '0' + hour : hour} : ${minutes <= 9 ? '0' + minutes : minutes} : ${
    seconds <= 9 ? '0' + seconds : seconds
  }`
}
