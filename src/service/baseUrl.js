const getBaseUrl = url => {
  let BASE_URL = ''

  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL.
    BASE_URL = 'http://192.168.69.130:8888'
  } else if (process.env.NODE_ENV === 'production') {
    // 生产环境
    BASE_URL = 'https://cn.uchat.com.cn/test/gateway'
    // BASE_URL = 'http://192.168.69.88:8888' //本地新数据库
    // BASE_URL = 'https://cn.uchat.com.cn/gateway'
  } else {
    // 测试环境
    BASE_URL = 'https://cn.uchat.com.cn/test/gateway'
    // BASE_URL = 'https://cn.uchat.com.cn/gateway'
    // BASE_URL = 'http://47.97.217.13:8888'
  }
  return BASE_URL
}

export default getBaseUrl
