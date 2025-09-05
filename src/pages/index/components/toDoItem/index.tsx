import { updateTodo } from '@/apis/todoServices'
import { ITodoItem } from '@/interface'
import { Dialog } from '@taroify/core'
import { Checked, Delete, Play } from '@taroify/icons'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.scss'

interface IProps {
  title: string
  data: ITodoItem
  onChange: (checked: boolean) => void
  onDelete: () => void
}
export default function ToDOItem({ title, data, onChange, onDelete }: IProps) {
  const onPlay = async id => {
    try {
      const startTime = Date.now()
      const res = await updateTodo({ id: data.id, start_time: startTime })
      console.log('res', res)
      Taro.navigateTo({
        url: `/packageTimer/pages/timer/index?id=${data.id}&start_time=${startTime}`
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View className={`${styles.container} ${data.completed ? styles.completed : ''}`}>
      <View className={styles.itemStatus}>
        <Checked
          className={data.completed ? styles.completedStatus : styles.unCompletedStatus}
          onClick={() => {
            onChange(!data.completed)
          }}
        />
      </View>
      <View className={styles.text}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.periods}>{data.duration ? data.duration : null}min</Text>
      </View>
      <View className={styles.delete}>
        {data.completed ? null : <Play style={{ marginRight: '40rpx' }} onClick={onPlay} />}
        <Delete
          onClick={() => {
            Dialog.confirm({
              title: '提示',
              message: '确定要删除吗？',
              onConfirm: () => {
                onDelete()
              }
            })
          }}
        />
      </View>
    </View>
  )
}
