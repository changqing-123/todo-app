import SettingItem from '@/components/settingItem/settingItem'
import userInfoStore from '@/store/userInfoStore'
import { Button, Image, View } from '@tarojs/components'
import { settingList } from './constants'
import styles from './index.module.scss'

export default function Mine() {
  const userInfo = userInfoStore(state => state.userInfo)
  const setUserInfo = userInfoStore(state => state.setUserInfo)

  const onChangeAvatar = e => {
    setUserInfo({ avatarUrl: e.detail.avatarUrl })
  }

  const onChangeNickName = e => {
    setUserInfo({ nickName: e.detail.value })
  }

  const onChangeDesc = e => {
    console.log('desc', e)
  }

  return (
    <View className={styles.container}>
      <View className={styles.userInfo}>
        <Image className={styles.avatar} src={userInfo.avatarUrl} />
        <View className={styles.info}>
          <input
            className={styles.name}
            type="nickname"
            value={userInfo.nickName}
            onBlur={onChangeNickName}
            onChange={onChangeNickName}
          />
          <input className={styles.desc} value={'3213124~'} onBlur={onChangeDesc} />
        </View>
        <Button
          className={styles.setUserAvatarBtn}
          open-type="chooseAvatar"
          onChooseAvatar={onChangeAvatar}
        >
          头像
        </Button>
      </View>

      <View className={styles.settingArea}>
        {settingList.map(item => (
          <SettingItem
            text={item.text}
            icon={item.icon}
            rightBtn={item.rightBtn}
            onRightClick={item.onRightClick}
          />
        ))}
      </View>
    </View>
  )
}
