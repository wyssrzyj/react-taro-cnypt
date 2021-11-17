import { observable, action, makeAutoObservable, runInAction } from 'mobx'
import HTTP from '@/service/http'

interface Response {
  code: number
  data: any
  msg: string
  success: boolean
}

export default class OrderStore {
  constructor() {
    makeAutoObservable(this) // 指定要暴露出去的属性
  }

  // 搜索页 加工厂列表
  @action getNewFactory = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/factory/info/list-search-factory-applet',
        params
      )

      if (res.code === 200) {
        return res.data
      }
    } catch (err) {
      console.log(err)
    }
  }

  //  搜索页 需求单列表
  @action getOrderList = async params => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/list-inquiry-search-applet`,
        params
      )

      if (res.code === 200) {
        return res.data
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const orderStore = new OrderStore()
