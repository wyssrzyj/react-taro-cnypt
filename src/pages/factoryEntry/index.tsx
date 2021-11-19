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
import { useState, useMemo } from 'react'
import { cloneDeep, isArray } from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'
import {
  CusProductModal,
  CusMaterialModal,
  CusGradeModal,
  CusModal,
  ImagePicker,
  AreaPicker
} from '@/components'
import { matchTreeData, phoneReg } from '@/utils/tool'
import { upload } from '@/utils/upload'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/back.png'

const FactoryEntry = () => {
  const { top } = Taro.getMenuButtonBoundingClientRect()

  const { commonStore, factoryStore } = useStores()
  const { productCategoryList, dictionary, productGrade } = commonStore
  const {
    plusMaterialType = [],
    processType = [],
    productType = []
  } = dictionary
  // const { getEnterpriseInfo, enterpriseInfoSave } = factoryStore

  const clothOptions = productGrade.reduce((prev, item) => {
    prev.push(...item.children)
    prev.push(item)
    return prev
  }, [])

  const [params, setParams] = useState<any>({})
  const [errText, setErrText] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [materialFlag, setMaterialFlag] = useState<boolean>(false)
  const [clothesGradeFlag, setClothesGradeFlag] = useState<boolean>(false)
  const [productTypeFlag, setProductTypeFlag] = useState<boolean>(false)
  const [processTypeFlag, setProcessTypeFlag] = useState<boolean>(false)

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

  const onSubmit = async () => {
    console.log(params, 'params')
    if (!params['contactsName']) {
      setIsOpened(true)
      setErrText('请输入联系人')
      return
    }

    if (!params['mobilePhone'] || !phoneReg.test(params['mobilePhone'])) {
      setIsOpened(true)
      setErrText('请输入正确的手机号')
      return
    }

    if (!params['enterpriseName']) {
      setIsOpened(true)
      setErrText('请输入工厂名称')
      return
    }

    if (!params['establishedTime']) {
      setIsOpened(true)
      setErrText('请选择成立时间')
      return
    }

    if (!params['provinceId']) {
      setIsOpened(true)
      setErrText('请选择地区')
      return
    }

    if (!params['address']) {
      setIsOpened(true)
      setErrText('请输入工厂地址')
      return
    }

    if (!params['mainCategoriesList'] || !params['mainCategoriesList'].length) {
      setIsOpened(true)
      setErrText('请选择主营类别')
      return
    }

    if (!params['productTypeList'] || !params['productTypeList'].length) {
      setIsOpened(true)
      setErrText('请选择生产方式')
      return
    }

    if (!params['materialTypeValues'] || !params['materialTypeValues'].length) {
      setIsOpened(true)
      setErrText('请选择面料类型')
      return
    }

    if (!params['productGradeValues'] || !params['productGradeValues'].length) {
      setIsOpened(true)
      setErrText('请选择产品档次')
      return
    }

    if (!params['processTypeList'] || !params['processTypeList'].length) {
      setIsOpened(true)
      setErrText('请选择加工类型')
      return
    }

    if (!params['moq']) {
      setIsOpened(true)
      setErrText('请输入起订量')
      return
    }

    if (!params['factoryArea']) {
      setIsOpened(true)
      setErrText('请输入厂房面积')
      return
    }

    if (!params['effectiveLocation']) {
      setIsOpened(true)
      setErrText('请输入有效车位')
      return
    }

    if (!params['staffNumber']) {
      setIsOpened(true)
      setErrText('请输入员工总数')
      return
    }

    if (!params['productLineNum']) {
      setIsOpened(true)
      setErrText('请输入生产线')
      return
    }

    params.enterpriseType = 0
    params.establishedTime = params.establishedTime
      ? moment(params.establishedTime).valueOf()
      : null
    console.log(params, 'params')
    // const res = await enterpriseInfoSave(params)
    // console.log('🚀 ~ file: index.tsx ~ line 156 ~ onSubmit ~ res', res)
  }

  const onReset = () => {}

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

  const processTypeModalShow = () => {
    setProcessTypeFlag(f => !f)
  }

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
    if (isArray(params[field])) {
      return params[field].reduce((prev, item, idx) => {
        const target = options.find(i => i.value === item) || {}
        return (
          prev + (target.label ? `${idx !== 0 ? '、' : ''}${target.label}` : '')
        )
      }, '')
    }
  }

  const areaChange = areaInfo => {
    const keys = Reflect.ownKeys(areaInfo)
    const nParams = cloneDeep(params)
    keys.forEach(item => {
      nParams[item] = areaInfo[item]
    })
    setParams(nParams)
  }

  const toastClose = () => {
    setIsOpened(false)
  }

  const addressChoose = () => {
    Taro.chooseLocation({
      success: function (res) {
        const nParams = cloneDeep(params)
        nParams['address'] = res.address
        nParams['latitude'] = res.latitude
        nParams['longitude'] = res.longitude
        setParams(nParams)
      }
    })
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
                    : '请选择成立时间'
                }
              />
            </AtList>
          </Picker>

          <AreaPicker
            callback={areaChange}
            areaInfo={{
              provinceId: params.provinceId,
              cityId: params.cityId,
              districtId: params.districtId
            }}
          ></AreaPicker>

          <View className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              工厂地址
            </Text>
            <Text
              className={
                params['address'] ? styles.cusValue : styles.cusPlaceholder
              }
              onClick={addressChoose}
            >
              {params['address'] ? params['address'] : '请填写工厂地址'}
            </Text>
          </View>
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

          <View onClick={processTypeModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              加工类型
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                !getLabels(processType, 'processTypeList')
                  ? styles.cusPlaceholder
                  : ''
              )}
            >
              {getLabels(processType, 'processTypeList')
                ? getLabels(processType, 'processTypeList')
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
          </View>
        </View>

        <AtButton onClick={onSubmit} type={'primary'} className={styles.btn}>
          立即入驻
        </AtButton>
      </AtForm>

      <AtToast
        isOpened={isOpened}
        onClose={toastClose}
        text={errText}
        duration={1000}
      ></AtToast>

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

      {processTypeFlag && (
        <CusModal
          options={processType}
          visible={processTypeFlag}
          onCancel={processTypeModalShow}
          title={'加工类型'}
          callback={event => handleChange(event, 'processTypeList')}
          value={params['processTypeList'] || []}
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
    </View>
  )
}

export default observer(FactoryEntry)
