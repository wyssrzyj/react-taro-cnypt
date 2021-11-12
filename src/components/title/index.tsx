import { View } from '@tarojs/components'
import styles from './index.module.less'

const Title = props => {
  const { title } = props

  return <View className={styles.title}>{title}</View>
}

export default Title
