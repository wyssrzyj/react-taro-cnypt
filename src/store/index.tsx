import HomeStore, { homeStore } from './home'
import CommonStore, { commonStore } from './common'
import LoginStore, { loginStore } from './login'

export interface Stores {
  homeStore: HomeStore
  commonStore: CommonStore
  loginStore: LoginStore
}

export const stores = {
  homeStore,
  commonStore,
  loginStore
}
