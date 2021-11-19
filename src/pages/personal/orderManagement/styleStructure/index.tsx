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
import Taro, { login } from '@tarojs/taro'

import { useStores, toJS, observer } from '@/store/mobx'
import { getTrees } from '../method'
import { cloneDeep } from 'lodash'

let imgs =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/noData.png'

function index({ data, deleteMethod, earlyEnd }) {
  const { commonStore } = useStores()
  const { dictionary, district = [] } = commonStore
  const { processType, goodsNum = [] } = dictionary

  const [category, setCategory] = useState<any>(
    getTrees(data.processTypeList, toJS(processType), 'value', 'label')
  )
  const [windowType, setWindowType] = useState<any>({}) //弹窗类型
  const [popup, setPopup] = useState(false) //弹窗类型
  const [region, setRegion] = useState('不限') //地区

  // 订单量
  const dingdong = v => {
    return goodsNum.filter(item => item.value === v)[0].label
  }
  useEffect(() => {
    if (data) {
      // 加工类型
      setCategory(
        getTrees(data.processTypeList, toJS(processType), 'value', 'label')
      )
    }
    // 地区
    if (data.regionalIdList) {
      setRegion(
        getTrees(data.regionalIdList, toJS(district), 'value', 'label').join(
          '、'
        )
      )
    } else {
      setRegion('不限')
    }
  }, [])
  {
    /* -1 草稿箱 1 提交需求单 -2审核失败 -3已结束 */
  }
  //  data.status
  const sortColor = new Map()
  sortColor.set(2, styles.red)
  sortColor.set(3, styles.green)
  sortColor.set(1, styles.yellow)
  sortColor.set(-2, styles.black)
  sortColor.set(-1, styles.blue)
  let map = new Map()
  map.set(1, '等待回复') //设置
  map.set(2, '待反馈') //设置
  map.set(3, '已确认') //设置
  map.set(-2, '已谢绝') //设置

  map.set(-1, '被拒绝') //设置

  // 删除
  const showModal = () => {
    setPopup(true)
    setWindowType({ type: 'mov' })
  }
  // 提前结束
  const decline = () => {
    setPopup(true)
    setWindowType({ type: 'end' })
  }
  const cancel = () => {
    setPopup(false)
  }
  const confirmButton = async () => {
    if (windowType.type === 'mov') {
      console.log('删除订单', data.id)
      // 删除订单
      deleteMethod(data.id)
    }
    if (windowType.type === 'end') {
      // 提前结束
      earlyEnd(data.id)
    }
    setPopup(false)
  }
  // 再来一单
  const oneMoreOrder = id => {
    console.log('再来一单')
    Taro.navigateTo({
      url: `/pages/publish/index?id=${id}`
    })
  }
  //查看原因
  const viewReason = () => {
    console.log('查看原因')
  }
  const btn = e => {
    let sum =
      data.enterprisePendingNum +
      data.enterpriseConfirmeNum +
      data.enterpriseRefuseTotalNum
    console.log(sum)
    if (sum !== 0) {
      Taro.navigateTo({
        url: `/pages/personal/orderReceiving/index?ids=${e}`
      })
    }
  }
  const details = data => {
    Taro.redirectTo({
      url: '/pages/orderDetail/index?id=' + data.id
    })
  }

  return (
    //   主体
    <View className={styles.external}>
      <View className={styles.major}>
        {/* 主体 */}
        <View
          className={styles.subject}
          onClick={() => {
            details(data)
          }}
        >
          {/* img */}

          <View>
            {+data.status === 1 ? (
              <View className={styles.state}>生效中</View>
            ) : null}
            {+data.status === -3 ? (
              <View className={styles.ended}>已结束</View>
            ) : null}
            {+data.status === -2 ? (
              <View className={styles.fail}>审核失败</View>
            ) : null}
            <View
              className={data.pictureUrl ? styles.img : styles.emptyCardImg}
            >
              <Image className={styles.img} src={data.pictureUrl} alt="" />
            </View>
          </View>
          <View>
            <Text className={styles.factory}>{data.name}</Text>
            <View>
              <Text>
                <Text className={styles.parking}>
                  {dingdong(data.goodsNum)}
                </Text>
                <Text className={styles.parking}> | </Text>
                <Text className={styles.quantity}>长期有效</Text>
              </Text>
            </View>
            <View className={styles.machining}>
              {category.map(item => (
                <Text className={styles.processingType}>{item}</Text>
              ))}
            </View>
            <View className={styles.addressExternal}>
              <AtIcon value="map-pin" size="15" color="#999999"></AtIcon>
              <Text className={styles.region}>{region}</Text>
            </View>
          </View>
        </View>
        <View className={styles.line}></View>
        {/* 信息 */}
        <View
          className={styles.informationFather}
          onClick={() => {
            btn(data.id)
          }}
        >
          <View className={styles.feedback}>
            <Text>
              待处理
              <Text className={styles.quantity}>
                　{data.enterprisePendingNum ? data.enterprisePendingNum : '0'}
                　
              </Text>
              家
            </Text>
          </View>
          <View className={styles.feedback}>
            <Text>
              已确认
              <Text className={styles.quantity}>
                　
                {data.enterpriseConfirmeNum ? data.enterpriseConfirmeNum : '0'}
                　
              </Text>
              家
            </Text>
          </View>
          <View className={styles.feedback}>
            <Text>
              已谢绝
              <Text className={styles.quantity}>
                　
                {data.enterpriseRefuseTotalNum
                  ? data.enterpriseRefuseTotalNum
                  : '0'}
                　
              </Text>
              家
            </Text>
          </View>
          <View className={styles.feedback}>
            <AtIcon value="chevron-right" size="20" color="#999999"></AtIcon>
          </View>
        </View>
        <View className={styles.line}></View>
        {/* 操作 */}
        <View className={styles.operation}>
          {/* data.status */}
          {/* 生效中 */}
          {data.status === 1 ? (
            <View>
              <View className={styles.telephone}>
                <Text
                  onClick={() => {
                    oneMoreOrder(data.id)
                  }}
                >
                  再来一单
                </Text>
              </View>
              <View onClick={decline} className={styles.cancel}>
                提前结束
              </View>
            </View>
          ) : null}
          {/* 已结束 */}
          {data.status === -3 ? (
            <View>
              <View className={styles.telephone}>
                <Text>再来一单</Text>
              </View>
              <View onClick={showModal} className={styles.cancel}>
                删除记录
              </View>
            </View>
          ) : null}
          {/* 审核失败 */}
          {data.status === -2 ? (
            <View>
              <View className={styles.telephone}>
                <Text>再来一单</Text>
              </View>
              <View onClick={showModal} className={styles.cancel}>
                删除记录
              </View>
              <View onClick={viewReason} className={styles.cancel}>
                查看原因
              </View>
            </View>
          ) : null}
        </View>
      </View>

      {/* 弹窗 */}
      <View className={styles.popup}>
        <AtModal isOpened={popup}>
          <AtModalHeader>
            {windowType.type === 'mov' ? '删除订单' : null}
            {windowType.type === 'CancelConfirmation' ? '取消确认' : null}
            {windowType.type === 'confirmCooperation' ? '确定合作' : null}
            {windowType.type === 'end' ? '提前结束' : null}
          </AtModalHeader>
          <AtModalContent>
            {windowType.type === 'mov' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>确定删除订单？</View>
              </View>
            ) : null}
            {windowType.type === 'CancelConfirmation' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>是否取消确认？</View>
              </View>
            ) : null}
            {windowType.type === 'confirmCooperation' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>是否确定合作？</View>
              </View>
            ) : null}
            {windowType.type === 'end' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>提前结束</View>
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

export default observer(index)
