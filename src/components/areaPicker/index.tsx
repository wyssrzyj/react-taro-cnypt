import { useEffect, useState } from 'react'
import { Picker } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { useStores, observer } from '@/store/mobx'
import { cloneDeep, throttle } from 'lodash'
import styles from './index.module.less'
import classNames from 'classnames'

const AreaPicker = props => {
  const { commonStore } = useStores()
  const { district } = commonStore

  const { callback, areaInfo } = props

  const [selectedArea, setSelectedArea] = useState<string>('')

  const [provinceData, setProvinceData] = useState<any[]>([])
  const [cityData, setCityData] = useState<any[]>([])
  const [areaData, setAreaData] = useState<any[]>([])
  const [provinceIdx, setProvinceIdx] = useState<number>(0)
  const [cityIdx, setCityIdx] = useState<number>(0)
  const [areaIdx, setAreaIdx] = useState<number>(0)
  const [areaValue, setAreaValue] = useState<any[]>([0, 0, 0])

  useEffect(() => {
    ;(async () => {
      const res = cloneDeep(district)
      setProvinceData(res)
      const cData = [{ label: '不限', value: 0 }, ...res[0].children]
      const aData = [{ label: '不限', value: 0 }]
      setCityData(cData)
      setAreaData(aData)
    })()
  }, [district])

  useEffect(() => {
    if (areaInfo.provinceId) {
      let pIdx
      const province = provinceData.find((item, idx) => {
        if (item.value === areaInfo.provinceId) {
          pIdx = idx
          return true
        }
        return false
      })
      setProvinceIdx(pIdx)
      const cData = [{ label: '不限', value: 0 }, ...province.children]
      let cIdx
      const city = cData.find((item, idx) => {
        if (item.value === areaInfo.cityId) {
          cIdx = idx
          return true
        }
        return false
      })
      setCityIdx(cIdx)
      const aData = [{ label: '不限', value: 0 }, ...city.children]
      let aIdx = aData.findIndex(item => item.value === areaInfo.districtId)
      setAreaIdx(aIdx)
      setAreaValue([pIdx, cIdx, aIdx])
    }
  }, [])

  const districtChange = event => {
    const {
      detail: { value }
    } = event
    setAreaValue(value)

    const districtText = value.reduce((prev, item, idx) => {
      if (idx === 0) {
        prev = provinceData[item].label
      }
      if (idx === 1) {
        if (cityData[item].label !== '不限') {
          prev += '-' + cityData[item].label
        }
      }

      if (idx === 2) {
        if (areaData[item].label !== '不限') {
          prev += '-' + areaData[item].label
        }
      }
      return prev
    }, '')

    setSelectedArea(districtText)
    if (callback) {
      const provinceId = provinceData[provinceIdx].value
      const cityId = cityData[cityIdx].value
      const districtId = areaData[areaIdx].value
      callback({
        provinceId,
        cityId,
        districtId
      })
    }
  }

  const onColumnChange = event => {
    const {
      detail: { column, value }
    } = event
    console.log('🚀 ~ file: index.tsx ~ line 77 ~ value', value)
    console.log('🚀 ~ file: index.tsx ~ line 77 ~ column', column)

    if (column === 0) {
      const target = provinceData[value]
      const province =
        provinceData.find(item => item.value === target.value) || {}
      province.children = province.children || []
      const cData = [{ label: '不限', value: 0 }, ...province.children]
      const aData = [{ label: '不限', value: 0 }]

      setCityData(cData)
      setAreaData(aData)
      setProvinceIdx(value)
      setAreaValue([value, 0, 0])
    }
    if (column === 1) {
      const target = cityData.find(item => item.value === cityData[value].value)
      setCityIdx(value)

      setAreaData(
        Array.isArray(target.children)
          ? [{ label: '不限', value: 0 }, ...target.children]
          : [{ label: '不限', value: 0 }]
      )
      setAreaValue([areaValue[0], value, 0])
    }
    if (column === 2) {
      setAreaIdx(value)
      setAreaValue([areaValue[0], areaValue[1], value])
    }
  }

  return (
    <Picker
      mode="multiSelector"
      value={areaValue}
      rangeKey={'label'}
      range={[provinceData, cityData, areaData]}
      onChange={districtChange}
      onColumnChange={throttle(onColumnChange, 50)}
    >
      <AtList>
        <AtListItem
          className={classNames(
            styles.timeListItem,
            !selectedArea ? styles.placeholder : ''
          )}
          title="所在地区"
          extraText={selectedArea || '请选择所在地区'}
        />
      </AtList>
    </Picker>
  )
}

export default observer(AreaPicker)
