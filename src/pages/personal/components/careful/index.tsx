import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.less'
import Taro from '@tarojs/taro'

const careful = ({ userInfo }) => {
  console.log(userInfo)
  const handleClick = () => {
    Taro.redirectTo({ url: '/pages/personal/userAgreement/index' })
  }
  const privacy = () => {
    Taro.redirectTo({ url: '/pages/personal/privacyAgreement/index' })
  }
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
        <View
          onClick={() => {
            handleClick()
          }}
        >
          用户协议
        </View>
        　 |　
        <View
          onClick={() => {
            privacy()
          }}
        >
          隐私政策
        </View>
      </View>
    </View>
  )
}

export default careful
