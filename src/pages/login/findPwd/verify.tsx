import styles from './index.module.less'
import { View, Text, Input } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { useStores } from '@/store/mobx'

const LoginHeader = props => {
  const { phone } = props
  return (
    <View className={styles.loginHeader}>
      <View className={styles.loginTitle}>请输入验证码</View>
      <View className={styles.loginMsg}>验证码已发送至 {phone}</View>
    </View>
  )
}

const Verify = () => {
  const router = useRouter()
  const { params } = router

  const { loginStore } = useStores()
  const { checkVerifyCode, sendVerifyCode } = loginStore

  const verifyCodeRef = useRef<any>(null)
  const [count, changeCount] = useState(0)

  const [verify, setVerify] = useState('')
  const [verifyArr, setVerifyArr] = useState<any[]>([])
  const [sending, setSending] = useState<boolean>(false)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    sendCode()
    onGetCaptcha()
  }, [])
  useEffect(() => {
    if (count === 59) {
      intervalRef.current = setInterval(() => {
        changeCount(item => item - 1)
      }, 1000)
    } else if (count === 0) {
      clearInterval(intervalRef.current)
    }
  }, [count])

  const onGetCaptcha = () => {
    changeCount(59)
  }

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
    onGetCaptcha()
    const res = await sendVerifyCode(params.phone as string)
    res && setSending(true)
  }

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

  Taro.setNavigationBarColor({
    frontColor: '#000',
    backgroundColor: '#ffffff',
    animation: {
      duration: 400,
      timingFunc: 'easeIn'
    }
  })
  Taro.setNavigationBarTitle({
    title: '找回密码'
  })

  return (
    <View className={styles.phoneLogin}>
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
            {count ? (
              <View>
                <Text className={styles.countdownCount}>{count}</Text>
                <Text className={styles.countdownText}>
                  &nbsp;秒后重新发送验证码
                </Text>
              </View>
            ) : null}

            {!count ? (
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
