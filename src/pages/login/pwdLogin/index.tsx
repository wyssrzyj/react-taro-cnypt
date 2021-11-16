import styles from './index.module.less'
import { View, Text, Button, Image } from '@tarojs/components'
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
      <View className={styles.loginMsg}>欢迎来到优产云平台</View>
    </View>
  )
}

const verifyTime = 60

const PwdLogin = () => {
  const contentRef = useRef<any>(null)

  const { loginStore } = useStores()
  const { login, userInfo } = loginStore

  const [phone, setPhone] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [loginDisabled, setLoginDisabled] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

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
    Taro.redirectTo({ url: '/pages/login/findPwd/index' })
  }

  const goBack = () => {
    Taro.navigateBack()
  }

  const submit = async () => {
    if (loginDisabled) return
    try {
      const values = {
        userName: phone,
        passWord: base64Js.fromByteArray(Buffer.from(pwd)),
        loginType: 'password'
      }

      const res = await login(values)

      if (res && res.success) {
        setError(false)
        const data = await userInfo()
        if (data) {
          // data.enterpriseType && history.push('/control-panel/home')
          // !data.enterpriseType && history.push('/')
        } else {
          // history.push('/')
          // Taro.redirectTo({ url: '/pages/index/index' })
        }
        Taro.redirectTo({ url: '/pages/index/index' })
      } else {
        setError(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View className={styles.phoneLogin}>
      <Navbar background={'transparent'} border={false}>
        <Image src={BACK_ICON} className={styles.back} onClick={goBack}></Image>
      </Navbar>
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
