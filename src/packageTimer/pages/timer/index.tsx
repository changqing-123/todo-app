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
  const router = Taro.useRouter()

  useDidShow(() => {
    console.log('timer page show.', router)
  })

  const onPlause = () => {
    setActive(prev => !prev)
  }

  const onStop = () => {
    Dialog.confirm({
      title: '提示',
      message: '确定完成任务并退出吗？',
      onConfirm: async () => {
        try {
          const res = await updateTodo({
            id: Number(router.params.id),
            end_time: Date.now(),
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
          onPlause={onPlause}
          title="计时"
          timerType="forward"
          duration={60 * 20}
        />
      </View>
      <View className={styles.btnArea}>
        <Button className={styles.btn} shape="round" variant="text" onClick={onPlause}>
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
