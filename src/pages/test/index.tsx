import { observer } from '@/store/mobx'
import { View, Text, Input } from '@tarojs/components'

const Home = () => {
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
