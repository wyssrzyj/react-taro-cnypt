// src/components/Navbar/index

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import classNames from 'classnames'

const Navbar = props => {
  const { children, background = '#FFF', border = true, className } = props
  // 将状态栏的区域空余出来
  // 获取胶囊信息
  const { height, top } = Taro.getMenuButtonBoundingClientRect()
  console.log('🚀 ----', top)
  console.log('🚀 ~~~~', Taro['$navBarMarginTop'])

  return (
    <View
      id={'navbar'}
      style={{
        padding: `${top + 'px'} 0 ${top - Taro['$navBarMarginTop'] + 'px'}`,
        // padding: `${top + 'px'} 0 0}`,
        background: background
      }}
      className={styles.navbarOutWrap}
    >
      <View
        className={classNames(styles.navbarWrap, className)}
        style={{
          // marginTop: Taro['$navBarMarginTop'] + 'px',
          height: height + 2 * (top - Taro['$navBarMarginTop']) + 'px',
          background: background,
          borderBottom: border ? '1px solid #efefef' : 'none'
        }}
      >
        {children}
        {/* <View className={styles.navbar}>自定义导航栏</View> */}
      </View>
    </View>
  )
}
export default Navbar

// 这里导航栏内容可以自行配置
