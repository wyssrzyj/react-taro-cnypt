import { View, Button } from '@tarojs/components'
import styles from './index.module.less'
import { AtFloatLayout } from 'taro-ui'
import { useState } from 'react'
import { cloneDeep } from 'lodash'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'

const CusMaterialModal = props => {
  const { onCancel, visible, callback } = props
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { plusMaterialType = [] } = dictionary

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
      {plusMaterialType.map(item => {
        return (
          <View
            className={classNames(
              styles.cusItem,
              selectValues.includes(item.value) ? styles.activeCusItem : ''
            )}
            onClick={() => materialClick(item.value)}
          >
            {item.label}
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

export default observer(CusMaterialModal)
