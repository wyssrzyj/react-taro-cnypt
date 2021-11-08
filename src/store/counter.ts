import { observable, action, makeObservable } from 'mobx'

export default class HomeStore {
  constructor() {
    makeObservable(this, {
      // name: observable,
      count: observable,
      setCount: action
    }) // 指定要暴露出去的属性
  }

  @observable name = 'amin'
  count = 1

  @action setCount = () => {
    this.count++
    this.name = 'zf'
  }

  @action login = async params => {
    try {
      const res = await axios.get('/api/say/Hello', params)
      // localStorage.setItem("token", res.token)
      if (res) {
        console.log(res)
        // localStorage.setItem("currentUser", JSON.stringify(res))
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }
}

export const homeStore = new HomeStore()
