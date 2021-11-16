import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Image, Text } from '@tarojs/components'
import { AtNavBar, AtSearchBar, AtTabs } from 'taro-ui'
import { useReachBottom, useRouter, redirectTo } from '@tarojs/taro'
import StyleStructure from './styleStructure/index'
import { useStores, observer } from '@/store/mobx'
// import Taro from '@tarojs/taro'
import { cloneDeep } from 'lodash'
export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const defaultPageSize = 10
  const { userInterface } = useStores()
  const { orderListData, endInterfaceInAdvance, deleteDemandDoc } =
    userInterface
  const { params } = useRouter()
  // 跳转的数据
  const [value, setValue] = useState('')
  const [current, setCurrent] = useState(0)
  const [rallyists, setReallyLists] = useState<any[]>([]) //数据
  const [totalPageNumber, setTotalPageNumber] = useState(2) //总页码
  const [pageNum, setPageNum] = useState(1)
  const [display, setDisplay] = useState(false)

  // 2 3 -2
  // 接口数据
  const [list, setList] = useState<any>({
    pageNum: pageNum,
    pageSize: defaultPageSize,
    status: params.tid //状态
  })

  // 路由状态
  useEffect(() => {
    if (Number(params.tid)) {
      const tid = Number(params.tid)
      if (tid === null) {
        setCurrent(0)
      }
      if (tid === 1) {
        setCurrent(1)
      }
      if (tid === -3) {
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
    let res = await orderListData(list)

    if (Array.isArray(res.records)) {
      setReallyLists(res.records)
      setTotalPageNumber(res.pages)
    }
  }

  useEffect(() => {
    // 防止初始化之后重复掉接口
    if (params.tid) {
    } else {
      drop()
    }
  }, [pageNum])

  let drop = async () => {
    if (totalPageNumber >= pageNum) {
      setDisplay(false)
      let res = await orderListData({
        pageNum: pageNum,
        pageSize: defaultPageSize
      })
      if (res.records.length > 0) {
        const nData = cloneDeep(rallyists)
        const { records = [] } = res
        const target = [...nData, ...records]
        setReallyLists(target)
      }
    } else {
      setDisplay(true)
    }
  }
  // 搜索
  const bind = e => {
    setValue(e)
  }
  // tabs
  const AtTabsbind = e => {
    let sum = '0'
    if (e === 0) {
      sum = ''
    }
    if (e === 1) {
      sum = '1'
    }
    if (e === 2) {
      sum = '-3'
    }
    if (e === 3) {
      sum = '-2'
    }
    setList({
      pageNum: 1,
      pageSize: defaultPageSize,
      status: sum, //状态,
      name: value
    })

    setCurrent(e)
  }
  // 触底更新
  useReachBottom(async () => {
    // 判断当前页码是否大于最大页码
    setPageNum(n => n + 1)
  })
  const goBack = () => {
    redirectTo({
      url: '/pages/personal/index'
    })
  }

  const tabList = [
    { title: '全部' },
    { title: '生效中' },
    { title: '已结束' },
    { title: '审核失败' }
  ]
  const deleteMethod = async value => {
    // 删除
    const res = await deleteDemandDoc(value)
    if (res.code === 200) {
      api()
    }
  }
  //提前结束
  const earlyEnd = async e => {
    const res = await endInterfaceInAdvance({ id: e, status: -3 })
    if (res.code === 200) {
      api()
    }
  }

  const searchConfirmation = () => {
    let res = { ...list, name: value }
    setList(res)
  }

  return (
    <View className={styles.phoneLogin}>
      {/* 导航 */}
      <View className={styles.navbar}>
        <AtNavBar
          fixed={true}
          onClickLeftIcon={goBack}
          color="#000"
          title="订单管理"
          leftIconType="chevron-left"
        />
      </View>
      {/* 搜索 */}
      <View className={styles.search}>
        <AtSearchBar
          value={value}
          onActionClick={searchConfirmation}
          onChange={bind}
        />
      </View>
      {/* Tobs标签 */}
      <AtTabs current={current} tabList={tabList} onClick={AtTabsbind} />
      {/* 主体 */}
      {rallyists.length > 0 ? (
        <View>
          <View className={styles.subject}>
            {rallyists.map(item => (
              <StyleStructure
                data={item}
                earlyEnd={earlyEnd}
                deleteMethod={deleteMethod}
              />
            ))}
          </View>
          {display ? <View className={styles.notYet}>没有更多了~</View> : null}
        </View>
      ) : (
        <View class={styles.emptyDisplay}>
          <View className={styles.empty}>
            <Image className={styles.img} src={ORDER_EMPTY} alt="" />
          </View>
          <View>
            <Text>您还没有订单偶~</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default observer(Verify)