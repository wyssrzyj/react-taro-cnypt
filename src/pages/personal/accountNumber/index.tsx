import Management from './management/index'
import { View } from '@tarojs/components'
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
      <Management />
    </View>
  )
}

export default index
