import styles from './index.module.less'
import { View, Image, Text } from '@tarojs/components'
import { cloneDeep, isEmpty, isNil } from 'lodash'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

const CANCEL =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/cancel.png'
const FBDD =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/fbdd.png'
const GCRZ =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/gcrz.png'
const FDS =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/fds.png'

const TabBarModal = props => {
  const { showModal } = props

  const currentUser = Taro.getStorageSync('currentUser')
    ? JSON.parse(Taro.getStorageSync('currentUser'))
    : {}
  const userInformation = Taro.getStorageSync('userInfo')
    ? JSON.parse(Taro.getStorageSync('userInfo'))
    : {}

  const initConfigs = [
    {
      title: '发单商入驻',
      msg: '我要下订单',
      image: FDS,
      background: 'linear-gradient(180deg, #CCAE9A 0%, #CBAC98 100%);',
      onClick: () => {
        if (isEmpty(currentUser)) {
          Taro.redirectTo({
            url: '/pages/login/index'
          })
        } else {
          Taro.navigateTo({
            url: '/pages/orderIssueEntry/index'
          })
        }
      }
    },
    {
      title: '发布订单',
      msg: '我要发布订单',
      image: FBDD,
      background: 'linear-gradient(180deg, #A8C2C8 0%, #A8C2C8 100%);',
      onClick: () => {
        if (isEmpty(currentUser)) {
          Taro.redirectTo({
            url: '/pages/login/index'
          })
        } else {
          Taro.navigateTo({
            url: '/pages/publish/index'
          })
        }
      }
    },
    {
      title: '工厂入驻',
      msg: '我要更多人知道',
      image: GCRZ,
      background: 'linear-gradient(180deg, #A4A2C6 0%, #A2A0C4 100%)',
      onClick: () => {
        if (isEmpty(currentUser)) {
          Taro.redirectTo({
            url: '/pages/login/index'
          })
        } else {
          Taro.navigateTo({
            url: '/pages/factoryEntry/index'
          })
        }
      }
    }
  ]

  const [configs, setConfigs] = useState(initConfigs)

  useEffect(() => {
    let nConfigs = cloneDeep(configs)
    if (
      isEmpty(currentUser) ||
      isEmpty(userInformation) ||
      isNil(userInformation.enterpriseType)
    ) {
    }
    if (
      userInformation &&
      !isNil(userInformation.enterpriseType) &&
      +userInformation.enterpriseType === 0
    ) {
      nConfigs = []
    }
    if (
      userInformation &&
      !isNil(userInformation.enterpriseType) &&
      +userInformation.enterpriseType === 1
    ) {
      nConfigs = nConfigs.filter((_, idx) => idx === 1)
    }
    setConfigs(nConfigs)
  }, [])

  return (
    <View className={styles.tabBarModal}>
      {configs.map((config, idx) => (
        <View
          key={idx}
          className={styles.config}
          style={{ background: config.background }}
          onClick={config.onClick}
        >
          {/* <View className={styles.blurBox}></View> */}
          <Image src={config.image} className={styles.img}></Image>
          <View className={styles.configInfo}>
            <Text className={styles.title}>{config.title}</Text>
            <Text className={styles.msg}>{config.msg}</Text>
          </View>
        </View>
      ))}
      <Image
        src={CANCEL}
        className={styles.cancelImg}
        onClick={showModal}
      ></Image>
    </View>
  )
}

export default TabBarModal
