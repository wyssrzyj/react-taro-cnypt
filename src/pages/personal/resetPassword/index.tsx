import styles from './index.module.less'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { AtInput, AtNavBar, AtToast } from 'taro-ui'
import base64Js from 'base64-js'

// import { Navbar } from '@/components'
import { useStores } from '@/store/mobx'
import Taro, { redirectTo } from '@tarojs/taro'
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
    redirectTo({
      url: '/pages/personal/accountNumber/index'
    })
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
      <View className={styles.navbar}>
        <AtNavBar
          onClickLeftIcon={goBack}
          color="#000"
          title="修改密码"
          leftIconType="chevron-left"
        />
      </View>

      <View className={styles.content}>
        <LoginHeader></LoginHeader>
        <View>
          <AtInput
            className={styles.input}
            type="phone"
            name="passwords"
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
            name="password"
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
