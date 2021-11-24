import { View, Button, Image } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import styles from './setPwd.module.less'
import { useState } from 'react'
import { Navbar } from '@/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useStores } from '@/store/mobx'
import { pwdReg } from '@/utils/tool'
import base64Js from 'base64-js'

export const BLCAK_BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const SetPwd = () => {
  const router = useRouter()
  const {
    params: { id }
  } = router
  const { loginStore } = useStores()
  const { resetPassword } = loginStore

  const [pwd, setPwd] = useState('')

  const pwdChange = val => {
    setPwd(val)
  }

  const goBack = () => {
    Taro.redirectTo({ url: '/pages/index/index' })
    // Taro.navigateBack()
  }

  const setUserPwd = async () => {
    const code = await resetPassword({
      password: base64Js.fromByteArray(Buffer.from(pwd)),
      userId: id
    })
    if (code === 200) {
      Taro.redirectTo({ url: '/pages/index/index' })
    }
  }

  return (
    <View className={styles.phoneLogin}>
      <Navbar>
        <View className={styles.navbar}>
          <Image
            src={BLCAK_BACK_ICON}
            className={styles.blackBack}
            onClick={goBack}
          ></Image>
          <View className={styles.navTitle}>设置密码</View>
        </View>
      </Navbar>

      <View className={styles.content}>
        <View className={styles.loginHeader}>
          <View className={styles.loginTitle}>设置密码</View>
          <View className={styles.loginMsg}>
            字母、符号或数字中至少2项且超过6位
          </View>
        </View>

        <View>
          <AtInput
            className={styles.pwdInput}
            name="password"
            type="password"
            placeholder="请输入密码"
            value={pwd}
            onChange={pwdChange}
          ></AtInput>
        </View>

        <View
          type={'primary'}
          className={
            !pwdReg.test(pwd) ? styles.loginDisabledBtn : styles.loginBtn
          }
          onClick={setUserPwd}
        >
          完成
        </View>
      </View>
    </View>
  )
}

export default SetPwd
