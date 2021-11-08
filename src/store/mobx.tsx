import React from 'react'
import {
  inject as _inject,
  MobXProviderContext,
  observer as _observer
} from 'mobx-react'
import { toJS } from 'mobx'
import { Stores } from './index'

export function inject(...args) {
  return componentClass => _inject(...args)(_observer(componentClass))
}

export function observer(target) {
  return _observer(target)
}

export const useStores = () => {
  return React.useContext(MobXProviderContext) as Stores
}

export { toJS }
