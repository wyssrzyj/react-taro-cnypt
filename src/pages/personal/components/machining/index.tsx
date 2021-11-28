import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.less'
import Taro from '@tarojs/taro'
import { useStores } from '@/store/mobx'

const machining = () => {
  const { userInterface } = useStores()
  const { processingOrderQuantity } = userInterface
  const [orderQuantity, setOrderQuantity] = useState<any>([])

  useEffect(() => {
    api()
  }, [])
  const api = async () => {
    const res = await processingOrderQuantity()
    if (res.code === 200) {
      const data = [
        {
          id: 2,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/toBeFedBack.png',
          value: '待反馈',
          url: '',
          num: res.data.enterprisePendingFeedbackTotalNum
        },
        {
          id: 3,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/confirmed.png',
          value: '已确认',
          num: res.data.enterpriseConfirmeTotalNum
        },
        {
          id: -2,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/rejected.png',
          value: '被谢绝',
          num: res.data.enterpriseDeclineTotalNum
        },
        {
          id: -1,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/declined.png',
          value: '已拒绝',
          num: res.data.enterpriseRefuseTotalNum
        }
      ]
      setOrderQuantity(data)
    }
  }
  const whole = () => {
    Taro.redirectTo({
      url: '/pages/personal/machiningOrderReceiving/index?tid='
    })
  }
  const handleClick = e => {
    Taro.redirectTo({
      url: '/pages/personal/machiningOrderReceiving/index?tid=' + e.id
    })
    // Taro.redirectTo({ url: "/pages/index/index" });
  }

  return (
    <View>
      <View className={styles.order}>
        <Text className={styles.text}>接单管理</Text>
      </View>
      <View className={styles.orders}>
        {orderQuantity.map(item => (
          <View
            className={styles.flex}
            onClick={() => {
              handleClick(item)
            }}
          >
            {item.num > 0 ? (
              <View
                className={
                  item.num < 10
                    ? styles.tips
                    : item.num < 100
                    ? styles.tip
                    : styles.tipPlus
                }
              >
                {item.num <= 99 ? item.num : '99+'}
              </View>
            ) : null}

            <Image className={styles.imgs} src={item.image} />
            <View className={styles.test}>
              <Text>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default machining
