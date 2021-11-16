import { View, Image } from '@tarojs/components'
import { isArray } from 'lodash'
import styles from './index.module.less'

const EnterpriseCard = props => {
  const { data } = props
  const { title } = data

  const configs = [
    {
      label: '起订量',
      field: 'moq',
      color: '#3B80FF',
      addon: '件'
    },
    {
      label: '所在地区',
      field: 'area'
    },
    {
      label: '工厂地址',
      field: 'address'
    },
    {
      label: '企业简介',
      field: 'enterpriseDesc'
    }
  ]

  return (
    <View className={styles.card}>
      {title && <View className={styles.title}>{title}</View>}

      {configs.map(item => (
        <View className={styles.item} key={item.field}>
          <View className={styles.label}>{item.label}</View>
          <View className={styles.value}>{data[item.field]}</View>
        </View>
      ))}

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

export default EnterpriseCard
