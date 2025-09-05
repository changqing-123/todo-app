import { IFormatTime, ITodoItem } from '@/interface'
import { formateTime } from '@/utils/time'
import { useEffect, useState } from 'react'

interface IProps {
  paused: boolean
  timerType: ITodoItem['timer_type']
  duration: number // 计时时长--秒级
  onFinish: (params: () => void) => void
}
export default function useTimer({ paused = true, timerType, duration = 0, onFinish }: IProps) {
  // 当前时间，单位秒
  const [time, setTime] = useState(timerType === 'forward' ? 0 : duration)
  const [timeInfo, setTimeInfo] = useState<IFormatTime>()

  const onReset = () => {
    setTime(timerType === 'forward' ? 0 : duration)
  }

  useEffect(() => {
    if (paused) return
    if (timerType === 'backward' && duration <= 0) return

    const timer = setInterval(() => {
      if (timerType === 'forward') {
        if (time + 1 >= duration) {
          clearInterval(timer)
          onFinish(onReset)
          return
        }

        setTime(cur => cur + 1)
      } else {
        if (time - 1 <= 0) {
          clearInterval(timer)
          onFinish(onReset)
          return
        }
        setTime(cur => cur - 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [paused, timerType, duration, time])

  useEffect(() => {
    const info = formateTime(time)
    setTimeInfo(info)
  }, [time])

  return { time, timeStr: timeInfo?.timer, onReset }
}
