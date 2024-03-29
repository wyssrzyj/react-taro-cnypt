import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'
import Taro from '@tarojs/taro'

const Management = () => {
  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/personal/userAgreement/index' })
  }
  const privacy = () => {
    Taro.navigateTo({ url: '/pages/personal/privacyAgreement/index' })
  }
  return (
    <View>
      <View class="order">
        <Text>当前版本</Text>
        <Text class="icon">v1.0.1</Text>
      </View>
      <View
        class="order"
        onClick={() => {
          handleClick()
        }}
      >
        <Text>用户协议</Text>
        <Text class="iconmy">
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>
      <View
        class="order"
        onClick={() => {
          privacy()
        }}
      >
        <Text>隐私政策</Text>
        <Text class="iconmy">
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>
    </View>
  )
}

export default Management
