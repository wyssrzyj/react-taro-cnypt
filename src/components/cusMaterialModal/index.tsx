import { View, Button, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { AtFloatLayout } from 'taro-ui'
import { useState } from 'react'
import { cloneDeep } from 'lodash'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'

const CusMaterialModal = props => {
  const { onCancel, visible, callback, value = [] } = props
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { plusMaterialType = [] } = dictionary

  const [selectValues, setSelectValues] = useState<string[]>(value)

  const onClose = () => {
    onCancel && onCancel()
  }

  const submit = () => {
    callback && callback(selectValues)
    onClose()
  }

  const materialClick = val => {
    let selectCopyValues = cloneDeep(selectValues)
    if (selectCopyValues.includes(val)) {
      selectCopyValues = selectCopyValues.filter(item => item !== val)
    } else {
      selectCopyValues.push(val)
    }
    setSelectValues(selectCopyValues)
  }
  return (
    <AtFloatLayout
      className={styles.box}
      isOpened={visible}
      title="面料类型"
      onClose={onClose}
    >
      <View className={styles.cusItems}>
        {plusMaterialType.map(item => {
          return (
            <View
              className={classNames(
                styles.cusItem,
                selectValues.includes(item.value) ? styles.activeCusItem : ''
              )}
              onClick={() => materialClick(item.value)}
            >
              <Image
                src={item.fileUrl}
                className={classNames(
                  styles.img,
                  selectValues.includes(item.value) ? styles.activeImg : '',
                  !'' ? styles.emptyImg : ''
                )}
              ></Image>
              <Text className={styles.tagText}>{item.label}</Text>
            </View>
          )
        })}
      </View>
      <View>
        <Button type={'primary'} onClick={submit} className={styles.btn}>
          确定
        </Button>
      </View>
    </AtFloatLayout>
  )
}

export default observer(CusMaterialModal)
