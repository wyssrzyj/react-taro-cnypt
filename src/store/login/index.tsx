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

export default class LoginStore {
  constructor() {
    makeAutoObservable(this) // 指定要暴露出去的属性
  }

  @observable currentUser: Partial<User> = {}

  // 用户注册 /user/register
  @action checkUser = async (queryParam, queryType) => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/user/getUserByMobilePhone/${queryParam}/${queryType}`
      )

      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // 发送验证码
  @action sendVerifyCode = async (mobile: string | number) => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/sms/send-code/${mobile}`
      )
      return res
    } catch (err) {
      console.log(err)

      // const { response } = err
      // const { code } = response
    }
  }

  @action login = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/user/account/login',
        params
      )
      const { data = {}, msg = '' } = res
      if (data) {
        Taro.setStorage({
          key: 'token',
          data: data.access_token
        })
        Taro.setStorage({
          key: 'refresh',
          data: data.refresh_token
        })
        Taro.setStorage({
          key: 'currentUser',
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

export const loginStore = new LoginStore()
