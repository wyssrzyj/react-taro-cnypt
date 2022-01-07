import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

const LOCATION_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/diqu_bai.png'

const FindingsOfAudit = () => {
  Taro.setNavigationBarTitle({
    title: '审核结果'
  })
  return (
    <View className={styles.content}>
      <View>
        {/* 提交成功 */}
        {/* <>
          <View className={styles.top}>
            <Image src={LOCATION_ICON} className={styles.icon}></Image>{' '}
            <View> 提交成功,请等待审批</View>
          </View>
          <View>
            <View>
              　　您的企业证件审核请求已收到，平台讲在1-3个工作日与您取得联系，请注意接听来电。
            </View>
            <View className={styles.time}>
              　　请求时间 2021年06月31日 17时06分
            </View>
          </View>

          <AtButton className={styles.btn} type="primary">
            返回修改
          </AtButton>
        </> */}

        {/* 通过 */}
        {/* <>
          <View className={styles.adopt}>
            <Image src={LOCATION_ICON} className={styles.icon}></Image>{' '}
            <View> 审核通过</View>
          </View>
          <View>
            <View>恭喜您，企业证件审核通过，已为您开通企业相关企业权限</View>
          </View>
          <AtButton className={styles.btn} type="primary">
            确认
          </AtButton>
        </> */}

        {/* 不通过 */}
        <>
          <View className={styles.adopt}>
            <Image src={LOCATION_ICON} className={styles.icon}></Image>{' '}
            <View> 审批不通过</View>
          </View>
          <View>
            <View>
              　　您的企业证件审核不通过，请根错误原因重新上传对应信息。原因如下:
            </View>
            <View className={styles.reason}>88888888</View>
          </View>
          <AtButton className={styles.btn} type="primary">
            确认
          </AtButton>
        </>
      </View>
    </View>
  )
}

export default FindingsOfAudit
