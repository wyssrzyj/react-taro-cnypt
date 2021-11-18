import Management from './management/index'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { redirectTo } from '@tarojs/taro'
import { Navbar } from '@/components'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

function index() {
  const handleClick = () => {
    redirectTo({ url: '/pages/personal/index' })
  }
  return (
    <View>
      <Navbar>
        <View className={styles.navbars}>
          <Image
            src={BACK_ICON}
            className={styles.backs}
            onClick={handleClick}
          ></Image>
          <View className={styles.navTitles}>账号管理</View>
        </View>
      </Navbar>

      <Management />
    </View>
  )
}

export default index
