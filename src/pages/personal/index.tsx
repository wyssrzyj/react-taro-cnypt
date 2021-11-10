import styles from './index.module.less'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Top from './components/top'
import Order from './components/order'
import Settled from './components/settled'
import Management from './components/management'
import Careful from './components/careful'

import { Navbar, TabBar } from '@/components'
// import My from './my/index'
// import Im from './im/index'

const Personal = () => {
  let jurisdiction = 0 //新用户=0 发单商=1,加工厂=2

  const toLogin = () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  }

  // const toReset = () => {
  //   Taro.redirectTo({ url: '/pages/login/findPwd/reset' })
  // }

  return (
    <View className={styles.container}>
      {/* 头部 */}
      <Button onClick={toLogin}>登录</Button>
      {/* <Button onClick={toReset}>设置密码</Button> */}

      <Top />
      {/* 主体 */}
      <View className={styles.subject}>
        {jurisdiction === 1 ? <Order /> : null}
        {jurisdiction === 0 ? <Settled /> : null}
        {/* <Receiving /> */}

        <Management />

        {/* 底部 */}
        <Careful />
      </View>

      <TabBar activeTab={2}></TabBar>
    </View>
  )
}

export default Personal
