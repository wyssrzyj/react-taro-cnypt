import styles from './index.module.less'
import { View, Image } from '@tarojs/components'
import { useState } from 'react'
import { AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Navbar } from '@/components'
import { useStores } from '@/store/mobx'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const LoginHeader = () => {
  return (
    <View className={styles.loginHeader}>
      <View className={styles.loginTitle}>找回密码</View>
      <View className={styles.loginMsg}>
        为了保证您的账户安全，一天只能操作1次，否则账号将会被锁定无法登录
      </View>
    </View>
  )
}

const PwdLogin = () => {
  const { loginStore } = useStores()
  const { checkUser } = loginStore

  const [phone, setPhone] = useState('')

  const phoneChange = val => {
    setPhone(val)
  }

  const changeStep = async () => {
    if (phone.length !== 11) return
    const checktFlag = await checkUser(phone, 'mobilePhone')
    checktFlag &&
      Taro.showToast({
        title: '手机号未注册~',
        icon: 'none',
        duration: 1000
      })
    console.log(checktFlag)
    if (checktFlag) return
    Taro.redirectTo({
      url: `/pages/login/findPwd/verify?phone=${phone}`
    })
  }

  const goBack = () => {
    Taro.navigateBack()
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
            focus={true}
            className={styles.input}
            name="phone"
            type="number"
            placeholder="请输入手机号"
            value={phone}
            onChange={phoneChange}
            maxlength={11}
            placeholderStyle={'fontSize: 30px; color: #999'}
          ></AtInput>
        </View>

        <View
          className={
            phone.length !== 11 ? styles.loginDisabledBtn : styles.loginBtn
          }
          onClick={changeStep}
        >
          下一步
        </View>
      </View>
    </View>
  )
}

export default PwdLogin
