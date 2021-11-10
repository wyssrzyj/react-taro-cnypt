import styles from './index.module.less'
import { View, Button } from '@tarojs/components'
import CusTabs from '@/components/cusTabs'
import Taro from '@tarojs/taro'
import { useStores } from '@/store/mobx'

const Orders = () => {
  const { commonStore } = useStores()
  const { district } = commonStore
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ Orders ~ district', district)

  const toHome = () => {
    Taro.redirectTo({ url: '/pages/index/index' })
  }

  return (
    <View>
      <CusTabs></CusTabs>
      <View>Orders</View>
      <Button onClick={toHome}>首页</Button>
    </View>
  )
}

export default Orders
