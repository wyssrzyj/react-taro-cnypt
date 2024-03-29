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
      root: 'pages/sorkTicket', // 优产工票
      pages: ['index']
    },
    {
      root: 'pages/personal', // 我的
      pages: [
        'index',
        'myEexcellentProduct/index',
        'accountNumber/index',
        'modifyMobilePhoneNumber/index',
        'orderManagement/index', //我的订单
        'feedback/index',
        'applicationReceipt/index', //申请接单
        'resetPassword/index',
        'machiningOrderReceiving/index', //加工接单管理
        'orderReceiving/index', //接单管理
        'privacyAgreement/index', //隐私
        'userAgreement/index', //用户协议
        'personalInformation/index', //个人信息
        'newQualification/index', //新增资质
        'qualificationCertification/index', //资质认证
        'certificateManagement/index', //证件管理
        'enterpriseCertificate/index', //企业证件
        'findingsOfAudit/index' //审批结果.
      ]
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
      root: 'pages/search',
      pages: ['index']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'default' //接受两个参数 ['default', 'custom']: ['系统导航栏， 默认值', '隐藏系统导航栏']
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
}
