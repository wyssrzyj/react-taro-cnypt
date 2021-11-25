import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import './index.less'
import TabBarModal from '../tabBarModal'
import Taro, { useRouter } from '@tarojs/taro'
import { isNil } from 'lodash'

const HOME =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/home.png'
const HOME_SELECTED =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/homeSelected.png'
const PERSONAL =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/personal.png'
const PERSONAL_SELECTED =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/personalSelected.png'
const ADD =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/add.png'

const TabBar = props => {
  const { activeTab } = props

  const router = useRouter()

  const [tab, setTab] = useState<number>(activeTab)
  const [modalFlag, setModalFlag] = useState<boolean>(false)
  const [isIOS, setIsIOS] = useState<boolean>(false)
  const [userInformation, setUserInformation] = useState<any>({})

  useEffect(() => {
    setTimeout(() => {
      const info = Taro.getStorageSync('userInfo')
        ? JSON.parse(Taro.getStorageSync('userInfo'))
        : {}
      setUserInformation(info)
    })
  }, [])

  useEffect(() => {
    Taro.getSystemInfo({
      success: res => {
        setIsIOS(res.system.includes('iOS'))
      }
    })
  })

  const changeTab = index => {
    const targetPath =
      index === 2 ? '/pages/personal/index' : '/pages/index/index'
    if (targetPath === router.path) return
    setTab(index)
    Taro.redirectTo({
      url: targetPath
    })
  }

  const showAdd = () => {
    setModalFlag(f => !f)
  }

  return (
    <View className={'tabBarContainer'}>
      <View className={'tabBar'}>
        <View
          onClick={() => changeTab(1)}
          className={classNames(tab === 1 ? 'selectedTab' : 'tab')}
        >
          <Image
            src={tab === 1 ? HOME_SELECTED : HOME}
            className={'tabImage'}
          ></Image>
          <Text>首页</Text>
        </View>

        {isNil(userInformation.enterprise) ||
        +userInformation.enterprise === 1 ? (
          <View className={'tabAddBox'}>
            <Image src={ADD} className={'tabAdd'} onClick={showAdd}></Image>
            <Text></Text>
          </View>
        ) : (
          ''
        )}

        <View
          onClick={() => changeTab(2)}
          className={classNames(tab === 2 ? 'selectedTab' : 'tab')}
        >
          <Image
            src={tab === 2 ? PERSONAL_SELECTED : PERSONAL}
            className={'tabImage'}
          ></Image>
          <Text>我的</Text>
        </View>
      </View>
      {isIOS ? <View className={'iosAdd'}></View> : null}

      {modalFlag && <TabBarModal showModal={showAdd}></TabBarModal>}
    </View>
  )
}

export default TabBar
