import Management from './management/index'
import { View, Image } from '@tarojs/components'
import { redirectTo } from '@tarojs/taro'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const AccountNumber = () => {
  return (
    <View>
      <Management />
    </View>
  )
}

export default AccountNumber
