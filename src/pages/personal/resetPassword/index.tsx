import styles from './index.module.less'
import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import { AtInput } from 'taro-ui'
import base64Js from 'base64-js'
import { useStores } from '@/store/mobx'
import Taro from '@tarojs/taro'
import { Navbar } from '@/components'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'
// 且至少带字母、数字、符号中的两种。
let reg = new RegExp(/(?![\d]+$)(?![a-zA-Z]+$)(?![\da-zA-Z]+$).{6,20}$/) //6-20位，至少带字母数字符号中的两种的正则

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
  const { userInterface } = useStores()
  const { changePassword } = userInterface

  const [pwd, setPwd] = useState('')
  const [password, setPassword] = useState('')
  const [judge, setJudge] = useState<any>(false) //报错显示

  // 原
  const originalPassword = val => {
    setPwd(val)
  }
  // 新
  const newPassword = val => {
    setPassword(val)
  }

  const goBack = () => {
    Taro.navigateBack()
  }

  const submit = async () => {
    setJudge(!reg.test(password))
    // if (reg.test(password)) {
    // {"userName":用户名,"oldPassword":原密码,"newPassword":新密码}
    const name = JSON.parse(Taro.getStorageSync('currentUser')).username
    const param = {
      userName: name,
      oldPassword: base64Js.fromByteArray(Buffer.from(pwd)),
      newPassword: base64Js.fromByteArray(Buffer.from(password))
    }
    const res = await changePassword(param)
    if (res) {
      Taro.redirectTo({ url: '/pages/index/index' })
    }
    // }
  }

  return (
    <View className={styles.phoneLogin}>
      <Navbar>
        <View className={styles.navbars}>
          <Image
            src={BACK_ICON}
            className={styles.backs}
            onClick={goBack}
          ></Image>
          <View className={styles.navTitles}>修改密码</View>
        </View>
      </Navbar>

      <View className={styles.content}>
        <LoginHeader></LoginHeader>
        <View>
          <AtInput
            className={styles.input}
            name="password1"
            type="password"
            placeholder="请输入原密码"
            value={pwd}
            onChange={originalPassword}
            maxlength={11}
            placeholderStyle={'fontSize: 30px; color: #999'}
          ></AtInput>
        </View>

        <View className={styles.new}>
          <AtInput
            className={styles.input}
            name="password2"
            type="password"
            placeholder="请输入新密码"
            value={password}
            onChange={newPassword}
            maxlength={11}
            placeholderStyle={'fontSize: 30px; color: #999'}
          ></AtInput>
          {judge ? (
            <View className={styles.top}>
              <Text className={styles.mobile}>
                字母、符号或数字中至少2项且超过6位
              </Text>
            </View>
          ) : null}
        </View>

        <View
          className={password ? styles.loginBtn : styles.loginDisabledBtn}
          onClick={submit}
        >
          完成
        </View>
      </View>
    </View>
  )
}

export default Verify
