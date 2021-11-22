import styles from './index.module.less'
import { View, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Icon, Navbar } from '@/components/index'
import { useEffect } from 'react'
import { useStores, observer } from '@/store/mobx'

export const BLCAK_BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const Login = () => {
  const { loginStore } = useStores()
  const { getSessionId, wxLogin, setWxInfo } = loginStore
  // const router = useRouter()
  // const { params } = router
  // const { source, id } = params

  useEffect(() => {
    Taro.login({
      success: async function (res) {
        if (res.code) {
          //发起网络请求
          await getSessionId({ code: res.code })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }, [])

  const getPhoneNumber = async event => {
    const { detail } = event
    setWxInfo('iv', detail['iv'])
    setWxInfo('encryptedData', detail['encryptedData'])

    if (detail.errMsg.includes('getPhoneNumber:fail')) {
      //用户点击拒绝
      console.log('拒绝授权')
    } else {
      //允许授权执行跳转
      const code = await wxLogin()
      if (code === 200) {
        setTimeout(() => {
          Taro.redirectTo({ url: '/pages/index/index' })
          // goBack()
        })
      }
    }
  }

  const toPhoneLogin = () => {
    Taro.redirectTo({ url: '/pages/login/phoneLogin/index' })
  }

  const goBack = () => {
    // Taro.redirectTo({ url: '/pages/index/index' })
    Taro.navigateBack()
  }

  return (
    <View>
      {/* top */}
      <Navbar>
        <View className={styles.navbar}>
          <Image
            src={BLCAK_BACK_ICON}
            className={styles.back}
            onClick={goBack}
          ></Image>
          <View className={styles.navTitle}>登录</View>
        </View>
      </Navbar>
      {/* img  */}
      <View className={styles.imgFather}>
        <Image
          className={styles.img}
          src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/logo.png"
        />
        <Text className={styles.text}>优产平台</Text>
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

export default observer(Login)
