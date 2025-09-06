import { Edit } from '@taroify/icons'
import Taro from '@tarojs/taro'

const gotoUserInfoPage = () => {
  Taro.navigateTo({ url: '/packageUser/pages/userInfo/index' })
}

// const gotoStatsPage = () => {
//   Taro.navigateTo({ url: '/packageStats/pages/stats/index' })
// }
export const settingList = [
  { text: '修改个人信息', icon: <Edit />, rightBtn: true, onRightClick: gotoUserInfoPage }
  // { text: '我的任务汇总信息', icon: <Column />, rightBtn: true, onRightClick: gotoStatsPage }
]
