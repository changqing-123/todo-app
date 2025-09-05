import { updateTodo } from '@/apis/todoServices'
import TimerCom from '@/components/timerCom'
import { ITodoItem } from '@/interface'
import { Button, Dialog } from '@taroify/core'
import { PauseCircle, PlayCircle, StopCircle } from '@taroify/icons'
import { Text, View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import styles from './index.module.scss'

export default function TimerPage() {
  const router = Taro.useRouter()
  const { id, timer_type, duration, title } = router.params
  const [active, setActive] = useState(true)
  // 开始计时时间
  const [startTime, setStartTime] = useState(0)
  // 累计计时时间
  const [totalElapsedTime, setTotalElapsedTime] = useState(0)

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

  // 完成操作
  const finishFn = async (current, totalDuration) => {
    try {
      const res = await updateTodo({
        id: Number(id),
        end_time: current,
        duration: totalDuration,
        completed: true
      })
      console.log('res', res)
      Taro.navigateBack()
    } catch (error) {
      Taro.navigateBack()
      console.error(error)
    }
  }

  // 计算总时长
  const calculateTotalDuration = () => {
    const current = Date.now()
    // 计算当前时段时长
    const currentDuration = active && startTime > 0 ? current - startTime : 0
    // 累计时长 单位：秒
    const totalDuration = (totalElapsedTime + currentDuration) / 1000
    return { current, totalDuration }
  }

  // 被动完成任务
  const onStop = () => {
    const { current, totalDuration } = calculateTotalDuration()
    setActive(false)
    Dialog.confirm({
      title: '提示',
      message: '确定完成任务并退出吗？',
      onConfirm: () => {
        finishFn(current, totalDuration)
      }
    })
  }

  // 自动完成任务
  const onFinish = (onReset: () => void) => {
    const { current, totalDuration } = calculateTotalDuration()
    setTotalElapsedTime(prev => prev + (current - startTime))
    setStartTime(0)
    setActive(false)

    Dialog.confirm({
      title: '太棒了，您已经完成当前的任务啦！！！',
      message: '点击完成可回到任务列表，点击继续可再次执行哦~',
      confirm: '继续',
      cancel: '完成',
      onConfirm: () => {
        const now = Date.now()
        setStartTime(now)
        setActive(true)
        onReset()
      },
      onCancel: () => {
        finishFn(current, totalDuration)
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
          title={title || ''}
          timerType={(timer_type as ITodoItem['timer_type']) || 'forward'}
          duration={Number(duration)}
          onFinish={onFinish}
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
