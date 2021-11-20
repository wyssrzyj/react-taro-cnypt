import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
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
  const { top } = Taro.getMenuButtonBoundingClientRect()

  const { userInterface } = useStores()
  const { userInformation } = userInterface
  const [list, setList] = useState({})
  const [jurisdiction, setJurisdiction] = useState({})
  // 根据企业id 获取信息
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
    <View>
      <View className={styles.father}>
        <View className={styles.navBar} style={{ paddingTop: `${top}px` }}>
          <View className={styles.navContent}>
            <View>我的</View>
          </View>
        </View>
        <View className={styles.absolutes}>
          <Top list={list} userInfo={jurisdiction} />
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
              {/* 底部 */}
              <Careful userInfo={jurisdiction} />
            </View>
          </View>
        </View>
      </View>

      <TabBar activeTab={2}></TabBar>
    </View>
  )
}

export default Personal
