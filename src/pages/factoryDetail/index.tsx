import styles from './index.module.less'
import { View, Button, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { EnterpriseCard, Line, Navbar, PhoneCard } from '@/components'
import Title from '@/components/title'
import { useEffect, useState } from 'react'
import { useStores } from '@/store/mobx'
import { cloneDeep, isArray } from 'lodash'
import moment from 'moment'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const FactoryDetail = () => {
  const router = useRouter()
  const { params } = router
  const { id } = params

  const { factoryStore } = useStores()
  const { factoryDetail } = factoryStore
  const userInfomation = Taro.getStorageSync('userInfo')
    ? JSON.parse(Taro.getStorageSync('userInfo'))
    : {}

  const [data, setData] = useState({})

  useEffect(() => {
    ;(async () => {
      const factory = await factoryDetail(id)
      const { supplierEnterprisePhotoVO = {} } = factory

      const keys = Reflect.ownKeys(supplierEnterprisePhotoVO)
      keys.forEach(item => {
        supplierEnterprisePhotoVO[item] = supplierEnterprisePhotoVO[item] || []
      })
      const imgKeys = [
        'outsizeImageList',
        'workshopImageList',
        'spreaderImage',
        'sewingMachineImage',
        'overlockMachineImage',
        'hangImage',
        'cuttingBedImage',
        'clothInspectingMachineImage',
        'flatSeamingMachineImage'
      ]

      factory.imgs = imgKeys.reduce((prev: any[], item) => {
        prev.push(...supplierEnterprisePhotoVO[item])
        return prev
      }, [])

      factory.establishedTime = factory.establishedTime
        ? moment(factory.establishedTime).format('YYYY')
        : null

      setData(factory)
    })()
  }, [id])

  const phoneChange = (phone, name) => {
    const nData = cloneDeep(data)
    nData['mobilePhone'] = phone
    nData['contactsName'] = name
    setData(nData)
  }

  const goBack = () => {
    Taro.navigateBack()
  }

  const configs = [
    {
      label: '主营类别',
      field: 'mainCategoriesList'
    },
    {
      label: '生产方式',
      field: 'productTypeValues'
    },
    {
      label: '面料类型',
      field: 'materialTypeValues'
    },
    {
      label: '产品档次',
      field: 'productGradeValues'
    },
    {
      label: '加工类型',
      field: 'processTypeList'
    }
  ]

  const factorySurvey = [
    {
      label: '成立时间',
      field: 'establishedTime',
      addon: '年'
    },
    {
      label: '厂房面积',
      field: 'factoryArea',
      addon: '平米'
    },
    {
      label: '有效车位',
      field: 'effectiveLocation',
      addon: '人'
    },
    {
      label: '员工总数',
      field: 'staffNumber',
      addon: '人'
    },
    {
      label: '生产线',
      field: 'productLineNum',
      addon: '条'
    }
  ]

  const phoneCall = () => {
    Taro.makePhoneCall({
      phoneNumber: data['mobilePhone'] //仅为示例，并非真实的电话号码
    })
  }

  return (
    <View className={styles.container}>
      <EnterpriseCard data={data}></EnterpriseCard>
      <Line></Line>
      <View className={styles.content}>
        <View className={styles.part}>
          <Title title={'工厂概况'}></Title>
          <View className={styles.partContent}>
            {factorySurvey.map(item => (
              <View key={item.field} className={styles.item}>
                <View className={styles.itemTitle}>{item.label}</View>
                <View className={styles.itemValue}>
                  {data[item.field]}
                  {item.addon}
                </View>
              </View>
            ))}
          </View>
        </View>

        {configs.map(item => {
          return (
            <View className={styles.part}>
              <Title title={item.label}></Title>
              <View className={styles.partContent}>
                {isArray(data[item.field]) && data[item.field].length
                  ? data[item.field].join('、')
                  : '暂无'}
              </View>
            </View>
          )
        })}

        {+userInfomation.enterpriseType !== 0 && (
          <View className={styles.contact}>
            <Title title={'联系方式'}></Title>
            <PhoneCard
              data={data}
              callback={phoneChange}
              person={'contactsName'}
              phone={'mobilePhone'}
              type={'factory'}
              personId={'enterpriseId'}
              id={id}
            ></PhoneCard>
          </View>
        )}
      </View>

      {+userInfomation.enterpriseType !== 0 && (
        <View className={styles.phoneBtnBox}>
          <Button
            type={'primary'}
            className={styles.phoneBtn}
            onClick={phoneCall}
          >
            电话联系
          </Button>
        </View>
      )}
    </View>
  )
}

export default FactoryDetail
