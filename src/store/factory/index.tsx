import { observable, action, makeAutoObservable, runInAction } from 'mobx'
import HTTP from '@/service/http'
import Taro from '@tarojs/taro'

interface Response {
  code: number
  data: any
  msg: string
  success: boolean
}

interface Dictionary {
  [key: string]: any
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
  // 工厂入驻
  @action getEnterpriseInfo = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/enterprise/get-enterprise-info`
      )

      if (res) {
        return res.data || []
      } else {
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
}

export const factoryStore = new FactoryStore()
