import { View, Image } from '@tarojs/components'

import { useEffect, useState } from 'react'
import moment from 'moment'

import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import styles from './index.module.less'
import { useStores } from '@/store/mobx'

const SUCCESS_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/success.png'

const FAIL_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/fail.png'
const FindingsOfAudit = () => {
  const [data, setData] = useState<any>({})
  const { userInterface } = useStores()
  const { enterpriseCertificateApprovalResults } = userInterface
  useEffect(() => {
    getInterfaceData()
  }, [])
  const getInterfaceData = async () => {
    let id = JSON.parse(Taro.getStorageSync('userInfo')).enterpriseId
    let res = await enterpriseCertificateApprovalResults({ enterpriseId: id })
    setData(res)
  }

  const accountNumber = () => {
    Taro.redirectTo({ url: '/pages/personal/enterpriseCertificate/index' })
  }
  const confirm = type => {
    if (type === 'return') {
      Taro.redirectTo({ url: '/pages/personal/index' })
    } else {
      Taro.redirectTo({ url: '/pages/personal/enterpriseCertificate/index' })
    }
  }
  Taro.setNavigationBarTitle({
    title: '企业证件管理'
  })
  return (
    <View className={styles.content}>
      <View className={styles.container}>
        {/* 提交成功 */}
        {data.approvalStatus === '2' || data.approvalStatus === '3' ? (
          <>
            <View className={styles.top}>
              <Image src={SUCCESS_ICON} className={styles.icon}></Image>{' '}
              <View> 提交成功,请等待审批</View>
            </View>
            <View>
              <View className={styles.text}>
                　　您的企业证件审核请求已收到，平台讲在1-3个工作日与您取得联系，请注意接听来电。
              </View>
              <View className={styles.time}>
                　　请求时间 :　　
                {moment(data.requestCertificateApprovalTime).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </View>
            </View>

            <View className={styles.btnModify}>
              <View
                className={styles.return}
                onClick={() => {
                  confirm('return')
                }}
              >
                确认
              </View>
              <View
                className={styles.modify}
                onClick={() => {
                  confirm('modify')
                }}
              >
                返回修改
              </View>
            </View>
          </>
        ) : null}

        {/* 通过 */}
        {data.approvalStatus === '1' ? (
          <>
            <View className={styles.adopt}>
              <Image src={SUCCESS_ICON} className={styles.icon}></Image>
              <View> 审核通过</View>
            </View>
            <View>
              <View>恭喜您，企业证件审核通过，已为您开通企业相关企业权限</View>
            </View>
            <View className={styles.btnModify}>
              <View
                className={styles.return}
                onClick={() => {
                  confirm('modify')
                }}
              >
                前往修改
              </View>
              <View
                className={styles.modify}
                onClick={() => {
                  confirm('return')
                }}
              >
                返回
              </View>
            </View>
          </>
        ) : null}
        {data.approvalStatus === '0' ? (
          <>
            <View className={styles.adopt}>
              <Image src={FAIL_ICON} className={styles.icon}></Image>{' '}
              <View> 审批不通过</View>
            </View>
            <View>
              <View className={styles.time}>
                　　您的企业证件审核不通过，请根错误原因重新上传对应信息。原因如下:
              </View>
              <View className={styles.reason}>　{data.approvalDesc}</View>
            </View>
            <AtButton
              onClick={accountNumber}
              className={styles.btn}
              type="primary"
            >
              返回修改
            </AtButton>
          </>
        ) : null}

        {/* 不通过 */}
      </View>
    </View>
  )
}

export default FindingsOfAudit
