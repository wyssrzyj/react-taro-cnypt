import styles from './index.module.less'
import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Text,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Icon } from '@/components/index'

const Login = () => {
  const getPhoneNumber = event => {
    const { detail } = event
    console.log('🚀 ~ file: index.tsx ~ line 14 ~ detail', detail)
    Taro.login({
      success: () => {
        console.log('success')
      }
    })

    if (detail.errMsg.includes('getPhoneNumber:fail')) {
      //用户点击拒绝
      console.log('拒绝授权')
    } else {
      //允许授权执行跳转
      console.log('允许授权')
    }
  }

  const toPhoneLogin = () => {
    Taro.navigateTo({ url: '/pages/login/phoneLogin/index' })
  }

  return (
    <View>
      <Image src={''} className={styles.img}></Image>
      <View className={styles.loginTip}>你还没有登录账号</View>
      <View className={styles.loginTip}>请使用微信或账号登录</View>
      <Button
        type={'primary'}
        className={styles.wechatBtn}
        openType={'getPhoneNumber'}
        onGetPhoneNumber={getPhoneNumber}
      >
        <Icon type={'jack-weixin2'} className={styles.wechatIcon}></Icon>
        <Text>微信账号快速登录</Text>
      </Button>
      <Button onClick={toPhoneLogin} className={styles.loginBtn}>
        账号或手机验证码登录
      </Button>
    </View>
  )
}

export default Login
