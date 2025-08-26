import Taro from '@tarojs/taro'

const BASE_URL = 'http://47.93.63.0:3000/api'

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
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}
