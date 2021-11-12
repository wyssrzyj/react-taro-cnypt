import { View, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import styles from './index.module.less'
import Taro from '@tarojs/taro'
function index() {
  const btn = e => {
    console.log(e)
    Taro.redirectTo({
      url: '/pages/personal/orderReceiving/index?tid=' + e.id
    })
    // Taro.redirectTo({ url: "/pages/index/index" });
  }
  const whole = () => {
    console.log('跳转至接单')
    Taro.redirectTo({
      url: '/pages/personal/orderReceiving/index?tid='
    })
  }
  const data = [
    {
      id: 2,
      image:
        'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
      value: '待处理',
      url: ''
    },
    {
      id: 3,
      image:
        'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
      value: '已确认'
    },
    {
      id: -2,
      image:
        'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
      value: '已谢绝'
    }
  ]
  const data1 = [
    {
      id: 1,
      image:
        'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
      value: '生效中',
      url: ''
    },
    {
      id: 2,
      image:
        'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
      value: '已结束'
    },
    {
      id: 3,
      image:
        'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
      value: '审核失败'
    }
  ]
  return (
    <View>
      <View className={styles.order}>
        <Text className={styles.text}>我的订单</Text>
      </View>
      <View className={styles.orders}>
        <AtGrid onClick={btn} hasBorder={false} data={data1} />
      </View>
      <View className={styles.division}></View>

      <View className={styles.order}>
        <Text onClick={whole} className={styles.text}>
          接单管理
        </Text>
      </View>
      <View className={styles.orders}>
        <AtGrid onClick={btn} hasBorder={false} data={data} />
      </View>
    </View>
  )
}

export default index
