import Management from './management/index'
import { Image, View, Text } from '@tarojs/components'
import styles from './index.module.less'
import { redirectTo } from '@tarojs/taro'
import { Navbar } from '@/components'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'
const myEexcellentProduct = () => {
  const handleClick = () => {
    redirectTo({ url: '/pages/personal/index' })
  }
  return (
    <View>
      <View className={styles.imgFather}>
        <Image
          className={styles.img}
          src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/logo.png"
        />
        <Text className={styles.text}>优产平台</Text>
      </View>
      <Management />
    </View>
  )
}

export default myEexcellentProduct
