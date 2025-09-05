import { IFormatTime } from '@/interface'

/**
 * 时间格式化
 * @param timeSecond
 * @returns
 */
export const formateTime = (timeSecond: number): IFormatTime => {
  const hour = Math.floor(timeSecond / 3600)
  const minutes = Math.floor(timeSecond / 60) % 60
  const seconds = timeSecond % 60

  return {
    timer: `${hour <= 9 ? '0' + hour : hour} : ${minutes <= 9 ? '0' + minutes : minutes} : ${
      seconds <= 9 ? '0' + seconds : seconds
    }`,
    hours: hour,
    minutes,
    seconds
  }
}

/**
 * 渲染时间
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @return {string}
 */
export const renderDuration = ({ hours, minutes, seconds }) => {
  if (hours) return `${hours} 小时 ${minutes} 分钟 ${seconds} 秒`
  if (minutes) return `${minutes} 分钟 ${seconds} 秒`
  return `${seconds} 秒`
}
