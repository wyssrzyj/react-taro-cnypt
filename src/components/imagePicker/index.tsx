import { View, Image } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import { useRef, useEffect } from 'react'
import styles from './index.module.less'

const ADD_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/imageAdd.png'

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
          <Image src={ADD_ICON} className={styles.addIcon}></Image>
          <View className={styles.addText}>{addTitle}</View>
        </View>
      )}
    </View>
  )
}

export default ImagePicker
