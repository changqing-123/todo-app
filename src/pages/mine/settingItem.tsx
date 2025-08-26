import { Text, View } from '@tarojs/components'
import styles from './settingItem.module.scss';
import { Arrow } from '@taroify/icons';

interface IProps {
  text: string,
  icon?: any,
  rightIcon?: any,
  rightBtn?: boolean,
  onRightClick: () => void
}
export default function SettingItem({
  text,
  icon,
  rightIcon,
  rightBtn,
  onRightClick
}:IProps) {
  return (
    <View className={styles.container} onClick={onRightClick}>
      <View className={styles.icon}>{icon??''}</View>
      <Text className={styles.text}>{text}</Text>
      {rightBtn&&<View className={styles.right}>
        <View className={styles.rightIcon}>{rightIcon??''}</View>
        <View className={styles.rightBtn}>
          <Arrow />
        </View>
      </View>}
    </View>
  )
}
