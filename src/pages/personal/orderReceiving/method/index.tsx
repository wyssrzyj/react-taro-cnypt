import { isArray, isEmpty } from 'lodash'

export const findTarget = (val, data, key = 'id', name = 'name') => {
  // val//用来作为判断条件
  // data 数据
  for (let i = 0; i < data.length; i++) {
    const item = data[i] //获取循环所有原始的数据
    if (item[key] === val.toString()) {
      //原始数据==没有被勾选的数据
      //当前数据的id===传递来的数据
      return item[name]
      // 用来返回所有等于传递过来的数据
    }
    if (isArray(item.children) && item.children.length) {
      //当子元素不为空
      const res = findTarget(val, item.children, key) //
      if (!isEmpty(res)) {
        //只有是对象、数组返才会执行
        return res
      }
    }
  }
}
export const getTrees = (targetArr, data, key, name) => {
  // 把所有获取的数据都存到prev里面
  return targetArr.reduce((prev, item) => {
    const target = findTarget(item, data, key, name)
    prev.push(target)
    return prev
  }, [])
}
