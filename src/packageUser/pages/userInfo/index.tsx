import { updateUserInfo, uploadAvatar } from '@/apis/todoServices'
import userInfoStore from '@/store/userInfoStore'
import { Button, Input, Picker, Popup } from '@taroify/core'
import { Image, Textarea, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import styles from './index.module.scss'

const genderList = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '保密', value: 'secret' }
]
export default function UserInfoPage() {
  const [openPicker, setOpenPicker] = useState(false)
  const { avatarUrl, nickName, gender, desc } = userInfoStore(state => state.userInfo)
  const setUserInfo = userInfoStore(state => state.setUserInfo)
  const [submitValue, setSubmitValue] = useState<any>({
    avatarUrl: avatarUrl,
    nickName: nickName,
    gender: gender,
    desc: desc
  })

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

  const onChangeAvatar = async e => {
    try {
      Taro.showLoading({ title: '上传中...' })

      // 获取选择的头像临时路径
      const tempFilePath = e.detail.avatarUrl
      console.log('选择的头像:', tempFilePath)

      // 先更新本地显示
      setSubmitValue(preVal => ({ ...preVal, avatarUrl: tempFilePath }))

      // 上传文件到服务器
      const uploadResult = await uploadAvatar(tempFilePath)
      console.log('上传结果:', uploadResult)

      if (uploadResult.statusCode === 200) {
        // 获取服务器返回的文件URL
        const serverAvatarUrl = uploadResult.data.url

        // 更新用户信息
        const res = await updateUserInfo({ avatar_url: serverAvatarUrl })

        if (res.statusCode === 200) {
          // 更新成功，使用服务器URL
          setSubmitValue(preVal => ({ ...preVal, avatarUrl: serverAvatarUrl }))
          Taro.showToast({ title: '头像更新成功', icon: 'success' })
        } else {
          throw new Error('更新用户信息失败')
        }
      } else {
        throw new Error(uploadResult.message || '上传失败')
      }
    } catch (error) {
      console.error('头像上传失败:', error)
      // 恢复原来的头像
      setSubmitValue(preVal => ({ ...preVal, avatarUrl: avatarUrl }))
      Taro.showToast({ title: error.message || '头像上传失败', icon: 'error' })
    } finally {
      Taro.hideLoading()
    }
  }

  const onSaveInfo = async () => {
    console.log('submitValue:', submitValue)
    try {
      const submitRes = await updateUserInfo({
        name: submitValue.nickName,
        gender: submitValue.gender,
        user_desc: submitValue.desc,
        avatar_url: submitValue.avatarUrl
      })
      console.log('submitRes', submitRes)
      if (submitRes.statusCode === 200) {
        setUserInfo({ ...submitValue })
        Taro.showToast({ title: '保存成功', icon: 'success' })
      }
    } catch (error) {
      console.log('error', error)
      Taro.showToast({ title: error.message || '保存失败', icon: 'error' })
    }
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
            <View className={styles.avatarBtnBox}>
              <text>头像</text>
              <Image className={styles.avatar} src={submitValue.avatarUrl} />
            </View>
          </Button>
        </View>
        <View className={styles.itemContainer}>
          <Input
            className={styles.nickNameInput}
            type="nickname"
            value={submitValue.nickName}
            placeholder="昵称"
            onBlur={onChangeNickName}
            onChange={onChangeNickName}
          />
        </View>
        <View className={styles.itemContainer}>
          <Input
            className={styles.descInput}
            placeholder="性别"
            value={genderList.find(item => item.value === submitValue.gender)?.label}
            onFocus={() => setOpenPicker(true)}
          />
        </View>
        <View className={styles.itemContainer}>
          <Textarea
            className={styles.descInput}
            placeholder="介绍一下自己~"
            showCount
            maxlength={50}
            value={submitValue.desc}
            onInput={onChangeDesc}
            onBlur={onChangeDesc}
          />
        </View>
      </View>
      <Button shape="round" className={styles.saveBtn} onClick={onSaveInfo}>
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
