import { View, Button } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import styles from './index.module.less'
import { useState } from 'react'

const SetPwd = () => {
  const [pwd, setPwd] = useState()

  const pwdChange = val => {
    setPwd(val)
  }

  return (
    <View>
      <View className={styles.loginTitle}>请设置密码</View>
      <View className={styles.tips}>字母、符号或数字中至少2项且超过6位</View>

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

      <Button type={'primary'} className={styles.loginBtn}>
        完成
      </Button>
    </View>
  )
}

export default SetPwd
