import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'
import Taro from '@tarojs/taro'
function Management() {
  const accountNumber = () => {
    Taro.redirectTo({ url: '/pages/personal/modifyMobilePhoneNumber/index' })
  }
  const toReset = () => {
    Taro.redirectTo({ url: '/pages/personal/resetPassword/index' })
  }
  return (
    <View>
      <View class="order" onClick={accountNumber}>
        <Text>修改手机号</Text>
        <Text class="iconmy">
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>
      <View class="order" onClick={toReset}>
        <Text>修改密码</Text>
        <Text class="iconmy">
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>
    </View>
  )
}

export default Management
