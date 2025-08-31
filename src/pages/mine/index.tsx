import { updateUserInfo, uploadAvatar } from '@/apis/todoServices'
import SettingItem from '@/components/settingItem/settingItem'
import userInfoStore from '@/store/userInfoStore'
import { Button, Image, Input, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { settingList } from './constants'
import styles from './index.module.scss'

export default function Mine() {
  const userInfo = userInfoStore(state => state.userInfo)
  const setUserInfo = userInfoStore(state => state.setUserInfo)
  const [userdesc, setUserDesc] = useState(userInfo.desc)

  const onChangeAvatar = async e => {
    try {
      Taro.showLoading({ title: '上传中...' })

      // 获取选择的头像临时路径
      const tempFilePath = e.detail.avatarUrl
      console.log('选择的头像:', tempFilePath)

      // 先更新本地显示
      setUserInfo({ ...userInfo, avatarUrl: tempFilePath })

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
          setUserInfo({
            ...userInfo,
            avatarUrl: serverAvatarUrl
          })
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
      setUserInfo(userInfo)
      Taro.showToast({ title: error.message || '头像上传失败', icon: 'error' })
    } finally {
      Taro.hideLoading()
    }
  }

  const onChangeNickName = async e => {
    console.log('nickName', e.detail.value)
    setUserInfo({ nickName: e.detail.value })
    if (e.detail.value) {
      try {
        const res = await updateUserInfo({ name: e.detail.value })

        console.log('onChangeNickName-res', res)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  const onBlurDesc = async e => {
    console.log('desc', e)
    if (e.detail.value) {
      try {
        const res = await updateUserInfo({ user_desc: e.detail.value })
        setUserInfo({ desc: e.detail.value })
        console.log('onChangeDesc-res', res)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  useEffect(() => {
    setUserDesc(userInfo.desc)
  }, [userInfo])

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
          <Input
            className={styles.desc}
            value={userdesc}
            onInput={e => {
              setUserDesc(e.detail.value)
            }}
            onBlur={onBlurDesc}
          />
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
