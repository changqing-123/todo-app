import { Button } from '@taroify/core'
import { Checked, Delete, Underway } from '@taroify/icons'
import { Text, View } from '@tarojs/components'
import styles from './index.module.scss'

interface IProps {
  title: string
  completed: boolean
  periods: string
  duration: number
  onChange: (checked: boolean) => void
  onDelete: () => void
}
export default function ToDOItem({
  title,
  completed,
  onChange,
  onDelete,
  periods,
  duration
}: IProps) {
  return (
    <View className={`${styles.container} ${completed ? styles.completed : ''}`}>
      <View className={styles.itemStatus}>
        {completed ? (
          <Checked className={styles.completedStatus} />
        ) : (
          <Underway className={styles.unCompletedStatus} onClick={onChange} />
        )}
      </View>
      <View className={styles.text}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.periods}>{duration ? duration : null}</Text>
      </View>
      <Button className={styles.delete} onClick={onDelete} variant="text">
        <Delete />
      </Button>
    </View>
  )
}
