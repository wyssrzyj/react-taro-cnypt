import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.less'
import { useStores } from '@/store/mobx'
import Taro from '@tarojs/taro'
import { AtImagePicker, AtButton } from 'taro-ui'

const machining = () => {
  const { userInterface } = useStores()
  const { changeUserInfo } = userInterface
  const [orderQuantity, setOrderQuantity] = useState<any>([])
  const [userid, setUserid] = useState<any>([])

  useEffect(() => {
    let information = Taro.getStorageSync('currentUser')
      ? JSON.parse(Taro.getStorageSync('currentUser'))
      : {}
    setUserid(information)

    setOrderQuantity([{ url: information.userFaceUrl }])
  }, [])
  Taro.setNavigationBarTitle({
    title: '完善个人资料'
  })
  const onChange = files => {
    setOrderQuantity(files)
  }
  const btn = async () => {
    let res = await changeUserInfo({
      userFaceUrl: orderQuantity[0].url,
      userId: userid.userId
    })
    if (res.code === 200) {
      if (userid) {
        userid.userFaceUrl = orderQuantity[0].url
      }
      Taro.setStorageSync('currentUser', JSON.stringify(userid))
      Taro.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1000
      })
    }
    console.log(res)
  }
  return (
    <View className={styles.information}>
      <View className={styles.order}>
        <View>
          <Text className={styles.text}>头像</Text>
        </View>
        <View className={styles.img}>
          <AtImagePicker
            showAddBtn={orderQuantity.length >= 1 ? false : true}
            count={1}
            files={orderQuantity}
            onChange={onChange}
          />
        </View>
      </View>
      <AtButton type={'primary'} onClick={btn} className={styles.btn}>
        保存
      </AtButton>
    </View>
  )
}

export default machining
