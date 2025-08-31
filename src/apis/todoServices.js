import Taro from '@tarojs/taro'

const BASE_URL = 'https://rqtask.xin/api'

let isLoginDialogShowing = false

// 显示登录弹窗
const showLoginDialog = async () => {
  if (isLoginDialogShowing) return false

  isLoginDialogShowing = true
  return new Promise(resolve => {
    Taro.showModal({
      title: '登录过期',
      content: '请重新登录',
      showCancel: true,
      confirmText: '去登录',
      cancelText: '取消',
      success: res => {
        isLoginDialogShowing = false
        if (res.confirm) {
          // 触发全局登录事件
          Taro.eventCenter.trigger('needLogin')
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail: () => {
        isLoginDialogShowing = false
        resolve(false)
      }
    })
  })
}

// 登录
export const login = async code => {
  try {
    const result = await Taro.request({
      url: `${BASE_URL}/register`,
      method: 'POST',
      data: {
        code
      }
    })

    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

// 获取用户信息
export const getUserInfo = async () => {
  try {
    const result = await Taro.request({
      url: `${BASE_URL}/userinfo`,
      method: 'GET',
      header: {
        Authorization: `Bearer ${Taro.getStorageSync('token')}`
      }
    })
    if (result.statusCode === 401) {
      // Token 过期或无效
      console.log('登录已过期=====')

      Taro.removeStorageSync('token')
      await showLoginDialog()
      throw new Error('登录已过期')
    }
    return result
  } catch (err) {
    console.log('-----===>', err)
    throw err
  }
}

// 获取任务列表
export const getTodoList = async () => {
  try {
    const token = Taro.getStorageSync('token')
    const result = await Taro.request({
      url: `${BASE_URL}/getTodoList`,
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`
      }
    })
    if (result.statusCode === 401) {
      // Token 过期或无效
      Taro.removeStorageSync('token')
      await showLoginDialog()
      throw new Error('登录已过期')
    }
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

// 创建任务
export const createTodo = async ({ title, priority }) => {
  try {
    const token = Taro.getStorageSync('token')
    const result = await Taro.request({
      url: `${BASE_URL}/create`,
      method: 'POST',
      data: {
        title,
        priority
      },
      header: {
        Authorization: `Bearer ${token}`
      }
    })
    if (result.statusCode === 401) {
      // Token 过期或无效
      Taro.removeStorageSync('token')
      await showLoginDialog()
      throw new Error('登录已过期')
    }
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

// 删除todo任务
export const deleteTodo = async id => {
  try {
    const token = Taro.getStorageSync('token')
    const result = await Taro.request({
      url: `${BASE_URL}/delete/${id}`,
      method: 'DELETE',
      header: {
        Authorization: `Bearer ${token}`
      }
    })
    if (result.statusCode === 401) {
      // Token 过期或无效
      Taro.removeStorageSync('token')
      await showLoginDialog()
      throw new Error('登录已过期')
    }
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

// 完成任务
export const completeTodo = async ({ id, completed }) => {
  try {
    const token = Taro.getStorageSync('token')
    const result = await Taro.request({
      url: `${BASE_URL}/complete`,
      method: 'POST',
      data: {
        id,
        completed
      },
      header: {
        Authorization: `Bearer ${token}`
      }
    })
    if (result.statusCode === 401) {
      // Token 过期或无效
      Taro.removeStorageSync('token')
      await showLoginDialog()
      throw new Error('登录已过期')
    }
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}
