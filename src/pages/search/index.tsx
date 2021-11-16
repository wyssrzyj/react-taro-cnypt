import { View, Image, Input, Text } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import styles from './index.module.less'
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { useStores, observer } from '@/store/mobx'
import { CusMaterialModal, CusProductModal, Navbar } from '@/components'
import { cloneDeep, isArray, isEmpty } from 'lodash'
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
SORT_TYPE.set(0, 'asc')
SORT_TYPE.set(1, 'desc')

const Search = () => {
  const { orderStore } = useStores()
  const { getNewFactory, getOrderList } = orderStore

  const tabList = [
    {
      title: '搜订单'
    },
    {
      title: '搜工厂'
    }
  ]

  const searchConfigs = [
    {
      label: '地区',
      selected: false,
      field: 'cityIds',
      onClick: () => areaModalShow()
    },
    {
      label: '主营类别',
      field: 'mainCategoriesList',
      selected: false,
      onClick: () => productModalShow()
    },
    {
      label: '面料类型',
      field: 'plusMaterialType',
      selected: false,
      onClick: () => materialModalShow()
    }
  ]

  const [params, setParams] = useState<any>({
    sort: -1,
    pageSize: 10
  })
  const [historySearch, setHistorySearch] = useState<any[]>([])
  const [pageStatus, setPageStatus] = useState<number>(1) // 1 搜索历史 2 搜索列表
  const [activeTab, setActiveTab] = useState<number>(0) // 0 订单 1 工厂
  const [areaFlag, setAreaFlag] = useState<boolean>(false)
  const [productFlag, setProductFlag] = useState<boolean>(false)
  const [materialFlag, setMaterialFlag] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [pageNum, setPageNum] = useState(1)
  const [init, setInit] = useState<boolean>(false)

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
    console.log(params, 'params')
  }, [params])

  useEffect(() => {
    ;(async () => {
      if (pageStatus === 1) return
      setLoading(true)
      const nData = cloneDeep(dataSource)
      let nParams = cloneDeep(params)
      nParams.pageNum = pageNum
      nParams = { ...nParams, ...nParams['mainCategoriesList'] }

      delete nParams.sort
      delete nParams.mainCategoriesList
      const fn = activeTab === 0 ? getOrderList : getNewFactory
      const res = (await fn(nParams)) || {}
      console.log(res)

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

  const goBack = () => {
    Taro.navigateBack()
  }

  const searchChange = event => {
    console.log('🚀 ~ file: index.tsx ~ line 20 ~ searchChange ~ event', event)
  }

  const confirm = event => {
    const nParams = cloneDeep(params)
    const nSearch = cloneDeep(historySearch) || []
    const {
      detail: { value }
    } = event
    nSearch.push(value)
    setHistorySearch(nSearch)
    Taro.setStorageSync('search', nSearch)
    nParams['name'] = value
    setParams(nParams)
    setPageStatus(2)
  }

  const searchTarget = target => {
    console.log('🚀 ~ file: index.tsx ~ line 57 ~ Search ~ target', target)
    setPageStatus(2)
  }

  const tabChange = tab => {
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
              onChange={searchChange}
              className={styles.search}
              placeholder={pageStatus === 1 ? '搜索订单名称' : '搜索工厂名称'}
              placeholderStyle={'fontSize: 30px; color: #999'}
              confirmType={'search'}
              onConfirm={confirm}
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

                if (item.field === 'mainCategoriesList') {
                  img =
                    isEmpty(params['mainCategoriesList']) ||
                    !params['mainCategoriesList']['mainCategoryChildId']
                      ? UN_SELECTED_ICON
                      : SELECTED_ICON
                  name =
                    isEmpty(params[item.field]) ||
                    !params['mainCategoriesList']['mainCategoryChildId']
                      ? styles.unselectedText
                      : styles.selectedText
                }
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
          callback={event => handleChange(event, 'mainCategoriesList')}
          value={params['mainCategoriesList'] || []}
          type={'single'}
        />
      )}
      {materialFlag && (
        <CusMaterialModal
          visible={materialFlag}
          onCancel={materialModalShow}
          callback={event => handleChange(event, 'plusMaterialType')}
          value={params['plusMaterialType'] || []}
        />
      )}
    </View>
  )
}

export default observer(Search)
