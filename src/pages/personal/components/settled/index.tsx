import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import styles from './index.module.less'
import Taro from '@tarojs/taro'

const settled = ({ type }) => {
  let enterprise =
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/enterprise.png'
  let factory =
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/factory.png'
  const toOrderEntry = () => {
    console.log(type.userName)

    if (type.userName !== undefined) {
      Taro.navigateTo({
        url: '/pages/orderIssueEntry/index'
      })
    } else {
      Taro.navigateTo({ url: '/pages/login/index' })
    }
  }
  const toFactoryEntry = () => {
    if (type.userName !== undefined) {
      Taro.navigateTo({
        url: '/pages/factoryEntry/index'
      })
    } else {
      Taro.navigateTo({ url: '/pages/login/index' })
    }
  }
  return (
    <View>
      <View className={styles.order} onClick={toOrderEntry}>
        <View className={styles.content}>
          <View className={styles.remove}>
            <Image className={styles.removeIcon} src={enterprise}></Image>
          </View>
          <Text>发单商入驻</Text>
        </View>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#666"></AtIcon>
        </Text>
      </View>
      <View className={styles.order} onClick={toFactoryEntry}>
        <View className={styles.content}>
          <View className={styles.remove}>
            <Image className={styles.removeIcon} src={factory}></Image>
          </View>
          <Text>工厂入驻</Text>
        </View>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#666"></AtIcon>
        </Text>
      </View>
    </View>
  )
}

export default settled
