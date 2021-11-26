import { View } from '@tarojs/components'
import styles from './index.module.less'
import { AtFloatLayout, AtButton } from 'taro-ui'
import { useState } from 'react'
import { cloneDeep } from 'lodash'
import classNames from 'classnames'

const CusModal = props => {
  const {
    onCancel,
    visible,
    callback,
    title,
    options = [],
    value = [],
    type = 'multiple'
  } = props

  const [selectValues, setSelectValues] = useState<string[]>(value)

  const onClose = () => {
    onCancel && onCancel()
  }

  const submit = () => {
    callback && callback(selectValues)
    onClose()
  }

  const materialClick = val => {
    if (!val) return
    let selectCopyValues = cloneDeep(selectValues)
    if (type === 'single') {
      setSelectValues(selectCopyValues.includes(val) ? [] : [val])
    }

    if (type === 'multiple') {
      if (selectCopyValues.includes(val)) {
        selectCopyValues = selectCopyValues.filter(item => item !== val)
      } else {
        selectCopyValues.push(val)
      }
      setSelectValues(selectCopyValues)
    }
  }

  return (
    <View className={styles.container}>
      <AtFloatLayout
        isOpened={visible}
        title={title}
        onClose={onClose}
        className={styles.box}
      >
        <View className={styles.cusItems}>
          {options.map(item => {
            return (
              <View
                className={classNames(
                  styles.cusItem,
                  selectValues.includes(item.value) ? styles.activeCusItem : '',
                  !item.value ? styles.hidden : ''
                )}
                onClick={() => materialClick(item.value)}
              >
                {item.label}
              </View>
            )
          })}
        </View>

        <AtButton className={styles.btn} type="primary" onClick={submit}>
          确定
        </AtButton>
      </AtFloatLayout>
    </View>
  )
}

export default CusModal
