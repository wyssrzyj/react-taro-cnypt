import * as OSS from './aliyun-oss-sdk.min.js'

const client = new OSS({
  accessKeyId: 'LTAI5tMLunJqU333pVvDrwCd',
  accessKeySecret: 'rARmhjb96YXVRSMHJEBD2uFnQ0ItWn',
  regoin: 'oss-cn-hangzhou',
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  bucket: 'capacity-platform',
  timeout: 600000
})

export default client
