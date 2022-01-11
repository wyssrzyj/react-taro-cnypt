import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Text, Radio, Picker } from '@tarojs/components'
import { AtInput, AtList, AtListItem } from 'taro-ui'
import { useRouter } from '@tarojs/taro'
import { useStores, observer } from '@/store/mobx'
import moment from 'moment'
import classNames from 'classnames'
import { cloneDeep, isEmpty } from 'lodash'
import Taro from '@tarojs/taro'
import { ImagePicker } from '@/components'
import { upload } from '@/utils/upload'
import Qualification from './qualification'

const host =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/images'

export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const { userInterface } = useStores()
  const { querySingleQualification, saveUpdate } = userInterface

  const [radioDate, setRadioDate] = useState(true) //单选
  const [totalData, setTotalData] = useState<any>({}) //总数据
  const [submit, setSubmit] = useState<any>(false) //确认
  const { params } = useRouter() //url数据

  // 跳转的数据
  useEffect(() => {
    if (!isEmpty(params.id)) {
      api(params.id)
    }
  }, [params.id])
  // useEffect(() => {}, [totalData])

  // 回显
  const api = async id => {
    let res = await querySingleQualification({ id: id })
    res.certificateImageURI = [{ url: res.certificateImageURI }]
    setRadioDate(!res.neverExpire) //单选回显
    setTotalData(res)
  }

  // 总数据方法
  const valuesChange = (key, value) => {
    const newParams = cloneDeep(totalData) //深拷贝
    newParams[key] = value
    setTotalData(newParams) //把新数据放到useState中
  }
  // 确认事件
  const onSubmit = async () => {
    // 数据处理
    const date = Date.now() //获取当前时间
    totalData.expiryDate = radioDate
      ? moment(totalData.expiryDate).valueOf()
      : null
    totalData.certificateImageURI = totalData.certificateImageURI
      ? totalData.certificateImageURI[0].url
      : null
    totalData.neverExpire = radioDate ? 0 : 1
    totalData.enterpriseId = JSON.parse(
      Taro.getStorageSync('userInfo')
    ).enterpriseId
    totalData.id = params.id ? params.id : null
    // 判断 选择的时间是否大于现在的时间  大于传 1 反之传3
    totalData.status =
      totalData.expiryDate === null ? 1 : totalData.expiryDate > date ? 1 : 3
    let res = await saveUpdate(totalData)
    setSubmit(true)
    if (res.code === 200) {
      Taro.navigateTo({
        url: '/pages/personal/qualificationCertification/index?id'
      })
    }
  }
  // 取消
  const qualification = () => {
    Taro.navigateTo({
      url: '/pages/personal/qualificationCertification/index?id'
    })
  }
  Taro.setNavigationBarTitle({
    title: params.id ? '编辑资质' : '新增资质'
  })

  // 单选事件
  const radioEvent = () => {
    setRadioDate(!radioDate)
  }

  // 图片
  const imgsChange = async (value, field) => {
    const nParams = cloneDeep(totalData)
    const allImgs: any = []
    value.forEach(item => {
      allImgs.push(customRequest(item))
    })
    await Promise.all(allImgs).then(res => {
      nParams[field] = res
      setTotalData(nParams)
    })
  }
  const customRequest = async ({ url }) => {
    const imgUrl = await upload(url)
    return {
      url: imgUrl,
      thumbUrl: imgUrl,
      name: imgUrl.replace(host, '')
    }
  }
  return (
    <View className={styles.phoneLogin}>
      <View className={styles.outerLayer}>
        <View className={styles.external}>
          {/* 资质名称 */}
          <>
            <View className={styles.container}>
              <View className={styles.title}>
                <Text className={styles.text}>
                  <Text className={styles.required}>*</Text>资质名称
                </Text>
              </View>
              <View className={styles.txts}>
                <Qualification
                  onChanges={event => valuesChange('certificationName', event)}
                  value={totalData['certificationName']}
                />
              </View>
            </View>
            {submit && !totalData['certificationName'] ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请填写资质名称</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </>
          {/* 证书编号 */}
          <>
            <View className={styles.container}>
              <View className={styles.title}>
                <Text className={styles.text}>
                  <Text className={styles.required}>*</Text>证书编号
                </Text>
              </View>
              <View className={styles.txt}>
                <AtInput
                  // required
                  // key="paymentMethod"
                  name="certificationCode"
                  border={false}
                  type="text"
                  placeholder="请填写证书编号"
                  value={totalData['certificationCode'] || ''}
                  onChange={event => valuesChange('certificationCode', event)}
                />
              </View>
            </View>
            {submit && !totalData['certificationCode'] ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请填写证书编号</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </>
          {/* 有效期 */}
          <>
            <View className={styles.container}>
              <View className={styles.titles}>
                <Text className={styles.required}>*</Text>
                有效期
              </View>
              <View className={styles.txt}>
                <Radio
                  onClick={radioEvent}
                  value={1}
                  checked={radioDate}
                  className={styles.radioText}
                  style={{ transform: 'scale(0.8)' }}
                >
                  选择截止时间
                </Radio>

                <Radio
                  onClick={radioEvent}
                  value={1}
                  checked={!radioDate}
                  className={styles.radioText}
                  style={{ transform: 'scale(0.8)' }}
                >
                  长期有效
                </Radio>
              </View>
            </View>
            {/* 时间 */}
            {radioDate === true ? (
              <>
                <View className={styles.container}>
                  <View className={styles.title}>
                    <Text className={styles.text}>
                      <Text className={styles.required}>*</Text>截止时间
                    </Text>
                  </View>
                  <View className={styles.time}>
                    <Picker
                      mode="date"
                      onChange={event =>
                        valuesChange('expiryDate', event.detail.value)
                      }
                    >
                      <AtList>
                        <AtListItem
                          className={classNames(
                            styles.timeListItem,
                            !totalData['expiryDate']
                              ? styles.placeholder
                              : styles.selectText
                          )}
                          extraText={
                            totalData['expiryDate']
                              ? moment(totalData['expiryDate']).format(
                                  'YYYY-MM-DD'
                                )
                              : '请选择时间'
                          }
                        />
                      </AtList>
                    </Picker>
                  </View>
                </View>

                {submit && !totalData['expiryDate'] ? (
                  <View className={styles.tips}>
                    <View className={styles.requiredColor}>
                      <Text className={styles.color}>
                        <Text className={styles.text}>请选择截止时间</Text>
                      </Text>
                    </View>
                  </View>
                ) : null}
              </>
            ) : null}
          </>
          {/* 图片 */}
          <>
            <View className={styles.containerImg}>
              <View className={styles.title}>
                <Text className={styles.textImg}>
                  <Text className={styles.required}>*</Text>资质上传
                </Text>
              </View>
              <View className={styles.txt}>
                <ImagePicker
                  addTitle={'logo'}
                  files={totalData['certificateImageURI'] || []}
                  callback={event => imgsChange(event, 'certificateImageURI')}
                  count={1}
                  showAddBtn={
                    totalData['certificateImageURI'] &&
                    totalData['certificateImageURI'].length >= 1
                      ? false
                      : true
                  }
                ></ImagePicker>
              </View>
            </View>
            <View className={styles.division}></View>
            {submit && !totalData['certificateImageURI'] ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请上传资质图片</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </>
        </View>
      </View>

      <View className={styles.btn}>
        <View className={styles.onOk} onClick={onSubmit}>
          确认
        </View>
        <View className={styles.cancel} onClick={qualification}>
          取消
        </View>
      </View>
    </View>
  )
}

export default observer(Verify)
