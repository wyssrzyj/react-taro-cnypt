import { View, Button } from '@tarojs/components'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { useStores, observer } from '@/store/mobx'
import Taro from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'

const AreaModal = props => {
  const { onCancel, callback, value = [] } = props
  const { userInterface } = useStores()
  const { queryFactoryName } = userInterface
  const [valueData, setValueData] = useState<any>()

  const [list, setList] = useState<any>([{ factoryName: '请输入工厂名称' }])

  const onClose = () => {
    onCancel && onCancel()
  }
  const onChange = value => {
    setValueData(value)
  }
  const onActionClick = async () => {
    const res = await queryFactoryName({ factoryName: valueData })
    setList(res)
  }

  const returnSuperior = value => {
    if (value.factoryName === '请输入工厂名称') {
    } else {
      callback && callback(value)
      onClose()
    }
  }

  Taro.setNavigationBarTitle({
    title: '指定工厂'
  })

  return (
    <View className={styles.container}>
      <View className={styles.search}>
        <AtSearchBar
          value={valueData}
          onChange={onChange}
          onActionClick={onActionClick}
        />
      </View>

      <View className={styles.tags}>
        {list.length > 0 ? (
          list.map(item => (
            <View
              className={styles.tag}
              onClick={() => {
                returnSuperior(item)
              }}
            >
              {item.factoryName}
            </View>
          ))
        ) : (
          <View>暂无工厂</View>
        )}
      </View>
    </View>
  )
}

export default observer(AreaModal)
