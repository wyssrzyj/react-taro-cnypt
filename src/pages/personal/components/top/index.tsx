import { View, Image, Text } from '@tarojs/components'

import styles from './index.module.less'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { isNil, isEmpty } from 'lodash'
import { useStores } from '@/store/mobx'

let ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/enterpriseName.png '

const Top = props => {
  const { list } = props
  const [userInfo, setUserInfo] = useState<any>({})
  const [currentUser, setCurrentuser] = useState<any>({})
  const [userStatus, setUserStatus] = useState<any>()
  const { userInterface } = useStores()
  const { getApprovalResult } = userInterface

  useEffect(() => {
    let information = Taro.getStorageSync('currentUser')
      ? JSON.parse(Taro.getStorageSync('currentUser'))
      : {}
    setCurrentuser(information)
    const user = Taro.getStorageSync('userInfo')
      ? JSON.parse(Taro.getStorageSync('userInfo'))
      : {}
    setUserInfo(user)
  }, [])
  useEffect(() => {
    getUserStatus()
  }, [userInfo])
  const getUserStatus = async () => {
    if (userInfo.enterpriseId) {
      const res = await getApprovalResult({
        enterpriseId: userInfo.enterpriseId
      })
      if (res.code === 200) {
        setUserStatus(res.data.approvalStatus)
      }
    }
  }

  const toLogin = () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  }
  const myOrder = () => {
    Taro.redirectTo({
      url: '/pages/personal/personalInformation/index'
    })
  }
  const jump = () => {
    if (!isEmpty(currentUser)) {
      myOrder()
    } else {
      toLogin()
    }
  }

  return (
    <View className={styles.top} onClick={jump}>
      <View className={styles.tops}>
        <View className={styles.imgs}>
          {!isEmpty(currentUser) ? (
            <Image className={styles.img} src={currentUser.userFaceUrl} />
          ) : (
            <Image
              className={styles.img}
              src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/NotloggedIn.png"
            />
          )}
        </View>
        <View className={styles.right}>
          {!isEmpty(currentUser) ? (
            <>
              <View className={styles.txts}>
                <Text className={styles.txt}>{currentUser.username}</Text>
                {!isNil(userInfo.enterpriseType) &&
                !isNil(userStatus) &&
                +userStatus === 1 &&
                +userInfo.enterpriseType === 1 ? (
                  <View className={styles.customer}>发单商</View>
                ) : null}
                {!isNil(userInfo.enterpriseType) &&
                !isNil(userStatus) &&
                +userStatus === 1 &&
                +userInfo.enterpriseType === 0 ? (
                  <View className={styles.customer}>加工厂</View>
                ) : null}
                {!isNil(userStatus) && +userStatus > 1 ? (
                  <View className={styles.customer}>待审核</View>
                ) : null}
              </View>
              <View className={styles.bottom}>
                <Image src={ICON} className={styles.enterprise}></Image>
                <Text className={styles.icon}>
                  {list.enterpriseName ? list.enterpriseName : '暂无'}
                </Text>
              </View>
            </>
          ) : (
            <View>
              <View className={styles.txts}>
                <View className={styles.txt}>登录 / 注册</View>
              </View>
              <View className={styles.bottom}>
                <Text className={styles.login}>请登录或者注册查看更多</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      {!isNil(userStatus) && +userStatus === 0 ? (
        <Image
          className={styles.auditFailed}
          src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/auditFailed%20(2).png "
        />
      ) : null}
    </View>
  )
}

export default Top
