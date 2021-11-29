import { useEffect, useState } from 'react'
import styles from './index.module.less'
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from 'taro-ui'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getTrees } from '../method'

import { observer, useStores, toJS } from '@/store/mobx'
const styleStructure = ({
  data,
  deleteMethod,
  reOrder,
  InitiateOrder,
  earlyEnd
}) => {
  const { userInterface, commonStore } = useStores()
  const { applicationReceiptQuantity } = userInterface
  const {
    productCategoryList = [],
    dictionary = [],
    district = []
  } = toJS(commonStore)
  const [windowType, setWindowType] = useState<any>({}) //弹窗类型.
  const [popup, setPopup] = useState(false) //弹窗类型
  const [category, setCategory] = useState<any>([]) //类别
  const [goodsNum, setGoodsNum] = useState<any>([]) //订单量
  const [region, setRegion] = useState('不限') //地区

  useEffect(() => {
    if (data.categoryCodes) {
      // 商品类型
      setCategory(
        getTrees(data.categoryCodes, toJS(productCategoryList), 'code', 'name')
      )
    }
    if (data.goodsNum) {
      // 订单量
      setGoodsNum(
        dictionary.goodsNum.filter(item => item.value == data.goodsNum)[0].label
      )
    }
    // 地区
    if (data.regionalIdList.length > 0) {
      setRegion(
        getTrees(data.regionalIdList, toJS(district), 'value', 'label').join(
          '、'
        )
      )
    } else {
      setRegion('不限')
    }
  }, [])
  const sortColor = new Map()
  sortColor.set(2, styles.red)
  sortColor.set(3, styles.green)
  sortColor.set(1, styles.yellow)
  sortColor.set(-2, styles.blue)
  sortColor.set(-1, styles.blue)
  let map = new Map()

  map.set(2, '待反馈') //设置
  map.set(3, '已确认') //设置
  map.set(-1, '已拒绝') //设置
  map.set(-2, '被谢绝') //设置

  // 删除
  const showModal = () => {
    setPopup(true)
    setWindowType({ type: 'mov' })
  }

  // 拒绝接单
  const confirmCooperation = () => {
    setPopup(true)
    setWindowType({ type: 'confirmCooperation' })
  }
  // 修改回复
  const decline = async data => {
    await applicationReceiptQuantity(data.supplierInquiryId)
    Taro.redirectTo({
      url: `/pages/personal/applicationReceipt/index?id=${data.purchaserInquiryId}`
    })
  }
  const cancel = () => {
    setPopup(false)
  }
  const confirmButton = async () => {
    if (windowType.type === 'mov') {
      // 删除订单
      deleteMethod(data.supplierInquiryId)
    }
    if (windowType.type === 'CancelConfirmation') {
      // 取消确认
      reOrder(data.id)
    }
    if (windowType.type === 'confirmCooperation') {
      // 拒接接单

      InitiateOrder(data.supplierInquiryId)
    }
    if (windowType.type === 'decline') {
      // 谢绝
      earlyEnd(data.id)
    }
    setPopup(false)
  }
  // 电话
  const call = () => {
    Taro.makePhoneCall({
      phoneNumber: data.contactPersonMobile //仅为示例.，并非真实的电话号码
    }).then()
  }

  const toOrderIssuerDetail = () => {
    Taro.navigateTo({
      url: `/pages/orderIssueDetail/index?id=${data.enterpriseId}`
    })
  }

  const toOrderDetail = () => {
    Taro.navigateTo({
      url: `/pages/orderDetail/index?id=${data.purchaserInquiryId}`
    })
  }

  return (
    //   主体
    <View className={styles.external}>
      <View className={styles.major}>
        {/* 头部 */}
        <View className={styles.top}>
          <View className={styles.content}>
            <View className={styles.factorys} onClick={toOrderIssuerDetail}>
              {data.enterpriseName ? data.enterpriseName : '--'}
            </View>
            <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
          </View>
          <View className={sortColor.get(data.status)}>
            {map.get(data.status)}
          </View>
        </View>
        <View className={styles.line}></View>
        {/* 主体 */}
        <View className={styles.subject} onClick={toOrderDetail}>
          {/* img */}
          <View
            className={data.stylePicture ? styles.img : styles.emptyCardImg}
          >
            <Image className={styles.img} src={data.stylePicture} alt="" />
          </View>

          <View className={styles.text}>
            <View className={styles.factory}>{data.inquiryPurchaserName}</View>
            <View>
              <Text>
                <Text className={styles.parking}>订单量:</Text>
                <Text className={styles.quantity}>
                  　{goodsNum ? goodsNum : '暂无'}
                </Text>
              </Text>
            </View>
            <View className={styles.machining}>
              {category
                ? category.map(item => (
                    <Text className={styles.processingType}>{item}</Text>
                  ))
                : '暂无'}
            </View>
            <View className={styles.addressExternal}>
              <AtIcon
                className={styles.iconRegion}
                value="map-pin"
                size="15"
                color="#999999"
              ></AtIcon>
              <View className={styles.region}>
                <Text className={styles.regionText}>{region}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className={styles.line}></View>
        {/* 信息 */}
        <View className={styles.informationFather}>
          <View className={styles.flex}>
            <View className={styles.information}>报价信息</View>
            <View className={styles.valueText}>
              {data.quoteInfo ? data.quoteInfo : '暂无'}
            </View>
          </View>
          <View className={styles.flex}>
            <View className={styles.information}>收款信息</View>
            <View className={styles.valueText}>
              {data.payDetails ? data.payDetails : '暂无'}
            </View>
          </View>
          <View className={styles.flex}>
            <View className={styles.information}>可接产品数</View>
            <View className={styles.valueText}>
              {data.receiveGoodsNum ? data.receiveGoodsNum : '暂无'}
            </View>
          </View>
          <View className={styles.flex}>
            <View className={styles.information}>备注</View>
            <View className={styles.valueText}>
              {data.remark ? data.remark : '暂无'}
            </View>
          </View>
        </View>
        <View className={styles.line}></View>
        {/* 操作 */}
        <View className={styles.operation}>
          {/* 待处理 */}
          {data.status === 2 ? (
            <View className={styles.pending}>
              {data.isContactPublic !== 3 ? (
                <View className={styles.telephone}>
                  <AtIcon value="phone" size="15" color="#333333"></AtIcon>
                  <Text onClick={call}>电话联系</Text>
                </View>
              ) : null}

              <View
                onClick={confirmCooperation}
                className={styles.refuseToAcceptOrders}
              >
                拒绝接单
              </View>
              <View
                onClick={() => {
                  decline(data)
                }}
                className={styles.reply}
              >
                修改回复
              </View>
            </View>
          ) : null}
          {/* 已确认 */}
          {data.status === 3 ? (
            <View>
              <View className={styles.telephone}>
                <AtIcon value="phone" size="15" color="#333333"></AtIcon>
                <Text onClick={call}>电话联系</Text>
              </View>
              <View onClick={showModal} className={styles.cancel}>
                删除记录
              </View>
            </View>
          ) : null}
          {/* 被谢绝 */}
          {data.status === -2 ? (
            <View>
              <View onClick={showModal} className={styles.cancel}>
                删除记录
              </View>
            </View>
          ) : null}
          {/* 已拒绝 */}
          {data.status === -1 ? (
            <View>
              <View onClick={showModal} className={styles.cancel}>
                删除记录
              </View>
            </View>
          ) : null}
        </View>
      </View>

      {/* 弹窗 */}
      <View className={styles.popup}>
        <AtModal isOpened={popup}>
          <AtModalHeader>
            {windowType.type === 'mov' ? '提示' : null}
            {windowType.type === 'CancelConfirmation' ? '提示' : null}
            {windowType.type === 'confirmCooperation' ? '提示' : null}
            {windowType.type === 'decline' ? '提示' : null}
          </AtModalHeader>
          <AtModalContent>
            {windowType.type === 'mov' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>确定删除该订单吗？</View>
              </View>
            ) : null}
            {windowType.type === 'CancelConfirmation' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>是否取消确认？</View>
              </View>
            ) : null}
            {windowType.type === 'confirmCooperation' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>是否拒接接单？</View>
              </View>
            ) : null}
            {windowType.type === 'decline' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>是否确定谢绝？</View>
              </View>
            ) : null}
          </AtModalContent>
          <AtModalAction>
            <Button onClick={cancel}>取消</Button>
            <Button onClick={confirmButton}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    </View>
  )
}

export default observer(styleStructure)
