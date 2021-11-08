import { View, Button } from '@tarojs/components'
import styles from './index.module.less'
import { AtFloatLayout, AtTabs, AtTabsPane } from 'taro-ui'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'

const CusProductModal = props => {
  const { onCancel, visible, callback } = props
  const { commonStore } = useStores()
  const { productCategoryList } = commonStore

  const [productList, setProductList] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<number>(0)
  const [selectValues, setSelectValues] = useState<string[]>([])

  useEffect(() => {
    setProductList(
      cloneDeep(productCategoryList).map((item: any) => {
        item.title = item.name
        return item
      })
    )
  }, [productCategoryList])

  const productTabChange = tab => {
    setActiveTab(tab)
  }

  const onClose = () => {
    onCancel && onCancel()
  }

  const tagClick = cur => {
    let selectCopyValues = cloneDeep(selectValues)
    if (selectCopyValues.includes(cur)) {
      selectCopyValues = selectCopyValues.filter(item => item !== cur)
    } else {
      selectCopyValues.push(cur)
    }
    setSelectValues(selectCopyValues)
  }

  const submit = () => {
    callback && callback(selectValues)
    onClose()
  }

  return (
    <AtFloatLayout isOpened={visible} title="主营类别" onClose={onClose}>
      <AtTabs
        current={activeTab}
        scroll
        height="200px"
        tabDirection="vertical"
        tabList={productList}
        onClick={productTabChange}
      >
        {productList.map((item, idx) => {
          return (
            <AtTabsPane
              tabDirection="vertical"
              current={activeTab}
              index={idx}
              className={styles.tabsPane}
            >
              <View className={styles.tabContent}>
                {item.children.map((i, t) => {
                  return (
                    <View
                      key={t}
                      className={classNames(
                        styles.tag,
                        selectValues.includes(i.id) ? styles.activeTag : ''
                      )}
                      onClick={() => tagClick(i.id)}
                    >
                      {i.name}
                    </View>
                  )
                })}
              </View>
            </AtTabsPane>
          )
        })}
      </AtTabs>

      <View>
        <Button type={'primary'} onClick={submit} className={styles.btn}>
          确定
        </Button>
      </View>
    </AtFloatLayout>
  )
}

export default observer(CusProductModal)
