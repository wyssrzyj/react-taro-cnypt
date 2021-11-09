import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtNavBar } from 'taro-ui'
import styles from './index.module.less'
import { redirectTo } from '@tarojs/taro'
const index = () => {
  const [value, setValue] = useState()
  const [verification, setVerification] = useState() //验证
  useEffect(() => {
    console.log('测试')
  }, [])
  const handleChange = e => {
    console.log(e)
    setValue(e)
  }
  const handle = e => {
    console.log(e)
    setVerification
    e
  }
  const handleClick = () => {
    redirectTo({ url: '/pages/personal/index' })
  }
  // const handleInput = (e) => {
  //   console.log(e);
  //   setValue(e);
  // };
  return (
    <View className={styles.subject}>
      <View className={styles.navbar}>
        <AtNavBar
          onClickLeftIcon={handleClick}
          color="#000"
          title="账号管理"
          leftIconType="chevron-left"
        />
      </View>
      <View>
        <Text className={styles.topText}>修改新手机号</Text>
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
        <AtInput
          className={styles.phone}
          clear
          type="text"
          border={false}
          maxLength="4"
          placeholder="验证码"
          value={verification}
          onChange={handle}
        >
          <Text>获取验证码</Text>
        </AtInput>
      </View>
    </View>
  )
}

export default index
