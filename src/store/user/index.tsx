import { observable, action, makeAutoObservable, runInAction } from 'mobx'
import HTTP from '@/service/http'
import Taro from '@tarojs/taro'

interface Response {
  code: number
  data: any
  msg: string
  success: boolean
}

interface User {
  factoryId: string | number
  enterpriseId: string | number
  purchaserId: string | number
  enterpriseType: string | number
  certificateApprovalStatus: string | number
  infoApprovalStatus: string | number
  factoryAuditStatus: string | number
}

export default class UserInterface {
  constructor() {
    makeAutoObservable(this) // 指定要暴露出去的属性
  }

  @observable currentUser: Partial<User> = {}
  @observable modi = '' //修改成功
  @observable quantityId = '' //申请接单的数量数据
  @observable feedbackInformations = [] //反馈信息回显
  @observable factory = {} //指定工厂的数据

  // 指定工厂的数据
  @action stateFactory = async params => {
    try {
      runInAction(() => {
        this.factory = params
      })
    } catch (e) {}
  }
  // 申请接单的数量数据
  @action applicationReceiptQuantity = async params => {
    try {
      runInAction(() => {
        this.quantityId = params
      })
    } catch (e) {}
  }

  // 反馈信息回显
  @action feedbackInformationEcho = async params => {
    try {
      runInAction(() => {
        this.feedbackInformations = params
      })
    } catch (e) {}
  }

  // 账号安全 修改手机号.
  @action modifyMobilePhoneNumber = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/user/update-user-mobile-phone',
        params
      )
      runInAction(() => {
        this.modi = '0'
      })
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (res.code === 200) {
        return true
      }
      return false
    } catch (e) {
      runInAction(() => {
        this.modi = '1'
      })
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
    }
  }

  // 获取用户提交申请的状态
  @action getApprovalResult = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/enterprise/get-enterprise-info-approval-result`,
        params
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 查询单个资质认证
  @action querySingleQualification = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/enterprise-qualification-certificate/get`,
        params
      )
      if (res.code !== 200) {
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 企业证件审批结果
  @action enterpriseCertificateApprovalResults = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/enterprise/get-enterprise-certificate-approval-result`,
        params
      )
      if (res.code !== 200) {
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 账号安全 原密码修改密码
  @action changePassword = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/user/update-password',
        params
      )
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (res.code === 200) {
        return true
      }
      return false
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (e.code === 200) {
        return true
      }
      return false
    }
  }

  // 申请列表数据展示
  @action listData = async params => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/oms/inquiry-purchase/inquiry-application-list',
        params
      )
      if (res.code === 200) {
        Taro.hideLoading()
        return res.data
      }

      return res.data
    } catch (e) {
      if (e.code === 200) {
        Taro.hideLoading()
        return e
      }

      return e
    }
  }

  // 申请列表数据展示
  @action sendRequisition = async params => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/oms/inquiry-quote/point-to-send',
        params
      )
      if (res.code === 200) {
        Taro.hideLoading()
        return res.data
      }

      return res.data
    } catch (e) {
      if (e.code === 200) {
        Taro.hideLoading()
        return e
      }

      return e
    }
  }

  @action changeUserInfo = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/user/saveBasicUserInfo',
        params
      )
      if (res.code === 200) {
        return res
      }
    } catch (e) {
      return e
    }
  }
  // 企业证件提交
  @action enterpriseCertificateSubmission = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/factory/enterprise/submit-enterprise-credential',
        params
      )
      if (res.code === 200) {
        return res
      }
    } catch (e) {
      return e
    }
  }
  // 保存更新
  @action saveUpdate = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/factory/enterprise-qualification-certificate/save',
        params
      )
      if (res.code === 200) {
        return res
      }
    } catch (e) {
      return e
    }
  }

  // 判断是否超过发单商最大订单
  @action orderQuantity = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/oms/inquiry-quote/judge-goods-num',
        params
      )
      Taro.hideLoading()

      if (res.code === 200) {
        return res
      }
      return res
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (e.code === 200) {
        return e
      }
      return e
    }
  }

  // 供应商主动申请需求单  formti提交
  @action submitRequisition = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-quote/active-application-inquiry`,
        params
      )
      if (res.code === 200) {
        return res
      }
      return res
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (e.code === 200) {
        return e
      }
      return e
    }
  }

  // 小程序供应商主动申请需求单
  @action submitApplication = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-quote/active-application-inquiry-applet`,
        params
      )

      return res
    } catch (e) {
      Taro.hideLoading()

      return e
    }
  }

  // 获取后台资质状态审批列表
  @action approvalListOfBackgroundQualificationStatus = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/factory/enterprise-qualification-certificate/list`,
        params
      )

      return res.data
    } catch (e) {
      Taro.hideLoading()

      return e
    }
  }

  // 订单管理数据
  @action orderListData = async params => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/oms/inquiry-purchase/inquiry-list',
        params
      )
      Taro.hideLoading()
      if (res.code === 200) {
        return res.data
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: res.msg as string,
          icon: 'none',
          duration: 1500
        })
      }
      return res.data
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (e.code === 200) {
        return e
      }
      return e
    }
  }

  // 订单管理数据
  @action queryFactoryName = async params => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/factory/info/search-factory-name',
        params
      )
      Taro.hideLoading()
      if (res.code === 200) {
        return res.data
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: res.msg as string,
          icon: 'none',
          duration: 1500
        })
      }
      return res.data
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (e.code === 200) {
        return e
      }
      return e
    }
  }
  // 供应商需求单查询
  @action supplierGetOrders = async params => {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/oms/inquiry-supplier/list',
        params
      )

      if (res.code === 200) {
        Taro.hideLoading()
        return res.data
      }

      return res.data
    } catch (e) {
      if (e.code === 200) {
        Taro.hideLoading()
        return e
      }

      return e
    }
  }

  // 用户登出.
  @action signOut = async () => {
    try {
      const res: Partial<Response> = await HTTP.post('/api/user/account/logout')
      if (res.code === 200) {
        Taro.setStorage({
          key: 'token',
          data: null
        })
        Taro.setStorage({
          key: 'refresh',
          data: null
        })
        Taro.setStorage({
          key: 'currentUser',
          data: null
        })
        Taro.setStorage({
          key: 'userInfo',
          data: null
        })
        return true
      }
      return false
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (e.code === 200) {
        return true
      }
      return false
    }
  }
  // 删除发单商需求单记录
  @action deleteIssuer = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-purchase/delete-purchaser-record`,
        params
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {}
  }

  // 获取企业证件信息
  @action obtainEnterpriseCertificateInformation = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/enterprise/get-enterprise-credential`,
        params
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res.data
    } catch (e) {}
  }

  //排序获取地区信息树
  @action regionalSorting = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/district/list-tree`
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 加工厂接单管理订单数量
  @action processingOrderQuantity = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-supplier/order-management-supplier-total`
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 检查加工厂是否申请接单
  @action applyForReceipt = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-purchase/check-whether-application-inquiry`,
        params
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 发单商接单管理订单数量
  @action IssuerOrderQuantity = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-purchase/order-management-purchase-total`
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {
      return e
    }
  }
  // 发单商我的订单数量
  @action issuerMyOrderQuantity = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-purchase/my-order-purchase-total`
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 加工厂 订单管理 删除记录
  @action factoryDelOrder = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-supplier/delete-inquiry-record`,
        params
      )
      const { msg = '' } = res
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {}
  }

  // 接单管理反馈信息
  @action feedbackInformation = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/oms/inquiry-quote/get`,
        params
      )
      const { msg = '' } = res

      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res
    } catch (e) {}
  }
  // 取消合作
  @action cancelCooperation = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/cancel-cooperation`,
        params
      )
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      return e
    }
  }

  // 确认合作

  @action confirmCooperation = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/confirm-cooperation`,
        params
      )
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      return e
    }
  }

  //拒绝接单
  @action rejectSubmission = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-quote/refuse-take-inquiry`,
        params
      )
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      return e
    }
  }
  // 谢绝

  @action declineRequisition = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/decline-inquiry-application`,
        params
      )
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      return e
    }
  }
  //  获取表单数据 可接订单数 单个接单详情查询
  @action applicationReceipt = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        '/api/oms/inquiry-quote/get',
        params
      )
      return res.data
    } catch (e) {}
  }

  @action userInfo = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        '/api/factory/enterprise/get-login-account-enterprise-factory-info'
      )
      const { data = {}, msg = '' } = res

      if (data) {
        runInAction(() => {
          this.currentUser = data
        })
        Taro.setStorage({
          key: 'userInfo',
          data: JSON.stringify(data)
        })
      }
      if (res.code !== 200) {
        Taro.atMessage({
          message: msg,
          type: 'error'
        })
      }
      return res.data
    } catch (e) {}
  }
  data

  // 验证码校验
  @action checkVerifyCode = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/sms/verification-code`,
        params
      )

      return res.data
    } catch (e) {}
  }

  // 用户信息
  @action userInformation = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/user/get-account-info`,
        params
      )

      return res.data
    } catch (e) {}
  }
  // 删除需求单
  @action deleteDemandDoc = async value => {
    try {
      const res: Partial<Response> = await HTTP.delete(
        `/api/oms/inquiry-purchase/delete?id=${value}`
      )
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      return e
    }
  }

  // 删除资质证件
  @action deleteQualificationCertificate = async value => {
    try {
      const res: Partial<Response> = await HTTP.delete(
        `/api/factory/enterprise-qualification-certificate/delete?id=${value}`
      )
      return res
    } catch (e) {
      return e
    }
  }
  // 提前结束
  @action endInterfaceInAdvance = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/advance-end`,
        params
      )
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
      Taro.hideLoading()
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      return e
    }
  }

  // 忘记密码
  @action resetPwd = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/user/forget-password`,
        params
      )
      if (res.code === 200) {
        Taro.hideLoading()
        Taro.showToast({
          title: res.msg as string,
          icon: 'none',
          duration: 1500
        })
        // message.success(res.msg)
      }
      return res.data
    } catch (err) {
      Taro.hideLoading()
      Taro.showToast({
        title: err.msg as string,
        icon: 'none',
        duration: 1500
      })
    }
  }
}

export const userInterface = new UserInterface()
