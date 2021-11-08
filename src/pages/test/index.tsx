import { useEffect, useState, useMemo } from 'react'
import { View, Button, Image, Picker } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { useStores, observer, toJS } from '@/store/mobx'
import styles from './index.module.less'
import Taro from '@tarojs/taro'
import TabBar from '@/components/tabBar'
import { throttle } from 'lodash'

const Home = () => {
  const { homeStore, commonStore } = useStores()
  const { count, setCount, name } = homeStore
  const { getDistrict } = commonStore

  const [userInfo, setUserInfo] = useState<any>({})
  const [selectedArea, setSelectedArea] = useState<string>('')

  const [provinceData, setProvinceData] = useState<any[]>([])
  const [cityData, setCityData] = useState<any[]>([])
  const [areaData, setAreaData] = useState<any[]>([])
  const [provinceIdx, setProvinceIdx] = useState<number>(0)
  const [cityIdx, setCityIdx] = useState<number>(0)
  const [areaValue, setAreaValue] = useState<any[]>([0, 0, 0])

  useEffect(() => {
    ;(async () => {
      const res = await getDistrict()
      setProvinceData(res)
      const cData = [{ label: '不限', value: 0 }, ...res[0].children]
      const aData = [{ label: '不限', value: 0 }]
      setCityData(cData)
      setAreaData(aData)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      await getOauthStatus()

      // Taro.login({
      //   success: function (res) {
      //     console.log('🚀 ~ file: index.tsx ~ line 20 ~ ; ~ res', res)
      //     Taro.showToast({
      //       title: res.code
      //     })
      //   }
      // })
      Taro.setStorageSync('userInfo', null)
      Taro.removeStorageSync('userinfo')
      Taro.clearStorage()

      Taro.checkSession({
        success: function () {
          console.log(555555)
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
          // Taro.login() //重新登录
        }
      })
    })()
  }, [])

  const onClick = (...args) => {
    // console.log('🚀 ~ file: index.tsx ~ line 7 ~ onClick ~ args', args)
  }

  const getPhoneNumber = event => {
    const { detail } = event
    console.log('🚀 ~ file: index.tsx ~ line 14 ~ detail', detail)
    Taro.login({
      success: () => {
        console.log('success')
      }
    })

    if (detail.errMsg.includes('getPhoneNumber:fail')) {
      //用户点击拒绝
      console.log('拒绝授权')
    } else {
      //允许授权执行跳转
      console.log('允许授权')
    }
  }

  const getUserProfile = event => {
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        console.log(res)
        setUserInfo(res.userInfo)
      }
    })
  }

  const getOauthStatus = async () => {
    const settings = await Taro.getSetting()
    console.log(
      '🚀 ~ file: index.tsx ~ line 47 ~ getOauthStatus ~ settings',
      settings
    )
    if (
      Object.keys(settings.authSetting).length === 0 ||
      !settings.authSetting['scope.userInfo']
    ) {
      console.log(settings.authSetting)
      console.log('用户无授权信息')
    } else {
      const userInfo = await Taro.getUserInfo()
      console.log(
        '🚀 ~ file: index.tsx ~ line 70 ~ getOauthStatus ~ userInfo',
        userInfo
      )
    }
  }

  const toFactory = () => {
    Taro.navigateTo({
      url: '/pages/factory/index'
    })
  }

  const districtChange = event => {
    const {
      detail: { value }
    } = event
    setAreaValue(value)

    const districtText = value.reduce((prev, item, idx) => {
      if (idx === 0) {
        prev = provinceData[item].label
      }
      if (idx === 1) {
        if (cityData[item].label !== '不限') {
          prev += '-' + cityData[item].label
        }
      }

      if (idx === 2) {
        if (areaData[item].label !== '不限') {
          prev += '-' + areaData[item].label
        }
      }
      return prev
    }, '')

    setSelectedArea(districtText)
  }

  const onColumnChange = event => {
    const {
      detail: { column, value }
    } = event

    if (column === 0) {
      const target = provinceData[value]
      console.log('🚀 ~ file: index.tsx ~ line 158 ~ Home ~ target', target)
      const province =
        provinceData.find(item => item.value === target.value) || {}
      province.children = province.children || []
      const cData = [{ label: '不限', value: 0 }, ...province.children]
      const aData = [{ label: '不限', value: 0 }]

      setCityData(cData)
      setAreaData(aData)
      setProvinceIdx(value)
      setAreaValue([value, 0, 0])
    }
    if (column === 1) {
      const target = cityData.find(item => item.value === cityData[value].value)
      setCityIdx(value)

      setAreaData(
        Array.isArray(target.children)
          ? [{ label: '不限', value: 0 }, ...target.children]
          : [{ label: '不限', value: 0 }]
      )
      setAreaValue([areaValue[0], value, 0])
    }
  }

  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
  }

  const toFindPwd = () => {
    Taro.navigateTo({ url: '/pages/login/findPwd/index' })
  }

  return (
    <View className={styles.container}>
      <Button onClick={setCount}>按钮</Button>
      <View>{count}</View>
      <View>{name}</View>
      <Button onClick={toFindPwd}>忘记密码</Button>
      <Button onClick={toLogin}>登录页</Button>
      <Button onClick={toFactory}>加工厂页</Button>
      <Button onClick={getUserProfile}>微信账号快速登录</Button>
      <Button
        type={'primary'}
        onClick={onClick}
        openType={'getPhoneNumber'}
        onGetPhoneNumber={getPhoneNumber}
      >
        本机号码登录
      </Button>

      <View>{userInfo.nickName}</View>
      <Image src={userInfo.avatarUrl}></Image>
      <View>
        <Picker
          mode="multiSelector"
          value={areaValue}
          rangeKey={'label'}
          range={[provinceData, cityData, areaData]}
          onChange={districtChange}
          onColumnChange={throttle(onColumnChange, 50)}
        >
          <AtList>
            <AtListItem title="请选择地区" extraText={selectedArea} />
          </AtList>
        </Picker>
      </View>
      <TabBar activeTab={1}></TabBar>
    </View>
  )
}

export default observer(Home)
