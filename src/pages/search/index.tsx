import { View, Image, Input, Text } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import styles from './index.module.less'
import Taro, {
  usePullDownRefresh,
  useReachBottom,
  useRouter
} from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { useStores, observer } from '@/store/mobx'
import {
  CusMaterialModal,
  CusModal,
  CusProductModal,
  Navbar
} from '@/components'
import { cloneDeep, isArray, isEmpty, isNil } from 'lodash'
import AreaModal from '@/components/areaModal'
import Card from '../index/components/card'

const BASE_URL =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile'

const BACK_ICON = BASE_URL + '/icon/black_back.png'
const SEARCH_ICON = BASE_URL + '/icon/search.png'
const DELETE_ICON = BASE_URL + '/icon/delete.png'

const SELECTED_ICON = BASE_URL + '/icon/selected.png'
const UN_SELECTED_ICON = BASE_URL + '/icon/unselected.png'
const UN_SORT = BASE_URL + '/icon/unsort.png'
const DESC = BASE_URL + '/icon/desc.png'
const ASC = BASE_URL + '/icon/asc.png'

const SORT_MAP = new Map()
SORT_MAP.set(-1, UN_SORT)
SORT_MAP.set(0, DESC)
SORT_MAP.set(1, ASC)

const SORT_TYPE = new Map()
SORT_TYPE.set(-1, null)
SORT_TYPE.set(0, 'desc')
SORT_TYPE.set(1, 'asc')

const Search = () => {
  const router = useRouter()
  const {
    params: { tab = 0 }
  } = router

  const { orderStore, commonStore } = useStores()
  const { getNewFactory, getOrderList } = orderStore
  const { dictionary } = commonStore
  const { effectiveLocation = [] } = dictionary

  const tabList = [
    {
      title: '搜订单'
    },
    {
      title: '搜工厂'
    }
  ]

  const initConfigs = [
    {
      label: '地区',
      selected: false,
      field: 'cityIds',
      onClick: () => areaModalShow()
    },
    {
      label: '主营类别',
      field: 'categoryCodes',
      selected: false,
      onClick: () => productModalShow()
    },
    {
      label: '面料类型',
      field: 'plusMaterialTypeList',
      selected: false,
      onClick: () => materialModalShow()
    },
    {
      label: '工厂规模',
      field: 'effectiveLocation',
      selected: false,
      onClick: () => effectiveeModalShow()
    }
  ]

  const [params, setParams] = useState<any>({
    sort: -1,
    pageSize: 10
  })
  const [historySearch, setHistorySearch] = useState<any[]>([])
  const [pageStatus, setPageStatus] = useState<number>(1) // 1 搜索历史 2 搜索列表
  const [activeTab, setActiveTab] = useState<number>(+tab) // 0 订单 1 工厂
  const [areaFlag, setAreaFlag] = useState<boolean>(false)
  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [materialFlag, setMaterialFlag] = useState<boolean>(false)
  const [effectiveFlag, setEffectiveFlag] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [pageNum, setPageNum] = useState(1)
  const [init, setInit] = useState<boolean>(false)
  const [searchConfigs, setSearchConfigs] = useState<any[]>(initConfigs)

  useEffect(() => {
    setSearchConfigs(
      activeTab === 1 ? initConfigs : initConfigs.filter((_, idx) => idx !== 3)
    )
  }, [activeTab])

  usePullDownRefresh(async () => {
    await setPageNum(1)
  })

  useReachBottom(() => {
    if (loading) return
    if (dataSource.length >= total) return
    setPageNum(n => n + 1)
  })

  useEffect(() => {
    const history = Taro.getStorageSync('search') || []
    setHistorySearch(history)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (pageStatus === 1) return
      setLoading(true)
      const nData = cloneDeep(dataSource)
      let nParams = cloneDeep(params)
      nParams.pageNum = pageNum
      nParams.effectiveLocation = nParams.effectiveLocation
        ? nParams.effectiveLocation.join('')
        : null
      nParams = { ...nParams, ...nParams['mainCategoriesList'] }
      if (nParams.sort !== -1) {
        nParams.sortField = 'inquiryEffectiveDate'
        nParams.sortType = SORT_TYPE.get(nParams.sort)
      }
      !nParams.name && delete nParams.name
      delete nParams.sort
      delete nParams.mainCategoriesList
      const fn = activeTab === 0 ? getOrderList : getNewFactory

      const keys = Reflect.ownKeys(nParams)
      keys.forEach(item => {
        if (isNil(nParams[item])) {
          delete nParams[item]
        }
      })
      const res = (await fn(nParams)) || {}

      const { records = [], current = 1, total = 0 } = res
      const target = current === 1 ? records : [...nData, ...records]
      setDataSource(target)
      setLoading(false)
      setTotal(total)
      setInit(true)
    })()
  }, [params, pageNum, activeTab, pageStatus])

  const areaModalShow = () => {
    setAreaFlag(f => !f)
  }

  const productModalShow = () => {
    setProductFlag(f => !f)
  }

  const materialModalShow = () => {
    setMaterialFlag(f => !f)
  }

  const effectiveeModalShow = () => {
    setEffectiveFlag(f => !f)
  }

  const goBack = () => {
    Taro.navigateBack()
  }

  const confirm = event => {
    const nParams = cloneDeep(params)
    const nSearch = cloneDeep(historySearch) || []
    const {
      detail: { value }
    } = event
    value && nSearch.push(value)
    setHistorySearch(nSearch)
    Taro.setStorageSync('search', nSearch)
    nParams['name'] = value
    setParams(nParams)
    setPageStatus(2)
  }

  const searchTarget = target => {
    const nParams = cloneDeep(params)
    nParams['name'] = target
    setParams(nParams)
    setPageNum(1)
    setPageStatus(2)
  }

  const tabChange = tab => {
    setPageNum(1)
    setActiveTab(tab)
  }

  const handleChange = (value, field) => {
    const nParams = cloneDeep(params)
    nParams[field] = value
    setPageNum(1)
    setParams(nParams)
  }

  const sortClick = () => {
    const nParams = cloneDeep(params)
    nParams.sort = nParams.sort > 0 ? -1 : nParams.sort === 0 ? 1 : 0
    setParams(nParams)
  }

  const searchFocus = () => {
    setPageStatus(1)
  }

  return (
    <View>
      <Navbar>
        <View className={styles.navbar}>
          <Image
            src={BACK_ICON}
            className={styles.back}
            onClick={goBack}
          ></Image>

          <View className={styles.searchBox}>
            <Image src={SEARCH_ICON} className={styles.searchIcon}></Image>
            <Input
              className={styles.search}
              placeholder={activeTab === 0 ? '搜索订单名称' : '搜索工厂名称'}
              placeholderStyle={'fontSize: 30px; color: #999'}
              confirmType={'search'}
              onConfirm={confirm}
              onFocus={searchFocus}
            ></Input>
          </View>
        </View>
      </Navbar>

      {pageStatus === 1 && (
        <View className={styles.searchHistory}>
          <View className={styles.historyHeader}>
            <Text className={styles.historyTitle}>搜索历史</Text>
            <Image src={DELETE_ICON} className={styles.delIcon}></Image>
          </View>
          {isArray(historySearch) &&
            historySearch.map((item, idx) => {
              return (
                <View
                  onClick={() => searchTarget(item)}
                  key={idx}
                  className={styles.searchHistoryItem}
                >
                  {item}
                </View>
              )
            })}
        </View>
      )}

      {pageStatus === 2 && (
        <View>
          <View className={styles.tabs}>
            <AtTabs
              onClick={tabChange}
              current={activeTab}
              tabList={tabList}
            ></AtTabs>
          </View>
          <View>
            <View className={styles.searchBars}>
              {searchConfigs.map((item, i) => {
                let img =
                  !params[item.field] || !params[item.field].length
                    ? UN_SELECTED_ICON
                    : SELECTED_ICON

                let name =
                  !params[item.field] || !params[item.field].length
                    ? styles.unselectedText
                    : styles.selectedText

                return (
                  <View
                    className={styles.searchItem}
                    key={i}
                    onClick={item.onClick}
                  >
                    <Text className={name}>{item.label}</Text>
                    <Image
                      src={img}
                      className={
                        'sort' in item ? styles.sortIcon : styles.selectIcon
                      }
                    />
                  </View>
                )
              })}

              {activeTab === 0 && (
                <View className={styles.searchItem} onClick={sortClick}>
                  <Text
                    className={
                      params['sort'] === -1
                        ? styles.unselectedText
                        : styles.selectedText
                    }
                  >
                    有效时间
                  </Text>
                  <Image
                    src={SORT_MAP.get(params['sort'])}
                    className={styles.sortIcon}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {pageStatus === 2 &&
        dataSource.map((data, idx) => {
          return <Card key={idx} data={data} type={activeTab}></Card>
        })}
      {pageStatus === 2 && dataSource.length >= total && init && (
        <View className={styles.noMoreText}>没有更多了</View>
      )}

      {areaFlag && (
        <AreaModal
          visible={areaFlag}
          onCancel={areaModalShow}
          title={'地区要求'}
          callback={event => handleChange(event, 'cityIds')}
          value={params['cityIds'] || []}
        />
      )}
      {productFlag && (
        <CusProductModal
          visible={productFlag}
          onCancel={productModalShow}
          callback={event => handleChange(event, 'categoryCodes')}
          value={params['categoryCodes'] || []}
          keyName={'code'}
          // type={'single'}
        />
      )}
      {materialFlag && (
        <CusMaterialModal
          visible={materialFlag}
          onCancel={materialModalShow}
          callback={event => handleChange(event, 'plusMaterialTypeList')}
          value={params['plusMaterialTypeList'] || []}
        />
      )}

      {effectiveFlag && (
        <CusModal
          options={effectiveLocation}
          visible={effectiveFlag}
          onCancel={effectiveeModalShow}
          title={'车位要求'}
          callback={event => handleChange(event, 'effectiveLocation')}
          value={params['effectiveLocation'] || []}
          type={'single'}
        />
      )}
    </View>
  )
}

export default observer(Search)
