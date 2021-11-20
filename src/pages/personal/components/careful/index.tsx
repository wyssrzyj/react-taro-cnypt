import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import styles from './index.module.less'

const Careful = props => {
  const { userInfo } = props

  let telephone =
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/telephone.png'
  let time =
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/time.png'
  return (
    <View className={styles.bottoms}>
      {/* // <View className={styles.bottoms}> */}
      <View className={styles.flex}>
        <View>
          <Image src={telephone} className={styles.icon}></Image>
          <Text className={styles.margin}>400-82996660</Text>
        </View>
        <View className={styles.kong}></View>
        <View>
          <Image src={time} className={styles.icon}></Image>

          <Text className={styles.margin}>9:00 - 18:00</Text>
        </View>
      </View>
      <View className={styles.center}>
        <Text> 用户协议 | 隐私政策</Text>
      </View>
    </View>
  )
}

export default Careful
