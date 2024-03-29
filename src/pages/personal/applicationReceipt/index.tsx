import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Text, Image } from '@tarojs/components'
import { AtToast, AtInput } from 'taro-ui'
import { useRouter, redirectTo } from '@tarojs/taro'
import { useStores, observer } from '@/store/mobx'
import Taro from '@tarojs/taro'
import { Navbar } from '@/components'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const { userInterface } = useStores()
  const {
    applicationReceiptQuantity,
    applicationReceipt,
    orderQuantity,
    quantityId,
    submitApplication,
    submitRequisition
  } = userInterface
  const [offer, setOffer] = useState() //报价信息
  const [paymentMethod, setPaymentMethod] = useState() //收款方式
  const [products, setProducts] = useState<any>() //产品数
  const [remarks, setRemarks] = useState('') //备注
  const [toast, setToast] = useState(false)

  const { params } = useRouter()

  // 跳转的数据
  useEffect(() => {
    if (quantityId) {
      api(quantityId)
    }
  }, [])
  // 回显
  const api = async e => {
    let res = await applicationReceipt({ supplierInquiryId: e })
    setProducts(res.receiveGoodsNum)
    setOffer(res.quoteInfo)
    setPaymentMethod(res.payDetails)
    setRemarks(res.remark)
  }
  const goBack = async () => {
    await applicationReceiptQuantity('')

    Taro.redirectTo({
      url: '/pages/personal/machiningOrderReceiving/index?tid='
    })
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
  let timer

  const onSubmit = async () => {
    if (products) {
      if (params) {
        // 添加防抖，防止用户重复操作
        clearTimeout(timer)
        timer = setTimeout(() => {
          quantityAntiShake()
        }, 1000)
        const quantityAntiShake = async () => {
          let arr = await orderQuantity({
            goodsNum: products,
            id: params.id
          })
          if (arr.code === 200) {
            setToast(false)

            let value = {
              quoteInfo: offer,
              payDetails: paymentMethod,
              receiveGoodsNum: products,
              remark: remarks
            }
            //  申请接单一个
            if (quantityId) {
              // 修改一个
              const submitRes = await submitRequisition({
                ...value,
                purchaserInquiryId: params.id,
                supplierInquiryId: quantityId,
                status: 2
              })
              if (submitRes.code === 200) {
                await applicationReceiptQuantity('')
                Taro.redirectTo({
                  url: '/pages/personal/machiningOrderReceiving/index?tid='
                })
              }
            } else {
              //防抖
              clearTimeout(timer)
              timer = setTimeout(() => {
                api()
              }, 1000)
              let api = async () => {
                const submitRes = await submitApplication({
                  ...value,
                  purchaserInquiryId: params.id,
                  supplierInquiryId: quantityId,
                  status: 2
                })
                if (submitRes.data.verifyMessage >= 0) {
                  Taro.showToast({
                    title: `今日申请剩余${submitRes.data.verifyMessage}次`,
                    icon: 'none',
                    duration: 1500
                  })
                  if (submitRes.code === 200) {
                    await applicationReceiptQuantity('')
                    //提示完成之后在跳转
                    setTimeout(() => {
                      Taro.redirectTo({
                        url: '/pages/personal/machiningOrderReceiving/index?tid='
                      })
                    }, 1000)
                  }
                } else {
                  Taro.showToast({
                    title: '今日申请已达上限',
                    icon: 'none',
                    duration: 1500
                  })
                }
              }
            }
          }
        }
      }
    } else {
      setToast(true)
    }
  }
  Taro.setNavigationBarTitle({
    title: quantityId ? '修改回复' : '申请接单'
  })
  return (
    <View className={styles.phoneLogin}>
      <View className={styles.outerLayer}>
        <View className={styles.external}>
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
                type="number"
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
        </View>
      </View>

      <View className={styles.btn} onClick={onSubmit}>
        <View>确认提交</View>
      </View>
    </View>
  )
}

export default observer(Verify)
