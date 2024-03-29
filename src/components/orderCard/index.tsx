import { View, Image } from '@tarojs/components'
import { isArray } from 'lodash'
import styles from './index.module.less'
import Taro from '@tarojs/taro'
import { EMPTY_IMG } from '@/utils/tool'

const RIGHT_ARROW =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/grayRight.png'
const ENTERPRISE =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/qiye.png'

const OrderCard = props => {
  const { data } = props

  const toOrderIssueDetail = () => {
    // enterpriseId
    Taro.navigateTo({
      url: `/pages/orderIssueDetail/index?id=${data.tenantId}&ids=${data.id}`
    })
  }

  const imgPreview = url => {
    Taro.previewImage({
      // 所有图片
      urls: data.imgs,
      // 当前图片
      current: url
    })
  }

  return (
    <View className={styles.orderCard}>
      <View className={styles.title}>{data.name}</View>
      <View className={styles.goodsNum}>
        {data.goodsNum ? data.goodsNum.replace(',', ' ~ ') : ''}
      </View>
      <View className={styles.addressBox}>
        <View className={styles.label}>地区要求</View>
        <View className={styles.address}>
          {data.regionalNameList ? data.regionalNameList : ''}
        </View>
      </View>

      {isArray(data.imgs) && data.imgs.length ? (
        <View className={styles.imgs}>
          {data.imgs.map((item, idx) => {
            return (
              <Image
                key={idx}
                src={item}
                className={styles.img}
                onClick={() => imgPreview(item)}
              ></Image>
            )
          })}
        </View>
      ) : null}

      {/* TODO: enterpriseId没返回 */}
      <View className={styles.enterprise} onClick={toOrderIssueDetail}>
        <View className={styles.enterpriseLeft}>
          <Image src={ENTERPRISE} className={styles.enterpriseIcon}></Image>
          {data.enterpriseName}
        </View>
        <View className={styles.enterpriseRight}>
          企业主页
          <Image src={RIGHT_ARROW} className={styles.rightIcon}></Image>
        </View>
      </View>
    </View>
  )
}

export default OrderCard
