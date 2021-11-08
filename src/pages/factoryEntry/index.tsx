import { View, Image, Picker, Text } from '@tarojs/components'
import styles from './index.module.less'
import Taro from '@tarojs/taro'
import {
  AtForm,
  AtInput,
  AtButton,
  AtToast,
  AtList,
  AtListItem,
  AtTextarea
} from 'taro-ui'
import { useEffect, useState, useMemo } from 'react'
import { cloneDeep, isArray, throttle } from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'
import { CusProductModal, CusMaterialModal, CusGradeModal } from '@/components'
import { matchTreeData } from '@/utils/tool'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/back.png'

const FactoryEntry = () => {
  const { top } = Taro.getMenuButtonBoundingClientRect()

  const { commonStore } = useStores()
  const { getDistrict, productCategoryList, dictionary } = commonStore
  const { plusMaterialType } = dictionary

  const [params, setParams] = useState<any>({})
  const [errText, setErrText] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const [provinceData, setProvinceData] = useState<any[]>([])
  const [cityData, setCityData] = useState<any[]>([])
  const [areaData, setAreaData] = useState<any[]>([])
  const [provinceIdx, setProvinceIdx] = useState<number>(0)
  const [cityIdx, setCityIdx] = useState<number>(0)
  const [areaValue, setAreaValue] = useState<any[]>([0, 0, 0])

  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [materialFlag, setMaterialFlag] = useState<boolean>(false)
  const [clothesGradeFlag, setClothesGradeFlag] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const res = await getDistrict()
      setProvinceData(res)
      const cData = [{ label: '不限', value: 0 }, ...res[0].children]
      const aData = [{ label: '不限', value: 0 }]
      setCityData(cData)
      setAreaData(aData)
    })()
  }, [])

  const goBack = () => {
    Taro.navigateBack()
  }

  const handleChange = (value, field) => {
    console.log('🚀 ~ file: index.tsx ~ line 23 ~ handleChange ~ value', value)
    const nParams = cloneDeep(params)
    nParams[field] = value
    setParams(nParams)
  }

  const onSubmit = () => {
    console.log(params, 'params')
    if (!params['contactsName']) {
      setIsOpened(true)
      setErrText('请输入联系人')
    }
  }

  const onReset = () => {}

  const onAreaColumnChange = event => {
    const {
      detail: { column, value }
    } = event

    if (column === 0) {
      const target = provinceData[value]
      const province =
        provinceData.find(item => item.value === target.value) || {}
      province.children = province.children || []
      const cData = [{ label: '不限', value: 0 }, ...province.children]
      const aData = [{ label: '不限', value: 0 }]

      setCityData(cData)
      setAreaData(aData)
      // setProvinceIdx(value)
      setAreaValue([value, 0, 0])
    }
    if (column === 1) {
      const target = cityData.find(item => item.value === cityData[value].value)
      // setCityIdx(value)

      setAreaData(
        Array.isArray(target.children)
          ? [{ label: '不限', value: 0 }, ...target.children]
          : [{ label: '不限', value: 0 }]
      )
      setAreaValue([areaValue[0], value, 0])
    }
  }

  const getAreaInfo = useMemo(() => {
    const target = params['areaValue']
    return isArray(target) && target.length
      ? target.reduce((prev, item, idx) => {
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
      : '请选择地区'
  }, [params])

  const productModalShow = () => {
    setProductFlag(f => !f)
  }

  const materialModalShow = () => {
    setMaterialFlag(f => !f)
  }

  const clothesGradeModalShow = () => {
    setClothesGradeFlag(f => !f)
  }

  const getProducts = useMemo(() => {
    const target = params['mainCategoriesList'] || []
    const matches = target.reduce((prev, item, idx) => {
      const product = matchTreeData(productCategoryList, item) || {}
      return (
        prev + (product.name ? `${idx !== 0 ? '、' : ''}${product.name}` : '')
      )
    }, '')

    return matches
  }, [params.mainCategoriesList])

  const getMaterial = useMemo(() => {
    if (isArray(params.materialTypeValues)) {
      return params.materialTypeValues.reduce((prev, item, idx) => {
        const target = plusMaterialType.find(i => i.value === item) || {}
        return (
          prev + (target.label ? `${idx !== 0 ? '、' : ''}${target.label}` : '')
        )
      }, '')
    }
  }, [params.materialTypeValues])

  return (
    <View>
      <View className={styles.navBar} style={{ paddingTop: `${top}px` }}>
        <View className={styles.navContent}>
          <Image
            src={BACK_ICON}
            className={styles.back}
            onClick={goBack}
          ></Image>
          <View>工厂入驻</View>
        </View>
      </View>

      <AtForm onSubmit={onSubmit} onReset={onReset} className={styles.form}>
        <View className={styles.concatInfo}>
          <AtInput
            required
            className={styles.cusInput}
            name="contactsName"
            title="联系人"
            type="text"
            placeholder="请填写真实姓名"
            value={params['contactsName']}
            onChange={event => handleChange(event, 'contactsName')}
          />

          <AtInput
            required
            className={styles.cusInput}
            name="mobilePhone"
            border={false}
            title="手机号码"
            type="phone"
            placeholder="请填写手机号码"
            value={params['mobilePhone']}
            onChange={event => handleChange(event, 'mobilePhone')}
          />
        </View>

        <View className={styles.factoryInfo}>
          <AtInput
            required
            className={styles.cusInput}
            name="enterpriseName"
            title="工厂名称"
            type="text"
            placeholder="请填写工厂名称"
            value={params['enterpriseName']}
            onChange={event => handleChange(event, 'enterpriseName')}
          />

          <Picker
            mode="date"
            onChange={event =>
              handleChange(event.detail.value, 'establishedTime')
            }
          >
            <AtList>
              <AtListItem
                title="成立时间"
                className={classNames(
                  styles.timeListItem,
                  !params['establishedTime'] ? styles.placeholder : ''
                )}
                extraText={
                  params['establishedTime']
                    ? moment(params['establishedTime']).format('YYYY-MM-DD')
                    : '请选择时间'
                }
              />
            </AtList>
          </Picker>

          <Picker
            mode="multiSelector"
            // value={params['areaValue']}
            rangeKey={'label'}
            range={[provinceData, cityData, areaData]}
            onChange={event => handleChange(event.detail.value, 'areaValue')}
            onColumnChange={throttle(onAreaColumnChange, 50)}
          >
            <AtList>
              <AtListItem
                className={classNames(
                  styles.timeListItem,
                  !params['areaValue'] ? styles.placeholder : ''
                )}
                title="请选择地区"
                extraText={getAreaInfo}
              />
            </AtList>
          </Picker>

          <AtInput
            required
            className={styles.cusInput}
            name="address"
            title="工厂地址"
            type="text"
            placeholder="请填写工厂地址"
            value={params['address']}
            onChange={event => handleChange(event, 'address')}
          />
        </View>

        <View className={styles.processingInfo}>
          <View onClick={productModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              主营类别
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getProducts ? styles.cusPlaceholder : ''
              )}
            >
              {getProducts ? getProducts : '请选择主营类别'}
            </Text>
          </View>

          <View className={styles.cusFormTextArea}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              类别说明
            </Text>
            <AtTextarea
              className={styles.cusTextarea}
              placeholder="请填写类别说明"
              value={params['mainProductCategoriesDesc']}
              maxLength={700}
              onChange={event =>
                handleChange(event, 'mainProductCategoriesDesc')
              }
            />
          </View>

          <View onClick={materialModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              面料类型
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getMaterial ? styles.cusPlaceholder : ''
              )}
            >
              {getMaterial ? getMaterial : '请选择面料类型'}
            </Text>
          </View>

          <View onClick={clothesGradeModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              产品档次
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getMaterial ? styles.cusPlaceholder : ''
              )}
            >
              {getMaterial ? getMaterial : '请选择产品档次'}
            </Text>
          </View>
        </View>

        <AtButton onClick={onSubmit} type={'primary'} className={styles.btn}>
          提交
        </AtButton>
      </AtForm>

      <AtToast isOpened={isOpened} text={errText}></AtToast>

      {productFlag && (
        <CusProductModal
          visible={productFlag}
          onCancel={productModalShow}
          callback={event => handleChange(event, 'mainCategoriesList')}
        />
      )}
      {materialFlag && (
        <CusMaterialModal
          visible={materialFlag}
          onCancel={materialModalShow}
          callback={event => handleChange(event, 'materialTypeValues')}
        />
      )}
      {clothesGradeFlag && (
        <CusGradeModal
          visible={clothesGradeFlag}
          onCancel={clothesGradeModalShow}
          callback={event => handleChange(event, 'clothesGrade')}
        />
      )}
    </View>
  )
}

export default observer(FactoryEntry)
