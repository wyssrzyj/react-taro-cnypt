export default {
  pages: ['pages/index/index'],
  subpackages: [
    {
      root: 'pages/login', //登录页面
      pages: [
        'index',
        'phoneLogin/index',
        'phoneLogin/setPwd',
        'pwdLogin/index',
        'findPwd/index',
        'findPwd/verify',
        'findPwd/reset'
      ]
    },
    {
      root: 'pages/factory', //
      pages: ['index']
    },
    {
      root: 'pages/orders', // 找订单
      pages: ['index']
    },
    {
      root: 'pages/personal', // 我的
      pages: ['index']
    },
    {
      root: 'pages/factoryEntry', // 工厂入驻
      pages: ['index']
    },
    {
      root: 'pages/orderIssueEntry', // 发单商入驻
      pages: ['index']
    },
    {
      root: 'pages/publish', // 发布订单
      pages: ['index']
    },
    {
      root: 'pages/factoryDetail', // 工厂详情
      pages: ['index']
    },
    {
      root: 'pages/orderDetail', // 订单详情
      pages: ['index']
    },
    {
      root: 'pages/orderIssueDetail', // 发单商详情
      pages: ['index']
    },
    {
      root: 'pages/test',
      pages: ['index']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom' //接受两个参数 ['default', 'custom']: ['系统导航栏， 默认值', '隐藏系统导航栏']
    // enablePullDownRefresh: true,
    // onReachBottomDistance: 50
  }
}
