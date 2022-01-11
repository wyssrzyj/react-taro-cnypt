import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.less'
import Taro from '@tarojs/taro'
import { useStores } from '@/store/mobx'

const order = () => {
  const { userInterface } = useStores()
  const { IssuerOrderQuantity, issuerMyOrderQuantity } = userInterface
  const [orderQuantity, setOrderQuantity] = useState<any[]>([])
  const [myOrderQuantity, setMyOrderQuantity] = useState<any[]>([])

  useEffect(() => {
    api()
  }, [])
  const api = async () => {
    const res = await IssuerOrderQuantity()
    const res1 = await issuerMyOrderQuantity()
    console.log(res1)

    if (res.code === 200) {
      const data = [
        {
          id: 2,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/pending.png',
          value: '待反馈',
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
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/declined.png',
          value: '已谢绝',
          num: res.data.enterpriseDeclineTotalNum
        },
        {
          id: -1,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/rejected.png',
          value: '被拒绝',
          num: res.data.enterpriseRefuseTotalNum
        }
      ]
      setOrderQuantity(data)
    }
    if (res1.code === 200) {
      const data1 = [
        {
          id: 1,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/effect.png',
          value: '生效中',

          num: res1.data.inEffectNum
        },
        {
          id: -3,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/hasEnded.png',
          value: '已结束',
          num: res1.data.alreadyEndNum
        },
        {
          id: -2,
          image:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/declines.png',
          value: '审核失败',
          num: res1.data.auditFailureNum
        }
      ]
      setMyOrderQuantity(data1)
    }
  }

  const handleClick = e => {
    Taro.redirectTo({
      url: '/pages/personal/orderReceiving/index?tid=' + e.id
    })
  }
  const order = e => {
    Taro.redirectTo({
      url: '/pages/personal/orderManagement/index?tid=' + e.id
    })
  }
  const myOrder = () => {
    Taro.redirectTo({
      url: '/pages/personal/orderManagement/index?tid='
    })
  }

  return (
    <View>
      <View className={styles.top}>
        <View className={styles.order}>
          <Text className={styles.text} onClick={myOrder}>
            我的订单
          </Text>
        </View>
        <View className={styles.orders}>
          <View className={styles.orderss}>
            {myOrderQuantity.map(item => (
              <View
                className={styles.flex}
                onClick={() => {
                  order(item)
                }}
              >
                <View className={styles.imgContent}>
                  {item.num > 0 ? (
                    <View
                      className={
                        item.num < 10
                          ? styles.topTips
                          : item.num < 100
                          ? styles.topTip
                          : styles.tipPlus
                      }
                    >
                      {item.num <= 99 ? item.num : '99+'}
                    </View>
                  ) : null}
                  <Image className={styles.imgs} src={item.image} />
                </View>

                <View className={styles.test}>
                  <Text>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className={styles.division}></View>

      <View className={styles.bottom}>
        <View className={styles.order}>
          <Text className={styles.text}>接单管理</Text>
        </View>
        <View className={styles.orderss}>
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
    </View>
  )
}

export default order
