import { useStores, observer } from '@/store/mobx'
import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.less'
import { isEmpty } from 'lodash'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

const ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/prompt.png'

/**
 * 目前只适用于 订单详情和加工厂详情
 * @param props
 * @param data 数据
 * @param person 联系人字段
 * @param phone 联系电话字段
 * @param personId 请求的目标字段
 * @param callback 回调函数
 * @param id 路由id
 * @returns
 */
const PhoneCard = props => {
  const {
    data,
    person = 'contactsName',
    phone = 'mobilePhone',
    callback,
    type = 'factory',
    personId = 'enterpriseId',
    id
  } = props

  const { factoryStore } = useStores()
  const { checkOrderIssuer, getFactoryPhoneInfo, checkFactoryGetorder } =
    factoryStore

  const userInfomation = Taro.getStorageSync('userInfo')
    ? JSON.parse(Taro.getStorageSync('userInfo'))
    : {}

  const currentUser = Taro.getStorageSync('currentUser')
    ? JSON.parse(Taro.getStorageSync('currentUser'))
    : {}

  // 请发布一条订单并审核通过后，才可查看联系方式
  // 当前会员等级今日还可查看 5 条信息
  // 您的会员等级今日查看电话次数已达上限，请明日再来～
  const [toolTips, setToolTips] = useState('')
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (type === 'order' && !isEmpty(currentUser)) {
      ;(async () => {
        const flag = await checkFactoryGetorder(id)
        setDisabled(!flag)
        if (flag) {
          setToolTips('')
        } else {
          setToolTips('申请接单后查看电话')
        }
      })()
    }
  }, [])

  useEffect(() => {
    if (type === 'factory') {
      if (
        isEmpty(currentUser) ||
        isEmpty(userInfomation) ||
        +userInfomation.enterpriseType !== 1
      ) {
        setToolTips('请发布一条订单并审核通过后，才可查看联系方式')
      } else {
        setToolTips('')
      }
    }
  }, [])

  const showFactoryPhone = async () => {
    if (isEmpty(currentUser)) {
      Taro.redirectTo({
        url: `/pages/login/index?source=/pages/factoryDetail/index&id=${id}`
      })
    }
    if (isEmpty(userInfomation) || +userInfomation.enterpriseType !== 1) {
      Taro.redirectTo({
        url: '/pages/orderIssueEntry/index'
      })
    }
    if (+userInfomation.enterpriseType === 1) {
      const res = await checkOrderIssuer(userInfomation.enterpriseId)
      if (!res) {
        Taro.redirectTo({
          url: '/pages/publish/index'
        })
      } else {
        const info = (await getFactoryPhoneInfo(data[personId])) || {}
        const { name = null, mobile = null, verifyMessage } = info
        callback && name && mobile && callback(mobile, name)
        ;+verifyMessage === 0 &&
          setToolTips(`当前会员等级今日还可查看 ${verifyMessage} 条信息`)
        ;+verifyMessage < 0 &&
          setToolTips(`您的会员等级今日查看次数已达上限，请明日再来～`)
      }
    }
  }

  const showOrderIssuerPhone = async () => {
    if (disabled) return
    if (isEmpty(currentUser)) {
      Taro.redirectTo({
        url: `/pages/login/index?source=/pages/orderDetail/index&id=${id}`
      })
    }
    if (isEmpty(userInfomation) || +userInfomation.enterpriseType !== 0) {
      Taro.redirectTo({
        url: '/pages/factoryEntry/index'
      })
    }
    if (+userInfomation.enterpriseType === 0) {
      const info = (await getFactoryPhoneInfo(data[personId])) || {}
      console.log(
        '🚀 ~ file: index.tsx ~ line 123 ~ showOrderIssuerPhone ~ info',
        info
      )
    }
  }

  return (
    <View className={styles.phoneCard}>
      <View className={styles.content}>
        <View className={styles.left}>
          <View className={styles.info}>
            <Text className={styles.label}>联系人</Text>
            <Text className={styles.value}>{data[person]}</Text>
          </View>
          <View className={styles.info}>
            <Text className={styles.label}>手机号</Text>
            <Text className={styles.value}>{data[phone]}</Text>
          </View>
        </View>
        <View
          className={classNames(styles.right, disabled ? styles.disabled : '')}
          onClick={type === 'factory' ? showFactoryPhone : showOrderIssuerPhone}
        >
          查看电话
        </View>
      </View>
      {toolTips && (
        <View className={styles.toolTip}>
          <Image src={ICON} className={styles.icon}></Image>
          <Text>{toolTips}</Text>
        </View>
      )}
    </View>
  )
}

export default observer(PhoneCard)
