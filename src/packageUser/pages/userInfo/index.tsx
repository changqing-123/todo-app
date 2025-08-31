import userInfoStore from '@/store/userInfoStore'
import { Input, Picker, Popup } from '@taroify/core'
import { Button, Image, Textarea, View } from '@tarojs/components'
import { useState } from 'react'
import styles from './index.module.scss'

const genderList = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '保密', value: 'secret' }
]
export default function UserInfoPage() {
  const [openPicker, setOpenPicker] = useState(false)
  const userInfo = userInfoStore(state => state.userInfo)
  const setUserInfo = userInfoStore(state => state.setUserInfo)
  const [submitValue, setSubmitValue] = useState<any>({
    avatarUrl: userInfo.avatarUrl,
    nickName: userInfo.nickName
  })

  const onChangeAvatar = e => {
    console.log('onChangeAvatar', e)
    setSubmitValue(preVal => ({ ...preVal, avatarUrl: e.detail.avatarUrl }))
  }
  const onGenderChange = (value: string) => {
    console.log('gender change', value)
    setSubmitValue(preVal => ({ ...preVal, gender: value?.[0] }))
    setOpenPicker(false)
  }

  const onChangeNickName = e => {
    console.log('e:', e)
    setSubmitValue(preVal => ({ ...preVal, nickName: e.detail.value }))
  }

  const onChangeDesc = e => {
    console.log('onChangeDesc:', e.detail.value)
    setSubmitValue(preVal => ({ ...preVal, desc: e.detail.value }))
  }

  const onSaveInfo = () => {
    console.log('submitValue:', submitValue)
    setUserInfo({ ...submitValue })
  }
  return (
    <View className={styles.container}>
      <View style={{ marginBottom: '20px' }}>
        <View className={styles.itemContainer}>
          <Button
            className={styles.avatarBtn}
            open-type="chooseAvatar"
            onChooseAvatar={onChangeAvatar}
          >
            <text>头像</text>
            <Image className={styles.avatar} src={userInfo.avatarUrl} />
          </Button>
        </View>
        <View className={styles.itemContainer}>
          <Input
            className={styles.nickNameInput}
            type="nickname"
            value={userInfo.nickName}
            placeholder="昵称"
            onBlur={onChangeNickName}
            onChange={onChangeNickName}
          />
        </View>
        <View className={styles.itemContainer}>
          <Input
            className={styles.descInput}
            placeholder="性别"
            value={genderList.find(item => item.value === userInfo.gender)?.label}
            onFocus={() => setOpenPicker(true)}
          />
        </View>
        <View className={styles.itemContainer}>
          <Textarea
            className={styles.descInput}
            placeholder="介绍一下自己~"
            showCount
            maxlength={50}
            onBlur={onChangeDesc}
          />
        </View>
      </View>
      <Button className={styles.saveBtn} onClick={onSaveInfo}>
        保存更改
      </Button>
      <Popup open={openPicker} rounded placement="bottom">
        <Picker
          title="选择性别"
          columns={genderList}
          cancelText="取消"
          confirmText="确定"
          onCancel={() => setOpenPicker(false)}
          onConfirm={onGenderChange}
        ></Picker>
      </Popup>
    </View>
  )
}
