import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import styles from './index.module.less'

function index() {
  return (
    <View>
      <View className={styles.order}>
        <AtIcon
          className={styles.icontx}
          value="volume-off"
          size="30"
          color="#080808"
        ></AtIcon>
        <Text>发单商入驻</Text>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#666"></AtIcon>
        </Text>
      </View>
      <View className={styles.order}>
        <AtIcon
          className={styles.icontx}
          value="volume-off"
          size="30"
          color="#080808"
        ></AtIcon>
        <Text>工厂入驻</Text>
        <Text className={styles.iconmy}>
          <AtIcon value="chevron-right" size="15" color="#666"></AtIcon>
        </Text>
      </View>
    </View>
  )
}

export default index
