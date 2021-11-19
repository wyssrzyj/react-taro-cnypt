import { View, Button } from '@tarojs/components'
import CusTabs from '@/components/cusTabs'
import Taro from '@tarojs/taro'
import { observer } from '@/store/mobx'

const Orders = () => {
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

export default observer(Orders)
