import { Button } from '@tarojs/components'

const LoginButton = props => {
  const { click } = props

  const onClick = () => {
    click && click()
  }

  const getPhoneNumber = event => {
    const { detail } = event
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
