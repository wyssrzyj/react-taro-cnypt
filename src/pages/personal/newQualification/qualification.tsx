import { useState, useEffect } from 'react'
import { View, Picker } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { useStores, toJS } from '@/store/mobx'
import { isEmpty } from 'lodash'
import styles from './index.module.less'
const qualification = props => {
  const { onChanges, value } = props
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryCertificate = [] } = dictionary
  const [selector, setSelector] = useState<any>() //名字
  const [selectorChecked, setSelectorChecked] = useState() //显示的数据

  useEffect(() => {
    const num = factoryCertificate.map(item => {
      return item.label
    })
    setSelector(num)
    setSelectorChecked(factoryCertificate[0].label)
    onChanges && onChanges(factoryCertificate[0].value)
  }, [])

  useEffect(() => {
    if (!isEmpty(value)) {
      onChanges && onChanges(value)
      let arr = toJS(factoryCertificate).filter(item => item.value === value)
      setSelectorChecked(arr[0].label)
    }
  }, [value])

  //选择值
  const onChange = e => {
    setSelectorChecked(selector[e.detail.value])
    onChanges && onChanges(factoryCertificate[e.detail.value].value)
  }
  return (
    <View className={styles.name}>
      <View className="page-section">
        <View>
          <Picker mode="selector" range={selector} onChange={onChange}>
            <AtList>
              <AtListItem extraText={selectorChecked} />
            </AtList>
          </Picker>
        </View>
      </View>
    </View>
  )
}

export default qualification
