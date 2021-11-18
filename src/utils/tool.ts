import Taro, { NodesRef } from '@tarojs/taro'
import { isEmpty, isArray } from 'lodash'

export const matchTreeData = (data, value, key = 'id') => {
  let target
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item[key] === value) {
      target = item
      return target
    }
    if (Array.isArray(item.children)) {
      target = matchTreeData(item.children, value, key)
      if (target) {
        return target
      }
    }
  }
}

export const selectorQueryClientRect = (
  selector: string
): Promise<NodesRef.BoundingClientRectCallbackResult> =>
  new Promise(resolve => {
    const query = Taro.createSelectorQuery()
    query
      .select(selector)
      .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
        resolve(res)
      })
      .exec()
  })

// 获取市级ID的label
export const findTarget = (val, data, key = 'id') => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item[key] === val) {
      return item
    }
    if (isArray(item.children) && item.children.length) {
      const res = findTarget(val, item.children, key)
      if (!isEmpty(res)) {
        return res
      }
    }
  }
  return null
}

export const phoneReg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

export const pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,}$/
