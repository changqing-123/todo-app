import { formateTime } from '@/utils/time'
import { useEffect, useState } from 'react'

interface IProps {
  paused: boolean
  timerType: 'forward' | 'backward'
  duration: number
}
export default function useTimer({ paused = true, timerType, duration = 0 }: IProps) {
  const [time, setTime] = useState(timerType === 'forward' ? 0 : duration)

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

  return { time, timeStr: formateTime(time) }
}
