import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import styles from './index.module.less'
import Taro from '@tarojs/taro'

function index() {
  let enterprise =
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/enterprise.png'
  let factory =
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/factory.png'
  const toOrderEntry = () => {
    Taro.redirectTo({
      url: '/pages/orderIssueEntry/index'
    })
  }
  const toFactoryEntry = () => {
    Taro.redirectTo({
      url: '/pages/factoryEntry/index'
    })
  }
  return (
    <View>
      <View className={styles.order} onClick={toOrderEntry}>
        <View className={styles.remove}>
          <Image className={styles.removeIcon} src={enterprise}></Image>
        </View>
        <Text>发单商入驻</Text>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#666"></AtIcon>
        </Text>
      </View>
      <View className={styles.order} onClick={toFactoryEntry}>
        <View className={styles.remove}>
          <Image className={styles.removeIcon} src={factory}></Image>
        </View>
        <Text>工厂入驻</Text>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#666"></AtIcon>
        </Text>
      </View>
    </View>
  )
}

export default index
