import styles from './index.module.less'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Navbar, TabBar } from '@/components'

const Personal = () => {
  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
  }

  const toReset = () => {
    Taro.navigateTo({ url: '/pages/login/findPwd/reset' })
  }

  return (
    <View className={styles.container}>
      <Navbar>
        <View>我的</View>
      </Navbar>
      Personal
      <Button onClick={toLogin}>登录</Button>
      <Button onClick={toReset}>设置密码</Button>
      <TabBar activeTab={2}></TabBar>
    </View>
  )
}

export default Personal
