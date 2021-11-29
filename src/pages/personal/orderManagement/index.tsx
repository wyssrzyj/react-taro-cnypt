import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Image, Text } from '@tarojs/components'
import { AtSearchBar, AtTabs } from 'taro-ui'
import { useReachBottom, useRouter, redirectTo } from '@tarojs/taro'
import StyleStructure from './styleStructure/index'
import { useStores, observer } from '@/store/mobx'
import { cloneDeep } from 'lodash'
import { Navbar } from '@/components'
const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const defaultPageSize = 10
  const { userInterface } = useStores()
  const {
    orderListData,
    endInterfaceInAdvance,
    issuerMyOrderQuantity,
    deleteDemandDoc
  } = userInterface
  const { params } = useRouter()
  // 跳转的数据
  const [value, setValue] = useState('')
  const [current, setCurrent] = useState(0)
  const [rallyists, setReallyLists] = useState<any[]>([]) //数据
  const [totalPageNumber, setTotalPageNumber] = useState(2) //总页码
  const [pageNum, setPageNum] = useState(1)
  const [display, setDisplay] = useState(false)
  const [loading, setLoading] = useState(true)
  const [orderQuantity, setOrderQuantity] = useState<any>([]) //数据

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
    setLoading(false)
    let res = await orderListData(list)
    if (Array.isArray(res.records)) {
      setReallyLists(res.records)
      setTotalPageNumber(res.pages)
    }
    setLoading(true)
    quantity()
  }
  const quantity = async () => {
    const quantity = await issuerMyOrderQuantity()
    setOrderQuantity(quantity.data)
  }

  useEffect(() => {
    drop()
  }, [pageNum])

  let drop = async () => {
    if (totalPageNumber >= pageNum) {
      setDisplay(false)
      let res = await orderListData(list)
      if (res.records.length > 0) {
        const nData = cloneDeep(rallyists)
        const { records = [] } = res
        const target = [...nData, ...records]
        setReallyLists(target)
        setTotalPageNumber(res.pages)
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
    setTotalPageNumber(1) //共有几页
    setPageNum(1) //下拉当前是第几页

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
    // 判断当前页码是否大于最大页码.
    setPageNum(n => n + 1)
  })
  const goBack = () => {
    redirectTo({
      url: '/pages/personal/index'
    })
  }

  const tabList = [
    {
      title: `全部 (${
        orderQuantity.inEffectNum +
        orderQuantity.alreadyEndNum +
        orderQuantity.auditFailureNum
          ? orderQuantity.inEffectNum +
            orderQuantity.alreadyEndNum +
            orderQuantity.auditFailureNum
          : 0
      })`
    },
    {
      title: `生效中 (${
        orderQuantity.inEffectNum ? orderQuantity.inEffectNum : 0
      })`
    },
    {
      title: `已结束 (${
        orderQuantity.alreadyEndNum ? orderQuantity.alreadyEndNum : 0
      })`
    },
    {
      title: `审核失败 (${
        orderQuantity.auditFailureNum ? orderQuantity.auditFailureNum : 0
      })`
    }
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
  const onConfirm = () => {
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
          <View className={styles.navTitles}>订单管理</View>
        </View>
      </Navbar>
      {/* 搜索 */}
      <View className={styles.search}>
        <AtSearchBar
          placeholder="搜索订单名称"
          value={value}
          onActionClick={searchConfirmation}
          onChange={bind}
          onConfirm={onConfirm}
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
              />
            ))}
          </View>
          {display ? <View className={styles.notYet}>没有更多了~</View> : null}
        </View>
      ) : null}

      {loading && !rallyists.length ? (
        <View class={styles.emptyDisplay}>
          <View className={styles.empty}>
            <Image className={styles.img} src={ORDER_EMPTY} alt="" />
          </View>
          <View className={styles.color}>
            <Text>您还没有新的订单~</Text>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default observer(Verify)
