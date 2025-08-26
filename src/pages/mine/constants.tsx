import { Edit, InfoOutlined, ShopCollectOutlined } from '@taroify/icons'
import Taro from '@tarojs/taro'

const gotoUserInfoPage = () => {
  Taro.navigateTo({ url: '/packageUser/pages/userInfo/index' })
}

export const settingList = [
  { text: '修改个人信息', icon: <Edit />, rightBtn: true, onRightClick: gotoUserInfoPage },
  {
    text: '主题商店',
    icon: <ShopCollectOutlined />,
    rightBtn: true,
    onRightClick: () => {
      console.log('修改主题')
    }
  },
  {
    text: '帮助中心',
    icon: <InfoOutlined />,
    rightBtn: true,
    onRightClick: () => {
      console.log('帮助中心')
    }
  }
]
