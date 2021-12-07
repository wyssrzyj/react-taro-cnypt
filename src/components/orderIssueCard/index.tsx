import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import { isArray } from 'lodash'
import styles from './index.module.less'
import Taro from '@tarojs/taro'

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

  const imgPreview = thumbUrl => {
    Taro.previewImage({
      // 所有图片
      urls: data.imgs.map(item => item.thumbUrl),
      // 当前图片
      current: thumbUrl
    })
  }

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
                className={classNames(
                  styles.img,
                  !item.thumbUrl ? styles.emptyImg : ''
                )}
                onClick={() => imgPreview(item.thumbUrl)}
              ></Image>
            )
          })}
      </View>
    </View>
  )
}

export default OrderIssueCard
