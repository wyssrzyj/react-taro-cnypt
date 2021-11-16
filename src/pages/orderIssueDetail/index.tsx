import styles from './index.module.less'
import { View, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Line, Navbar, OrderIssueCard } from '@/components'
import Title from '@/components/title'
import Card from './components/card'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const FactoryDetail = () => {
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
    factoryProcessTypeList: ['打底裤', '皮裤', '牛仔裤'],
    desc: 'asdfasd'
  }

  const factorySurvey = [
    {
      label: '成立时间',
      field: 'establishedTime',
      addon: '年'
    },
    {
      label: '企业角色',
      field: 'factoryArea',
      addon: '平米'
    },
    {
      label: '年发单量',
      field: 'effectiveLocation',
      addon: '人'
    },
    {
      label: '订单品牌',
      field: 'staffNumber',
      addon: '人'
    },
    {
      label: '主营类别',
      field: 'productLineNum',
      addon: '条'
    },
    {
      label: '类别说明',
      field: 'desc',
      addon: '条'
    }
  ]

  const dataSource = [
    {
      id: '1456127444943736833',
      name: '阿第三方',
      effectiveLocation: 10,
      goodsNum: '20,50',
      inquiryEffectiveDate: '2020-09-12',
      processTypeValues: ['1', '2', '0', '100'],
      factoryCategoryIds: [],
      inquiryDistrictIds: ['2', '20'],
      enterpriseArea: '天津,天津市,和平区',
      stylePicture:
        'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1635993714123-9__png.png'
    },
    {
      id: '1456197463747719170',
      name: '阿第三方',
      effectiveLocation: 10,
      goodsNum: '20,50',
      inquiryEffectiveDate: '2020-09-12',
      processTypeValues: ['1', '2', '0', '100'],
      factoryCategoryIds: [],
      inquiryDistrictIds: ['2', '20'],
      enterpriseArea: '天津,天津市,和平区',
      stylePicture:
        'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1635993714123-9__png.png'
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
          <View className={styles.navTitle}>企业主页</View>
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
                  {item.field}
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

      <View className={styles.phoneBtnBox}>
        <Button type={'primary'} className={styles.phoneBtn}>
          电话联系
        </Button>
      </View>
    </View>
  )
}

export default FactoryDetail
