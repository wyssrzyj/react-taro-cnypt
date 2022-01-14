import { useState, useEffect } from 'react'
import styles from './index.module.less'
import { View, Text } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { useStores, observer } from '@/store/mobx'
import { cloneDeep, isEmpty } from 'lodash'
import Taro from '@tarojs/taro'
import ImagePicker from './imagePicker'
import { upload } from '@/utils/upload'

const host =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/images'

export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const Verify = () => {
  const { userInterface } = useStores()
  const {
    enterpriseCertificateSubmission,
    obtainEnterpriseCertificateInformation
  } = userInterface

  const [totalData, setTotalData] = useState<any>({}) //总数据
  const [submit, setSubmit] = useState<any>(false) //确认
  const [chinese, setChinese] = useState<any>(false) //正则中文判断

  // 跳转的数据
  useEffect(() => {
    api()
  }, [])

  // 回显
  const api = async () => {
    let enterpriseId = JSON.parse(Taro.getStorageSync('userInfo')).enterpriseId
    const res = await obtainEnterpriseCertificateInformation({
      enterpriseId: enterpriseId
    })
    res.enterpriseAdjunct = [{ url: res.enterpriseCredentialList[0].fileUrl }]
    res.positive = [{ url: res.enterpriseCredentialList[1].fileUrl }]
    res.reverse = [{ url: res.enterpriseCredentialList[2].fileUrl }]
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
    //名称只能输入中文正则判断
    let arr = /[^\u4E00-\u9FA5]/g
    setChinese(arr.test(totalData.legalPersonName))
    setSubmit(true)
    // 图片处理
    const enterpriseCredentialList = [
      {
        businessId: JSON.parse(Taro.getStorageSync('userInfo')).enterpriseId,
        businessItemId: 'business_license',
        fileUrl: totalData.enterpriseAdjunct[0].url
      },
      {
        businessId: JSON.parse(Taro.getStorageSync('userInfo')).enterpriseId,
        businessItemId: 'legal_person_id_photo_face',
        fileUrl: totalData.positive[0].url
      },
      {
        businessId: JSON.parse(Taro.getStorageSync('userInfo')).enterpriseId,
        businessItemId: 'legal_person_id_photo_national',
        fileUrl: totalData.reverse[0].url
      }
    ]
    totalData.enterpriseCredentialList = enterpriseCredentialList
    totalData.enterpriseId = JSON.parse(
      Taro.getStorageSync('userInfo')
    ).enterpriseId

    if (!arr.test(totalData.legalPersonName) && totalData['legalPersonName']) {
      let arr = await enterpriseCertificateSubmission(totalData)
      if (arr.code === 200) {
        Taro.redirectTo({
          url: '/pages/personal/findingsOfAudit/index'
        })
      }
    }
  }
  Taro.setNavigationBarTitle({
    title: '企业证件管理'
  })
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
          {/* 名称 */}
          <>
            <View className={styles.container}>
              <View className={styles.title}>
                <Text className={styles.text}>
                  <Text className={styles.required}>*</Text>企业名称
                </Text>
              </View>
              <View className={styles.txt}>
                <AtInput
                  editable={false}
                  name="enterpriseName"
                  border={false}
                  type="text"
                  placeholder="请填写资质名称"
                  value={totalData['enterpriseName'] || ''}
                  onChange={event => valuesChange('enterpriseName', event)}
                />
              </View>
            </View>
            {submit && !totalData['enterpriseName'] ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请填写资质名称</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </>
          {/* 法人姓名 */}
          <>
            <View className={styles.container}>
              <View className={styles.title}>
                <Text className={styles.text}>
                  <Text className={styles.required}>*</Text>法人姓名
                </Text>
              </View>
              <View className={styles.txt}>
                <AtInput
                  // required
                  // key="paymentMethod"
                  name="legalPersonName"
                  border={false}
                  type="text"
                  placeholder="请填写法人姓名"
                  value={totalData['legalPersonName'] || ''}
                  onChange={event => valuesChange('legalPersonName', event)}
                />
              </View>
            </View>
            {submit && !totalData['legalPersonName'] ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请填写法人姓名</Text>
                  </Text>
                </View>
              </View>
            ) : null}
            {submit && chinese ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请填写中文</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </>
          {/* 营业执照 */}
          <>
            <View className={styles.containerImg}>
              <View className={styles.title}>
                <Text className={styles.textImg}>
                  <Text className={styles.required}>*</Text>营业执照
                </Text>
              </View>
              <View className={styles.txt}>
                <ImagePicker
                  addTitle={'business'}
                  files={totalData['enterpriseAdjunct'] || []}
                  callback={event => imgsChange(event, 'enterpriseAdjunct')}
                  count={1}
                  showAddBtn={
                    totalData['enterpriseAdjunct'] &&
                    totalData['enterpriseAdjunct'].length >= 1
                      ? false
                      : true
                  }
                ></ImagePicker>
              </View>
            </View>
            {console.log(
              '判断是否有值',
              isEmpty(totalData['enterpriseAdjunct'])
            )}
            <View className={styles.division}></View>

            {submit && isEmpty(totalData['enterpriseAdjunct']) ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请上传营业执照</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </>
          {/* 法人身份证 */}
          {/* 正面 */}
          <>
            <View className={styles.containerImg}>
              <View className={styles.title}>
                <Text className={styles.textImg}>
                  {' '}
                  <Text className={styles.required}>*</Text>身份证人像面
                </Text>
              </View>
              <View className={styles.txt}>
                <ImagePicker
                  addTitle={'portrait'}
                  files={totalData['positive'] || []}
                  callback={event => imgsChange(event, 'positive')}
                  count={1}
                  showAddBtn={
                    totalData['positive'] && totalData['positive'].length >= 1
                      ? false
                      : true
                  }
                ></ImagePicker>
              </View>
            </View>
            <View className={styles.division}></View>
            {submit && isEmpty(totalData['positive']) ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请上传身份证正面</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </>
          {/* 反面 */}
          <>
            <View className={styles.containerImg}>
              <View className={styles.title}>
                <Text className={styles.textImg}>
                  <Text className={styles.required}>*</Text>身份证国徽面
                </Text>
              </View>
              <View className={styles.txt}>
                <ImagePicker
                  addTitle={'national'}
                  files={totalData['reverse'] || []}
                  callback={event => imgsChange(event, 'reverse')}
                  count={1}
                  showAddBtn={
                    totalData['reverse'] && totalData['reverse'].length >= 1
                      ? false
                      : true
                  }
                ></ImagePicker>
              </View>
            </View>
            <View className={styles.division}></View>
            {submit && isEmpty(totalData['reverse']) ? (
              <View className={styles.tips}>
                <View className={styles.requiredColor}>
                  <Text className={styles.color}>
                    <Text className={styles.text}>请上传身份证国徽面</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </>
        </View>
      </View>

      <View className={styles.btn}>
        <View className={styles.onOk} onClick={onSubmit}>
          提交审核
        </View>
      </View>
    </View>
  )
}

export default observer(Verify)
