import { httpRequest } from '@/service/http'
import { observable, action, makeAutoObservable, runInAction } from 'mobx'
import Taro from '@tarojs/taro'

const HTTP = new httpRequest()

export default class RefreshStore {
  constructor() {
    makeAutoObservable(this) // 指定要暴露出去的属性
  }

  @action dealRefresh = async () => {
    var authorization = await Taro.getStorageSync('token')
    const url = `/api/user/account/refresh-token?accessToken=${authorization}`

    const res = await HTTP.post(url)
    console.log(
      '🚀 ~ file: index.tsx ~ line 17 ~ LoginStore ~ @actiondealRefresh= ~ res',
      res
    )
    const rToken = res.data.access_token
    const expiresTime = res.data.expires_in // 过期时间
    // 更新用户信息
    const updateUser = JSON.parse(Taro.getStorageSync('currentUser'))
    updateUser.expire = expiresTime
    updateUser.access_token = rToken
    Taro.setStorage({
      key: 'token',
      data: rToken
    })
    Taro.setStorage({
      key: 'currentUser',
      data: JSON.stringify(updateUser)
    })
  }
}

export const refreshStore = new RefreshStore()
