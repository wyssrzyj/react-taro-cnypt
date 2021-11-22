import { View, Text } from '@tarojs/components'
import styles from './index.module.less'
import './index.less'
// import Taro from "@tarojs/taro";
function Management() {
  return (
    <View className={styles.container}>
      <View>
        <Text>《优产用户协议》</Text>
      </View>
      <View>
        <Text>【本协议于2021年10月21日最新修订】</Text>
      </View>
      <View>
        <Text>
          尊敬的用户：欢迎您注册优产（以下简称“本平台”）帐号并使用优产的服务。
        </Text>
      </View>
      <View>
        <Text>
          《优产用户协议》（以下简称“本用户协议”或“本协议”）是您与优产之间就注册优产账号及使用优产各项服务等相关事宜订立的协议。
        </Text>
      </View>
    </View>
  )
}

export default Management
