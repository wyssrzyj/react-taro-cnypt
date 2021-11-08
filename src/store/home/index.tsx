import { observable, action, makeAutoObservable } from 'mobx'
import HTTP from '@/service/http'

interface Response {
  code: number
  data: any
  msg: string
  success: boolean
}

export default class HomeStore {
  constructor() {
    makeAutoObservable(this) // 指定要暴露出去的属性
  }

  @observable name = 'amin'
  @observable count = 1

  @action setCount = () => {
    this.count++
    this.name = 'zf'
  }

  @action getInfo = async () => {
    try {
      const res: Partial<Response> = await HTTP.get(
        '/api/factory/district/list-tree'
      )
      console.log(
        '🚀 ~ file: index.tsx ~ line 29 ~ HomeStore ~ @actiongetInfo= ~ res',
        res
      )
      if (res.code === 200) {
        return res.data
      }
    } catch (err) {
      console.log(err)
    }
  }

  @action getNewFactory = async pageNum => {
    const params = {
      sortField: 'newest',
      sortType: 'Desc',
      pageNum: pageNum,
      pageSize: 10
    }
    try {
      const res: Partial<Response> = await HTTP.post(
        '/api/factory/info/list-factories',
        params
      )

      if (res.code === 200) {
        return res.data
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 需求单列表查询
  @action getOrderList = async pageNum => {
    const params = {
      pageNum: pageNum,
      pageSize: 10
    }
    try {
      const res: Partial<Response> = await HTTP.post(
        `/api/oms/inquiry-purchase/list-inquiry-search`,
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

export const homeStore = new HomeStore()
