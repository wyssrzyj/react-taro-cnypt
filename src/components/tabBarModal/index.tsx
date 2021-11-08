import styles from './index.module.less'
import { View, Image, Text } from '@tarojs/components'

const CANCEL =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/cancel.png'
const FBDD =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/fbdd.png'
const GCRZ =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/gcrz.png'
const FDS =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/tabBar/fds.png'

const TabBarModal = props => {
  const { showModal } = props
  const configs = [
    {
      title: '发单商入驻',
      msg: '我要下订单',
      image: FDS,
      background: '#335498'
    },
    {
      title: '发布订单',
      msg: '我要发布订单',
      image: FBDD,
      background: '#377383'
    },
    {
      title: '工厂入驻',
      msg: '我要更多人知道',
      image: GCRZ,
      background: '#335498'
    }
  ]

  return (
    <View className={styles.tabBarModal}>
      {configs.map((config, idx) => (
        <View
          key={idx}
          className={styles.config}
          style={{ background: config.background }}
        >
          <View className={styles.blurBox}></View>
          <Image src={config.image} className={styles.img}></Image>
          <View className={styles.configInfo}>
            <Text className={styles.title}>{config.title}</Text>
            <Text className={styles.msg}>{config.msg}</Text>
          </View>
        </View>
      ))}
      <Image
        src={CANCEL}
        className={styles.cancelImg}
        onClick={showModal}
      ></Image>
    </View>
  )
}

export default TabBarModal
