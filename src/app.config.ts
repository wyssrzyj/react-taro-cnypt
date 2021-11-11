export default {
  pages: [
    'pages/index/index',
    'pages/factory/index',
    'pages/orders/index',
    'pages/personal/index',
    'pages/login/index',
    'pages/login/phoneLogin/index',
    'pages/login/phoneLogin/setPwd',
    'pages/login/pwdLogin/index',
    'pages/login/findPwd/index',
    'pages/login/findPwd/verify',
    'pages/login/findPwd/reset',
    'pages/factoryEntry/index',
    'pages/orderIssueEntry/index',
    'pages/publish/index',
    'pages/test/index'
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
