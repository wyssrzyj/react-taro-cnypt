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

  // 账号安全 修改手机号
  @action modifyMobilePhoneNumber = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/user/update-user-mobile-phone',
        params
      )
      console.log('成功', res)
      runInAction(() => {
        this.modi = '0'
      })
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
      console.log('失败', e)
      runInAction(() => {
        this.modi = '1'
      })
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
    }
  }

  // 账号安全 原密码修改密码
  @action changePassword = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/user/update-password',
        params
      )
      console.log('成功', res)
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
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      console.log('失败', e)
      if (e.code === 200) {
        return true
      }
      return false
    }
  }

  // 申请列表数据展示
  @action listData = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/oms/inquiry-purchase/inquiry-application-list',
        params
      )
      console.log('成功', res)
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (res.code === 200) {
        return res.data
      }
      return res.data
    } catch (e) {
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      console.log('失败', e)
      if (e.code === 200) {
        return e
      }
      return e
    }
  }

  // 订单管理数据
  @action orderListData = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/oms/inquiry-purchase/inquiry-list',
        params
      )
      console.log('成功', res)
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      if (res.code === 200) {
        return res.data
      }
      return res.data
    } catch (e) {
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      console.log('失败', e)
      if (e.code === 200) {
        return e
      }
      return e
    }
  }

  // 用户登出
  @action signOut = async () => {
    try {
      const res: Partial<Response> = await HTTP.post('/api/user/account/logout')
      console.log('成功', res)
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
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      console.log('失败', e)
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
      return res
    } catch (e) {
      console.log(e)
    }
  }
  // 取消合作
  @action cancelCooperation = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/cancel-cooperation`,
        params
      )
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
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
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
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
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
      return e
    }
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
    } catch (e) {
      console.log(e)
    }
  }

  // 验证码校验
  @action checkVerifyCode = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/sms/verification-code`,
        params
      )

      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // 用户信息
  @action userInformation = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/user/get-account-info`,
        params
      )
      console.log(res)

      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  // 删除需求单
  @action deleteDemandDoc = async value => {
    try {
      const res: Partial<Response> = await HTTP.delete(
        `/api/oms/inquiry-purchase/delete?id=${value}`
      )
      console.log(res)
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
      Taro.showToast({
        title: e.msg as string,
        icon: 'none',
        duration: 1500
      })
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
      Taro.showToast({
        title: res.msg as string,
        icon: 'none',
        duration: 1500
      })
      return res
    } catch (e) {
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
        Taro.showToast({
          title: res.msg as string,
          icon: 'none',
          duration: 1500
        })
        // message.success(res.msg)
      }
      return res.data
    } catch (err) {
      console.log(err)
      Taro.showToast({
        title: err.msg as string,
        icon: 'none',
        duration: 1500
      })
    }
  }
}

export const userInterface = new UserInterface()
