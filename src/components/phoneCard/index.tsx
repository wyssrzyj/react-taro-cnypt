import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.less'

const ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/prompt.png'

const PhoneCard = () => {
  return (
    <View className={styles.phoneCard}>
      <View className={styles.content}>
        <View className={styles.left}>
          <View className={styles.info}>
            <Text className={styles.label}>联系人</Text>
            <Text className={styles.value}>张XX</Text>
          </View>
          <View className={styles.info}>
            <Text className={styles.label}>手机号</Text>
            <Text className={styles.value}>187****1232</Text>
          </View>
        </View>
        <View className={styles.right}>查看电话</View>
      </View>
      <View className={styles.toolTip}>
        <Image src={ICON} className={styles.icon}></Image>
        <Text>当前会员等级今日还可查看 5 条信息</Text>
      </View>
    </View>
  )
}

export default PhoneCard
