import {
  View,
  Image,
  Picker,
  Text,
  Radio,
  RadioGroup
} from '@tarojs/components'
import styles from './index.module.less'
import Taro, { useRouter } from '@tarojs/taro'
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
import { cloneDeep, isArray, isNil } from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'
import { CusProductModal, CusMaterialModal, CusModal } from '@/components'
import { findTarget, matchTreeData, phoneReg } from '@/utils/tool'
import { upload } from '@/utils/upload'
import AreaModal from '@/components/areaModal'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/back.png'

const initParams = {
  isContactPublic: 1,
  isEnterpriseInfoPublic: 1
}

const FactoryEntry = () => {
  const { top } = Taro.getMenuButtonBoundingClientRect()

  const router = useRouter()
  const {
    params: { id }
  } = router

  const { commonStore, factoryStore } = useStores()
  const { publishOrder, orderDetail } = factoryStore
  const { productCategoryList, dictionary, district } = commonStore

  const {
    plusMaterialType = [],
    goodsNum = [],
    productType = [],
    effectiveLocation = [],
    processType = []
  } = dictionary

  const [params, setParams] = useState<any>(initParams)
  const [errText, setErrText] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [materialFlag, setMaterialFlag] = useState<boolean>(false)
  const [processTypeFlag, setProcessTypeFlag] = useState<boolean>(false)
  const [productTypeFlag, setProductTypeFlag] = useState<boolean>(false)
  const [goodsNumFlag, setGoodsNumFlag] = useState<boolean>(false)
  const [effectiveFlag, setEffectiveFlag] = useState<boolean>(false)
  const [areaFlag, setAreaFlag] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      if (id) {
        const detail = await orderDetail(id)
        detail.goodsNum = [detail.goodsNumDictionary]
        detail.effectiveLocation = [detail.effectiveLocationDictionary]
        detail.inquiryEffectiveDate = detail.inquiryEffectiveDate
          ? moment(detail.inquiryEffectiveDate).format('YYYY-MM-DD')
          : null
        detail.deliveryDate = detail.deliveryDate
          ? moment(detail.deliveryDate).format('YYYY-MM-DD')
          : null
        detail.stylePicture = detail.stylePicture.map(item => ({
          url: item
        }))
        detail.materialTypeList = detail.materialTypeDictionaryList
        detail.productTypeList = detail.productTypeDictionaryList
        detail.processTypeList = detail.processTypeDictionaryList

        delete detail.id
        setParams(detail)
        // console.log('🚀 ~ file: index.tsx ~ line 75 ~ ; ~ detail', detail)
      }
    })()
  }, [])

  const goBack = () => {
    Taro.navigateBack()
  }

  const handleChange = (value, field) => {
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

  const onSubmit = async () => {
    const nParams = cloneDeep(params)
    // contactPerson 联系人
    // contactPersonMobile 手机号
    // isContactPublic 联系方式公开
    // isEnterpriseInfoPublic 企业信息公开
    // name 订单标题
    // goodsNum 发单量
    // goodsPrice 目标单价
    // categoryCodes 产品品类
    // materialTypeList 面料类型
    // processTypeList 加工类型
    // productTypeList 生产方式
    // regionalIdList 地区要求
    // deliveryDate 交货日期
    // effectiveLocation 车位要求
    // payDetails 付款方式
    // inquiryEffectiveDate 订单有效期
    // goodsRemark 备注说明
    // stylePicture 款图
    if (isNil(nParams['contactPerson'])) {
      setIsOpened(true)
      setErrText('请输入联系人')
      return
    }
    if (
      isNil(nParams['contactPersonMobile']) ||
      !phoneReg.test(nParams['contactPersonMobile'])
    ) {
      setIsOpened(true)
      setErrText('请输入正确的手机号')
      return
    }
    if (isNil(nParams['isContactPublic'])) {
      setIsOpened(true)
      setErrText('请选择联系信息公开方式')
      return
    }
    if (isNil(nParams['isEnterpriseInfoPublic'])) {
      setIsOpened(true)
      setErrText('请选择联系信息公开方式')
      return
    }
    if (isNil(nParams['name'])) {
      setIsOpened(true)
      setErrText('请输入订单标题')
      return
    }
    if (isNil(nParams['goodsNum'])) {
      setIsOpened(true)
      setErrText('请输入发单量')
      return
    }
    if (isNil(nParams['categoryCodes'])) {
      setIsOpened(true)
      setErrText('请选择产品品类')
      return
    }
    if (isNil(nParams['materialTypeList'])) {
      setIsOpened(true)
      setErrText('请选择面料类型')
      return
    }
    if (isNil(nParams['processTypeList'])) {
      setIsOpened(true)
      setErrText('请选择加工类型')
      return
    }
    if (isNil(nParams['productTypeList'])) {
      setIsOpened(true)
      setErrText('请选择生产方式')
      return
    }
    if (isNil(nParams['regionalIdList'])) {
      setIsOpened(true)
      setErrText('请选择地区要求')
      return
    }
    if (isNil(nParams['deliveryDate'])) {
      setIsOpened(true)
      setErrText('请选择交货日期')
      return
    }
    if (isNil(nParams['effectiveLocation'])) {
      setIsOpened(true)
      setErrText('请选择车位要求')
      return
    }
    if (isNil(nParams['payDetails'])) {
      setIsOpened(true)
      setErrText('请输入付款方式')
      return
    }
    if (isNil(nParams['inquiryEffectiveDate'])) {
      setIsOpened(true)
      setErrText('请选择订单有效期')
      return
    }

    nParams.goodsNum = nParams.goodsNum.join('')
    nParams.effectiveLocation = nParams.effectiveLocation.join('')
    nParams.stylePicture = nParams.stylePicture.map(item => item.url)
    nParams.status = 1

    nParams.inquiryEffectiveDate = nParams.inquiryEffectiveDate
      ? moment(nParams.inquiryEffectiveDate).valueOf()
      : null
    nParams.deliveryDate = nParams.deliveryDate
      ? moment(nParams.deliveryDate).valueOf()
      : null
    await publishOrder(nParams)
    goBack()
  }

  const toastClose = () => {
    setIsOpened(false)
  }

  const onReset = () => {}

  const productModalShow = () => {
    setProductFlag(f => !f)
  }

  const materialModalShow = () => {
    setMaterialFlag(f => !f)
  }

  const processTypeModalShow = () => {
    setProcessTypeFlag(f => !f)
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

  const areaModalShow = () => {
    setAreaFlag(f => !f)
  }

  const getProducts = useMemo(() => {
    const target = params['categoryCodes'] || []
    const matches = target.reduce((prev, item, idx) => {
      const product = matchTreeData(productCategoryList, item, 'code') || {}
      return (
        prev + (product.name ? `${idx !== 0 ? '、' : ''}${product.name}` : '')
      )
    }, '')

    return matches
  }, [params.categoryCodes])

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
            name="contactPerson"
            title="联系人"
            type="text"
            placeholder="请填写真实姓名"
            value={params['contactPerson']}
            onChange={event => handleChange(event, 'contactPerson')}
          />

          <AtInput
            required
            className={styles.cusInput}
            name="contactPersonMobile"
            border={false}
            title="手机号"
            type="phone"
            placeholder="请填写手机号"
            value={params['contactPersonMobile']}
            onChange={event => handleChange(event, 'contactPersonMobile')}
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

          <View onClick={areaModalShow} className={styles.cusFormItem}>
            <Text className={classNames(styles.cusLabel, styles.required)}>
              地区要求
            </Text>
            <Text
              className={classNames(
                styles.cusValue,
                isArray(params['regionalIdList']) &&
                  params['regionalIdList'].length
                  ? ''
                  : styles.cusPlaceholder
              )}
            >
              {isArray(params['regionalIdList']) &&
              params['regionalIdList'].length
                ? params['regionalIdList'].map((item, idx) => {
                    const target = findTarget(item, district, 'value') || {}
                    console.log(
                      "🚀 ~ file: index.tsx ~ line 530 ~ ?params['regionalIdList'].map ~ target",
                      target
                    )
                    return idx === params['regionalIdList'].length - 1
                      ? target.label
                      : `${target.label}、`
                  })
                : '请选择地区'}
            </Text>
          </View>

          <Picker
            mode="date"
            onChange={event => handleChange(event.detail.value, 'deliveryDate')}
          >
            <AtList>
              <AtListItem
                title="交货日期"
                className={classNames(
                  styles.timeListItem,
                  !params['deliveryDate']
                    ? styles.placeholder
                    : styles.selectDate
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
                  !params['inquiryEffectiveDate']
                    ? styles.placeholder
                    : styles.selectDate
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
          <AtButton onClick={onSubmit} type={'primary'} className={styles.btn}>
            立即发布
          </AtButton>
        </View>
      </AtForm>

      <AtToast
        isOpened={isOpened}
        onClose={toastClose}
        text={errText}
        duration={1000}
      ></AtToast>

      {productFlag && (
        <CusProductModal
          keyName={'code'}
          visible={productFlag}
          onCancel={productModalShow}
          callback={event => handleChange(event, 'categoryCodes')}
          value={params['categoryCodes'] || []}
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
      {/* {clothesGradeFlag && (
        <CusGradeModal
          visible={clothesGradeFlag}
          onCancel={clothesGradeModalShow}
          callback={event => handleChange(event, 'clothesGrade')}
          value={params['clothesGrade'] || []}
        />
      )} */}
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

      {areaFlag && (
        <AreaModal
          visible={areaFlag}
          onCancel={areaModalShow}
          title={'地区要求'}
          callback={event => handleChange(event, 'regionalIdList')}
          value={params['regionalIdList'] || []}
        />
      )}
    </View>
  )
}

export default observer(FactoryEntry)
