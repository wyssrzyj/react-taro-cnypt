import { Text } from '@tarojs/components'
import classNames from 'classnames'

const Icon = props => {
  const { type, className } = props
  return <Text className={classNames('iconfont', type, className)}></Text>
}

export default Icon
