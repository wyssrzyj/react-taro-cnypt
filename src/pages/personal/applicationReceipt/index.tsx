import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Text } from '@tarojs/components'
import { AtButton, AtNavBar } from 'taro-ui'
import { useRouter, redirectTo } from '@tarojs/taro'
import { useStores, observer } from '@/store/mobx'
import { isEmpty, isNil } from 'lodash'
import { AtInput } from 'taro-ui'
export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const { userInterface } = useStores()
  const { feedbackInformation } = userInterface
  const [data, setData] = useState<any>({})
  const [offer, setOffer] = useState() //报价信息
  const [paymentMethod, setPaymentMethod] = useState() //收款方式
  const [products, setProducts] = useState() //产品数
  const [remarks, setRemarks] = useState() //备注
  const [toast, setToast] = useState(false)
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
    //./ redirectTo({
    //   url: '/pages/personal/orderReceiving/index?tid='
    // })
  }
  // 报价信息
  const offerMethod = e => {
    setOffer(e)
  }
  //收款方式
  const payment = e => {
    setPaymentMethod(e)
  }
  //产品数
  const orderQuantityMethod = e => {
    setProducts(e)
  }
  //备注
  const remarksMethod = e => {
    setRemarks(e)
  }

  const onSubmit = () => {
    if (products) {
      let arr = {
        quoteInfo: offer,
        payDetails: paymentMethod,
        receiveGoodsNum: products,
        remark: remarks
      }
      setToast(false)
      console.log(arr)
    } else {
      setToast(true)
    }
  }
  return (
    <View className={styles.phoneLogin}>
      {/* 导航 */}
      <View className={styles.navbar}>
        <AtNavBar
          fixed={true}
          onClickLeftIcon={goBack}
          color="#000"
          title="申请接单"
          leftIconType="chevron-left"
        />
      </View>

      <View className={styles.container}>
        <View className={styles.title}>
          <Text className={styles.text}>报价信息</Text>
        </View>
        <View className={styles.txt}>
          {/* {data.quoteInfo ? data.quoteInfo : '暂无'}
           */}
          <AtInput
            name="offer"
            border={false}
            type="text"
            placeholder="请填写报价信息"
            value={offer}
            onChange={offerMethod}
          />
        </View>
      </View>
      <View className={styles.container}>
        <View className={styles.title}>
          <Text className={styles.text}>收款方式</Text>
        </View>
        <View className={styles.txt}>
          <AtInput
            name="paymentMethod"
            border={false}
            type="text"
            placeholder="请填写收款方式"
            value={paymentMethod}
            onChange={payment}
          />
        </View>
      </View>
      <View className={styles.container}>
        <View className={styles.title}>
          <Text className={styles.required}>*</Text>
          可接产品数
        </View>
        <View className={styles.txt}>
          <AtInput
            name="orderQuantity"
            border={false}
            type="text"
            placeholder="请填写可接产品数"
            value={products}
            onChange={orderQuantityMethod}
          />
          {/* {toast ? (
            
          ) : null} */}
        </View>
      </View>
      {toast ? (
        <View className={styles.tips}>
          <View className={styles.requiredColor}>
            <Text className={styles.color}>
              <Text className={styles.text}>请填写可接产品数</Text>
            </Text>
          </View>
        </View>
      ) : null}

      <View className={styles.container}>
        <View className={styles.title}>
          <Text className={styles.text}>备注</Text>
        </View>
        <View className={styles.txt}>
          <AtInput
            name="remarks"
            border={false}
            type="text"
            placeholder="请填写备注"
            value={remarks}
            onChange={remarksMethod}
          />
        </View>
      </View>
      <View className={styles.btn} onClick={onSubmit}>
        <View>确认提交</View>
      </View>
    </View>
  )
}

export default observer(Verify)
