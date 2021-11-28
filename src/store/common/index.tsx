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
  label: string
  value: string
  [key: string]: any
}
export default class CommonStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable district: any[] = []
  @observable dictionary: Partial<Dictionary> = {}
  @observable productCategoryList = []
  @observable productGrade: Partial<Dictionary> = []

  @action getDistrict = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        '/api/factory/district/list-tree'
      )
      if (res.code === 200) {
        runInAction(() => {
          this.district = res.data
        })
        return res.data
      }
    } catch (err) {}
  }

  @action allDictionary = async (params?) => {
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/admin/manage/dict-item/list/dict-code`,
        params
      )
      if (res) {
        runInAction(() => {
          this.dictionary = res.data
        })
        return res.data || []
      } else {
      }
    } catch (e) {}
  }

  @action productCategory = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/api/product/catalog/list-category-tree`
      )
      if (res) {
        runInAction(() => {
          this.productCategoryList = res.data
          Taro.setStorage({
            key: 'productCategoryList',
            data: JSON.stringify(res.data)
          })
        })
        return res.data || []
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {}
  }

  @action getProductGrade = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        `/api/factory/product-grade/list-tree`
      )
      if (res) {
        runInAction(() => {
          this.productGrade = res.data
          Taro.setStorage({
            key: 'productGrade',
            data: JSON.stringify(res.data)
          })
        })
        return res.data || []
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: '获取数据失败~',
          icon: 'none',
          duration: 1000
        })
      }
    } catch (e) {}
  }
}
export const commonStore = new CommonStore()
