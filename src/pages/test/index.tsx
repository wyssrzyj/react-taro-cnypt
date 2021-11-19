import { useStores, observer } from '@/store/mobx'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

const Home = () => {
  const LOCATION_APIKEY = JSON.stringify('7JJBZ-YZ5KW-JSBRU-OXDPS-W3A36-TVFTJ')
  console.log(Taro, 'Taro')
  const markertap = () => {
    Taro.chooseLocation({
      success: function (res) {
        // 点击确定后成功回调返回的信息
        var name = res.name // 地点名
        var address = res.address // 地址
        var latitude = res.latitude // 经度
        var longitude = res.longitude // 纬度
        console.log(name + '|' + address + '|' + latitude + '|' + longitude)
      }
    })
  }

  return (
    <View class="cu-form-group" style={{ paddingTop: '100px' }}>
      <View class="title">位置</View>
      <Input placeholder="请输入地址" value={''}></Input>
      <Text class="cuIcon-locationfill text-orange" onClick={markertap}>
        asdfasdf{' '}
      </Text>
    </View>
  )
}

export default observer(Home)
