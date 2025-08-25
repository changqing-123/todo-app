import { Button, Checkbox } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import { Delete } from "@taroify/icons"
import styles from './index.module.scss'

interface IProps {
  title: string;
  completed: boolean;
  periods: string;
  onChange: (checked: boolean) => void;
  onDelete: () => void;
}
export default function ToDOItem({title, completed,onChange,onDelete, periods}:IProps) {
  return (
    <View className={styles.container}>
      <Checkbox
      checked={completed} 
      className={styles.checkbox} 
      shape="square"
      onChange={onChange}
      />
      <View className={styles.text}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.periods}>{periods}</Text>
      </View>
      <Button className={styles.delete} onClick={onDelete} variant="text"><Delete /></Button>
    </View>
  )
}
