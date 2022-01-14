import { View, Image } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import { useRef, useEffect } from 'react'
import styles from './index.module.less'

const business =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/images/business.jpg'

const national =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/images/national.jpg'

const portrait =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/images/portrait.jpg'
const ImagePicker = props => {
  const { files, callback, count, showAddBtn, addTitle } = props
  const ref = useRef<any>()

  const handleCilck = () => {
    ref.current.chooseFile()
  }

  return (
    <View className={styles.imgBox}>
      <AtImagePicker
        ref={ref}
        files={files}
        onChange={callback}
        count={count}
        showAddBtn={showAddBtn}
      />
      {showAddBtn && (
        <View onClick={handleCilck} className={styles.imgMask}>
          {addTitle === 'business' ? (
            <Image src={business} className={styles.addIcon}></Image>
          ) : null}
          {addTitle === 'national' ? (
            <Image src={national} className={styles.addIcon}></Image>
          ) : null}
          {addTitle === 'portrait' ? (
            <Image src={portrait} className={styles.addIcon}></Image>
          ) : null}
        </View>
      )}
    </View>
  )
}

export default ImagePicker
