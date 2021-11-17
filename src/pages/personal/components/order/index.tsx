import { View, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import styles from './index.module.less'
import Taro from '@tarojs/taro'

function index() {
  const btn = e => {
    Taro.redirectTo({
      url: '/pages/personal/orderReceiving/index?tid=' + e.id
    })
  }
  const order = e => {
    Taro.redirectTo({
      url: '/pages/personal/orderManagement/index?tid=' + e.id
    })
  }
  const whole = () => {
    Taro.redirectTo({
      url: '/pages/personal/orderReceiving/index?tid='
    })
  }
  const myOrder = () => {
    Taro.redirectTo({
      url: '/pages/personal/orderManagement/index?tid='
    })
  }

  const data = [
    {
      id: 2,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/pending.png',
      value: '待处理',
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
  const data1 = [
    {
      id: 1,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/effect.png',
      value: '生效中',
      url: ''
    },
    {
      id: -3,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/hasEnded.png',
      value: '已结束'
    },
    {
      id: -2,
      image:
        'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/auditFailed.png',
      value: '审核失败'
    }
  ]
  return (
    <View>
      <View className={styles.order}>
        <Text className={styles.text} onClick={myOrder}>
          我的订单
        </Text>
      </View>
      <View className={styles.orders}>
        <AtGrid onClick={order} hasBorder={false} data={data1} />
      </View>
      <View className={styles.division}></View>

      <View className={styles.order}>
        <Text onClick={whole} className={styles.text}>
          接单管理
        </Text>
      </View>
      <View className={styles.orders}>
        <AtGrid onClick={btn} hasBorder={false} data={data} />
      </View>
    </View>
  )
}

export default index
