import styles from './index.module.less'
import { AtIcon } from 'taro-ui'
import { View, Text, Image } from '@tarojs/components'

function index() {
  return (
    //   主体
    <View className={styles.external}>
      <View className={styles.major}>
        {/* 头部 */}
        <View className={styles.top}>
          <View className={styles.content}>
            <View className={styles.factorys}>万家女装诚寻针梭织…</View>
            <AtIcon value="chevron-right" size="15" color="#999999"></AtIcon>
          </View>
          <View className={styles.red}>待处理</View>
        </View>
        <View className={styles.line}></View>
        {/* 主体 */}
        <View className={styles.subject}>
          {/* img */}
          <Image
            className={styles.img}
            src="https://img1.baidu.com/it/u=212415105,855332761&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=388"
            alt=""
          />
          <View>
            <Text className={styles.factory}>杭州汇丰服装厂</Text>
            <View>
              <Text>
                <Text className={styles.parking}>有效车位</Text>{' '}
                <Text className={styles.quantity}>50人</Text>
              </Text>
            </View>

            <View className={styles.machining}>
              <Text className={styles.processingType}>清加工</Text>
            </View>
            <View className={styles.addressExternal}>
              <AtIcon value="map-pin" size="15" color="#999999"></AtIcon>
              <Text className={styles.region}>浙江省 杭州市 余杭区</Text>
            </View>
          </View>
        </View>
        <View className={styles.line}></View>
        {/* 信息 */}
        <View className={styles.informationFather}>
          <View className={styles.flex}>
            <View className={styles.information}>报价信息</View>
            <View>暂无</View>
          </View>
          <View className={styles.flex}>
            <View className={styles.information}>收款信息</View>
            <View>暂无</View>
          </View>
          <View className={styles.flex}>
            <View className={styles.information}>可接产品数</View>
            <View>暂无</View>
          </View>
          <View className={styles.flex}>
            <View className={styles.information}>备注</View>
            <View className={styles.remarks}>
              暂无暂无暂无暂无暂无暂无暂无暂无 暂无 暂无 暂无 暂无 暂无 暂无
              暂无 暂无 暂无
            </View>
          </View>
        </View>
        <View className={styles.line}></View>
        {/* 操作 */}
        <View className={styles.operation}>
          {/* 待处理 */}
          <View>
            <View className={styles.telephone}>
              <AtIcon value="phone" size="15" color="#333333"></AtIcon>
              <Text>电话联系</Text>
            </View>
            <View className={styles.determine}>确认合作</View>

            <View className={styles.refuse}>谢绝</View>
          </View>
          {/* 已确认 */}
          {/* <View>
            <View className={styles.telephone}>
              <AtIcon value="phone" size="15" color="#333333"></AtIcon>
              <Text>电话联系</Text>
            </View>
            <View className={styles.cancel}>取消确认</View>
          </View> */}
          {/* 已谢绝 */}
          {/* <View>
            <View className={styles.cancel}>删除记录</View>
          </View> */}
        </View>
      </View>
    </View>
  )
}

export default index
