import { View, Image } from '@tarojs/components'
import { isArray } from 'lodash'
import styles from './index.module.less'

const OrderIssueCard = props => {
  const { data } = props

  const configs = [
    {
      label: '所在地区',
      field: 'areaName'
    },
    {
      label: '企业地址',
      field: 'address'
    },
    {
      label: '企业简介',
      field: 'enterpriseDesc'
    }
  ]

  return (
    <View className={styles.orderCard}>
      <View className={styles.title}>{data.enterpriseName}</View>
      {configs.map(item => (
        <View className={styles.addressBox} key={item.field}>
          <View className={styles.label}>{item.label}</View>
          <View className={styles.address}>{data[item.field]}</View>
        </View>
      ))}
      <View className={styles.imgs}>
        {isArray(data.imgs) &&
          data.imgs.map((item, idx) => {
            return (
              <Image
                key={idx}
                src={item.thumbUrl}
                className={styles.img}
              ></Image>
            )
          })}
      </View>
    </View>
  )
}

export default OrderIssueCard
