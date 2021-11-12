import {
  View,
  Image,
  Picker,
  Text,
  Radio,
  RadioGroup
} from '@tarojs/components'
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

const initParams = {
  isContactPublic: 1,
  isEnterpriseInfoPublic: 1
}

const FactoryEntry = () => {
  console.log(Taro.getEnv())

  const { top } = Taro.getMenuButtonBoundingClientRect()

  const { commonStore, factoryStore } = useStores()
  const {
    getDistrict,
    productCategoryList,
    dictionary,
    productGrade,
    district
  } = commonStore
  const {
    plusMaterialType = [],
    purchaserRole = [],
    goodsNum = [],
    productType = [],
    effectiveLocation = []
  } = dictionary
  const { getEnterpriseInfo } = factoryStore

  const clothOptions = productGrade.reduce((prev, item) => {
    prev.push(...item.children)
    prev.push(item)
    return prev
  }, [])

  const [params, setParams] = useState<any>(initParams)
  const [errText, setErrText] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const [provinceData, setProvinceData] = useState<any[]>([])
  const [cityData, setCityData] = useState<any[]>([])
  const [areaData, setAreaData] = useState<any[]>([])
  const [location, setAreaValue] = useState<any[]>([0, 0, 0])

  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [materialFlag, setMaterialFlag] = useState<boolean>(false)
  const [clothesGradeFlag, setClothesGradeFlag] = useState<boolean>(false)
  const [processTypeFlag, setProcessTypeFlag] = useState<boolean>(false)
  const [productTypeFlag, setProductTypeFlag] = useState<boolean>(false)
  const [rolesFlag, setRolesFlag] = useState<boolean>(false)
  const [goodsNumFlag, setGoodsNumFlag] = useState<boolean>(false)
  const [effectiveFlag, setEffectiveFlag] = useState<boolean>(false)

  const photoConfigs2 = [
    {
      label: '宣传照片',
      field: 'publicityImagesList',
      count: 3
    }
  ]
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
    console.log('🚀 ~ ~~~~~~~~~~~~', value)
    const nParams = cloneDeep(params)
    nParams[field] = value
    setParams(nParams)
  }

  const imgsChange = async (value, field, max) => {
    const nParams = cloneDeep(params)
    const allImgs: any = []
    value.slice(0, max).forEach(item => {
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
      setAreaValue([location[0], value, 0])
    }
  }

  const getAreaInfo = useMemo(() => {
    const target = params['location']
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

  const processTypeModalShow = () => {
    setProcessTypeFlag(f => !f)
  }

  const rolesModalShow = () => {
    setRolesFlag(f => !f)
  }

  const goodsNumModalShow = () => {
    setGoodsNumFlag(f => !f)
  }

  const productTypeModalShow = () => {
    setProductTypeFlag(f => !f)
  }

  const effectiveeModalShow = () => {
    setEffectiveFlag(f => !f)
  }

  const getProducts = useMemo(() => {
    const target = params['categoryId'] || []
    const matches = target.reduce((prev, item, idx) => {
      const product = matchTreeData(productCategoryList, item) || {}
      return (
        prev + (product.name ? `${idx !== 0 ? '、' : ''}${product.name}` : '')
      )
    }, '')

    return matches
  }, [params.categoryId])

  const getMaterial = useMemo(() => {
    if (isArray(params.materialTypeList)) {
      return params.materialTypeList.reduce((prev, item, idx) => {
        const target = plusMaterialType.find(i => i.value === item) || {}
        return (
          prev + (target.label ? `${idx !== 0 ? '、' : ''}${target.label}` : '')
        )
      }, '')
    }
  }, [params.materialTypeList])

  const getLabels = (options, field) => {
    if (isArray(params[field])) {
      return params[field].reduce((prev, item, idx) => {
        const target = options.find(i => i.value === item) || {}
        return (
          prev + (target.label ? `${idx !== 0 ? '、' : ''}${target.label}` : '')
        )
      }, '')
    }
  }

  useEffect(() => {
    console.log(params, 'params')
  }, [params])

  return (
    <View>
      <View className={styles.navBar} style={{ paddingTop: `${top}px` }}>
        <View className={styles.navContent}>
          <Image
            src={BACK_ICON}
            className={styles.back}
            onClick={goBack}
          ></Image>
          <View>发布订单</View>
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

          <View className={styles.cusItem}>
            <View className={classNames(styles.cusLabel, styles.required)}>
              联系信息
            </View>
            <RadioGroup
              onChange={event =>
                handleChange(event.detail.value, 'isContactPublic')
              }
            >
              <Radio
                value={1}
                checked={+params['isContactPublic'] === 1}
                className={styles.radioText}
                style={{ transform: 'scale(0.8)' }}
              >
                公开
              </Radio>
              <Radio
                value={3}
                checked={+params['isContactPublic'] === 3}
                className={styles.radioText}
                style={{ transform: 'scale(0.8)', marginLeft: '20rpx' }}
              >
                不公开
              </Radio>
            </RadioGroup>
          </View>

          <View className={styles.cusItem}>
            <View className={classNames(styles.cusLabel, styles.required)}>
              企业信息
            </View>
            <RadioGroup
              onChange={event =>
                handleChange(event.detail.value, 'isEnterpriseInfoPublic')
              }
            >
              <Radio
                value={1}
                checked={+params['isEnterpriseInfoPublic'] === 1}
                className={styles.radioText}
                style={{ transform: 'scale(0.8)' }}
              >
                公开
              </Radio>
              <Radio
                value={0}
                checked={+params['isEnterpriseInfoPublic'] === 0}
                className={styles.radioText}
                style={{ transform: 'scale(0.8)', marginLeft: '20rpx' }}
              >
                不公开
              </Radio>
            </RadioGroup>
          </View>
        </View>

        <View className={styles.factoryInfo}>
          <View className={styles.cusFormTextArea2}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              订单标题
            </Text>
            <AtTextarea
              className={styles.cusTextarea}
              placeholder="请填写订单标题"
              value={params['name']}
              maxLength={99}
              onChange={event => handleChange(event, 'name')}
            />
          </View>

          <View onClick={goodsNumModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              发单量
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getLabels(goodsNum, 'goodsNum') ? styles.cusPlaceholder : ''
              )}
            >
              {getLabels(goodsNum, 'goodsNum')
                ? getLabels(goodsNum, 'goodsNum')
                : '请选择发单量'}
            </Text>
          </View>

          <AtInput
            className={classNames(styles.unRequiredCusinput, styles.cusInput)}
            name="goodsPrice"
            title="目标单价"
            type="number"
            placeholder="请填写目标单价"
            value={params['goodsPrice']}
            onChange={event => handleChange(event, 'goodsPrice')}
          >
            <View className={styles.addon}>元</View>
          </AtInput>

          <View onClick={productModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              产品品类
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getProducts ? styles.cusPlaceholder : ''
              )}
            >
              {getProducts ? getProducts : '请选择产品品类'}
            </Text>
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
        </View>

        <View className={styles.photoInfo}>
          <View onClick={processTypeModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              加工类型
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getLabels(typeOptions, 'processTypeList')
                  ? styles.cusPlaceholder
                  : ''
              )}
            >
              {getLabels(typeOptions, 'processTypeList')
                ? getLabels(typeOptions, 'processTypeList')
                : '请选择加工类型'}
            </Text>
          </View>

          <View onClick={productTypeModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              生产方式
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getLabels(productType, 'productTypeList')
                  ? styles.cusPlaceholder
                  : ''
              )}
            >
              {getLabels(productType, 'productTypeList')
                ? getLabels(productType, 'productTypeList')
                : '请选择生产方式'}
            </Text>
          </View>

          <Picker
            mode="multiSelector"
            value={params['location']}
            rangeKey={'label'}
            range={[provinceData, cityData, areaData]}
            onChange={event => handleChange(event.detail.value, 'location')}
            onColumnChange={throttle(onAreaColumnChange, 50)}
          >
            <AtList>
              <AtListItem
                className={classNames(
                  styles.timeListItem,
                  !params['location'] ? styles.placeholder : ''
                )}
                title="地区要求"
                extraText={getAreaInfo}
              />
            </AtList>
          </Picker>

          <Picker
            mode="date"
            onChange={event => handleChange(event.detail.value, 'deliveryDate')}
          >
            <AtList>
              <AtListItem
                title="交货日期"
                className={classNames(
                  styles.timeListItem,
                  !params['deliveryDate'] ? styles.placeholder : ''
                )}
                extraText={
                  params['deliveryDate']
                    ? moment(params['deliveryDate']).format('YYYY-MM-DD')
                    : '请选择交货日期'
                }
              />
            </AtList>
          </Picker>

          <View onClick={effectiveeModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              车位要求
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getLabels(effectiveLocation, 'effectiveLocation')
                  ? styles.cusPlaceholder
                  : ''
              )}
            >
              {getLabels(effectiveLocation, 'effectiveLocation')
                ? getLabels(effectiveLocation, 'effectiveLocation')
                : '请选择车位要求'}
            </Text>
          </View>

          <AtInput
            required
            className={styles.cusInput}
            name="payDetails"
            title="付款方式"
            type="text"
            placeholder="请填写付款方式"
            value={params['payDetails']}
            onChange={event => handleChange(event, 'payDetails')}
          />

          <Picker
            mode="date"
            onChange={event =>
              handleChange(event.detail.value, 'inquiryEffectiveDate')
            }
          >
            <AtList>
              <AtListItem
                title="订单有效期"
                className={classNames(
                  styles.timeListItem,
                  !params['inquiryEffectiveDate'] ? styles.placeholder : ''
                )}
                extraText={
                  params['inquiryEffectiveDate']
                    ? moment(params['inquiryEffectiveDate']).format(
                        'YYYY-MM-DD'
                      )
                    : '请选择订单有效期'
                }
              />
            </AtList>
          </Picker>
        </View>

        <View className={styles.photoInfo}>
          <View className={styles.cusFormTextArea}>
            <Text className={classNames(styles.cusLabel, styles.unRequired)}>
              备注说明
            </Text>
            <AtTextarea
              className={styles.cusTextarea}
              placeholder="请填写备注说明"
              value={params['goodsRemark'] || ''}
              maxLength={999}
              onChange={event => handleChange(event, 'goodsRemark')}
            />
          </View>

          <View className={styles.photoTitle}>款图(最多可上传10张)</View>
          <View className={styles.photoBox}>
            <AtImagePicker
              files={params['stylePicture']}
              onChange={event => imgsChange(event, 'stylePicture', 10)}
              count={10}
              sizeType={['70']}
              showAddBtn={
                params['stylePicture'] && params['stylePicture'].length >= 10
                  ? false
                  : true
              }
            />
          </View>
        </View>

        <AtButton onClick={onSubmit} type={'primary'} className={styles.btn}>
          立即发布
        </AtButton>
      </AtForm>

      <AtToast isOpened={isOpened} text={errText}></AtToast>

      {productFlag && (
        <CusProductModal
          visible={productFlag}
          onCancel={productModalShow}
          callback={event => handleChange(event, 'categoryId')}
          value={params['categoryId'] || []}
        />
      )}
      {materialFlag && (
        <CusMaterialModal
          visible={materialFlag}
          onCancel={materialModalShow}
          callback={event => handleChange(event, 'materialTypeList')}
          value={params['materialTypeList'] || []}
        />
      )}
      {clothesGradeFlag && (
        <CusGradeModal
          visible={clothesGradeFlag}
          onCancel={clothesGradeModalShow}
          callback={event => handleChange(event, 'clothesGrade')}
          value={params['clothesGrade'] || []}
        />
      )}
      {processTypeFlag && (
        <CusModal
          options={typeOptions}
          visible={processTypeFlag}
          onCancel={processTypeModalShow}
          title={'加工类型'}
          callback={event => handleChange(event, 'processTypeList')}
          value={params['processTypeList'] || []}
        />
      )}
      {rolesFlag && (
        <CusModal
          options={purchaserRole}
          visible={rolesFlag}
          onCancel={rolesModalShow}
          title={'企业角色'}
          callback={event => handleChange(event, 'roleCodes')}
          value={params['roleCodes'] || []}
        />
      )}

      {goodsNumFlag && (
        <CusModal
          options={goodsNum}
          visible={goodsNumFlag}
          onCancel={goodsNumModalShow}
          title={'发单量'}
          callback={event => handleChange(event, 'goodsNum')}
          value={params['goodsNum'] || []}
          type={'single'}
        />
      )}

      {productTypeFlag && (
        <CusModal
          options={productType}
          visible={productTypeFlag}
          onCancel={productTypeModalShow}
          title={'生产方式'}
          callback={event => handleChange(event, 'productTypeList')}
          value={params['productTypeList'] || []}
        />
      )}

      {effectiveFlag && (
        <CusModal
          options={effectiveLocation}
          visible={effectiveFlag}
          onCancel={effectiveeModalShow}
          title={'车位要求'}
          callback={event => handleChange(event, 'effectiveLocation')}
          value={params['effectiveLocation'] || []}
          type={'single'}
        />
      )}
    </View>
  )
}

export default observer(FactoryEntry)
