import { View, Button, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { useEffect, useRef, useState } from 'react'
import { cloneDeep, isArray } from 'lodash'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'
import Navbar from '../navbar'
import Taro from '@tarojs/taro'
import { findTarget, selectorQueryClientRect } from '@/utils/tool'
import { AtToast } from 'taro-ui'

const BASE_URL =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile'
const BACK_ICON = BASE_URL + '/icon/black_back.png'
const REMOVE_ICON = BASE_URL + '/icon/blueClose.png'

const AreaModal = props => {
  const { onCancel, callback, value = [], title = '选择地区' } = props

  const { commonStore } = useStores()
  const { district = [] } = commonStore
  const contentRef = useRef<any>(null)

  const [isOpened, setIsOpened] = useState(false)
  const [errText, setErrText] = useState('')
  const [provinceData, setProvinceData] = useState<any[]>([])
  const [cityData, setCityData] = useState<any[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>(value)
  const [provinceSelect, setProvinceSelect] = useState<string>(value)

  useEffect(() => {
    Taro.nextTick(async () => {
      const query = await selectorQueryClientRect('#navbar')
      contentRef.current.style.height = `calc(100vh - ${query.height}px)`
    })
  }, [])

  useEffect(() => {
    if (isArray(district) && district.length) {
      setProvinceData(district)
      const cData = [...district[0].children]
      setCityData(cData)
      setProvinceSelect(district[0].value)
    }
  }, [district])

  const onClose = () => {
    onCancel && onCancel()
  }

  const submit = () => {
    callback && callback(selectedValues)
    onClose()
  }

  const provinceChange = id => {
    const target = district.find(item => item.value === id)
    target.children = target.children || []
    const cData = [...target.children]
    setProvinceSelect(target.value)
    setCityData(cData)
  }

  const cityChange = id => {
    let nSelectValues = cloneDeep(selectedValues)
    if (nSelectValues.includes(id)) {
      nSelectValues = nSelectValues.filter(item => item !== id)
    } else {
      if (nSelectValues.length >= 8) {
        setErrText('最多可选8个地区')
        setIsOpened(true)
        return
      } else {
        setIsOpened(false)
      }
      nSelectValues.push(id)
    }
    setSelectedValues(nSelectValues)
  }

  const clear = () => {
    setSelectedValues([])
  }

  const removeTag = id => {
    let nValues = cloneDeep(selectedValues)
    nValues = nValues.filter(i => i !== id)
    setSelectedValues(nValues)
  }

  return (
    <View className={styles.container}>
      <Navbar>
        <View className={styles.navbars}>
          <Image
            src={BACK_ICON}
            className={styles.backs}
            onClick={onClose}
          ></Image>
          <View className={styles.navTitles}>{title}</View>
        </View>
      </Navbar>

      <View className={styles.content} ref={contentRef}>
        <View className={styles.province}>
          {provinceData.map(item => (
            <View
              className={classNames(styles.provinceItem)}
              onClick={() => provinceChange(item.value)}
            >
              <Text
                className={
                  provinceSelect === item.value ? styles.selectedProvince : ''
                }
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
        <View className={styles.city}>
          {cityData.map(item => (
            <View
              className={classNames(
                styles.cityItem,
                selectedValues.includes(item.value) ? styles.selectedItem : ''
              )}
              onClick={() => cityChange(item.value)}
            >
              {item.label}
            </View>
          ))}
        </View>
        <View className={styles.footer} id={'areaModalFooter'}>
          <View className={styles.footerItems}>
            {selectedValues.map(item => {
              const target = findTarget(item, district, 'value')
              return (
                <View key={item} className={styles.footerItem}>
                  {target.label}

                  <Image
                    className={styles.removeIcon}
                    src={REMOVE_ICON}
                    onClick={() => removeTag(item)}
                  ></Image>
                </View>
              )
            })}
          </View>
          <View className={styles.btns}>
            <Button className={styles.clearBtn} onClick={clear}>
              清除
            </Button>
            <Button
              type={'primary'}
              className={styles.submitBtn}
              onClick={submit}
            >
              确定
            </Button>
          </View>
        </View>
      </View>

      <AtToast
        isOpened={isOpened}
        text={errText}
        onClose={() => setIsOpened(false)}
      ></AtToast>
    </View>
  )
}

export default observer(AreaModal)
