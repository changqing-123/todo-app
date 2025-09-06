export default defineAppConfig({
  lazyCodeLoading: 'requiredComponents',
  pages: ['pages/index/index', 'pages/stats/index', 'pages/mine/index'],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '待办',
        iconPath: './public/tabicon/todo.jpg',
        selectedIconPath: './public/tabicon/todo-active.jpg'
      },
      {
        pagePath: 'pages/stats/index',
        text: '统计',
        iconPath: './public/tabicon/stats.jpg',
        selectedIconPath: './public/tabicon/stats-active.jpg'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './public/tabicon/mine.jpg',
        selectedIconPath: './public/tabicon/mine-active.jpg'
      }
    ],
    selectedColor: '#27296d',
    backgroundColor: '#ffffff',
    borderStyle: 'white'
  },

  subPackages: [
    {
      root: 'packageUser',
      pages: ['pages/userInfo/index']
    },
    {
      root: 'packageTimer',
      pages: ['pages/timer/index']
    }
    // {
    //   root: 'packageStats',
    //   pages: ['pages/stats/index']
    // }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
