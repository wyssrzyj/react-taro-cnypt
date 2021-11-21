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

  @observable userInfomation: Partial<User> = {}
  @observable token: string = ''
  @observable refresh: string = ''
  @observable currentUser: any = {}

  @observable sessionId: string | number = ''
  @observable openid: string | number = ''
  @observable encryptedData: string | number = ''
  @observable iv: string | number = ''

  @action setWxInfo = (field, value) => {
    runInAction(() => {
      this[field] = value
    })
  }

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
      if (res.code === 200 && data) {
        runInAction(() => {
          this.refresh = data.refresh_token
          this.token = data.access_token
          this.currentUser = data
        })
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
      if (e.code !== 200) {
        Taro.showToast({
          title: e.msg as string,
          icon: 'none',
          duration: 1500
        })
      }
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
          this.userInfomation = data
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

  // /api/user/weChat/get-session-open-id
  @action getSessionId = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/user/weChat/get-session-open-id`,
        params
      )

      if (res.code === 200) {
        runInAction(() => {
          const { data } = res
          this.sessionId = data.sessionId
          this.openid = data.openid
        })
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

  // 小程序登录
  // /api/user/account/applet-login
  @action wxLogin = async () => {
    const params = {
      loginType: 'applet_weChat',
      iv: this.iv,
      encryptedData: this.encryptedData,
      sessionId: this.sessionId,
      openid: this.openid
    }
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/user/account/applet-login`,
        params
      )

      if (res.code === 200) {
        const { data } = res
        runInAction(() => {
          this.refresh = data.refresh_token
          this.token = data.access_token
          this.currentUser = data
        })
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
        await this.userInfo()
      }
      return res.code
    } catch (err) {
      console.log(err)
      Taro.showToast({
        title: err.msg as string,
        icon: 'none',
        duration: 1500
      })
    }
  }

  // /api/user/check-password-is-empty
  // 检查用户密码是否为空 GET
  @action checkPwdExist = async params => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/user/check-password-is-empty`,
        params
      )
      if (res.code === 200) {
        Taro.showToast({
          title: res.msg as string,
          icon: 'none',
          duration: 1500
        })
      }
      console.log('🚀 ~ file: index.tsx ~ line 266 ~ LoginStore ~ res', res)

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

  // /api/user/reset-password
  // 重置密码 POST
  @action resetPassword = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/user/reset-password`,
        params
      )
      if (res.code === 200) {
        Taro.showToast({
          title: res.msg as string,
          icon: 'none',
          duration: 1500
        })
      }

      return res.code
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
