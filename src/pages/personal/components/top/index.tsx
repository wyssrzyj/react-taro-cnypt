import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
function index() {
  let sum = 1 //判断用户权限 新用户=0 发单商=1,加工厂=2
  let login = 1 //判断登录权限 1

  const toLogin = () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  }
  return (
    <View className={styles.top}>
      <View className={styles.tops}>
        <View className={styles.imgs}>
          {login > 0 ? (
            <Image
              className={styles.img}
              src="https://img0.baidu.com/it/u=3659397173,2392445967&fm=26&fmt=auto"
            />
          ) : (
            <Image
              className={styles.img}
              src="https://img2.baidu.com/it/u=289538718,2137491427&fm=26&fmt=auto"
            />
          )}
        </View>
        <View className={styles.right}>
          {login > 0 ? (
            <>
              <View className={styles.txts}>
                <Text className={styles.txt}>卢英杰</Text>
                {sum === 1 ? (
                  <View className={styles.customer}>发单商</View>
                ) : null}
                {sum === 2 ? (
                  <View className={styles.customer}>加工厂</View>
                ) : null}
              </View>
              <View className={styles.bottom}>
                <AtIcon value="eye" size="20"></AtIcon>
                <Text className={styles.icon}>XXXX服装进出口股份有限公司</Text>
              </View>
            </>
          ) : (
            <>
              <View onClick={toLogin} className={styles.txts}>
                <Text className={styles.txt}>登录 / 注册</Text>
              </View>
              <View className={styles.bottom}>
                <Text className={styles.login}>请登录或者注册查看更多</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  )
}

export default index
