import { Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

const LoginButton = props => {
  const { click } = props

  const onClick = (...args) => {
    // console.log('🚀 ~ file: index.tsx ~ line 7 ~ onClick ~ args', args)
    click && click()
  }

  const getPhoneNumber = event => {
    const { detail } = event
    console.log('🚀 ~ file: index.tsx ~ line 14 ~ detail', detail)
    Taro.login({
      success: () => {
        console.log('success')
      }
    })

    if (detail.errMsg == 'getPhoneNumber:fail user deny') {
      //用户点击拒绝
      console.log('拒绝授权')
    } else {
      //允许授权执行跳转
      console.log('允许授权')
    }
  }

  return (
    <Button
      type={'primary'}
      onClick={onClick}
      openType={'getPhoneNumber'}
      onGetPhoneNumber={getPhoneNumber}
    >
      微信登录
    </Button>
  )
}

export default LoginButton
