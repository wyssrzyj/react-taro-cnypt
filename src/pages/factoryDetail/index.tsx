import styles from './index.module.less'
import { View, Button, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { EnterpriseCard, Line, Navbar, PhoneCard } from '@/components'
import Title from '@/components/title'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const FactoryDetail = () => {
  const router = useRouter()
  const { params } = router
  console.log('🚀 ~ file: index.tsx ~ line 13 ~ FactoryDetail ~ params', params)

  const goBack = () => {
    Taro.navigateBack()
  }

  const data = {
    title: '广州市神易服饰',
    moq: '100',
    address:
      '石榴岗路3号5单元asd3333333333333333333333333333333333333333333333333333',
    enterpriseDesc:
      '企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介',
    area: '广东省广州市海珠区',
    imgs: [
      {
        url: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_order.png'
      },
      {
        url: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/order_factory.png'
      },
      {
        url: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/factory_factory.png'
      },
      {
        url: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_factory_in.png'
      },
      {
        url: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/index/un_order.png'
      }
    ],
    mainCategoriesList: ['打底裤', '皮裤', '牛仔裤'],
    productTypeValues: ['打底裤', '皮裤', '牛仔裤'],
    materialTypeValues: ['打底裤', '皮裤', '牛仔裤'],
    productGradeValues: ['打底裤', '皮裤', '牛仔裤'],
    factoryProcessTypeList: ['打底裤', '皮裤', '牛仔裤']
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
      field: 'factoryProcessTypeList'
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

  return (
    <View className={styles.container}>
      <Navbar>
        <View className={styles.navbar}>
          <Image
            src={BACK_ICON}
            className={styles.back}
            onClick={goBack}
          ></Image>
          <View className={styles.navTitle}>工厂详情</View>
        </View>
      </Navbar>

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
                  {item.field}
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
                {data[item.field].join('、')}
              </View>
            </View>
          )
        })}

        <View className={styles.contact}>
          <Title title={'联系方式'}></Title>
          <PhoneCard></PhoneCard>
        </View>
      </View>

      <View className={styles.phoneBtnBox}>
        <Button type={'primary'} className={styles.phoneBtn}>
          电话联系
        </Button>
      </View>
    </View>
  )
}

export default FactoryDetail
