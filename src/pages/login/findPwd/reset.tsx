import styles from './index.module.less'
import { View, Button, Image } from '@tarojs/components'
import { useState } from 'react'
import { AtInput } from 'taro-ui'
import { Navbar } from '@/components'
import Taro, { useRouter } from '@tarojs/taro'
import base64Js from 'base64-js'
import { useStores } from '@/store/mobx'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,}$/

const LoginHeader = () => {
  return (
    <View className={styles.loginHeader}>
      <View className={styles.loginTitle}>重新设置密码</View>
      <View className={styles.loginMsg}>
        字母、符号或数字中至少2项且超过6位
      </View>
    </View>
  )
}

const Verify = () => {
  const router = useRouter()
  const { params } = router

  const { loginStore } = useStores()
  const { resetPwd } = loginStore

  const [pwd, setPwd] = useState('')

  const pwdChange = val => {
    setPwd(val)
  }

  const goBack = () => {
    Taro.navigateBack()
  }

  const submit = async () => {
    const param = {
      mobile: params.phone,
      code: params.code,
      password: base64Js.fromByteArray(Buffer.from(pwd))
    }
    const res = await resetPwd(param)

    res &&
      Taro.redirectTo({
        url: '/pages/login/pwdLogin/index'
      })
  }

  return (
    <View className={styles.phoneLogin}>
      <Navbar>
        <Image src={BACK_ICON} className={styles.back} onClick={goBack}></Image>
      </Navbar>

      <View className={styles.content}>
        <LoginHeader></LoginHeader>
        <View>
          <AtInput
            className={styles.input}
            name="password"
            type="password"
            placeholder="请输入密码"
            value={pwd}
            onChange={pwdChange}
            maxlength={11}
            placeholderStyle={'fontSize: 30px; color: #999'}
          ></AtInput>
        </View>

        <View
          className={
            !pwdReg.test(pwd) ? styles.loginDisabledBtn : styles.loginBtn
          }
          onClick={submit}
        >
          完成
        </View>
      </View>
    </View>
  )
}

export default Verify
