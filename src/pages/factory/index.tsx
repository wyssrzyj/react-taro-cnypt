import styles from './index.module.less'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import CusTabs from '@/components/cusTabs'
import Taro from '@tarojs/taro'

const BANNER_1 =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/banner/banner1.jpg'
const BANNER_2 =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/banner/banner2.jpg'

const Factory = () => {
  const banners = [
    {
      img: BANNER_1,
      url: '/pages/index/index'
    },
    {
      img: BANNER_2,
      url: '/pages/index/index'
    }
  ]

  const changePage = url => {
    Taro.redirectTo({ url })
  }

  return (
    <View>
      <CusTabs></CusTabs>
      <View>Factory</View>

      <Swiper
        className={styles.swiper}
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
        interval={3000}
      >
        {banners.map((item, idx) => (
          <SwiperItem key={idx}>
            <Image
              src={item.img}
              className={styles.banner}
              onClick={() => changePage(item.url)}
            ></Image>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

export default Factory
