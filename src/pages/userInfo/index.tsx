import { View } from '@tarojs/components'
import styles from './index.module.scss'
export default function UserInfoPage() {
  return (
    <View>
      <input placeholder='头像'/>
      <input placeholder='昵称'/>
    </View>
  )
}
