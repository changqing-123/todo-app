import { View, Text, Image } from '@tarojs/components'
import styles from './toDoItem.module.scss'
import { ITodoItem } from '../../interface'

interface IProps {
  title: string
  completed: boolean
  periods?: string
  duration?: number
  onChange: (value: boolean) => void
  onDelete: () => void
}

export default function ToDoItem(props: IProps) {
  const { title, completed, periods, duration, onChange, onDelete } = props

  // 格式化时间显示
  const formatDuration = (seconds: number = 0) => {
    if (!seconds) return '未设置时长'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}小时${minutes}分钟`
    } else if (minutes > 0) {
      return `${minutes}分钟${secs}秒`
    } else {
      return `${secs}秒`
    }
  }

  // 格式化日期显示
  const formatDate = (dateString: string = '') => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <View className={styles.toDoItem}>
      <View className={styles.left}>
        <View 
          className={`${styles.checkbox} ${completed ? styles.checked : ''}`}
          onClick={() => onChange(!completed)}
        >
          {completed && <View className={styles.checkmark}></View>}
        </View>
        <View className={styles.content}>
          <Text className={`${styles.title} ${completed ? styles.completed : ''}`}>
            {title}
          </Text>
          <View className={styles.info}>
            {periods && (
              <Text className={styles.date}>{formatDate(periods)}</Text>
            )}
            {duration !== undefined && (
              <Text className={styles.duration}>{formatDuration(duration)}</Text>
            )}
          </View>
        </View>
      </View>
      <View className={styles.delete} onClick={onDelete}>
        <Image
          className={styles.deleteIcon}
          src='https://storage.360buyimg.com/hawley-common/static/img/delete.png'
        />
      </View>
    </View>
  )
}