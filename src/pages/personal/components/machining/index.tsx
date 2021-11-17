import { View, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import styles from './index.module.less'
import Taro from '@tarojs/taro'

function index() {
  const whole = () => {
    Taro.redirectTo({
      url: '/pages/personal/machiningOrderReceiving/index?tid='
    })
  }
  const handleClick = e => {
    console.log(e)
    Taro.redirectTo({
      url: '/pages/personal/machiningOrderReceiving/index?tid=' + e.id
    })
    // Taro.redirectTo({ url: "/pages/index/index" });
  }
  const data = [
    {
      id: 2,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/toBeFedBack.png',
      value: '待反馈',
      url: ''
    },
    {
      id: 3,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/confirmed.png',
      value: '已确认'
    },
    {
      id: -2,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/declined.png',
      value: '已谢绝'
    }
  ]

  return (
    <View>
      <View className={styles.order}>
        <Text className={styles.text} onClick={whole}>
          接单管理
        </Text>
      </View>
      <View className={styles.orders}>
        <AtGrid onClick={handleClick} hasBorder={false} data={data} />
      </View>
    </View>
  )
}

export default index
