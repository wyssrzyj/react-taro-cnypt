// src/components/Navbar/index

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import styles from './index.module.less'

const Navbar = props => {
  const { children, background = '#FFF', border = true } = props
  // 将状态栏的区域空余出来
  // 获取胶囊信息
  const { height, top } = Taro.getMenuButtonBoundingClientRect()

  return (
    <View
      className={styles.navbarWrap}
      style={{
        // marginTop: Taro['$navBarMarginTop'] + 'px',
        height: height + 2 * (top - Taro['$navBarMarginTop']) + 'px',
        padding: `${top + 'px'} 16px ${top - Taro['$navBarMarginTop'] + 'px'}`,
        background: background,
        borderBottom: border ? '2px solid #efefef' : 'none'
      }}
    >
      {children}
      {/* <View className={styles.navbar}>自定义导航栏</View> */}
    </View>
  )
}
export default Navbar

// 这里导航栏内容可以自行配置
