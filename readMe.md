#### px 转换

设计稿宽 750px 开发时宽度为实际设计稿尺寸的一半

#### 状态管理器 mobx

#### 数据请求 Taro.request 封装在 service 中

#### 环境切换 修改 service 中的 baseUrl 文件 并重启项目

上线正式环境
修改 baseUrl 中 process.env.NODE_ENV === 'production'下的链接
上线测试环境
修改 baseUrl 中 process.env.NODE_ENV === 'production'下的链接

通过 npm run build:weapp:prod

在微信开发公工具中 通过上传按钮 上传版本

#### 静态资源 放在 source 中

#### style

display: flex;
左右排版: justify-content: space-between; 居中父节点: align-items: center;
上下排版: 父节点 display:flex; flex-direction: column;

同一页面位移处理: 能用 transform 就不用 position
position: absolute; top: 0; left: 0;

transform: translate(-50%, -50%)

单行省略:
overflow: hidden;
text-overflow: ellipsis;
width: 50px;
white-space: nowrap;
文本内容换行: 一般使用 word-break: break-all; 其他情况再调整

padding(内边距),margin(外边距) 尽量别用负数 看情况可使用 transform

居中 margin: 0 auto;

文本加粗: font-weight: bold;

#### 页面加载情况处理

```
const [loading, setLoading] = useState<boolean>(false)
const [data, setData] = useState<any[]>([])

useEffect(() => {
  (async () => {
    setLoading(true)
    const res = await getData()
    setData(res.records)
    setLoading(false)
  })()
}, [params])

{!loading && !data.length ? (

  <div>数据为空</div>
) : null}
```

#### 用户信息 storage

通过同步方法获取 判断是否为空数据 默认为空对象 防止报错
const userInfomation = Taro.getStorageSync('userInfo')
? JSON.parse(Taro.getStorageSync('userInfo'))
: {}

const currentUser = Taro.getStorageSync('currentUser')
? JSON.parse(Taro.getStorageSync('currentUser'))
: {}

#### 通过 id 或者 value 等 获取树状结构数据的对应目标

调用 tool 里面的 matchTreeData 方法
