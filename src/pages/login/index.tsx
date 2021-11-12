import styles from './index.module.less'
import { View, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Icon } from '@/components/index'
import { AtNavBar } from 'taro-ui'

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
    Taro.redirectTo({ url: '/pages/login/phoneLogin/index' })
  }

  return (
    <View>
      {/* top */}
      <View className={styles.navbar}>
        <AtNavBar color="#000" title="登录" />
      </View>
      {/* img  */}
      <View className={styles.imgFather}>
        <Image
          className={styles.img}
          src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/logo.png"
        />
        <Text className={styles.text}>优产云平台</Text>
      </View>
      {/* 内容 */}
      <View className={styles.content}>
        <Image
          src={
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/dlxz.png'
          }
          className={styles.contentImg}
        ></Image>
      </View>
      {/* 按钮 */}
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
