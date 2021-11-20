import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtActionSheet, AtActionSheetItem } from 'taro-ui'

import styles from './index.module.less'
import Taro from '@tarojs/taro'
import { useStores } from '@/store/mobx'
import { isNil } from 'lodash'

let enterprise =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/enterprise.png'
let account =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/accountNumber.png'
let excellentProduction =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/excellentProduction.png'
let signOuts =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/signOut.png'

let factory =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/factory.png'

const Managemenet = props => {
  const { userInfo, list } = props
  const { userInterface } = useStores()
  const { signOut } = userInterface
  let type = userInfo //判断用户权限  // 企业类型 0 加工厂 1 发单商
  // let type = 2 //判断用户权限  // 企业类型 0 加工厂 1 发单商
  const [modal, setModal] = useState(false)
  const retreat = async () => {
    setModal(true)
  }
  const btn = () => {
    setModal(false)
  }
  const sign = () => {
    signOut()
    setModal(false)
    Taro.redirectTo({ url: '/pages/login/index' })
  }
  const about = () => {
    Taro.navigateTo({ url: '/pages/personal/myEexcellentProduct/index' })
  }
  const accountNumber = () => {
    if (!isNil(list.userName)) {
      Taro.navigateTo({
        url: '/pages/personal/accountNumber/index?id'
      })
    } else {
      Taro.redirectTo({ url: '/pages/login/index' })
    }
  }
  const factoryManagement = () => {
    Taro.navigateTo({
      url: '/pages/factoryEntry/index?modify=1'
    })
  }

  const enterpriseManagement = () => {
    Taro.navigateTo({
      url: '/pages/orderIssueEntry/index?modify=1'
    })
  }

  return (
    <View>
      <View className={styles.division}></View>
      {type === '0' ? (
        <View
          className={styles.order}
          onClick={() => {
            factoryManagement()
          }}
        >
          <View className={styles.content}>
            <View className={styles.remove}>
              <Image className={styles.removeIcon} src={factory}></Image>
            </View>
            <Text className={styles.txt}>工厂管理</Text>
          </View>

          <Text className={styles.iconmy}>
            <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
          </Text>
        </View>
      ) : null}
      {type === '1' ? (
        <View
          className={styles.order}
          onClick={() => {
            enterpriseManagement()
          }}
        >
          <View className={styles.content}>
            <View className={styles.remove}>
              <Image className={styles.removeIcon} src={enterprise}></Image>
            </View>
            <Text className={styles.txt}>企业管理</Text>
          </View>

          <Text className={styles.iconmy}>
            <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
          </Text>
        </View>
      ) : null}

      <View className={styles.order} onClick={accountNumber}>
        <View className={styles.content}>
          <View className={styles.remove}>
            <Image className={styles.removeIcon} src={account}></Image>
          </View>
          <Text className={styles.txt}>账号管理</Text>
        </View>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>

      <View className={styles.order} onClick={about}>
        <View className={styles.content}>
          <View className={styles.remove}>
            <Image
              className={styles.removeIcon}
              src={excellentProduction}
            ></Image>
          </View>
          <Text className={styles.txt}>关于优产云</Text>
        </View>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
        </Text>
      </View>

      <View className={styles.order} onClick={retreat}>
        <View className={styles.content}>
          <View className={styles.remove}>
            <Image className={styles.removeIcon} src={signOuts}></Image>
          </View>
          <Text className={styles.txt}>退出登录</Text>
        </View>
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

export default Managemenet
