import Management from './management/index'
import { Image, View, Text } from '@tarojs/components'
import styles from './index.module.less'

import { AtNavBar } from 'taro-ui'
import { redirectTo } from '@tarojs/taro'
function index() {
  const handleClick = () => {
    redirectTo({ url: '/pages/personal/index' })
  }
  return (
    <View>
      <View className={styles.navbar}>
        <AtNavBar
          onClickLeftIcon={handleClick}
          color="#000"
          title="账号管理"
          leftIconType="chevron-left"
        />
      </View>
      <View className={styles.imgFather}>
        <Image
          className={styles.img}
          src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/logo.png"
        />
        <Text className={styles.text}>优产云平台</Text>
      </View>
      <Management />
    </View>
  )
}

export default index
