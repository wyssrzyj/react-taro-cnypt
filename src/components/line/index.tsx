import { View } from '@tarojs/components'
import styles from './index.module.less'

const Line = props => {
  const { height } = props

  return (
    <View className={styles.line} style={{ height: height / 2 + 'px' }}></View>
  )
}

export default Line
