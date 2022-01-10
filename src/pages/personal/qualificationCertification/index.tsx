import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import Taro, { useReachBottom } from '@tarojs/taro'
import StyleStructure from './styleStructure/index'
import { useStores, observer, toJS } from '@/store/mobx'

export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryCertificate = [] } = dictionary

  const defaultPageSize = 10
  const { userInterface } = useStores()
  const {
    endInterfaceInAdvance,
    deleteQualificationCertificate,
    approvalListOfBackgroundQualificationStatus
  } = userInterface
  // 跳转的数据
  const [current, setCurrent] = useState(1)
  const [rallyists, setReallyLists] = useState<any[]>([]) //数据
  const [pageNum, setPageNum] = useState(1)
  const [display, setDisplay] = useState(false)
  const [loading, setLoading] = useState(true)

  // 接口数据
  const [list, setList] = useState<any>({
    enterpriseId: JSON.parse(Taro.getStorageSync('userInfo')).enterpriseId, //企业id
    pageNum: pageNum,
    pageSize: defaultPageSize,
    status: 1 //状态
  })
  // 获取数据
  useEffect(() => {
    api()
  }, [list])

  const api = async () => {
    setLoading(false)
    let res = await approvalListOfBackgroundQualificationStatus(list)
    if (res.records) {
      res.records.map(item => {
        item.certification = factoryCertificate.filter(
          v => v.value === item.certificationName[0].certificationLabel
        )
      })
    }
    setReallyLists(res.records)
    setDisplay(false)
  }

  // tabs
  const AtTabsbind = e => {
    // setTotalPageNumber(1) //共有几页
    // setPageNum(1) //下拉当前是第几页
    setList({ ...list, status: e })
    setCurrent(e)
  }
  // 触底更新
  useReachBottom(async () => {
    // 判断当前页码是否大于最大页码.
    setPageNum(n => n + 1)
  })
  const tabList = [
    {
      title: `已生效`
    },
    {
      title: `审核中`
    },
    {
      title: `审核失败`
    },
    {
      title: `已失效`
    }
    // {
    //   title: `新增资质`
    // }
  ]
  const deleteMethod = async value => {
    // 删除
    const res = await deleteQualificationCertificate(value)
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

  const newQualification = () => {
    Taro.navigateTo({
      url: `/pages/personal/newQualification/index`
    })
  }

  Taro.setNavigationBarColor({
    frontColor: '#000000',
    backgroundColor: '#ffffff',
    animation: {
      duration: 400,
      timingFunc: 'easeIn'
    }
  })

  return (
    <View className={styles.phoneLogin}>
      {/* 搜索 */}
      {/* <View className={styles.search}>
        <AtSearchBar
          placeholder="搜索订单名称"
          value={value}
          onActionClick={searchConfirmation}
          onChange={bind}
          onConfirm={onConfirm}
        />
      </View> */}
      {/* Tobs标签 */}
      <View className={styles.topSelection}>
        <View className={styles.tobs}>
          <AtTabs current={current} tabList={tabList} onClick={AtTabsbind} />
        </View>

        <View className={styles.tobButton} onClick={newQualification}>
          新增资质
        </View>
      </View>
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

      {!rallyists.length ? (
        <View class={styles.emptyDisplay}>
          <View className={styles.empty}>
            <Image className={styles.img} src={ORDER_EMPTY} alt="" />
          </View>
          <View className={styles.color}>
            <Text>您还没有新的认证~</Text>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default observer(Verify)
