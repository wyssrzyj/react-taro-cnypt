import { Image, View, Text } from '@tarojs/components'
import styles from './index.module.less'
import Taro from '@tarojs/taro'
import { Navbar } from '@/components'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'
function index() {
  const handleClick = () => {
    Taro.redirectTo({ url: '/pages/personal/myEexcellentProduct/index' })
  }
  return (
    <View className={styles.phoneLogin}>
      <Navbar>
        <View className={styles.navbars}>
          <Image
            src={BACK_ICON}
            className={styles.backs}
            onClick={handleClick}
          ></Image>
          <View className={styles.navTitles}>隐私协议</View>
        </View>
      </Navbar>
      {/* 内容 */}
      <View className={styles.container}>
        <View className={styles.top}>
          <Text>《优产云隐私政策》</Text>
          <View className={styles.top}>
            <Text>【本协议于2021年10月21日最新修订】</Text>
          </View>
        </View>
        <View className={styles.content}>
          <Text>提示条款</Text>
        </View>
        <View className={styles.content}>
          <Text>
            您的信任对我们非常重要，我们深知个人信息对您的重要性，我们将按法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。鉴此，优产云服务提供者（或简称“我们”）制定本《优产云隐私政策》（下称“本政策”）并提醒您：;
          </Text>
        </View>
      </View>
    </View>
  )
}

export default index
