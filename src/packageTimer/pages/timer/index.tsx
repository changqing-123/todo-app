import { updateTodo } from '@/apis/todoServices'
import TimerCom from '@/components/timerCom'
import { Button, Dialog } from '@taroify/core'
import { PauseCircle, PlayCircle, StopCircle } from '@taroify/icons'
import { Text, View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import styles from './index.module.scss'

export default function TimerPage() {
  const [active, setActive] = useState(true)
  // 开始计时时间
  const [startTime, setStartTime] = useState(0)
  // 累计计时时间
  const [totalElapsedTime, setTotalElapsedTime] = useState(0)

  const router = Taro.useRouter()

  useDidShow(() => {
    console.log('timer page show.', router)
    const now = Date.now()
    setStartTime(now)
  })

  const onPause = () => {
    const current = Date.now()

    if (!active) {
      // 重新开始,重设开始时间
      setStartTime(current)
    } else {
      // 暂停，记录当前时间段的时长
      setTotalElapsedTime(prev => prev + (current - startTime))
      setStartTime(0)
    }

    setActive(prev => !prev)
  }

  const onStop = () => {
    const current = Date.now()
    // 计算当前时段时长
    const currentDuration = active && startTime > 0 ? current - startTime : 0
    // 累计时长 单位：秒
    const duration = (totalElapsedTime + currentDuration) / 1000

    Dialog.confirm({
      title: '提示',
      message: '确定完成任务并退出吗？',
      onConfirm: async () => {
        try {
          const res = await updateTodo({
            id: Number(router.params.id),
            end_time: current,
            duration,
            completed: true
          })
          console.log('res', res)
          Taro.navigateBack()
        } catch (error) {
          Taro.navigateBack()
          console.error(error)
        }
      }
    })
  }
  return (
    <View className={styles.container}>
      <Text className={styles.desc}>{1232132142142131}</Text>
      <View className={styles.timerArea}>
        <TimerCom
          active={active}
          onPlause={onPause}
          title="计时"
          timerType="forward"
          duration={60 * 20}
        />
      </View>
      <View className={styles.btnArea}>
        <Button className={styles.btn} shape="round" variant="text" onClick={onPause}>
          {active ? <PauseCircle /> : <PlayCircle />}
        </Button>
        {/* <Button className={styles.btn} shape="round" variant="text" onClick={onPlause}>
          <Music />
        </Button> */}
        <Button className={styles.btn} shape="round" variant="text" onClick={onStop}>
          <StopCircle />
        </Button>
      </View>
    </View>
  )
}
