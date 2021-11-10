import { useEffect, useState, useRef } from 'react'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import { useStores, observer, toJS } from '@/store/mobx'
import styles from './index.module.less'
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import TabBar from '@/components/tabBar'
import Card from './components/card'
import { cloneDeep, isNil } from 'lodash'
import { Navbar } from '@/components'
import classNames from 'classnames'

const Home = () => {
  const { homeStore, commonStore, loginStore } = useStores()
  const { getNewFactory, getOrderList } = homeStore
  const { allDictionary, productCategory } = commonStore
  const { currentUser, userInfo } = loginStore

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
      await userInfo()
      await productCategory()
    })()
  }, [])

  const isNilConfigs = [
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_order.png',
      onClick: () => {
        console.log(1)
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_factory.png',
      onClick: () => {
        console.log(2)
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_factory_in.png',
      onClick: () => {
        console.log(3)
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_order_in.png',
      onClick: () => {
        console.log(4)
      }
    }
  ]

  const factoryConfigs = [
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/factory_factory.png',
      onClick: () => {
        console.log(5)
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/factory_order.png',
      onClick: () => {
        console.log(6)
      }
    }
  ]

  const orderConfigs = [
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_factory.png',
      onClick: () => {
        console.log(7)
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_order.png',
      onClick: () => {
        console.log(8)
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_push.png',
      onClick: () => {
        console.log(9)
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
    if (loading) return
    if (dataSource.length >= total) return
    setPageNum(n => n + 1)
  })

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const nData = cloneDeep(dataSource)
      const fn = activeTab === 0 ? getOrderList : getNewFactory
      console.log(pageNum)
      const res = (await fn(pageNum)) || {}
      console.log(res)

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
        {isNil(currentUser.enterpriseType) ? (
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
        ) : +currentUser.enterpriseType === 0 ? ( // 加工厂
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
          return <Card key={idx} data={data} type={activeTab}></Card>
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
