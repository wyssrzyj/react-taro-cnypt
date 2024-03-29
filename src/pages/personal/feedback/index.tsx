import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Image } from '@tarojs/components'
import { redirectTo } from '@tarojs/taro'
import { useStores, observer, toJS } from '@/store/mobx'
import { Navbar } from '@/components'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'
export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const { userInterface } = useStores()
  const { feedbackInformationEcho, feedbackInformations } = toJS(userInterface)
  const [data, setData] = useState<any>({})

  // 跳转的数据
  useEffect(() => {
    if (feedbackInformations) {
      setData(feedbackInformations)
    }

    // if (params) {
    //   api(params.tid)
    // }
  }, [])

  const goBack = () => {
    redirectTo({
      url: '/pages/personal/orderReceiving/index?tid='
    })
  }
  const btn = async () => {
    await feedbackInformationEcho([])
    redirectTo({
      url: '/pages/personal/orderReceiving/index?tid='
    })
  }
  return (
    <View className={styles.phoneLogin}>
      {/* 导航 */}
      <Navbar>
        <View className={styles.navbars}>
          <Image
            src={BACK_ICON}
            className={styles.backs}
            onClick={goBack}
          ></Image>
          <View className={styles.navTitles}>反馈信息</View>
        </View>
      </Navbar>
      <View className={styles.top}>
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
          <View className={styles.txt}>
            {' '}
            {data.remark ? data.remark : '暂无'}
          </View>
        </View>

        <View className={styles.btn} onClick={btn}>
          <View>返回订单</View>
        </View>
      </View>
    </View>
  )
}

export default observer(Verify)
