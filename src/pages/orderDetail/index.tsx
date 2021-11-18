import styles from './index.module.less'
import { View, Button, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Line, Navbar, OrderCard, PhoneCard } from '@/components'
import Title from '@/components/title'
import { isArray, isEmpty } from 'lodash'
import { useStores } from '@/store/mobx'
import { useEffect, useState } from 'react'
import moment from 'moment'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const OrderDetail = () => {
  const router = useRouter()
  const { params } = router
  const { id } = params

  const userInfomation = Taro.getStorageSync('userInfo')
    ? JSON.parse(Taro.getStorageSync('userInfo'))
    : {}
  const currentUser = Taro.getStorageSync('currentUser')
    ? JSON.parse(Taro.getStorageSync('currentUser'))
    : {}

  const { factoryStore } = useStores()
  const { orderDetail } = factoryStore

  const [data, setData] = useState({})

  useEffect(() => {
    ;(async () => {
      const orderIssuer = await orderDetail(id)
      const keys = [
        'categoryNames',
        'regionalNameList',
        'materialTypeList',
        'processTypeList',
        'productTypeList'
      ]
      keys.forEach(item => {
        orderIssuer[item] = isArray(orderIssuer[item])
          ? orderIssuer[item].join('、')
          : ''
      })

      orderIssuer.inquiryEffectiveDate = orderIssuer.inquiryEffectiveDate
        ? moment(orderIssuer.inquiryEffectiveDate).format('YYYY')
        : null
      orderIssuer.imgs = orderIssuer.stylePicture
      setData(orderIssuer)
    })()
  }, [id])

  const goBack = () => {
    Taro.navigateBack()
  }

  const configs = [
    {
      label: '生产方式',
      field: 'productTypeList'
    },
    {
      label: '地区要求',
      field: 'regionalNameList'
    },
    {
      label: '车位要求',
      field: 'effectiveLocation'
    }
  ]

  const factorySurvey = [
    {
      label: '订单标题',
      field: 'name'
    },
    {
      label: '发单量',
      field: 'goodsNum'
    },
    {
      label: '目标单价',
      field: 'goodsPrice'
    },
    {
      label: '产品品类',
      field: 'categoryCodes'
    },
    {
      label: '面料类型',
      field: 'materialTypeList'
    },
    {
      label: '加工类型',
      field: 'processTypeList'
    },
    {
      label: '交货日期',
      field: 'deliveryDate'
    },
    {
      label: '付款方式',
      field: 'payDetails'
    },
    {
      label: '有效期限',
      field: 'inquiryEffectiveDate'
    },
    {
      label: '备注说明',
      field: 'goodsRemark'
    }
  ]

  const phoneCall = () => {
    if (isEmpty(currentUser)) {
      Taro.redirectTo({
        url: '/pages/login/index'
      })
    } else {
      Taro.redirectTo({
        url: '/pages/personal/applicationReceipt/index?id=' + id
      })
    }
  }

  return (
    <View className={styles.container}>
      <Navbar>
        <View className={styles.navbar}>
          <Image
            src={BACK_ICON}
            className={styles.back}
            onClick={goBack}
          ></Image>
          <View className={styles.navTitle}>订单详情</View>
        </View>
      </Navbar>

      <OrderCard data={data}></OrderCard>
      <Line></Line>
      <View className={styles.content}>
        <View className={styles.part}>
          <Title title={'订单信息'}></Title>
          <View className={styles.partContent}>
            {factorySurvey.map(item => (
              <View key={item.field} className={styles.item}>
                <View className={styles.itemTitle}>{item.label}</View>
                <View className={styles.itemValue}>{data[item.field]}</View>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.part}>
          <Title title={'接单要求'}></Title>
          <View className={styles.partContent}>
            {configs.map(item => (
              <View key={item.field} className={styles.item}>
                <View className={styles.itemTitle}>{item.label}</View>
                <View className={styles.itemValue}>{data[item.field]}</View>
              </View>
            ))}
          </View>
        </View>

        {+userInfomation.enterpriseType !== 1 && (
          <View className={styles.contact}>
            <Title title={'联系方式'}></Title>
            <PhoneCard
              data={data}
              person={'contactPerson'}
              phone={'contactPersonMobile'}
              type={'order'}
              personId={'tenantId'}
              id={id}
            ></PhoneCard>
          </View>
        )}
      </View>

      {+userInfomation.enterpriseType !== 1 && (
        <View className={styles.phoneBtnBox}>
          <Button
            type={'primary'}
            className={styles.phoneBtn}
            onClick={phoneCall}
          >
            申请接单
          </Button>
        </View>
      )}
    </View>
  )
}

export default OrderDetail
