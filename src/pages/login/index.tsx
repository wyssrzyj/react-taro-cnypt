import styles from './index.module.less'
import { View, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Icon } from '@/components/index'
import { useEffect } from 'react'
import { useStores, observer } from '@/store/mobx'

export const BLCAK_BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const Login = () => {
  const { loginStore } = useStores()
  const { getSessionId, wxLogin, setWxInfo, checkPwdExist } = loginStore

  useEffect(() => {
    Taro.login({
      success: async function (res) {
        if (res.code) {
          //发起网络请求
          await getSessionId({ code: res.code })
        } else {
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
    } else {
      //允许授权执行跳转
      try {
        const res = (await wxLogin()) || {}
        if (res.code === 200) {
          try {
            const checkPwdRes = await checkPwdExist({
              userId: res.data.userId
            })
            if (checkPwdRes) {
              Taro.redirectTo({
                url: `/pages/login/phoneLogin/setPwd?id=${res.data.userId}`
              })
            } else {
              Taro.redirectTo({ url: '/pages/index/index' })
            }
          } catch (error) {}
        }
      } catch (err) {}
    }
  }

  const toPhoneLogin = () => {
    Taro.navigateTo({ url: '/pages/login/phoneLogin/index' })
  }

  return (
    <View>
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
