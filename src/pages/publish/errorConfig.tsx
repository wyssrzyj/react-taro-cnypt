import { phoneReg } from '@/utils/tool'

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

export const errorConfigs = [
  {
    field: 'contactPerson',
    errorText: '请输入联系人'
  },
  {
    field: 'contactPersonMobile',
    errorText: '请输入正确的手机号',
    reg: phoneReg
  },
  {
    field: 'isContactPublic',
    errorText: '请选择联系信息公开方式'
  },
  {
    field: 'isEnterpriseInfoPublic',
    errorText: '请选择联系信息公开方式'
  },
  {
    field: 'name',
    errorText: '请输入订单标题'
  },
  {
    field: 'goodsNum',
    errorText: '请输入发单量'
  },
  {
    field: 'categoryCodes',
    errorText: '请选择产品品类'
  },
  {
    field: 'materialTypeList',
    errorText: '请选择面料类型'
  },
  {
    field: 'processTypeList',
    errorText: '请选择加工类型'
  },
  {
    field: 'productTypeList',
    errorText: '请选择生产方式'
  },
  {
    field: 'regionalIdList',
    errorText: '请选择地区要求'
  },
  {
    field: 'deliveryDate',
    errorText: '请选择交货日期'
  },
  {
    field: 'effectiveLocation',
    errorText: '请选择车位要求'
  },
  {
    field: 'payDetails',
    errorText: '请输入付款方式'
  },
  {
    field: 'inquiryEffectiveDate',
    errorText: '请选择订单有效期'
  }
]
