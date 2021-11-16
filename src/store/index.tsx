import HomeStore, { homeStore } from './home'
import CommonStore, { commonStore } from './common'
import LoginStore, { loginStore } from './login'
import UserInterface, { userInterface } from './user'
import FactoryStore, { factoryStore } from './factory'
import OrderStore, { orderStore } from './order'

export interface Stores {
  homeStore: HomeStore
  commonStore: CommonStore
  loginStore: LoginStore
  userInterface: UserInterface
  factoryStore: FactoryStore
  orderStore: OrderStore
}

export const stores: Stores = {
  homeStore,
  commonStore,
  loginStore,
  userInterface,
  factoryStore,
  orderStore
}
