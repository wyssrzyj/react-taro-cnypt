import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import styles from './index.module.less'

function index() {
  return (
    <View className={styles.bottoms}>
      <View className={styles.flex}>
        <View>
          <AtIcon value="clock" size="20" color="#999999"></AtIcon>
          <Text className={styles.margin}>400-82996660</Text>
        </View>
        <View className={styles.kong}></View>
        <View>
          <AtIcon value="clock" size="20" color="#999999"></AtIcon>
          <Text className={styles.margin}>9:00 - 18:00</Text>
        </View>
      </View>
      <View className={styles.center}>
        <Text> 用户协议 | 隐私政策</Text>
      </View>
    </View>
  )
}

export default index
