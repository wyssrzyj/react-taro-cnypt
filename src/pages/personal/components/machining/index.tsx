import { View, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import styles from './index.module.less'

function index() {
  const btn = e => {
    console.log(e)
    // Taro.redirectTo({ url: "/pages/index/index" });
  }
  const data = [
    {
      id: 1,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/toBeFedBack.png',
      value: '待反馈',
      url: ''
    },
    {
      id: 2,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/confirmed.png',
      value: '已确认'
    },
    {
      id: 3,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/declined.png',
      value: '已谢绝'
    }
  ]

  return (
    <View>
      <View className={styles.order}>
        <Text className={styles.text}>接单管理</Text>
      </View>
      <View className={styles.orders}>
        <AtGrid onClick={btn} hasBorder={false} data={data} />
      </View>
    </View>
  )
}

export default index
