import styles from './index.module.less'
import { View, Text, Input, Image } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { Navbar } from '@/components'
import { useStores } from '@/store/mobx'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const LoginHeader = props => {
  const { phone } = props
  return (
    <View className={styles.loginHeader}>
      <View className={styles.loginTitle}>请输入验证码</View>
      <View className={styles.loginMsg}>验证码已发送至 {phone}</View>
    </View>
  )
}

const verifyTime = 60

const Verify = () => {
  const router = useRouter()
  const { params } = router

  const { loginStore } = useStores()
  const { checkVerifyCode, sendVerifyCode } = loginStore

  const verifyCodeRef = useRef<any>(null)

  const [verify, setVerify] = useState('')
  const [verifyArr, setVerifyArr] = useState<any[]>([])
  const [timer, setTimer] = useState<any>()
  const [lastTime, setLastTime] = useState<number>(verifyTime)
  const [sending, setSending] = useState<boolean>(false)

  useEffect(() => {
    sendCode()
  }, [])

  const verifyChange = event => {
    const {
      detail: { value }
    } = event
    const v = value.slice(0, 6)
    const arr = new Array(6).fill('')
    const target = arr.map((_item, idx) => {
      return v[idx] || ''
    })
    setVerifyArr(target)
    setVerify(v)
  }

  const sendCode = async () => {
    clearInterval(timer)
    const res = await sendVerifyCode(params.phone as string)
    res && setSending(true)
    res && timerRun()
  }

  const timerRun = () => {
    const t = setInterval(() => {
      setLastTime(n => n - 1)
    }, 1000)
    setTimer(t)
  }

  const goBack = () => {
    Taro.navigateBack()
  }

  useEffect(() => {
    if (lastTime <= 0) {
      setSending(false)
      clearInterval(timer)
      setTimer(null)
      setLastTime(verifyTime)
    }
  }, [lastTime])

  useEffect(() => {
    ;(async () => {
      if (verify.length === 6) {
        const res = await checkVerifyCode({
          mobile: params.phone,
          code: verify
        })

        res &&
          Taro.navigateTo({
            url: `/pages/login/findPwd/reset?phone=${params.phone}&code=${verify}`
          })
      }
    })()
  }, [verify])

  return (
    <View className={styles.phoneLogin}>
      <Navbar>
        <Image src={BACK_ICON} className={styles.back} onClick={goBack}></Image>
      </Navbar>

      <View className={styles.content}>
        <Input
          name={'verify'}
          type="number"
          focus={true}
          max={6}
          value={verify}
          className={styles.verifyInput}
          onInput={verifyChange}
          ref={verifyCodeRef}
        />
        <View className={styles.container}>
          <LoginHeader phone={params.phone}></LoginHeader>

          <View className={styles.verifyCounts}>
            {new Array(6).fill('').map((_item, idx) => {
              let className
              if (idx < 5) {
                className = verify.length === idx ? styles.line : ''
              }
              if (idx === 5) {
                className = verify.length >= idx ? styles.line : ''
              }
              return (
                <View className={styles.verifyCount}>
                  <View className={className}></View>
                  <Text>{verifyArr[idx]}</Text>
                </View>
              )
            })}
          </View>
          <View className={styles.countdown}>
            {sending ? (
              <View>
                <Text className={styles.countdownCount}>{lastTime}</Text>
                <Text className={styles.countdownText}>
                  &nbsp;秒后重新发送验证码
                </Text>
              </View>
            ) : null}

            {!sending ? (
              <Text className={styles.resend} onClick={sendCode}>
                重新发送
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Verify
