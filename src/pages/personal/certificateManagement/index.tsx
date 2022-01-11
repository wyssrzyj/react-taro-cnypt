import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'
import Taro from '@tarojs/taro'
function Management() {
  const accountNumber = () => {
    Taro.navigateTo({ url: '/pages/personal/enterpriseCertificate/index' })
  }
  const toReset = () => {
    Taro.navigateTo({ url: '/pages/personal/findingsOfAudit/index' })
  }
  return (
    <View>
      <View class="order" onClick={accountNumber}>
        <Text>企业证件管理</Text>
        <Text class="iconmy">
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>
      <View class="order" onClick={toReset}>
        <Text>审核结果</Text>
        <Text class="iconmy">
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>
    </View>
  )
}

export default Management
