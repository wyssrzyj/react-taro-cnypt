import { View, Button } from '@tarojs/components'
import styles from './index.module.less'
import { AtFloatLayout } from 'taro-ui'
import { useState } from 'react'
import { cloneDeep, isArray } from 'lodash'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'

const CusGradeModal = props => {
  const { onCancel, visible, callback, value = [] } = props
  const { commonStore } = useStores()
  const { productGrade = [] } = commonStore

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
      isOpened={visible}
      title="产品档次"
      onClose={onClose}
      className={styles.box}
    >
      {productGrade.map(item => {
        return (
          <View key={item.value}>
            <View className={styles.title}>{item.label}</View>

            <View className={styles.cusItems}>
              {isArray(item.children) &&
                item.children.map(i => {
                  return (
                    <View
                      key={i.value}
                      className={classNames(
                        styles.cusItem,
                        selectValues.includes(i.value)
                          ? styles.activeCusItem
                          : ''
                      )}
                      onClick={() => materialClick(i.value)}
                    >
                      {i.label}
                    </View>
                  )
                })}
            </View>
          </View>
        )
      })}
      <View>
        <Button type={'primary'} onClick={submit} className={styles.btn}>
          确定
        </Button>
      </View>
    </AtFloatLayout>
  )
}

export default observer(CusGradeModal)
