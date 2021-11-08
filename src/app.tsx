import { Provider } from 'mobx-react'
import { stores } from './store'
import './app.less'
import './icon.css'
import Taro from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'

const App = props => {
  // app.js
  Taro.getSystemInfo({}).then(res => {
    Taro['$navBarMarginTop'] = res.statusBarHeight || 0
  })
  // 将状态栏高度挂载全局
  return <Provider {...stores}>{props.children}</Provider>
}

export default App
