export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/remind/index',
    'pages/stats/index',
    'pages/mine/index'
  ],
  tabBar:{
    list:[
      {
        pagePath:'pages/index/index',
        text:'待办',
        iconPath:'./public/tabicon/todo.jpg',
        selectedIconPath:'./public/tabicon/todo-active.jpg'
      },
      {
        pagePath:'pages/remind/index',
        text:'计时',
        iconPath:'./public/tabicon/clock.jpg',
        selectedIconPath:'./public/tabicon/clock-active.jpg'
      },
      {
        pagePath:'pages/stats/index',
        text:'统计',
        iconPath:'./public/tabicon/stats.jpg',
        selectedIconPath:'./public/tabicon/stats-active.jpg'
      },
      {
        pagePath:'pages/mine/index',
        text:'我的',
        iconPath:'./public/tabicon/mine.jpg',
        selectedIconPath:'./public/tabicon/mine-active.jpg'
      }
    ],
    selectedColor:'#004572',
    backgroundColor:'#E9F4FF',
    borderStyle:'white'
  },

  subPackages:[
    {
      root:'packageUser',
      pages:[
        'pages/userInfo/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#E9F4FF',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
