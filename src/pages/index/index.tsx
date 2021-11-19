import { useEffect, useState, useRef } from 'react'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import { useStores, observer } from '@/store/mobx'
import styles from './index.module.less'
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import TabBar from '@/components/tabBar'
import Card from './components/card'
import { cloneDeep, isNil, isEmpty } from 'lodash'
import { Navbar } from '@/components'
import classNames from 'classnames'
import Taro from '@tarojs/taro'

const Home = () => {
  const { homeStore, commonStore, loginStore } = useStores()
  const { getNewFactory, getOrderList } = homeStore
  const { allDictionary, productCategory, getProductGrade, getDistrict } =
    commonStore
  const { userInfo } = loginStore

  const userInfomation = Taro.getStorageSync('userInfo')
    ? JSON.parse(Taro.getStorageSync('userInfo'))
    : {}
  const currentUser = Taro.getStorageSync('currentUser')
    ? JSON.parse(Taro.getStorageSync('currentUser'))
    : {}

  const containerRef = useRef<HTMLElement>()

  const [pageNum, setPageNum] = useState(1)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [init, setInit] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      await allDictionary([])
      await productCategory()
      await getProductGrade()
      await getDistrict()
      if (!isEmpty(currentUser)) {
        await userInfo()
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
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/banner/banner1.jpg',
      url: '/pages/index/index'
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/banner/banner2.jpg',
      url: '/pages/index/index'
    }
  ]

  usePullDownRefresh(async () => {
    await setPageNum(1)
  })

  useReachBottom(() => {
    console.log('下拉')

    if (loading) return
    console.log(loading)

    if (dataSource.length >= total) return
    setPageNum(n => n + 1)
  })

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const nData = cloneDeep(dataSource)
      const fn = activeTab === 0 ? getOrderList : getNewFactory
      const res = (await fn(pageNum)) || {}
      const { records = [], current = 1, total = 0 } = res
      const target = current === 1 ? records : [...nData, ...records]

      setDataSource(target)
      setLoading(false)
      setTotal(total)
      setInit(true)
    })()
  }, [pageNum, activeTab])

  const tabClick = tab => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setPageNum(1)
  }

  return (
    <View className={styles.container} ref={containerRef}>
      <Navbar>
        <View className={styles.tabs}>
          <Text
            onClick={() => tabClick(0)}
            className={classNames(
              styles.tab,
              activeTab === 0 ? styles.activeTab : ''
            )}
          >
            找订单
          </Text>
          <Text
            onClick={() => tabClick(1)}
            className={classNames(
              styles.tab,
              activeTab === 1 ? styles.activeTab : ''
            )}
          >
            找工厂
          </Text>
        </View>
      </Navbar>

      <View className={styles.content}>
        <Swiper
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
          interval={3000}
          className={styles.swipers}
        >
          {banners.map((item, idx) => (
            <SwiperItem key={idx}>
              <Image src={item.img} className={styles.banner}></Image>
            </SwiperItem>
          ))}
        </Swiper>
        {isNil(userInfomation.enterpriseType) ? (
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
        ) : +userInfomation.enterpriseType === 0 ? ( // 加工厂
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
      <TabBar activeTab={1}></TabBar>
    </View>
  )
}

export default observer(Home)
