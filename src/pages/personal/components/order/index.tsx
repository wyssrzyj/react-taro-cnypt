import React from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import styles from './index.module.less'

function index() {
  const btn = e => {
    console.log(e)
    // Taro.navigateTo({ url: "/pages/index/index" });
  }
  const data = [
    {
      id: 1,
      image:
        'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
      value: '待反馈',
      url: ''
    },
    {
      id: 2,
      image:
        'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
      value: '已确认'
    },
    {
      id: 3,
      image:
        'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
      value: '已谢绝'
    }
  ]
  return (
    <View>
      <View className={styles.order}>
        <Text className={styles.text}>接单管理</Text>
      </View>
      <View className={styles.orders}>
        <AtGrid onClick={btn} hasBorder={false} data={data} />
      </View>
    </View>
  )
}

export default index
