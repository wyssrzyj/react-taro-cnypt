import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtActionSheet, AtActionSheetItem } from 'taro-ui'

import styles from './index.module.less'
import Taro from '@tarojs/taro'
function index() {
  let type = 0 //加工厂权限判断
  const [modal, setModal] = useState(false)
  const signOut = () => {
    console.log('退出')
    setModal(true)
  }
  const btn = () => {
    setModal(false)
  }
  const sign = () => {
    console.log('退出登录')
    setModal(false)
  }
  const about = () => {
    Taro.navigateTo({ url: '/pages/personal/myEexcellentProduct/index' })
  }
  const accountNumber = () => {
    Taro.navigateTo({
      url: '/pages/personal/accountNumber/index?id' + '15054920258'
    })
  }

  return (
    <View>
      <View className={styles.division}></View>
      {type === 1 ? (
        <>
          <View className={styles.order}>
            <AtIcon
              className={styles.icontx}
              value="volume-off"
              size="30"
              color="#080808"
            ></AtIcon>
            <Text>工厂管理</Text>
            <Text className={styles.iconmy}>
              <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
            </Text>
          </View>
        </>
      ) : null}

      <View className={styles.order} onClick={accountNumber}>
        <AtIcon
          className={styles.icontx}
          value="volume-off"
          size="30"
          color="#080808"
        ></AtIcon>
        <Text>账号管理</Text>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>
      <View className={styles.order} onClick={about}>
        <AtIcon
          className={styles.icontx}
          value="volume-off"
          size="30"
          color="#080808"
        ></AtIcon>
        <Text>关于优产云</Text>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>
      <View className={styles.order} onClick={signOut}>
        <AtIcon
          className={styles.icontx}
          value="volume-off"
          size="30"
          color="#080808"
        ></AtIcon>
        <Text>退出登录</Text>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>

      {/* 弹窗 */}
      <AtActionSheet
        isOpened={modal}
        onClose={btn}
        cancelText="取消"
        title="是否退出登录"
      >
        <AtActionSheetItem onClick={sign} className="sign">
          确认退出
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  )
}

export default index
