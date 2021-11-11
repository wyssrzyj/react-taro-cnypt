import HomeStore, { homeStore } from './home'
import CommonStore, { commonStore } from './common'
import LoginStore, { loginStore } from './login'
import FactoryStore, { factoryStore } from './factory'

export interface Stores {
  homeStore: HomeStore
  commonStore: CommonStore
  loginStore: LoginStore
  factoryStore: FactoryStore
}

export const stores = {
  homeStore,
  commonStore,
  loginStore,
  factoryStore
}
