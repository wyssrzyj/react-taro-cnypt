import { View, Button, Image, Text, CoverView } from '@tarojs/components'
import styles from './index.module.less'
import { AtFloatLayout, AtTabs, AtTabsPane } from 'taro-ui'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import classNames from 'classnames'
import { useStores, observer } from '@/store/mobx'

const CusProductModal = props => {
  const {
    onCancel,
    visible,
    callback,
    value,
    type = 'multiple',
    keyName = 'id'
  } = props

  const { commonStore } = useStores()
  const { productCategoryList } = commonStore

  const [productList, setProductList] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<number>(0)
  const [selectValues, setSelectValues] = useState<string[]>(value)
  const [childValue, setChildValue] = useState<string>(
    value.mainCategoryChildId
  )

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

    if (type === 'single') {
      setChildValue(childValue === cur ? null : cur)
    }
    if (type === 'multiple') {
      if (selectCopyValues.includes(cur)) {
        selectCopyValues = selectCopyValues.filter(item => item !== cur)
      } else {
        selectCopyValues.push(cur)
      }
      setSelectValues(selectCopyValues)
    }
  }

  const submit = () => {
    callback && type === 'multiple' && callback(selectValues)

    if (callback && type === 'single') {
      const target = productList[activeTab]
      const mainCategoryParentId = childValue ? target[keyName] : ''
      const mainCategoryChildId = childValue
      callback({
        mainCategoryParentId,
        mainCategoryChildId
      })
    }

    onClose()
  }

  return (
    <AtFloatLayout
      className={styles.box}
      isOpened={visible}
      title="主营类别"
      onClose={onClose}
    >
      <AtTabs
        className={styles.tabs}
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
                        type === 'multiple' && selectValues.includes(i[keyName])
                          ? styles.activeTag
                          : '',
                        type === 'single' && childValue === i[keyName]
                          ? styles.activeTag
                          : ''
                      )}
                      onClick={() => tagClick(i[keyName])}
                    >
                      <Image
                        src={''}
                        className={classNames(
                          styles.img,
                          type === 'multiple' &&
                            selectValues.includes(i[keyName])
                            ? styles.activeImg
                            : '',
                          type === 'single' && childValue === i[keyName]
                            ? styles.activeImg
                            : '',
                          !'' ? styles.emptyImg : ''
                        )}
                      ></Image>
                      <Text className={styles.tagText}>{i.name}</Text>
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
