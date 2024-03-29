import styles from './index.module.less'
import { View, Text, Image } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
import { AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Navbar } from '@/components'
import { useStores } from '@/store/mobx'
import base64Js from 'base64-js'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/back.png'

const LoginHeader = () => {
  return (
    <View className={styles.loginHeader}>
      <View className={styles.loginTitle}>账号密码登录</View>
      <View className={styles.loginMsg}>欢迎来到优产平台</View>
    </View>
  )
}

const PwdLogin = () => {
  const contentRef = useRef<any>(null)

  const { loginStore } = useStores()
  const { login } = loginStore

  const [phone, setPhone] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [loginDisabled, setLoginDisabled] = useState<boolean>(true)
  const [_error, setError] = useState<boolean>(false)

  useEffect(() => {
    const navBarMarginTop = Taro['$navBarMarginTop']
    const target = `calc(100vh - 40px - ${navBarMarginTop / 2}px - 272px)`
    contentRef.current.style.height = target
  }, [])

  const phoneChange = val => {
    setPhone(val)
    setLoginDisabled(!val || !pwd ? true : false)
  }

  const pwdChange = val => {
    setPwd(val)
    setLoginDisabled(!val || !phone ? true : false)
  }

  const toVerifyLogin = () => {
    Taro.redirectTo({ url: '/pages/login/phoneLogin/index' })
  }

  const toFindPwd = () => {
    Taro.navigateTo({ url: '/pages/login/findPwd/index' })
  }

  const goBack = () => {
    Taro.navigateBack()
    // Taro.redirectTo({ url: '/pages/personal/index' })
  }

  const submit = async () => {
    console.log('密码登录')
    if (loginDisabled) return
    try {
      const values = {
        userName: phone,
        passWord: base64Js.fromByteArray(Buffer.from(pwd)),
        loginType: 'applet_password'
      }

      const res = await login(values)

      if (res && res.success) {
        setError(false)
        if (Taro.getStorageSync('pathUrl')) {
          Taro.redirectTo({ url: Taro.getStorageSync('pathUrl') })
        } else {
          Taro.redirectTo({ url: '/pages/index/index' })
        }
        // console.log('密码登录')
        // console.log('取地址', Taro.getStorageSync('pathUrl'))
      } else {
        setError(true)
      }
    } catch (err) {}
  }

  return (
    <View className={styles.phoneLogin}>
      <LoginHeader></LoginHeader>

      <View className={styles.content} ref={contentRef}>
        <View className={styles.inputBox}>
          <View className={styles.title}>用户名</View>
          <AtInput
            className={styles.input}
            name="phone"
            placeholder="请输入用户名"
            value={phone}
            onChange={phoneChange}
            placeholderStyle={'fontSize: 30px; color: #999'}
          ></AtInput>
        </View>
        <View>
          <View className={styles.title}>密码</View>
          <AtInput
            className={styles.input2}
            name="password"
            type="password"
            placeholder="请输入密码"
            value={pwd}
            onChange={pwdChange}
            placeholderStyle={'fontSize: 30px; color: #999'}
          ></AtInput>
        </View>

        <View
          className={loginDisabled ? styles.loginDisabledBtn : styles.loginBtn}
          onClick={submit}
        >
          登录
        </View>
        <View className={styles.toPwdLogin}>
          <Text onClick={toVerifyLogin}>验证码登录</Text>
          <Text onClick={toFindPwd}>忘记密码？</Text>
        </View>
      </View>
    </View>
  )
}

export default PwdLogin
