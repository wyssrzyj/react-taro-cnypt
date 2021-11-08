import { View, Button } from '@tarojs/components'
import styles from './index.module.less'
import { AtFloatLayout } from 'taro-ui'
import { useState } from 'react'
import { cloneDeep, isArray } from 'lodash'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'

const CusGradeModal = props => {
  const { onCancel, visible, callback } = props
  const { commonStore } = useStores()
  const { productGrade = [] } = commonStore

  const [selectValues, setSelectValues] = useState<string[]>([])

  const onClose = () => {
    onCancel && onCancel()
  }

  const submit = () => {
    callback && callback(selectValues)
    onClose()
  }

  const materialClick = val => {
    console.log('🚀 ~ file: index.tsx ~ line 27 ~ val', val)
    let selectCopyValues = cloneDeep(selectValues)
    if (selectCopyValues.includes(val)) {
      selectCopyValues = selectCopyValues.filter(item => item !== val)
    } else {
      selectCopyValues.push(val)
    }
    setSelectValues(selectCopyValues)
  }

  return (
    <AtFloatLayout isOpened={visible} title="主营类别" onClose={onClose}>
      {productGrade.map(item => {
        return (
          <View key={item.value}>
            <View className={styles.title}>{item.label}</View>

            <View>
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
        <Button type={'primary'} onClick={submit}>
          确定
        </Button>
      </View>
    </AtFloatLayout>
  )
}

export default observer(CusGradeModal)
