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
  AtTextarea,
  AtImagePicker
} from 'taro-ui'
import { useEffect, useState, useMemo } from 'react'
import { cloneDeep, isArray, isNil, throttle } from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import { useStores, observer, toJS } from '@/store/mobx'
import {
  CusProductModal,
  CusMaterialModal,
  CusGradeModal,
  CusModal,
  ImagePicker
} from '@/components'
import { matchTreeData } from '@/utils/tool'
import OSS from '@/utils/oss'
import { upload } from '@/utils/upload'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/back.png'

interface OptionsType {
  label: string
  value: string
}
const typeOptions: Partial<OptionsType>[] = [
  { label: '清加工单', value: 'QJG' },
  { label: 'OEM', value: 'OEM' },
  { label: 'ODM', value: 'ODM' },
  { label: '经销单', value: 'JXD' },
  { label: '自营进出口单', value: 'ZCK' },
  {}
]

const FactoryEntry = () => {
  const { top } = Taro.getMenuButtonBoundingClientRect()

  const { commonStore, factoryStore } = useStores()
  const {
    // getDistrict,
    productCategoryList,
    dictionary,
    productGrade,
    district
  } = commonStore
  const { plusMaterialType = [], processType = [] } = dictionary
  const { getEnterpriseInfo } = factoryStore

  const clothOptions = productGrade.reduce((prev, item) => {
    prev.push(...item.children)
    prev.push(item)
    return prev
  }, [])

  const [params, setParams] = useState<any>({})
  const [errText, setErrText] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const [provinceData, setProvinceData] = useState<any[]>([])
  const [cityData, setCityData] = useState<any[]>([])
  const [areaData, setAreaData] = useState<any[]>([])
  const [areaValue, setAreaValue] = useState<any[]>([0, 0, 0])

  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [materialFlag, setMaterialFlag] = useState<boolean>(false)
  const [clothesGradeFlag, setClothesGradeFlag] = useState<boolean>(false)
  const [productTypeFlag, setProductTypeFlag] = useState<boolean>(false)

  const photoConfigs = [
    {
      label: '平缝机',
      field: 'sewingMachineImage'
    },
    {
      label: '包缝机',
      field: 'overlockMachineImage'
    },
    {
      label: '绷缝机',
      field: 'flatSeamingMachineImage'
    },
    {
      label: '裁床',
      field: 'cuttingBedImage'
    },
    {
      label: '铺布机',
      field: 'spreaderImage'
    },
    {
      label: '吊挂',
      field: 'hangImage'
    },
    {
      label: '验布机',
      field: 'clothInspectingMachineImage'
    }
  ]

  const photoConfigs2 = [
    {
      label: '外景照片',
      field: 'outsizeImageList'
    },
    {
      label: '车间照片',
      field: 'workshopImageList'
    }
  ]
  useEffect(() => {
    ;(async () => {
      const res = cloneDeep(district)
      // const res = await getDistrict()
      setProvinceData(res)
      const cData = [{ label: '不限', value: 0 }, ...res[0].children]
      const aData = [{ label: '不限', value: 0 }]
      setCityData(cData)
      setAreaData(aData)
    })()
  }, [district])

  useEffect(() => {
    ;(async () => {
      if (!provinceData.length) return
      const info = await getEnterpriseInfo()

      info.establishedTime = info.establishedTime
        ? moment(info.establishedTime).format('YYYY-MM-DD')
        : null

      const provinceIdx = provinceData.findIndex(
        (item: any) => +item.value === +info.provinceId
      )

      const citys = provinceIdx > -1 ? provinceData[provinceIdx].children : []
      citys.unshift({ label: '不限', value: 0 })
      const cityIdx =
        provinceIdx > -1 && isArray(citys)
          ? citys.findIndex((item: any) => +item.value === +info.cityId)
          : -1
      setCityData(citys)

      const districts = cityIdx > -1 ? citys[cityIdx].children : []
      districts.unshift({ label: '不限', value: 0 })
      const districtIdx =
        cityIdx > -1 && isArray(districts)
          ? districts.findIndex((item: any) => +item.value === +info.districtId)
          : -1
      setAreaData(districts)
      info.areaValue = [provinceIdx, cityIdx, districtIdx]
      setParams(info)
    })()
  }, [provinceData])

  const goBack = () => {
    Taro.navigateBack()
  }

  const handleChange = (value, field) => {
    console.log('🚀 ~ ~~~~~~~~~~~~', value)
    const nParams = cloneDeep(params)
    nParams[field] = value
    setParams(nParams)
  }

  const imgsChange = async (value, field) => {
    const nParams = cloneDeep(params)
    const allImgs: any = []
    value.forEach(item => {
      allImgs.push(customRequest(item))
    })
    await Promise.all(allImgs).then(res => {
      nParams[field] = res
      setParams(nParams)
    })
  }

  const customRequest = async ({ url }) => {
    const imgUrl = await upload(url)
    return {
      url: imgUrl
    }
  }

  const onSubmit = () => {
    if (!params['contactsName']) {
      setIsOpened(true)
      setErrText('请输入联系人')
    }

    // Taro.redirectTo({
    //   url: '/pages/index/index'
    // })
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
  }, [params.areaValue])

  const productModalShow = () => {
    setProductFlag(f => !f)
  }

  const materialModalShow = () => {
    setMaterialFlag(f => !f)
  }

  const clothesGradeModalShow = () => {
    setClothesGradeFlag(f => !f)
  }

  const productTypeModalShow = () => {
    setProductTypeFlag(f => !f)
  }

  // setProductTypeModalShow

  const getProducts = useMemo(() => {
    const target = params['mainCategoriesList'] || []

    const matches = target.reduce((prev, item, idx) => {
      const product = matchTreeData(productCategoryList, item, 'code') || {}
      return (
        prev + (product.name ? `${idx !== 0 ? '、' : ''}${product.name}` : '')
      )
    }, '')

    return matches
  }, [params.mainCategoriesList, productCategoryList])

  const getMaterial = useMemo(() => {
    if (isArray(params.materialTypeValues)) {
      return params.materialTypeValues.reduce((prev, item, idx) => {
        const target = plusMaterialType.find(i => i.value === item) || {}
        return (
          prev + (target.label ? `${idx !== 0 ? '、' : ''}${target.label}` : '')
        )
      }, '')
    }
  }, [params.materialTypeValues, plusMaterialType])

  const getLabels = (options, field) => {
    console.log('🚀 ~ file: index.tsx ~ line 301 ~ getLabels ~ field', field)
    console.log(
      '🚀 ~ file: index.tsx ~ line 301 ~ getLabels ~ options',
      options
    )
    console.log(params[field], 'params[field]')
    if (isArray(params[field])) {
      return params[field].reduce((prev, item, idx) => {
        const target = options.find(i => i.value === item) || {}
        return (
          prev + (target.label ? `${idx !== 0 ? '、' : ''}${target.label}` : '')
        )
      }, '')
    }
  }

  console.log(params, 'params')

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
            title="手机号"
            type="phone"
            placeholder="请填写手机号"
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
            value={params['establishedTime']}
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
            value={params['areaValue']}
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
            <Text className={classNames(styles.cusLabel, styles.unRequired)}>
              类别说明
            </Text>
            <AtTextarea
              className={styles.cusTextarea}
              placeholder="请填写类别说明"
              value={params['mainProductCategoriesDesc'] || ''}
              maxLength={999}
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
                !getLabels(clothOptions, 'productGradeValues')
                  ? styles.cusPlaceholder
                  : ''
              )}
            >
              {getLabels(clothOptions, 'productGradeValues')
                ? getLabels(clothOptions, 'productGradeValues')
                : '请选择产品档次'}
            </Text>
          </View>

          <View onClick={productTypeModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              加工类型
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getLabels(typeOptions, 'factoryProcessTypeList')
                  ? styles.cusPlaceholder
                  : ''
              )}
            >
              {getLabels(typeOptions, 'factoryProcessTypeList')
                ? getLabels(typeOptions, 'factoryProcessTypeList')
                : '请选择加工类型'}
            </Text>
          </View>

          <AtInput
            required
            className={styles.cusInput}
            name="moq"
            title="起订量"
            type="number"
            placeholder="请填写起订量"
            value={params['moq']}
            onChange={event => handleChange(event, 'moq')}
          >
            <View className={styles.addon}>件</View>
          </AtInput>
        </View>

        <View className={styles.processingInfo}>
          <AtInput
            required
            className={styles.cusInput}
            name="factoryArea"
            title="厂房面积"
            type="number"
            placeholder="请填写厂房面积"
            value={params['factoryArea']}
            onChange={event => handleChange(event, 'factoryArea')}
          >
            <View className={styles.addon}>平方</View>
          </AtInput>

          <AtInput
            required
            className={styles.cusInput}
            name="effectiveLocation"
            title="有效车位"
            type="number"
            placeholder="请填写人数"
            value={params['effectiveLocation']}
            onChange={event => handleChange(event, 'effectiveLocation')}
          >
            <View className={styles.addon}>人</View>
          </AtInput>

          <AtInput
            required
            className={styles.cusInput}
            name="staffNumber"
            title="员工总数"
            type="number"
            placeholder="请填写人数"
            value={params['staffNumber']}
            onChange={event => handleChange(event, 'staffNumber')}
          >
            <View className={styles.addon}>人</View>
          </AtInput>

          <AtInput
            required
            className={styles.cusInput}
            name="productLineNum"
            title="生产线"
            type="number"
            placeholder="请填写数量"
            value={params['productLineNum']}
            onChange={event => handleChange(event, 'productLineNum')}
          >
            <View className={styles.addon}>条</View>
          </AtInput>
        </View>

        <View className={styles.photoInfo}>
          <View className={styles.cusFormTextArea2}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              企业简介
            </Text>
            <AtTextarea
              className={styles.cusTextarea}
              placeholder="请填写企业简介"
              value={params['enterpriseDesc']}
              maxLength={700}
              onChange={event => handleChange(event, 'enterpriseDesc')}
            />
          </View>

          {/* <View>
            <View className={styles.photoTitle}>logo</View>
            <View className={styles.logoPhotoBox}>
              <ImagePicker
                addTitle={'logo'}
                files={params['enterpriseLogoUrl']}
                callback={event => imgsChange(event, 'enterpriseLogoUrl')}
                count={1}
                showAddBtn={
                  params['enterpriseLogoUrl'] &&
                  params['enterpriseLogoUrl'].length >= 1
                    ? false
                    : true
                }
              ></ImagePicker>
            </View>
          </View>

          {photoConfigs2.map(item => (
            <View key={item.field} className={styles.imgs}>
              <View className={styles.photoTitle}>{item.label}</View>
              <View className={styles.photoBox}>
                <AtImagePicker
                  files={params[item.field]}
                  onChange={event => imgsChange(event, item.field)}
                  count={3}
                  sizeType={['70']}
                  multiple={false}
                  showAddBtn={
                    params[item.field] && params[item.field].length >= 3
                      ? false
                      : true
                  }
                />
              </View>
            </View>
          ))}

          <View className={styles.photoTitle}>设备照片</View>
          <View className={styles.photos}>
            {photoConfigs.map(item => (
              <ImagePicker
                key={item.field}
                addTitle={item.label}
                files={params[item.field]}
                callback={event => imgsChange(event, item.field)}
                count={1}
                showAddBtn={
                  params[item.field] && params[item.field].length >= 1
                    ? false
                    : true
                }
              ></ImagePicker>
            ))}
          </View> */}
        </View>

        <AtButton onClick={onSubmit} type={'primary'} className={styles.btn}>
          立即入驻
        </AtButton>
      </AtForm>

      <AtToast isOpened={isOpened} text={errText}></AtToast>

      {productFlag && (
        <CusProductModal
          visible={productFlag}
          onCancel={productModalShow}
          callback={event => handleChange(event, 'mainCategoriesList')}
          value={params['mainCategoriesList'] || []}
          keyName={'code'}
        />
      )}
      {materialFlag && (
        <CusMaterialModal
          visible={materialFlag}
          onCancel={materialModalShow}
          callback={event => handleChange(event, 'materialTypeValues')}
          value={params['materialTypeValues'] || []}
        />
      )}
      {clothesGradeFlag && (
        <CusGradeModal
          visible={clothesGradeFlag}
          onCancel={clothesGradeModalShow}
          callback={event => handleChange(event, 'productGradeValues')}
          value={params['productGradeValues'] || []}
        />
      )}

      {productTypeFlag && (
        <CusModal
          options={processType}
          visible={productTypeFlag}
          onCancel={productTypeModalShow}
          title={'加工类型'}
          callback={event => handleChange(event, 'factoryProcessTypeList')}
          value={params['factoryProcessTypeList'] || []}
        />
      )}
    </View>
  )
}

export default observer(FactoryEntry)
