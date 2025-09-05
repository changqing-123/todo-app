import useTimer from '@/hooks/useTimer'
import { ITodoItem } from '@/interface'
import { Text, View } from '@tarojs/components'
import React from 'react'
import styles from './index.module.scss'

interface IProps {
  timerType: ITodoItem['timer_type']
  duration: number
  title: string
  style?: React.CSSProperties
  active: boolean
  onPlause: () => void
}
export default function TimerCom({
  timerType,
  duration,
  title,
  style = {},
  onPlause,
  active
}: IProps) {
  const { timeStr } = useTimer({ timerType, duration, paused: !active })

  return (
    <View className={styles.timerArea} style={style} onClick={onPlause}>
      <Text className={styles.title}>{title}</Text>
      <Text className={styles.time}>{timeStr}</Text>
      <Text className={styles.status}>{active ? '专注中' : '已暂停'}</Text>
    </View>
  )
}
