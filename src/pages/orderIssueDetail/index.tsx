import styles from './index.module.less'
import { View, Button, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Line, Navbar, OrderIssueCard } from '@/components'
// import Navbar from './navBar/index'
import Title from '@/components/title'
import Card from './components/card'
import { useStores } from '@/store/mobx'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { isArray, isEmpty } from 'lodash'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const FactoryDetail = () => {
  const userInfomation = Taro.getStorageSync('userInfo')
    ? JSON.parse(Taro.getStorageSync('userInfo'))
    : {}

  const currentUser = Taro.getStorageSync('currentUser')
    ? JSON.parse(Taro.getStorageSync('currentUser'))
    : {}

  const router = useRouter()
  const { params } = router
  const { id } = params

  const { factoryStore } = useStores()
  const { orderIssuerDetail, getOtherOrder } = factoryStore

  const [data, setData] = useState({})
  const [dataSource, setDataSource] = useState([]) // 其他订单

  useEffect(() => {
    ;(async () => {
      const res = await getOtherOrder(id)
      let { records } = res
      records = records || []
      setDataSource(records)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const orderIssuer = await orderIssuerDetail(id)
      orderIssuer.establishedTime = orderIssuer.establishedTime
        ? moment(orderIssuer.establishedTime).format('YYYY')
        : null

      const { purchaserEnterpriseImagesVO = {} } = orderIssuer

      const keys = Reflect.ownKeys(purchaserEnterpriseImagesVO)
      keys.forEach(item => {
        purchaserEnterpriseImagesVO[item] =
          purchaserEnterpriseImagesVO[item] || []
      })
      const imgKeys = ['publicityImagesList', 'productImagesList']

      orderIssuer.imgs = imgKeys.reduce((prev: any[], item) => {
        prev.push(...purchaserEnterpriseImagesVO[item])
        return prev
      }, [])

      setData(orderIssuer)
    })()
  }, [id])

  const goBack = () => {
    Taro.navigateBack()
  }

  const factorySurvey = [
    {
      label: '成立时间',
      field: 'establishedTime',
      addon: '年'
    },
    {
      label: '企业角色',
      field: 'purchaserRole',
      addon: ''
    },
    {
      label: '年发单量',
      field: 'yearOrderTransaction',
      addon: '万件'
    },
    {
      label: '订单品牌',
      field: 'orderBrand',
      addon: ''
    },
    {
      label: '主营类别',
      field: 'mainCategoriesList',
      addon: ''
    },
    {
      label: '类别说明',
      field: 'mainProductCategoriesDesc',
      addon: ''
    }
  ]

  const phoneCall = () => {
    if (isEmpty(currentUser)) {
      Taro.redirectTo({
        url: '/pages/login/index'
      })
    }
    Taro.makePhoneCall({
      phoneNumber: data['mobilePhone'] //仅为示例，并非真实的电话号码
    })
  }

  return (
    <View className={styles.container}>
      <Navbar>
        <View className={styles.navbars}>
          <Image
            src={BACK_ICON}
            className={styles.backs}
            onClick={goBack}
          ></Image>
          <View className={styles.navTitles}>企业主页</View>
        </View>
      </Navbar>

      <OrderIssueCard data={data}></OrderIssueCard>
      <Line></Line>
      <View className={styles.content}>
        <View className={styles.part}>
          <Title title={'企业概况'}></Title>
          <View className={styles.partContent}>
            {factorySurvey.map(item => (
              <View key={item.field} className={styles.item}>
                <View className={styles.itemTitle}>{item.label}</View>
                <View className={styles.itemValue}>
                  {console.log(data[item.field])}
                  {isArray(data[item.field])
                    ? data[item.field].join('、')
                    : data[item.field]}
                  {item.addon}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.part}>
          <Title title={'TA的订单'}></Title>
          <View className={styles.cards}>
            {dataSource.map((data, idx) => {
              return <Card key={idx} data={data}></Card>
            })}
          </View>
        </View>
      </View>

      {+userInfomation.enterpriseType !== 1 && (
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
