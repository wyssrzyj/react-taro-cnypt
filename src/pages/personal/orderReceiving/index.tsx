import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { AtNavBar, AtSearchBar, AtTabs } from 'taro-ui'
import { useReachBottom, useRouter, redirectTo } from '@tarojs/taro'
import StyleStructure from './styleStructure/index'
import { useStores, toJS, observer } from '@/store/mobx'

const Verify = () => {
  const defaultPageSize = 10
  const { userInterface, commonStore } = useStores()
  const { dictionary } = commonStore
  const { processType, effectiveLocation } = dictionary

  const { listData } = userInterface
  const { params } = useRouter()
  // 跳转的数据
  console.log('接单列表', params)
  const [value, setValue] = useState('')
  const [current, setCurrent] = useState(0)
  // 接口数据
  const [list, setList] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize
    //  status: initialKey //状态
  })
  useEffect(() => {
    console.log(123)
    console.log('multipleSelect加工类型', toJS(processType))
    console.log('effectiveLocation车位', toJS(effectiveLocation))

    api()
  }, [list])
  const api = async () => {
    let res = await listData(list)
    if (Array.isArray(res.records)) {
      res.records.forEach(item => {
        console.log('列表数据', item)
      })
    }
  }
  // 搜索
  const bind = e => {
    console.log('搜索的值', e)
    setValue(e)
  }
  // tabs
  const AtTabsbind = e => {
    console.log('tabs的值', e)
    setCurrent(e)
  }
  // 触底更新
  useReachBottom(() => {
    console.log('触底更新')
  })
  const goBack = () => {
    redirectTo({
      url: '/pages/personal/index'
    })
  }

  const tabList = [
    { title: '全部' },
    { title: '待处理' },
    { title: '已确认' },
    { title: '已谢绝' }
  ]
  return (
    <View className={styles.phoneLogin}>
      {/* 导航 */}
      <View className={styles.navbar}>
        <AtNavBar
          fixed={true}
          onClickLeftIcon={goBack}
          color="#000"
          title="接单管理"
          leftIconType="chevron-left"
        />
      </View>
      {/* 搜索 */}
      <View className={styles.search}>
        <AtSearchBar value={value} onChange={bind} />
      </View>
      {/* Tobs标签 */}
      <AtTabs current={current} tabList={tabList} onClick={AtTabsbind} />
      {/* 主体 */}
      <View className={styles.subject}>
        <StyleStructure />
        <StyleStructure />
      </View>
    </View>
  )
}

export default observer(Verify)
