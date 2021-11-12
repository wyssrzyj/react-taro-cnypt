import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import styles from './index.module.less'

const CusTabs = () => {
  const instance = Taro.getCurrentInstance()
  const { router } = instance

  const tabs = [
    {
      label: '找订单',
      url: '/pages/orders/index'
    },
    {
      label: '找工厂',
      url: '/pages/factory/index'
    }
  ]

  const changePage = url => {
    if (router?.path !== url) {
      Taro.redirectTo({
        url
      })
    }
  }

  return (
    <View className={styles.cusTabs}>
      {tabs.map((item, idx) => (
        <View
          key={idx}
          onClick={() => changePage(item.url)}
          className={router?.path === item.url ? styles.activeTab : styles.tab}
        >
          {item.label}
        </View>
      ))}
    </View>
  )
}

export default CusTabs
