import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'

const Top = ({ userInfo, list }) => {
  let enterprise =
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/enterpriseName.png '

  const { enterpriseName, userFaceUrl, userName } = list

  // 企业类型 0 加工厂 1 发单商

  let sum = userInfo //判断用户权限 新用户=0 发单商=1,加工厂=2
  // let sum = 2 //判断用户权限 新用户=0 发单商=1,加工厂=2

  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
  }

  return (
    <View className={styles.top}>
      <View className={styles.tops}>
        <View className={styles.imgs}>
          {sum !== 'notLogged' ? (
            <Image className={styles.img} src={userFaceUrl} />
          ) : (
            <Image
              className={styles.img}
              src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/NotloggedIn.png"
            />
          )}
        </View>
        <View className={styles.right}>
          {sum !== 'notLogged' ? (
            <>
              <View className={styles.txts}>
                <Text className={styles.txt}>{userName}</Text>
                {sum === '1' ? (
                  <View className={styles.customer}>发单商</View>
                ) : null}
                {sum === '0' ? (
                  <View className={styles.customer}>加工厂</View>
                ) : null}
              </View>
              <View className={styles.bottom}>
                <Image src={enterprise} className={styles.enterprise}></Image>
                <Text className={styles.icon}>
                  {enterpriseName
                    ? enterpriseName
                    : 'XXXX服装进出口股份有限公司'}
                </Text>
              </View>
            </>
          ) : (
            <View onClick={toLogin}>
              <View className={styles.txts}>
                <View className={styles.txt}>登录 / 注册</View>
              </View>
              <View className={styles.bottom}>
                <Text className={styles.login}>请登录或者注册查看更多</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Top
