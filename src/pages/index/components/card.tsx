import { View, Text, Image } from '@tarojs/components'
import styles from './card.module.less'
import { isArray } from 'lodash'
import { useStores, observer, toJS } from '@/store/mobx'
import { useEffect, useState } from 'react'
import { matchTreeData } from '@/utils/tool'
import moment from 'moment'

const LOCATION_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/diqu_bai.png'

const Card = props => {
  const { data, type } = props
  // type 0 订单 1 工厂
  const img = type === 0 ? data.stylePicture : data.pictureUrl
  const title = type === 0 ? data.name : data.factoryName
  const area = type === 0 ? data.enterpriseAreaName : data.factoryDistrict

  const { commonStore } = useStores()
  const { dictionary, productCategoryList } = commonStore
  const { processType } = dictionary

  const [processTypes, setProcessTypes] = useState<string[]>()

  useEffect(() => {
    if (type === 0) {
      const types =
        (isArray(data.processTypeValues) &&
          data.processTypeValues.map(item => {
            const target = processType.find(i => +i.value === +item) || {}
            return target.label
          })) ||
        []

      const products =
        (isArray(data.factoryCategoryIds) &&
          data.factoryCategoryIds.map(item => {
            const target = matchTreeData(productCategoryList, item) || {}
            return target.name
          })) ||
        []
      setProcessTypes([].concat(types, products))
    }

    if (type === 1) {
      const arr =
        (isArray(data.processTypeList) &&
          data.processTypeList.map(item => {
            const target =
              processType.find(i => +i.value === +item.processType) || {}

            return target.label
          })) ||
        []

      const factoryCategoryList = data.factoryCategoryList || []
      setProcessTypes([].concat(arr, factoryCategoryList))
    }
  }, [processType, type, data, productCategoryList])

  return (
    <View className={styles.card}>
      <Image src={img || ''} className={styles.cardImg}></Image>
      <View className={styles.cardInfo}>
        <View className={styles.titleBox}>
          <Text className={styles.cardTitle}>{title}</Text>
        </View>
        {type === 1 ? (
          <View>
            <Text className={styles.label}>有效车位</Text>
            <Text className={styles.effective}>
              {data.effectiveLocation || '--'}人
            </Text>
          </View>
        ) : (
          <View>
            <Text className={styles.cusTag1}>
              {data.goodsNum ? data.goodsNum.replace(',', '~') : '--'}&nbsp;件
            </Text>
            <Text className={styles.cusTag2}>
              {data.inquiryEffectiveDate
                ? moment(data.inquiryEffectiveDate).format('YYYY-MM-DD')
                : ''}
            </Text>
          </View>
        )}

        <View className={styles.cardTags}>
          {isArray(processTypes) &&
            processTypes.slice(0, 3).map((item, idx) => (
              <Text key={idx} className={styles.cardTag}>
                {item}
              </Text>
            ))}
        </View>
        <View className={styles.cardAddressBox}>
          <View className={styles.addressBox}>
            {+type === 1 && (
              <Image src={LOCATION_ICON} className={styles.icon}></Image>
            )}
            <Text className={styles.cardAddress}>
              {area ? area.replace(/,/g, ' ') : ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
export default observer(Card)
