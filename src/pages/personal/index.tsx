import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Top from './components/top'
import Order from './components/order'
import Machining from './components/machining'
import Settled from './components/settled'
import Management from './components/management'
import Careful from './components/careful'
import { useStores } from '@/store/mobx'

import { TabBar } from '@/components'
// import My from './my/index'
// import Im from './im/index'

const Personal = () => {
  const { userInterface, commonStore } = useStores()

  const { getDistrict } = commonStore
  const { userInformation } = userInterface
  const [list, setList] = useState({})
  const [jurisdiction, setJurisdiction] = useState({})
  // 根据企业id 获取信息
  useEffect(() => {
    // getDisr()
    if (Taro.getStorageSync('currentUser')) {
      let information = JSON.parse(Taro.getStorageSync('currentUser')).userId
      pickUpInformation({ userId: information })
    }
    if (Taro.getStorageSync('userInfo')) {
      setJurisdiction(
        JSON.parse(Taro.getStorageSync('userInfo')).enterpriseType
      )
    } else {
      setJurisdiction('notLogged')
    }
  }, [])
  // 地区接口数据
  const getDisr = async () => {
    // await getDistrict()
  }
  // 用户信息
  const pickUpInformation = async e => {
    let res = await userInformation(e)
    if (res) {
      setList(res)
    }
    return res
  }
  return (
    <View className={styles.container}>
      <View className={styles.navbar}>
        <Text>我的</Text>
      </View>
      {/* 头部 */}
      {/* <Button onClick={toReset}>设置密码</Button> */}

      <Top list={list} userInfo={jurisdiction} />
      {/* 主体 */}
      <View className={styles.subject}>
        {jurisdiction === '1' ? <Order /> : null}
        {jurisdiction === 'notLogged' || jurisdiction === null ? (
          <Settled />
        ) : null}
        {jurisdiction === '0' ? <Machining /> : null}
        <Management userInfo={jurisdiction} />
        {/* 底部 */}
        <Careful />
      </View>

      <TabBar activeTab={2}></TabBar>
    </View>
  )
}

export default Personal
