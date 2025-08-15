import { Button, Checkbox } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import { Delete } from "@taroify/icons"
import styles from './index.module.scss'

interface IProps {
  title: string;
  completed: boolean;
  onChange: (checked: boolean) => void;
  onDelete: () => void;
}
export default function ToDOItem({title, completed,onChange,onDelete}:IProps) {
  return (
    <View className={styles.container}>
      <Checkbox
      checked={completed} 
      className={styles.checkbox} 
      shape="square"
      onChange={onChange}
      style={{
        // '--checkbox-checked-icon-border-color':'#E9F4FF',
        // '--checkbox-checked-icon-background-color':'#ffffff'
      }}
      />
      <Text className={styles.text}>{title}</Text>
      <Button className={styles.delete} onClick={onDelete} variant="text"><Delete /></Button>
    </View>
  )
}
