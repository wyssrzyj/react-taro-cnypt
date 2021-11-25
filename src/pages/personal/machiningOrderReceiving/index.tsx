import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Image, Text } from '@tarojs/components'
import { AtSearchBar, AtTabs } from 'taro-ui'
import { useReachBottom, useRouter, redirectTo } from '@tarojs/taro'
import StyleStructure from './styleStructure/index'
import { useStores, observer } from '@/store/mobx'
import { cloneDeep } from 'lodash'
export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'
import { Navbar } from '@/components'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'
const Verify = () => {
  const defaultPageSize = 10
  const { userInterface } = useStores()
  const {
    supplierGetOrders,
    declineRequisition,
    rejectSubmission,
    cancelCooperation,
    factoryDelOrder
  } = userInterface
  const { params } = useRouter()

  // 跳转的数据.
  const [value, setValue] = useState('')
  const [current, setCurrent] = useState(0)
  const [rallyists, setReallyLists] = useState<any[]>([]) //数据

  const [totalPageNumber, setTotalPageNumber] = useState(2) //总页码
  const [pageNum, setPageNum] = useState(1)
  const [display, setDisplay] = useState(false)
  const [dropDown, setDropDown] = useState(false)
  // 接口数据
  const [list, setList] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize,
    purchaserInquiryId: params.ids,
    status: params.tid //状态
  })

  // 路由状态
  useEffect(() => {
    if (Number(params.tid)) {
      // purchaserInquiryId: params.ids
      const tid = Number(params.tid)
      if (tid === 2) {
        setCurrent(0)
      }
      if (tid === 3) {
        setCurrent(1)
      }
      if (tid === -2) {
        setCurrent(2)
      }
      if (tid === -1) {
        setCurrent(3)
      }
    }
  }, [])
  // 获取数据
  useEffect(() => {
    api()
  }, [list])

  //  过滤 被拒绝和等待答复
  const eliminate = (data, key) => {
    let arr = data.filter(item => item.status !== key)
    if (arr) {
      return arr
    }
  }
  const api = async () => {
    let res = await supplierGetOrders(list)
    if (Array.isArray(res.records)) {
      let filterStatus = eliminate(res.records, -1)
      let final = eliminate(filterStatus, 1)
      setReallyLists(final)
      setTotalPageNumber(res.pages)
    }
  }
  // 下拉加载更多.
  useEffect(() => {
    // 防止初始化之后重复掉接口
    if (dropDown) {
      drop()
    }
  }, [pageNum, dropDown])

  let drop = async () => {
    if (totalPageNumber >= pageNum) {
      setDisplay(false)
      let res = await supplierGetOrders({
        pageNum: pageNum,
        pageSize: defaultPageSize,
        purchaserInquiryId: params.ids,
        status: params.tid //状态
      })
      if (res.records.length > 0) {
        const nData = cloneDeep(rallyists)
        const { records = [] } = res
        const target = [...nData, ...records]
        let filterStatus = eliminate(target, -1)
        let final = eliminate(filterStatus, 1)
        setReallyLists(final)
        setDropDown(false)
      }
    } else {
      setDisplay(true)
    }
  }
  // 触底更新
  useReachBottom(async () => {
    // 判断当前页码是否大于最大页码
    setPageNum(n => n + 1)
    setDropDown(true)
  })
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
      sum = '2'
    }
    if (e === 2) {
      sum = '3'
    }
    if (e === 3) {
      sum = '-2'
    }
    setPageNum(1) //点击tops的时候让下拉需要的数据重新计算
    setList({
      pageNum: 1,
      pageSize: defaultPageSize,
      purchaserInquiryId: params.ids,
      status: sum, //状态,
      name: value
    })

    setCurrent(e)
  }

  const goBack = () => {
    redirectTo({
      url: '/pages/personal/index'
    })
  }

  const tabList = [
    { title: '全部' },
    { title: '待反馈' },
    { title: '已确认' },
    { title: '已谢绝' }
  ]
  const deleteMethod = async id => {
    // 删除
    await factoryDelOrder({ supplierInquiryId: id })
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
    // 拒绝接单
    const res = await rejectSubmission({ supplierInquiryId: id, status: -1 })
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
  const searchConfirmation = () => {
    let res = { ...list, name: value }
    setList(res)
  }
  return (
    <View className={styles.phoneLogin}>
      {/* 导航 */}

      <Navbar>
        <View className={styles.navbars}>
          <Image
            src={BACK_ICON}
            className={styles.backs}
            onClick={goBack}
          ></Image>
          <View className={styles.navTitles}>接单管理</View>
        </View>
      </Navbar>
      {/* 搜索 */}
      <View className={styles.search}>
        <AtSearchBar
          value={value}
          onActionClick={searchConfirmation}
          onChange={bind}
        />
      </View>
      {/* Tobs标签 */}
      <AtTabs
        className={styles.tobs}
        current={current}
        tabList={tabList}
        onClick={AtTabsbind}
      />
      {/* 主体 */}
      {rallyists.length > 0 ? (
        <View>
          <View className={styles.subject}>
            <View className={styles.interval}></View>
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
          {display ? <View className={styles.notYet}>没有更多了~</View> : null}
        </View>
      ) : (
        <View class={styles.emptyDisplay}>
          <View className={styles.empty}>
            <Image className={styles.img} src={ORDER_EMPTY} alt="" />
          </View>
          <View class={styles.color}>
            <Text>您还没有订单~</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default observer(Verify)
