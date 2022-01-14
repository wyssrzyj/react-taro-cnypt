import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import moment from 'moment'

import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { observer } from '@/store/mobx'

//
function index({ data, deleteMethod }) {
  const [windowType, setWindowType] = useState<any>({}) //弹窗类型
  const [popup, setPopup] = useState(false) //弹窗类型
  useEffect(() => {
    if (data) {
      // 加工类型
    }
    // 地区
  }, [])
  // 删除
  const showModal = () => {
    setPopup(true)
    setWindowType({ type: 'mov' })
  }
  const cancel = () => {
    setPopup(false)
  }
  const confirmButton = async () => {
    if (windowType.type === 'mov') {
      // 删除订单
      deleteMethod(data.id)
    }
    setPopup(false)
  }
  // 编辑
  const oneMoreOrder = id => {
    Taro.redirectTo({
      url: `/pages/personal/newQualification/index?id=${id}`
    })
  }
  //查看原因

  return (
    //   主体
    <View className={styles.external}>
      <View className={styles.major}>
        {/* 主体 */}
        <View className={styles.subject}>
          <View>
            {+data.status === 0 ? (
              <View className={styles.state}>生效中</View>
            ) : null}
            {+data.status === 1 ? (
              <View className={styles.ended}>审核中</View>
            ) : null}
            {+data.status === 2 ? (
              <View className={styles.fail}>审核失败</View>
            ) : null}
            {+data.status === 3 ? (
              <View className={styles.fail}>已失效</View>
            ) : null}
            <View
              className={
                data.certificateImageURI ? styles.img : styles.emptyCardImg
              }
            >
              <Image
                className={styles.img}
                src={data.certificateImageURI}
                alt=""
              />
            </View>
          </View>
          <View>
            <View className={styles.factory}>{data.certificationLabel}</View>
            <View className={styles.factory}>
              证书编号: {data.certificationCode}
            </View>
            <View className={styles.factory}>
              {data.neverExpire === 1
                ? '长期有效'
                : moment(data.expiryDate).format('YYYY-MM-DD')}
            </View>
          </View>
        </View>
        <View className={styles.line}></View>
        {/* 操作 */}
        <View className={styles.operation}>
          <View>
            <View
              className={styles.telephone}
              onClick={() => {
                oneMoreOrder(data.id)
              }}
            >
              <Text>编辑</Text>
            </View>
            <View onClick={showModal} className={styles.cancel}>
              删除记录
            </View>
          </View>
        </View>
      </View>

      {/* 弹窗. */}
      <View className={styles.popup}>
        <AtModal isOpened={popup}>
          <AtModalHeader>
            {windowType.type === 'mov' ? '提示' : null}
            {windowType.type === 'CancelConfirmation' ? '提示' : null}
            {windowType.type === 'confirmCooperation' ? '提示' : null}
            {windowType.type === 'end' ? '提示' : null}
          </AtModalHeader>
          <AtModalContent>
            {windowType.type === 'mov' ? (
              <View className={styles.delContent}>
                <View className={styles.delText}>确定删除该资质吗？</View>
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
                <View className={styles.delText}>是否提前结束?</View>
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
