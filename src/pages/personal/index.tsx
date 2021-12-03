import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Top from './components/top'
import Order from './components/order'
import Machining from './components/machining'
import Settled from './components/settled'
import Management from './components/management'
import Careful from './components/careful'
import { useStores } from '@/store/mobx'
import { TabBar } from '@/components'

const Personal = () => {
  Taro.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: '#3b80ff',
    animation: {
      duration: 400,
      timingFunc: 'easeIn'
    }
  })
  Taro.setNavigationBarTitle({
    title: '我的'
  })
  const { top } = Taro.getMenuButtonBoundingClientRect()

  const { userInterface } = useStores()
  const { userInformation } = userInterface
  const [list, setList] = useState({})
  const [jurisdiction, setJurisdiction] = useState({})
  // 根据企业id 获取信息.
  useEffect(() => {
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

  // 用户信息
  const pickUpInformation = async e => {
    let res = await userInformation(e)

    if (res) {
      setList(res)
    }
    return res
  }

  return (
    <View className={styles.containers}>
      <View className={styles.absolutes}>
        <View className={styles.absolutesColor}>
          <Top list={list} />
          <View>
            {/* 主体 */}
            <View
              className={
                jurisdiction === 'notLogged' ? styles.subject : styles.subjects
              }
            >
              {jurisdiction === '1' ? <Order /> : null}
              {jurisdiction === 'notLogged' || jurisdiction === null ? (
                <Settled type={list} />
              ) : null}
              {jurisdiction === '0' ? <Machining /> : null}
              <Management list={list} userInfo={jurisdiction} />
            </View>
          </View>
        </View>
        <View>
          {/* 底部 */}
          <Careful userInfo={jurisdiction} />
        </View>
      </View>

      <TabBar activeTab={2}></TabBar>
    </View>
  )
}

export default Personal
