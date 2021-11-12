import { Base64 } from 'js-base64'
import Taro from '@tarojs/taro'
import CryptoJS from 'crypto-js'

const accesskey = 'rARmhjb96YXVRSMHJEBD2uFnQ0ItWn'
const accessid = 'LTAI5tMLunJqU333pVvDrwCd'
const host = 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com' //bucket的外网域名
const policyText = {
  expiration: '2030-01-01T12:00:00.000Z', //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
  conditions: [
    ['content-length-range', 0, 1048576000] // 设置上传文件的大小限制
  ]
}

const getOssSecret = accesskey => {
  const policyBase64 = Base64.encode(JSON.stringify(policyText))
  const message = policyBase64
  const bytes = CryptoJS.HmacSHA1(message, accesskey, { asBytes: true })
  const signature = CryptoJS.enc.Base64.stringify(bytes)
  return { policyBase64: policyBase64, signature: signature }
}

export const upload = async filePath => {
  // 图片路径不包含 'http://tmp/' 则图片没有变化 不需要重新上传
  if (!filePath.includes('http://tmp/')) {
    return filePath
  }
  const { policyBase64, signature } = getOssSecret(accesskey)
  const imgPath = `capacity-platform/mobile/images/${filePath.replace(
    'http://tmp/',
    ''
  )}`
  const res = await Taro.uploadFile({
    url: host, //bucket的外网域名 url
    filePath: filePath, //要上传文件资源的路径
    name: 'file', //必须填file
    formData: {
      key: imgPath, //object_key
      policy: policyBase64,
      OSSAccessKeyId: accessid,
      success_action_status: '200',
      signature: signature
      // 'x-oss-security-token': SecurityToken //该字段必填，阿里云的示例上没有写
    }
  })
  if (res.statusCode === 200) {
    return `${host}/${imgPath}`
  }
  return ''
}
