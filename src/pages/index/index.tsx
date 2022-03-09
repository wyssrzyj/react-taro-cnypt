import { useEffect, useState } from 'react'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import { useStores, observer } from '@/store/mobx'
import styles from './index.module.less'
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import TabBar from '@/components/tabBar'
import Card from './components/card'
import { cloneDeep, isNil, isEmpty, isArray } from 'lodash'
import { Navbar } from '@/components'
import classNames from 'classnames'
import Taro, { navigateToMiniProgram } from '@tarojs/taro'
import { matchTreeData } from '@/utils/tool'
import { Button } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Home = () => {
  const { homeStore, commonStore, loginStore } = useStores()
  const { getNewFactory, getOrderList } = homeStore
  const {
    allDictionary,
    productCategory,
    getProductGrade,
    getDistrict,
    latestSettledEnterpriseInformation,
    district
  } = commonStore
  const { userInfo } = loginStore

  const [userInformation, setUserInformation] = useState<any>({})
  const [currentUser, setCurrentUser] = useState<any>({})

  const [pageNum, setPageNum] = useState(1)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [init, setInit] = useState<boolean>(false)
  const [isIOS, setIsIOS] = useState<boolean>(false)

  useEffect(() => {
    Taro.getSystemInfo({
      success: res => {
        setIsIOS(res.system.includes('iOS'))
      }
    })
  })
  Taro.setNavigationBarTitle({
    title: '首页'
  })
  Taro.setNavigationBarColor({
    frontColor: '#000000',
    backgroundColor: '#f4f7fd',
    animation: {
      duration: 400,
      timingFunc: 'easeIn'
    }
  })

  useEffect(() => {
    ;(async () => {
      await allDictionary([])
      await productCategory()
      await getProductGrade()
      await getDistrict()
    })()
  }, [])

  const text = async () => {
    console.log('8888888888888888')

    let res = await latestSettledEnterpriseInformation({
      pageNum: 1,
      pageSize: 10
    })
    console.log(res)
  }
  useEffect(() => {
    Taro.removeStorageSync('pathUrl')
    text()
  }, [])

  useEffect(() => {
    ;(async () => {
      const user = Taro.getStorageSync('currentUser')
        ? JSON.parse(Taro.getStorageSync('currentUser'))
        : {}
      setCurrentUser(user)
      if (!isEmpty(user)) {
        await userInfo()
        const info = Taro.getStorageSync('userInfo')
          ? JSON.parse(Taro.getStorageSync('userInfo'))
          : {}
        setUserInformation(info)
      }
    })()
  }, [])

  const isNilConfigs = [
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_order.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index?tab=0'
        })
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_factory.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index?tab=1'
        })
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_factory_in.png',
      onClick: () => {
        if (isEmpty(currentUser)) {
          Taro.navigateTo({
            url: '/pages/login/index'
          })
        } else {
          Taro.navigateTo({
            url: '/pages/factoryEntry/index'
          })
        }
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_order_in.png',
      onClick: () => {
        if (isEmpty(currentUser)) {
          Taro.navigateTo({
            url: '/pages/login/index'
          })
        } else {
          Taro.navigateTo({
            url: '/pages/orderIssueEntry/index'
          })
        }
      }
    }
  ]

  const factoryConfigs = [
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/factory_factory.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index?tab=1'
        })
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/factory_order.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index?tab=0'
        })
      }
    }
  ]

  const orderConfigs = [
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_factory.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index?tab=1'
        })
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_order.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index?tab=0'
        })
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_push.png',
      onClick: () => {
        if (isEmpty(currentUser)) {
          Taro.navigateTo({
            url: '/pages/login/index'
          })
        } else {
          Taro.navigateTo({
            url: '/pages/publish/index'
          })
        }
      }
    }
  ]

  const banners = [
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/images/307e604da5016255797e9bb0a0608b8.jpg',
      // img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/banner/banner1.jpg',
      url: '/pages/index/index',
      type: '1'
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/images/56b72c3b03dbb14c197e92d3bb8a039.jpg',
      // img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/banner/banner2.jpg',
      url: '/pages/index/index',
      type: '2'
    }
  ]

  usePullDownRefresh(async () => {
    await setPageNum(1)
    Taro.stopPullDownRefresh()
  })

  useReachBottom(() => {
    if (loading) return
    if (dataSource.length >= total) return
    setPageNum(n => n + 1)
  })

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      if (!district.length) {
        return
      }
      const nData = cloneDeep(dataSource)
      const fn = activeTab === 0 ? getOrderList : getNewFactory
      const res = (await fn(pageNum)) || {}
      const { records = [], current = 1, total = 0 } = res
      if (activeTab === 0) {
        records.forEach(item => {
          if (isArray(item.inquiryDistrictIds)) {
            item.area =
              item.inquiryDistrictIds.map(i => {
                const target = matchTreeData(district, i, 'value') || {}
                return target.label
              }) || []
          }
        })
      }
      const target = current === 1 ? records : [...nData, ...records]

      setDataSource(target)
      setLoading(false)
      setTotal(total)
      setInit(true)
    })()
  }, [pageNum, activeTab, district])

  const tabClick = tab => {
    if (tab === activeTab) return
    setDataSource([])
    setActiveTab(tab)
    setPageNum(1)
  }
  const btn = type => {
    if (type === '1') {
      Taro.navigateToMiniProgram({
        appId: 'wx7e11519f5b973cd9'
      })
    }
  }

  return (
    <View className={styles.container}>
      <View>
        <AtNoticebar close={true} marquee>
          恭喜***入驻
        </AtNoticebar>
      </View>
      <View className={styles.tabs}>
        <Text
          onClick={() => tabClick(1)}
          className={classNames(
            styles.tab,
            activeTab === 1 ? styles.activeTab : ''
          )}
        >
          找工厂
        </Text>
        <Text
          onClick={() => tabClick(0)}
          className={classNames(
            styles.tab,
            activeTab === 0 ? styles.activeTab : ''
          )}
        >
          找订单
        </Text>
      </View>

      <View className={isIOS ? styles.IOSContent : styles.content}>
        <Swiper
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
          interval={3000}
          className={styles.swipers}
          previousMargin={'0px'}
          nextMargin={'0px'}
        >
          {banners.map((item, idx) => (
            <SwiperItem key={idx} className={styles.swiperItem}>
              <Image
                src={item.img}
                className={styles.banner}
                onClick={() => {
                  btn(item.type)
                }}
              ></Image>
            </SwiperItem>
          ))}
        </Swiper>
        {isNil(userInformation.enterpriseType) ? (
          <View className={styles.unImgs}>
            {isNilConfigs.map((item, idx) => (
              <Image
                src={item.img}
                onClick={item.onClick}
                key={idx}
                className={styles.unImg}
              ></Image>
            ))}
          </View>
        ) : +userInformation.enterpriseType === 0 ? ( // 加工厂
          <View className={styles.unImgs}>
            {factoryConfigs.map((item, idx) => (
              <Image
                src={item.img}
                onClick={item.onClick}
                key={idx}
                className={styles.unImg}
              ></Image>
            ))}
          </View>
        ) : (
          // 发单商
          <View className={styles.unImgs}>
            {orderConfigs.map((item, idx) => (
              <Image
                src={item.img}
                onClick={item.onClick}
                key={idx}
                className={styles.orderImg}
              ></Image>
            ))}
          </View>
        )}
        <View className={styles.title}>
          {activeTab === 0 ? '最新订单' : '最新工厂'}
        </View>
        {dataSource.length > 0 ? (
          <View>
            {dataSource.map((data, idx) => {
              return (
                <Card
                  key={idx}
                  data={data}
                  type={activeTab}
                  source={'/pages/index/index'}
                ></Card>
              )
            })}
            {dataSource.length >= total && init && (
              <View className={styles.noMoreText}>没有更多了</View>
            )}
          </View>
        ) : null}
        {!loading && !dataSource.length ? (
          <View class={styles.emptyDisplay}>
            <View className={styles.empty}>
              <Image className={styles.img} src={ORDER_EMPTY} alt="" />
            </View>
            <View>
              <Text> {activeTab === 0 ? '暂无订单' : '暂无工厂'}</Text>
            </View>
          </View>
        ) : null}
      </View>
      <TabBar activeTab={1}></TabBar>
    </View>
  )
}

export default observer(Home)
