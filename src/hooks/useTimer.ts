import { IFormatTime, ITodoItem } from '@/interface'
import { formateTime } from '@/utils/time'
import { useEffect, useState } from 'react'

interface IProps {
  paused: boolean
  timerType: ITodoItem['timer_type']
  duration: number
}
export default function useTimer({ paused = true, timerType, duration = 0 }: IProps) {
  const [time, setTime] = useState(timerType === 'forward' ? 0 : duration)
  const [timeInfo, setTimeInfo] = useState<IFormatTime>()

  useEffect(() => {
    if (paused) return
    if (timerType === 'backward' && duration <= 0) return

    const timer = setInterval(() => {
      if (timerType === 'forward') {
        if (time > duration) {
          clearInterval(timer)
          return
        }

        setTime(cur => cur + 1)
      } else {
        if (time < 0) {
          clearInterval(timer)
          return
        }
        setTime(cur => cur - 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [paused, timerType, duration])

  useEffect(() => {
    const info = formateTime(time)
    setTimeInfo(info)
  }, [time])

  return { time, timeStr: timeInfo?.timer }
}
