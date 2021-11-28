import { action, makeAutoObservable } from 'mobx'
import HTTP from '@/service/http'
import Taro from '@tarojs/taro'

interface Response {
  code: number
  data: any
  msg: string
  success: boolean
}

export default class FactoryStore {
  constructor() {
    makeAutoObservable(this) // 指定要暴露出去的属性
  }

  // 工厂入驻
  @action factoryEntry = async () => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/factory/enterprise/enterprise-info-save`
      )

      if (res) {
        return res.data || []
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // '/api/factory/enterprise/get-enterprise-info'
  // 获取企业信息
  @action getEnterpriseInfo = async () => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/enterprise/get-enterprise-info`
      )
      Taro.hideLoading()
      if (res) {
        return res.data || []
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // /api/factory/enterprise/applets-enterprise-info-save
  // 企业入驻
  @action enterpriseInfoSave = async params => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/factory/enterprise/applets-enterprise-info-save`,
        params
      )
      Taro.hideLoading()
      return res.code
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg,
        icon: 'none',
        duration: 1000
      })
      console.log(e)
    }
  }

  // /api/factory/info/get-applet-factory-details
  // 加工厂详情
  @action factoryDetail = async enterpriseId => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/info/get-applet-factory-details`,
        { enterpriseId }
      )
      Taro.hideLoading()
      if (res.code === 200) {
        const { data } = res
        return data
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // /api/factory/purchaser-info/get-applet-purchaser-details
  // 发单商详情
  @action orderIssuerDetail = async enterpriseId => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/purchaser-info/get-applet-purchaser-details`,
        { enterpriseId }
      )
      Taro.hideLoading()
      if (res.code === 200) {
        const { data } = res
        return data
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // /api/oms/inquiry-purchase/get-applets
  // 需求单详情
  @action orderDetail = async id => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-purchase/get-applets`,
        { id }
      )
      Taro.hideLoading()
      if (res.code === 200) {
        const { data } = res
        return data
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  //再来一单回显
  @action orderDetailOrder = async id => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-purchase/get-applets-another-order`,
        { id }
      )
      Taro.hideLoading()
      if (res.code === 200) {
        const { data } = res
        return data
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // /api/oms/inquiry-purchase/inquiry-list.
  // 查询某个发单商的其他订单 POST
  @action getOtherOrder = async enterpriseId => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/list-inquiry-search-applet`,
        { enterpriseId }
      )

      if (res.code === 200) {
        const { data } = res
        return data
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // /api/oms/inquiry-purchase/check-whether-send-inquiry
  // 检查企业是否发布过订单
  @action checkOrderIssuer = async enterpriseId => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-purchase/check-whether-send-inquiry`,
        { enterpriseId }
      )

      if (res.code === 200) {
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // /api/factory/enterprise-contacts/get-by-enterprise-id
  // 获取指定企业联系人信息
  @action getFactoryPhoneInfo = async enterpriseId => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/enterprise-contacts/get-by-enterprise-id`,
        { enterpriseId }
      )

      if (res.code === 200) {
      }
      return res.data
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg,
        icon: 'none',
        duration: 1000
      })
      console.log(e)
    }
  }

  // /api/oms/inquiry-purchase/check-whether-application-inquiry
  // 检查加工厂是否申请接单 GET
  @action checkFactoryGetorder = async inquiryId => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-purchase/check-whether-application-inquiry`,
        { inquiryId }
      )

      if (res.code === 200) {
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // /api/oms/inquiry-purchase/save.
  // 更新或新增需求单 post
  @action publishOrder = async params => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/save`,
        params
      )
      Taro.hideLoading()
      return res
    } catch (err) {
      Taro.hideLoading()
      Taro.showToast({
        title: err.msg as string,
        icon: 'none',
        duration: 1000
      })
      return err
    }
  }

  // /api/factory/purchaser-info/get-purchaser-images
  // 获取发单商企业照片
  @action getEnterprisePhotos = async purchaserId => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/purchaser-info/get-purchaser-images`,
        { purchaserId }
      )

      if (res.code === 200) {
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // /api/factory/info/get-factory-images-info
  // 获取加工厂企业照片
  @action getFactoryPhotos = async factoryId => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/info/get-factory-images-info`,
        { factoryId }
      )

      if (res.code === 200) {
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const factoryStore = new FactoryStore()
