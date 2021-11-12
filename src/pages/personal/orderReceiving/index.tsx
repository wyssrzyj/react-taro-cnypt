import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Button } from '@tarojs/components'
import { AtNavBar, AtSearchBar, AtTabs } from 'taro-ui'
import { useReachBottom, useRouter, redirectTo } from '@tarojs/taro'
import StyleStructure from './styleStructure/index'
import { useStores, observer } from '@/store/mobx'

const Verify = () => {
  const defaultPageSize = 10
  const { userInterface } = useStores()
  const {
    listData,
    declineRequisition,
    confirmCooperation,
    cancelCooperation,
    deleteIssuer
  } = userInterface
  const { params } = useRouter()
  console.log(params)

  // 跳转的数据
  const [value, setValue] = useState('')
  const [current, setCurrent] = useState(0)
  const [rallyists, setReallyLists] = useState([]) //数据
  const [state, setstate] = useState(params.tid) //数据
  // 2 3 -2
  // 接口数据
  const [list, setList] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize,
    status: state //状态
  })
  useEffect(() => {
    console.log(params)
  }, [params, state])
  // 路由状态
  useEffect(() => {
    if (Number(params.tid)) {
      const tid = Number(params.tid)
      if (tid === null) {
        setCurrent(0)
      }
      if (tid === 2) {
        setCurrent(1)
      }
      if (tid === 3) {
        setCurrent(2)
      }
      if (tid === -2) {
        setCurrent(3)
      }
    }
  }, [])
  // 获取数据
  useEffect(() => {
    api()
  }, [list])
  const api = async () => {
    let res = await listData(list)
    if (Array.isArray(res.records)) {
      setReallyLists(res.records)
    }
  }
  // 搜索
  const bind = e => {
    console.log('搜索的值', e)
    setValue(e)
  }
  // tabs
  const AtTabsbind = e => {
    console.log(e)
    if (e === 0) {
      setstate('')
    }
    if (e === 1) {
      setstate('2')
    }
    if (e === 2) {
      setstate('3')
    }
    if (e === 3) {
      setstate('-2')
    }

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
  const deleteMethod = async id => {
    // 删除
    await deleteIssuer({ supplierInquiryId: id })
    api()
  }
  const reOrder = async id => {
    // 取消确认
    const res = await cancelCooperation({ id: id, status: 2 })
    if (res.code === 200) {
      api()
    }
  }
  const InitiateOrder = async id => {
    // 确认合作
    const res = await confirmCooperation({ id: id, status: 3 })
    if (res.code === 200) {
      api()
    }
  }
  const earlyEnd = async id => {
    // 谢绝
    const res = await declineRequisition({ id: id, status: -2 })
    if (res.code === 200) {
      api()
    }
  }

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
        {rallyists.map(item => (
          <StyleStructure
            data={item}
            earlyEnd={earlyEnd}
            deleteMethod={deleteMethod}
            reOrder={reOrder}
            InitiateOrder={InitiateOrder}
          />
        ))}
      </View>
    </View>
  )
}

export default observer(Verify)
