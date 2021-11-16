import { useState, useEffect, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { AtInput, AtNavBar, AtButton } from 'taro-ui'
import styles from './index.module.less'

import { redirectTo } from '@tarojs/taro'
import { useStores, observer } from '@/store/mobx'
const index = () => {
  const { loginStore, userInterface } = useStores()
  const { sendVerifyCode } = loginStore
  const { modifyMobilePhoneNumber } = userInterface

  const sum = Taro.getStorageSync('currentUser')
  const id = sum.match(/\d+(.\d+)?/g)[0] //用户id

  // const [lastTime, setLastTime] = useState<number>(verifyTime)
  const [value, setValue] = useState<any>() //手机
  const [verification, setVerification] = useState() //验证
  const [regularJudge, setRegularJudge] = useState<any>(false) //手机号是否正确
  const [judge, setJudge] = useState<any>(false) //报错显示

  const intervalRef = useRef<any>(null)
  const [count, changeCount] = useState(0)
  useEffect(() => {
    clearInterval(intervalRef.current)
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

  // 判断是否是手机号
  useEffect(() => {
    let judge = /^1[0-9]{10}$/
    if (judge.test(value)) {
      setRegularJudge(true)
    } else {
      setRegularJudge(false)
    }
  }, [value])
  // 倒计时
  //  发送验证码
  const verificationCode = async () => {
    if (regularJudge) {
      const res = await sendVerifyCode(value)
      console.log(res)
      onGetCaptcha() //倒计时
      // 点击验证码之后进入倒计时
    }
  }

  const handleChange = e => {
    setValue(e)
  }
  const handle = e => {
    setVerification(e)
  }
  const handleClick = () => {
    redirectTo({ url: '/pages/personal/accountNumber/index' })
  }
  const btn = async () => {
    if (regularJudge) {
      setJudge(false)
      let arr = {
        userId: id,
        mobile: value,
        code: verification
      }
      const res = await modifyMobilePhoneNumber(arr)
      if (res) {
        Taro.redirectTo({ url: '/pages/personal/index' })
      } else {
        changeCount(0)
      }
    } else {
      setJudge(true)
    }
  }

  return (
    <View className={styles.subject}>
      <View className={styles.navbar}>
        <AtNavBar
          onClickLeftIcon={handleClick}
          color="#000"
          title="修改手机号"
          leftIconType="chevron-left"
        />
      </View>
      {/* 主体 */}
      <View className={styles.subject}>
        <View>
          <Text className={styles.topText}>请输入新手机号</Text>
        </View>
        <View>
          <Text className={styles.text}>使用未注册手机号</Text>
        </View>

        <View className={styles.subject}>
          <AtInput
            className={styles.phone}
            name="value6"
            border={false}
            type="phone"
            placeholder="请输入手机号"
            value={value}
            onChange={handleChange}
          />
          {judge ? (
            <Text className={styles.mobile}>请输入正确的手机号</Text>
          ) : null}

          <AtInput
            name={'verifyCode'}
            className={styles.phone}
            clear
            type="text"
            border={false}
            placeholder="验证码"
            value={verification}
            onChange={handle}
          >
            <Text
              onClick={verificationCode}
              className={!regularJudge ? styles.prohibit : null}
            >
              {count ? `${count} s` : '获取验证码'}
            </Text>
          </AtInput>
        </View>
        <AtButton
          onClick={btn}
          className={styles.btn}
          disabled={verification && value ? false : true}
          type="primary"
        >
          提交
        </AtButton>
      </View>
    </View>
  )
}

export default observer(index)
