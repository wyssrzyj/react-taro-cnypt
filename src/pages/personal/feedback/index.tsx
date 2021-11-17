import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Text } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { useRouter, redirectTo } from '@tarojs/taro'
import { useStores, observer } from '@/store/mobx'
import { isEmpty, isNil } from 'lodash'
export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const { userInterface } = useStores()
  const { feedbackInformation } = userInterface
  const [data, setData] = useState<any>({})
  const { params } = useRouter()

  // 跳转的数据
  useEffect(() => {
    if (params) {
      api(params.tid)
    }
  }, [])

  const api = async e => {
    let res = await feedbackInformation({ supplierInquiryId: e })
    if (!isNil(res)) {
      setData(res.data)
    }
  }
  const goBack = () => {
    redirectTo({
      url: '/pages/personal/orderReceiving/index?tid='
    })
  }
  const btn = () => {
    redirectTo({
      url: '/pages/personal/orderReceiving/index?tid='
    })
  }
  return (
    <View className={styles.phoneLogin}>
      {/* 导航 */}
      <View className={styles.navbar}>
        <AtNavBar
          fixed={true}
          onClickLeftIcon={goBack}
          color="#000"
          title="反馈信息"
          leftIconType="chevron-left"
        />
      </View>
      <View className={styles.container}>
        <View className={styles.title}>报价信息</View>
        <View className={styles.txt}>
          {data.quoteInfo ? data.quoteInfo : '暂无'}
        </View>
      </View>
      <View className={styles.container}>
        <View className={styles.title}>收款方式</View>
        <View className={styles.txt}>
          {data.payDetails ? data.payDetails : '暂无'}
        </View>
      </View>
      <View className={styles.container}>
        <View className={styles.title}>可接订单数</View>
        <View className={styles.txt}>
          {data.receiveGoodsNum ? data.receiveGoodsNum : '暂无'}
        </View>
      </View>
      <View className={styles.container}>
        <View className={styles.title}>备注</View>
        <View className={styles.txt}>{data.remark ? data.remark : '暂无'}</View>
      </View>

      <View className={styles.btn} onClick={btn}>
        <View>返回订单</View>
      </View>
    </View>
  )
}

export default observer(Verify)
