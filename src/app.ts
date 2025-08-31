import Taro, { eventCenter, getUserProfile, showLoading, useLaunch } from '@tarojs/taro'
import { PropsWithChildren } from 'react'

import { getUserInfo, login } from './apis/todoServices'
import './app.scss'
import useGetTodoList from './hooks/useGetTodoList'
import userInfoStore from './store/userInfoStore'

function App({ children }: PropsWithChildren<any>) {
  const setUserInfo = userInfoStore(state => state.setUserInfo)
  const { run } = useGetTodoList()

  useLaunch(() => {
    console.log('App launched.')
  })

  const getUserInfoFn = async () => {
    try {
      showLoading({ title: '登录中...' })
      const userDefault = await getUserProfile({ desc: '获取用户信息' })
      console.log('userDefault', userDefault)
      setUserInfo(userDefault.userInfo)
      const wxlogRes = await Taro.login()
      const logRes = await login(wxlogRes.code)
      Taro.setStorageSync('token', logRes.data.data.token)
      const userRes = await getUserInfo()
      if (userRes.data.data.avatar_url && userRes.data.data.name) {
        setUserInfo(userRes.data.data)
      }
      run()
      Taro.showToast({ title: '登录成功', icon: 'success' })
      Taro.hideLoading()
    } catch (err) {
      console.error('获取用户信息失败:', err.errMsg)
      Taro.showToast({ title: err.errMsg, icon: 'error' })
    }
  }

  eventCenter.on('needLogin', () => {
    getUserInfoFn()
  })

  // children 是将要会渲染的页面
  return children
}

export default App
