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
import { cloneDeep, isArray, throttle } from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'
import { CusProductModal, CusModal, ImagePicker } from '@/components'
import { matchTreeData } from '@/utils/tool'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/back.png'

const FactoryEntry = () => {
  const { top } = Taro.getMenuButtonBoundingClientRect()

  const { commonStore, factoryStore } = useStores()
  const { getDistrict, productCategoryList, dictionary } = commonStore
  const { purchaserRole } = dictionary
  const { getEnterpriseInfo } = factoryStore

  const [params, setParams] = useState<any>({})
  const [errText, setErrText] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const [provinceData, setProvinceData] = useState<any[]>([])
  const [cityData, setCityData] = useState<any[]>([])
  const [areaData, setAreaData] = useState<any[]>([])
  const [areaValue, setAreaValue] = useState<any[]>([0, 0, 0])

  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [rolesFlag, setRolesFlag] = useState<boolean>(false)

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

  useEffect(() => {
    ;(async () => {
      if (!provinceData.length) return
      const info = await getEnterpriseInfo()
      info.establishedTime = info.establishedTime
        ? moment(info.establishedTime)
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

      // setParams(info)
      console.log('🚀 ~ file: index.tsx ~ line 78 ~ info', info)
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

  const imgsChange = (value, field) => {
    console.log('🚀 ~ file: index.tsx ~ line 109 ~ imgsChange ~ value', value)
    const nParams = cloneDeep(params)
    // const file = customRequest(value[0])
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

  const rolesModalShow = () => {
    setRolesFlag(f => !f)
  }

  // setProductTypeModalShow

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

  return (
    <View>
      <View className={styles.navBar} style={{ paddingTop: `${top}px` }}>
        <View className={styles.navContent}>
          <Image
            src={BACK_ICON}
            className={styles.back}
            onClick={goBack}
          ></Image>
          <View>发单商入驻</View>
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
            title="企业名称"
            type="text"
            placeholder="请填写企业名称"
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

          <View onClick={rolesModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              企业角色
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getLabels(purchaserRole, 'roleCodes')
                  ? styles.cusPlaceholder
                  : ''
              )}
            >
              {getLabels(purchaserRole, 'roleCodes')
                ? getLabels(purchaserRole, 'roleCodes')
                : '请选择企业角色'}
            </Text>
          </View>

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
                title="所在地区"
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

          <AtInput
            required
            className={styles.cusInput}
            name="yearOrderTransaction"
            title="年发单量"
            type="number"
            placeholder="请填写年发单量"
            value={params['yearOrderTransaction']}
            onChange={event => handleChange(event, 'yearOrderTransaction')}
          >
            <View className={styles.addon}>万件</View>
          </AtInput>

          <AtInput
            required
            className={styles.cusInput}
            name="orderBrand"
            title="订单品牌"
            type="number"
            placeholder="请填写订单品牌"
            value={params['orderBrand']}
            onChange={event => handleChange(event, 'orderBrand')}
          ></AtInput>
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

          <View>
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
                  showAddBtn={
                    params[item.field] && params[item.field].length >= 3
                      ? false
                      : true
                  }
                />
              </View>
            </View>
          ))}

          <View className={styles.photoTitle}>
            产品照片(最多可上传10张, 最少上传一张)
          </View>
          <View className={styles.photoBox}>
            <AtImagePicker
              files={params['productImagesList']}
              onChange={event => imgsChange(event, 'productImagesList')}
              // count={10}
              multiple={true}
              sizeType={['70']}
              showAddBtn={
                params['productImagesList'] &&
                params['productImagesList'].length >= 10
                  ? false
                  : true
              }
            />
          </View>
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
    </View>
  )
}

export default observer(FactoryEntry)
