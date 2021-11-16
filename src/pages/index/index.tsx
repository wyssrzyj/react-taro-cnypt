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
import { Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

const Home = () => {
  const { homeStore, commonStore, loginStore } = useStores()
  const { getNewFactory, getOrderList } = homeStore
  const { allDictionary, productCategory, getProductGrade, getDistrict } =
    commonStore
  const { userInfomation, userInfo } = loginStore

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
      await getProductGrade()
      await getDistrict()
    })()
  }, [])

  const isNilConfigs = [
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_order.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index'
        })
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_factory.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index'
        })
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
        Taro.navigateTo({
          url: '/pages/search/index'
        })
      }
    },
    {
      img: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_order.png',
      onClick: () => {
        Taro.navigateTo({
          url: '/pages/search/index'
        })
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

  const toFactoryEntry = () => {
    Taro.navigateTo({
      url: '/pages/factoryEntry/index'
    })
  }

  const toOrderEntry = () => {
    Taro.navigateTo({
      url: '/pages/orderIssueEntry/index'
    })
  }

  const toPublish = () => {
    Taro.navigateTo({
      url: '/pages/publish/index'
    })
  }

  const toTest = () => {
    Taro.navigateTo({
      url: '/pages/test/index'
    })
  }

  const toFactoryDetail = () => {
    Taro.navigateTo({
      url: `/pages/factoryDetail/index?id=64`
    })
  }

  const toOrderDetail = () => {
    Taro.navigateTo({
      url: '/pages/orderDetail/index'
    })
  }

  const toOrderIssueDetail = () => {
    Taro.navigateTo({
      url: '/pages/orderIssueDetail/index'
    })
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

      <Button onClick={toFactoryEntry}>工厂入驻</Button>
      <Button onClick={toOrderEntry}>发单商入驻</Button>
      <Button onClick={toPublish}>发布订单</Button>
      <Button onClick={toFactoryDetail}>工厂详情</Button>
      <Button onClick={toOrderDetail}>订单详情</Button>
      <Button onClick={toOrderIssueDetail}>发单商详情</Button>
      <Button onClick={toTest}>test</Button>

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
