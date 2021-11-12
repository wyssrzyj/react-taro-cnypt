import { View, Image } from '@tarojs/components'
import { isArray } from 'lodash'
import styles from './index.module.less'

const OrderIssueCard = props => {
  const { data } = props

  return (
    <View className={styles.orderCard}>
      <View className={styles.title}>{data.title}</View>
      <View className={styles.addressBox}>
        <View className={styles.label}>所在地区</View>
        <View className={styles.address}>{data.title}</View>
      </View>
      <View className={styles.addressBox}>
        <View className={styles.label}>企业地址</View>
        <View className={styles.address}>{data.address}</View>
      </View>
      <View className={styles.addressBox}>
        <View className={styles.label}>企业简介</View>
        <View className={styles.address}>{data.enterpriseDesc}</View>
      </View>
      <View className={styles.imgs}>
        {isArray(data.imgs) &&
          data.imgs.map((item, idx) => {
            return (
              <Image key={idx} src={item.url} className={styles.img}></Image>
            )
          })}
      </View>
    </View>
  )
}

export default OrderIssueCard
