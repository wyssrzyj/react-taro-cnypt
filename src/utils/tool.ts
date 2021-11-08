export const matchTreeData = (data, value) => {
  let target
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.id === value) {
      target = item
      return target
    }
    if (Array.isArray(item.children)) {
      target = matchTreeData(item.children, value)
      if (target) {
        return target
      }
    }
  }
}
