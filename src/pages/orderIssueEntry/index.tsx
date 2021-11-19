import { View, Image, Picker, Text } from '@tarojs/components'
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
import { useState, useMemo, useEffect } from 'react'
import { cloneDeep, isArray } from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'
import {
  CusProductModal,
  CusModal,
  ImagePicker,
  AreaPicker
} from '@/components'
import { matchTreeData, phoneReg } from '@/utils/tool'
import { upload } from '@/utils/upload'

const host =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/images'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/back.png'

const OrderIssueEntry = () => {
  const { top } = Taro.getMenuButtonBoundingClientRect()
  const router = useRouter()
  const {
    params: { modify }
  } = router

  const { commonStore, factoryStore, refreshStore } = useStores()
  const { dealRefresh } = refreshStore
  const {
    // getDistrict,
    productCategoryList,
    dictionary
  } = commonStore
  const { purchaserRole } = dictionary
  const { getEnterpriseInfo, enterpriseInfoSave, getEnterprisePhotos } =
    factoryStore

  const [params, setParams] = useState<any>({})
  const [errText, setErrText] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [rolesFlag, setRolesFlag] = useState<boolean>(false)
  const [oldData, setOldData] = useState<any>({})

  useEffect(() => {
    ;(async () => {
      const enterpriseInfo = await getEnterpriseInfo()
      if (enterpriseInfo && enterpriseInfo.purchaserId) {
        const photos = await getEnterprisePhotos({
          purchaserId: enterpriseInfo.purchaserId
        })
        const photoKeys = Reflect.ownKeys(photos)

        photoKeys.forEach(item => {
          if (item !== 'purchaserId') {
            enterpriseInfo[item] = photos[item] || []
            enterpriseInfo[item] = enterpriseInfo[item].map(i => {
              i.url = i.thumbUrl
              return i
            })
          }
        })
      }
      enterpriseInfo['establishedTime'] = enterpriseInfo['establishedTime']
        ? moment(enterpriseInfo['establishedTime']).format('YYYY-MM-DD')
        : null

      setOldData(enterpriseInfo)
      setParams(enterpriseInfo)
    })()
  }, [])

  const photoConfigs2 = [
    {
      label: '宣传照片',
      field: 'publicityImagesList',
      count: 3
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
      url: imgUrl,
      thumbUrl: imgUrl,
      name: imgUrl.replace(host, '')
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
      setErrText('请输入企业名称')
      return
    }

    if (!params['establishedTime']) {
      setIsOpened(true)
      setErrText('请选择成立时间')
      return
    }

    if (!params['roleCodes'] || !params['roleCodes'].length) {
      setIsOpened(true)
      setErrText('请选择企业角色')
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

    if (!params['yearOrderTransaction']) {
      setIsOpened(true)
      setErrText('请输入年发单量')
      return
    }

    if (!params['enterpriseDesc']) {
      setIsOpened(true)
      setErrText('请输入企业简介')
      return
    }
    params.enterpriseType = 1
    params.establishedTime = params.establishedTime
      ? moment(params.establishedTime).valueOf()
      : null

    let flag = false
    if (oldData.enterpriseId) {
      if (oldData.enterpriseName !== params['enterpriseName']) {
        flag = true
      }
      if (oldData.enterpriseType !== params['enterpriseType']) {
        flag = true
      }
      if (
        +oldData.provinceId !== +params['provinceId'] ||
        +oldData.cityId !== +params['cityId'] ||
        +oldData.districtId !== +params['districtId']
      ) {
        flag = true
      }
      if (oldData.address !== params['address']) {
        flag = true
      }
      if (
        oldData.latitude !== params['latitude'] ||
        oldData.longitude !== params['longitude']
      ) {
        flag = true
      }
    } else {
      flag = true
    }
    if (params['logoImage'] && params['logoImage'].length) {
      params.enterpriseLogoUrl = params['logoImage'][0]['url']
    }
    params['isInfoApproval'] = flag ? 1 : 0
    params['purchaserEnterpriseImagesVO'] = {
      logoImage: params['logoImage'],
      productImagesList: params['productImagesList'],
      publicityImagesList: params['publicityImagesList']
    }
    await enterpriseInfoSave(params)
    await dealRefresh()
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  const onReset = () => {}

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
      const product = matchTreeData(productCategoryList, item, 'code') || {}
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
          <View>{modify ? '企业管理' : '发单商入驻'}</View>
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
                  !params['establishedTime']
                    ? styles.placeholder
                    : styles.selectText
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
                files={params['logoImage'] || []}
                callback={event => imgsChange(event, 'logoImage')}
                count={1}
                showAddBtn={
                  params['logoImage'] && params['logoImage'].length >= 1
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
                  files={params[item.field] || []}
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
              files={params['productImagesList'] || []}
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

          <AtButton onClick={onSubmit} type={'primary'} className={styles.btn}>
            立即入驻
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
          visible={productFlag}
          onCancel={productModalShow}
          callback={event => handleChange(event, 'mainCategoriesList')}
          value={params['mainCategoriesList'] || []}
          keyName={'code'}
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

export default observer(OrderIssueEntry)
