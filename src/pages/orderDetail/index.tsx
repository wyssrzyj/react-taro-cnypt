import styles from './index.module.less'
import { View, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {
  EnterpriseCard,
  Line,
  Navbar,
  OrderCard,
  PhoneCard,
  TabBar
} from '@/components'
import Title from '@/components/title'
import { isArray } from 'lodash'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const FactoryDetail = () => {
  const goBack = () => {
    Taro.navigateBack()
  }

  const data = {
    title: '广州市神易服饰',
    goodsNum: '多件',
    enterpriseName: 'XXX服装进出口股份有限公司',
    address:
      '石榴岗路3号5单元asd3333333333333333333333333333333333333333333333333333',
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
    name: '沙河南城单 女装双面羊绒外套',
    goodsPrice: '暂无',
    categoryCodes: '女装-毛呢大衣',
    materialTypeList: '呢料',
    processTypeList: '清加工',
    deliveryDate: '2021-10-30',
    payDetails: '线下面议',
    inquiryEffectiveDate: '2021-10-30',
    goodsRemark: '暂无',
    productTypeList: '整件生产线；流水生产线',
    regionalIdList: '江苏省 嘉兴市',
    effectiveLocation: '50-100人'
  }

  const configs = [
    {
      label: '生产方式',
      field: 'productTypeList'
    },
    {
      label: '地区要求',
      field: 'regionalIdList'
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

        <View className={styles.contact}>
          <Title title={'联系方式'}></Title>
          <PhoneCard></PhoneCard>
        </View>
      </View>

      <View className={styles.phoneBtnBox}>
        <Button type={'primary'} className={styles.phoneBtn}>
          申请接单
        </Button>
      </View>
    </View>
  )
}

export default FactoryDetail
