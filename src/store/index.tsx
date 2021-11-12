import HomeStore, { homeStore } from './home'
import CommonStore, { commonStore } from './common'
import LoginStore, { loginStore } from './login'
import UserInterface, { userInterface } from './user'

export interface Stores {
  homeStore: HomeStore
  commonStore: CommonStore
  loginStore: LoginStore
  userInterface: UserInterface
}

export const stores = {
  homeStore,
  commonStore,
  loginStore,
  userInterface
}
