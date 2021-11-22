import styles from './index.module.less'
import { View, Text, Image } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
import { AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Navbar } from '@/components'
import { useStores } from '@/store/mobx'
import classNames from 'classnames'

export const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/back.png'

const LoginHeader = () => {
  return (
    <View className={styles.loginHeader}>
      <View className={styles.loginTitle}>您好，欢迎来到优产云！</View>
      <View className={styles.loginMsg}>未注册的手机号验证后自动创建账户</View>
    </View>
  )
}

const verifyTime = 60

const PhoneLogin = () => {
  const contentRef = useRef<any>(null)

  const { loginStore } = useStores()
  const { checkUser, sendVerifyCode, login, userInfo, checkPwdExist } =
    loginStore

  const [phone, setPhone] = useState<string>('')
  const [verifyCode, setVerifyCode] = useState()
  const [lastTime, setLastTime] = useState<number>(verifyTime)
  const [sending, setSending] = useState<boolean>(false)
  const [timer, setTimer] = useState<any>(null)
  const [loginDisabled, setLoginDisabled] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const navBarMarginTop = Taro['$navBarMarginTop']
    const target = `calc(100vh - 40px - ${navBarMarginTop / 2}px - 272px)`
    contentRef.current.style.height = target
  }, [])

  const phoneChange = val => {
    setPhone(val)
    setLoginDisabled(!val || !verifyCode ? true : false)
  }

  const verifyCodeChange = val => {
    setVerifyCode(val)
    setLoginDisabled(!val || !phone ? true : false)
  }

  useEffect(() => {
    const last = Taro.getStorageSync(`verifyTimeLogin`)
    if (last) {
      const lastFlag = Date.now() - +last < verifyTime * 1000
      if (lastFlag) {
        setLastTime(Math.ceil((Date.now() - +last) / 1000))
        setSending(true)
        timerRun()
      } else {
        // 初始化 倒计时时间
        setLastTime(verifyTime)
        Taro.setStorageSync(`verifyTimeLogin`, '')
      }
    }
  }, [])

  const timerRun = () => {
    let last = Taro.getStorageSync(`verifyTimeLogin`) || 0

    if (!last) {
      last = Date.now().toString()
      Taro.setStorageSync(`verifyTimeLogin`, last)
    }

    const t = setInterval(() => {
      setLastTime(() => {
        const n = verifyTime - (Date.now() - +last) / 1000
        return Math.ceil(n)
      })
    }, 1000)
    setTimer(t)
  }

  const sendCode = async () => {
    if (sending) return
    if (phone.length !== 11) return
    try {
      // let flag = true
      // const checktFlag = await checkUser(phone, 'mobilePhone')
      // checktFlag &&
      //   Taro.showToast({
      //     title: '手机号未注册~',
      //     icon: 'none',
      //     duration: 1500
      //   })
      // flag = !checktFlag // checkFlag false 已注册

      // if (flag) {
      const res = await sendVerifyCode(phone)
      res && setSending(true)
      res && timerRun()
      // }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (lastTime <= 0) {
      setSending(false)
      clearInterval(timer)
      setTimer(null)
      setLastTime(verifyTime)
    }
  }, [lastTime])

  const toPwdLogin = () => {
    Taro.redirectTo({ url: '/pages/login/pwdLogin/index' })
  }

  const submit = async () => {
    if (loginDisabled) return
    try {
      const values = {
        mobilePhone: phone,
        code: verifyCode,
        loginType: 'sms_code'
      }

      const res = await login(values)

      if (res && res.success) {
        setError(false)
        await userInfo()

        const checkPwdRes = await checkPwdExist({ userId: res.data.userId })

        if (checkPwdRes) {
          Taro.navigateTo({
            url: `/pages/login/phoneLogin/setPwd?id=${res.data.userId}`
          })
        } else {
          Taro.redirectTo({ url: '/pages/index/index' })
        }
      } else {
        setError(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const goBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className={styles.phoneLogin}>
      <Navbar background={'transparent'} border={false}>
        <Image src={BACK_ICON} className={styles.back} onClick={goBack}></Image>
      </Navbar>
      <LoginHeader></LoginHeader>

      <View className={styles.content} ref={contentRef}>
        <View className={styles.inputBox}>
          <View className={styles.title}>手机号</View>
          <AtInput
            className={styles.phoneInput}
            name="phone"
            type="number"
            placeholder="请输入手机号"
            value={phone}
            onChange={phoneChange}
            maxlength={11}
            border={true}
            placeholderStyle={'fontSize: 30px; color: #999'}
          ></AtInput>
        </View>

        <View>
          <View className={styles.title}>验证码</View>
          <AtInput
            className={styles.verifyInput}
            name={'verifyCode'}
            type="text"
            placeholder="请输入验证码"
            value={verifyCode}
            onChange={verifyCodeChange}
            border={true}
            placeholderStyle={'fontSize: 30px; color: #999'}
          >
            <Text
              className={classNames(
                styles.verifyCodeBtn,
                phone.length !== 11 ? styles.verifyCodeBtnDisabled : ''
              )}
              onClick={sendCode}
            >
              {sending ? `${lastTime}s` : '获取验证码'}
            </Text>
          </AtInput>
        </View>

        <View
          className={loginDisabled ? styles.loginDisabledBtn : styles.loginBtn}
          onClick={submit}
        >
          登录
        </View>
        <View className={styles.toPwdLogin} onClick={toPwdLogin}>
          密码登录
        </View>

        <View className={styles.agreeBox}>
          <Text>登录即表明同意</Text>
          <Text className={styles.agreeTag}>《优产用户协议》</Text>
          <Text className={styles.agreeTag}>《隐私政策》</Text>
        </View>
      </View>
    </View>
  )
}

export default PhoneLogin
