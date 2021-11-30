import { Image, View, Text } from '@tarojs/components'
import styles from './index.module.less'
import Taro from '@tarojs/taro'
import { Navbar } from '@/components'

const BACK_ICON =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/mobile/icon/black_back.png'

const userAgreement = () => {
  const handleClick = () => {
    Taro.redirectTo({ url: '/pages/personal/myEexcellentProduct/index' })
  }
  return (
    <View className={styles.phoneLogin}>
      <Navbar>
        <View className={styles.navbars}>
          <Image
            src={BACK_ICON}
            className={styles.backs}
            onClick={handleClick}
          ></Image>
          <View className={styles.navTitles}>用户协议</View>
        </View>
      </Navbar>
      {/* 内容 */}
      <View className={styles.container}>
        <View className={styles.top}>
          <Text>《优产用户协议》</Text>
        </View>
        <View className={styles.top}>
          <Text>【本协议于2021年10月21日最新修订】</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　尊敬的用户：欢迎您注册优产（以下简称“本平台”）帐号并使用优产的服务。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　《优产用户协议》（以下简称“本用户协议”或“本协议”）是您与优产之间就注册优产账号及使用优产各项服务等相关事宜订立的协议。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　当您在进行用户注册、使用优产的服务前，请认真阅读《优产用户协议》，当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与优产达成一致，成为优产的用户;
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　如您不同意本用户协议，请不要点击“我已阅读并同意”、“注册”或类似内容，请勿注册或使用优产的服务。如您对本用户协议的内容（特别是涉及免除或者责任限制的条款）有任何疑惑或不满意，可随时按照本用户协议中列明的联系方式与我们联系，我们将及时处理您的请求或投诉，并针对您的需求进行解释。;
          </Text>
        </View>
        <View className={styles.bold}>
          <Text> 　一、 用户协议的主体和范围;</Text>
        </View>
        <View className={styles.content}>
          <Text> 　1. 协议主体;</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　“优产”是杭州优产信息技术有限公司旗下运营或向您提供具体服务的相关主体的统称。“用户”是指具有完全民事行为能力的优产使用者（用户身份包括：工厂企业及负责人、公司、个人等），在本用户协议中也称呼为“您”。请注意，如您选择不注册优产帐号，您可作为“访客”使用优产服务的部分功能，并遵守本服务协议。
          </Text>
        </View>
        <View className={styles.content}>
          <Text> 　2. 服务</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　本用户协议适用于本协议项下提供的优产网页及相关移动客户端（包括IOS、安卓及已有或未来将新增的任何其他移动客户端）等各类平台或媒介的服务。
          </Text>
        </View>
        <View className={styles.content}>
          <Text> 　 3. 协议内容</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            本协议是优产与您之间的主服务协议，由于优产向您提供多种服务，如您选择使用相关服务，以下协议可能构成您与优产之间的补充协议，补充协议与本协议不可分割且具有同等法律效力，您应当遵守相关协议内容及其中援引的文档：
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （1）《优产隐私政策》：优产严格保护您的信息安全与隐私，对您个人信息的收集、使用和共享严格遵守《优产隐私政策》；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 （2）
            用户根据自身寻找服装工厂或寻找服装订单需求可以向本平台购买其他付费服务/产品，相关服务/产品的部分或全部利用本网站所提供的互联网信息业务和增值业务（载体包括但不限于网页、APP、微信公众号、微信小程序等），也应遵守本用户协议的规定。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            您理解并同意，我们可能会不时修改上述各项协议/规则/政策。若有重大变更，我们将通过网页或推送通知等有效方式发布或发送关于条款更改的公告，使您有机会在更改生效之前查看更改。如您不同意任何更改的内容，可停止更改内容所涉及的服务或通过联系客服以注销账号。如您在上述更改内容实施后继续使用所涉及的服务，将视为您已同意各项更新修改内容。
          </Text>
        </View>
        <View className={styles.bold}>
          　<Text> 　二、用户注册与使用</Text>
        </View>
        <View className={styles.content}>
          <Text>　 1.服务资格</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            申请注册成为优产的用户应同时满足下列全部条件：您承认您拥有购买我们提供的服务产品所必须的完全民事权利能力和民事行为能力，在注册之日以及此后使用优产服务期间必须以找服装订单和/或找服装工厂为目的；您应当承诺您已经获得了相应的服务资格，即您具备相应的民事行为能力签订本用户协议并且已经达到优产对“最低年龄”的要求。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 2.注册资料</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            用户应遵守优产软件注册机制的要求，向优产提供本人真实、正确、最新及完整的资料；如注册为工厂企业的用户，应保证及时更新本人提供的“工厂名称、产品分类、生产类型和联系信息”等相关授权信息及材料，并确保前述授权的真实性；用户应保证其商务合作行为，包括但不限于发布找服装订单信息、与订单方沟通等均在使用本平台期间持续有效；通过认证的用户应保持其接单帐号与对应的授权单位具有唯一性。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            若用户提供任何错误、不实或不完整的资料，或优产有理由怀疑资料为错误、不实或不完整及违反用户注册条款的，或优产有理由怀疑其用户资料、言行等违反《优产平台信息发布规则》的，优产有权修改用户的注册名称、说明、发布的信息等，或暂停或终止该用户使用其帐号，或暂停或终止提供优产提供的全部或部分服务。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　若用户故意提供虚假的身份信息、公司信息进行注册，发布虚假找服装订单信息或者找服装工厂信息的，视为严重违反本用户协议，优产有权暂停或终止该用户账号并停止提供服务。虚假注册、发布虚假信息给优产造成经济、名誉等任何损失的，优产将追究该用户的法律责任。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 3.帐号安全规范</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            用户应选择保密性强且安全性高的密码，应对利用该密码及帐号所进行的一切活动负全部责任，包括任何经由优产上载、张贴或任何其它方式传送的资料、文字、照片、信息或其它资料等，无论系公开还是私下传送，均由内容提供者承担责任。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            用户的密码或帐号遭到未获授权的使用，或者发生其它任何安全问题时，用户应立即通知优产。由于用户使用不当或者其他非因优产导致的帐号、密码泄漏，进而导致其资料、信息泄漏的，由用户承担其不利后果。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            用户不得将账号主动告知第三方或提供给第三方进行使用，例如提供给第三方进行代为购买优产服务等。如因此造成用户隐私泄露或优产平台损失的，用户应当承担相应的责任。
          </Text>
        </View>

        <View className={styles.bold}>
          <Text> 　三、服务说明及规范</Text>
        </View>
        <View className={styles.content}>
          <Text>　 1.服务概况</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            优产致力于构建更受更受个人、工厂企业信赖的服装生产云端平台。优产向用户提供的服务，包括但不限于网络接单、发布订单、广告等产品及服务，为工厂企业和个人提供一站式的订单生产云端服务，提高市场竞争力。我们的服务可能会根据您的需求不时调整更新，请以我们网页或相关移动客户端的服务项目为准。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 2.使用服务前准备</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            优产通过国际互联网为用户提供网络服务，包括在线及离线的相关业务。为使用网络服务，用户应自行配备进入国际互联网所必需的设备，包括计算机、数据机或其它存取装置，并自行支付登陆国际互联网所需要的费用。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 3.发布信息</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            用户有下列行为或发布/散布/传播如下相关信息的，优产在发现或接到投诉后，有权采取冻结账户、升级认证或以其他方式暂停向该用户提供服务，并要求用户承担相应的损害赔偿责任：
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （1）发布任何违反法律法规及其他规范性文件的信息，包括但不限于属于任何非法的、骚扰性的、中伤性的、辱骂性的、恐吓性的、伤害性、庸俗、淫秽、有违社会公序良俗等的信息或言论；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （1）发布任何违反法律法规及其他规范性文件的信息，包括但不限于属于任何非法的、骚扰性的、中伤性的、辱骂性的、恐吓性的、伤害性、庸俗、淫秽、有违社会公序良俗等的信息或言论；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （2）发布虚假、不准确、不完整或具有误导性的信息等内容，包括但不限于不真实的工厂名称、产品分类、生产类型、订单和联系信息等；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （3）利用优产提供的服务索取他人隐私，侵犯个人和社会大众的隐私安全；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 （4）利用本平台可能存在的漏洞恶意充值产品或服务；</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （5）利用网站开设的功能或权限发布、编辑、传播违反法律法规及其他规范性文件、引人反感或有违风化的信息、言论或内容。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （6）其他违反法律法规或国家政策以及损害优产及其合法用户之合法权益的行为。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 4.服务规范</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （1）优产在提供网络服务时，可能会对部分网络服务收取一定的费用，在此情况下，会在相关页面上做明确的提示。如用户拒绝支付该等费用，则不能使用相关的网络服务。付费业务将在本注册条款的基础上另行规定服务条款，以规范付费业务的内容和双方的权利义务，用户应认真阅读，如用户购买付费业务，则视为接受付费业务的服务条款。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （1）优产在提供网络服务时，可能会对部分网络服务收取一定的费用，在此情况下，会在相关页面上做明确的提示。如用户拒绝支付该等费用，则不能使用相关的网络服务。付费业务将在本注册条款的基础上另行规定服务条款，以规范付费业务的内容和双方的权利义务，用户应认真阅读，如用户购买付费业务，则视为接受付费业务的服务条款。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （2）无论是付费服务还是优产的免费服务均有有效期，有效期结束后服务将自动终止，且有效期不可中断或延期。除非本注册条款或其他相关服务条款另有规定，所有付费业务均不退费。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （3）对于利用优产进行非法活动，或其言行（无论线上或者线下的）背离优产严肃找服装订单或者找服装工厂目的的，优产将严肃处理，包括将其列入黑名单、将其被投诉的情形公之于众、删除用户帐号等处罚措施，给优产造成经济或者名誉等任何损失的，优产将追究其法律责任。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （4）优产有权通过拨打电话、发送短信等方式，告知用户优产服务相关的广告信息、促销优惠等营销信息，以及邀请用户参与版本测试、用户体验反馈、回访等活动。除系统通知或重要信息外，用户可以通过优产提供的方式选择不接收上述信息。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （5）为提高优产用户找服装工厂、找服装订单的成功率和效率，优产公司可能会将优产用户的信息公开展示范围扩大至我们运营的其他平台（如微信公众号、视频号等），因此，您在使用优产时，可能还会收到来自优产公司运营的其他平台（如微信公众号、视频号等）上的注册用户向您开聊、交换微信、联系电话等相关信息。您可通过本协议的优产《个人信息保护政策》了解我们在此期间如何保障您的个人信息的安全。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （6）优产的增值服务只在产品平台上或由优产直接对外出售或者赠送使用权，用户不得在任何其他平台或渠道购买优产的虚拟产品或服务。对于用户使用非官方提供或者售卖的虚拟产品或服务造成的任何损失，优产不对其负责；因在其他平台充值或找他人代充等方式购买产品或服务导致优产遭受损失的，用户应当承担违约责任并赔偿损失。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （7）用户应通过优产软件使用相关服务，未经许可，不得通过其他第三方工具或运营平台获取优产服务，包括但不限于通过第三方软件登录优产账号、发布信息、浏览信息等。如因用户使用第三方软件导致相关信息泄漏的，优产不承担任何责任，且用户还应承担由此给优产造成的损失。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （8）用户在接受优产提供与优产注册用户或优产关联方用户进行提在线商务洽谈等即时通讯服务时，应当遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚，并保证所传输的信息真实性等底线。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　（9）用户通过优产平台与他人在线商务洽谈、拨打电话等商务场景下产生的文字、语音等形式的沟通信息，优产将会根据法律规定暂时存储，且仅用于投诉举报的处理、安全风控及离线暂存功能的实现。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （10）优产对该信息的采集、传输及存储均会采取加密、防泄露等相关措施。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （11）为保护其他用户隐私，用户不得将本条规定的其他用户通讯信息，如聊天记录等，对外进行公布。如因此造成优产损失，或者侵害其他用户权利的，应当承担违约责任或赔偿责任。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 5.关于用户在优产的上传或张贴的内容</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （1）用户在优产上传或张贴的内容（包括但不限于照片、文字、合作经历及企业评价等），视为用户授予优产公司及其关联公司免费、非独家的使用权，优产有权为展示、传播及推广前述张贴内容的目的，对上述内容进行复制、修改、出版等。该使用权持续至用户书面通知优产不得继续使用，且优产实际收到该等书面通知时止。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （2）因用户上传或张贴的内容侵犯他人权利，而导致任何第三方向优产公司提出侵权或索赔要求的，用户应承担全部责任。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （3）任何第三方对于用户在优产的公开使用区域张贴的内容进行复制、修改、编辑、传播等行为的，该行为产生的法律后果和责任均由行为人承担，与优产无关。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 6.禁止条款</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            通过优产的服务时在优产的网页上或者利用优产的服务制作、复制、发布、传播违反国家相关法律法规的违法和不良信息（用户如违反以下协议条款，优产有权在任何时候不经任何事先通知暂停或终止向该用户提供服务）：
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （1）反对宪法所确定的基本原则的；危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视、破坏民族团结的；破坏国家宗教政策，宣扬邪教和封建迷信的；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （2）散布谣言，扰乱社会秩序，破坏社会稳定的；散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权利的；含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或有悖道德、令人反感的内容的；含有中国法律、法规、规章、条例以及任何具有法律效力的规范所限制或禁止的其它内容的。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （3）使用优产服务的过程中，以任何方式危害找服装订单者和找服装工厂者任何一方合法权益的；冒充任何人或机构，包含但不限于冒充优产工作人员或以虚伪不实的方式陈述或谎称与任何人或机构有关的；发布、传播侵犯任何人的肖像权、名誉权、隐私权、专权、商标权、著作权、商业秘密的信息或言论的；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （4）将病毒或其它计算机代码、档案和程序，加以上载、张贴、发送电子邮件或以其它方式传送的；跟踪或以其它方式骚扰其他用户的；未经合法授权而截获、篡改、收集、储存或删除他人个人信息、电子邮件或其它数据资料，或将获知的此类资料用于任何非法或不正当目的；以任何方式干扰或企图干扰优产的任何产品、任何部分或功能的正常运行，或者制作、发布、传播上述工具、方法等。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （5）未能按照优产平台的流程、规则进行注册、认证或使用本服务的，违反本服务功能限制或运营策略，或采取任何措施规避前述流程、规则、限制或策略的；未经优产公司的许可使用插件、外挂或通过其他第三方工具、运营平台或任何服务接入本服务和相关系统的。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （6）利用优产账号或优产平台服务从事，包括但不限于欺诈、传销、刷流量、好评、违法物品营销等任何违法兼职或犯罪活动的；仿冒、混淆他人账号昵称、头像、功能介绍或发布找服装订单或找服装工厂内容等，或冒充、利用他人名义对外找服装订单或找服装工厂的。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （7）未经优产公司的许可，以任何目的自行或授权、允许、协助任何第三人对平台内的任何信息内容进行非法获取，用于商业用途或其他任何目的。“非法获取”是指采用包括但不限于“蜘蛛”(spider)程序、爬虫程序、拟人程序等非真实用户或避开、破坏技术措施等非正常浏览的手段、方式，读取、复制、转存、获得数据和信息内容的行为。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （8）为任何注册用户或非注册用户提供自动登录到优产平台、代办或协助他人代办身份认证服务的或代售身份认证所需的相关材料或凭据等；其他任何导致或可能导致优产公司与第三方产生纠纷、争议或诉讼的行为。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 7.平台使用规定</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （1）本协议所称“平台使用”是指用户使用优产平台服务所进行的任何行为，包括但不限于注册、登录、认证、查看直聊、账号管理、发布信息、邀约洽谈以及其他通过优产平台所进行的一切行为。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （2）优产公司提醒用户在使用优产服务时，应遵守《民法典》《中华人民共和国合同法》《中华人民共和国著作权法》《全国人民代表大会常务委员会关于维护互联网安全的决定》《中华人民共和国保守国家秘密法》《中华人民共和国电信条例》《中华人民共和国计算机信息系统安全保护条例》《中华人民共和国计算机信息网络国际联网管理暂行规定》《计算机信息系统国际联网保密管理规定》《互联网信息服务管理办法》《计算机信息网络国际联网安全保护管理办法》《互联网电子公告服务管理规定》《网络安全法》及《网络信息内容生态治理规定》等相关中国法律法规的规定。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （3）在任何情况下，如果优产公司有理由认为用户使用优产服务过程中的任何行为，包括但不限于用户的任何言论和其它行为违反或可能违反上述法律和法规的任何规定，优产公司可在任何时候不经任何事先通知终止向该用户提供服务。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （4）用户承诺在使用优产软件期间，遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等七条底线。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （5）您理解并同意，优产平台仅为用户提供找服装订单和找服装工厂信息分享、传播及获取合作机会的平台，您必须为自己的注册、认证账号下的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。关于用户通过优产平台上传、发布信息的具体规则，应阅读并遵守《优产信息发布规则》。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            （6）用户同意不对优产提供的服务或服务的任何部分，进行复制、拷贝、出售、转售或用于任何其他商业目的。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 8.用户权利</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 1.
            随时查询及请求阅览，但因极少数特殊情况（如被网站加入黑名单等）无法查询及提供阅览的除外；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 2.
            随时请求补充或更正，但因极少数特殊情况（如网站或有关机关为司法程序保全证据等）无法补充或更正的除外；
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 3.
            随时请求注销优产账号。关于注销帐号的相关规则和流程，请联系客服处理。您注销成功后，我们将根据法律法规的要求尽快删除您的个人信息或作匿名化处理。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>　 9.信息储存和限制</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            优产有权制定一般措施及限制，包含但不限于软件服务将保留的聊天讯息、所张贴内容或其他上载内容的最长期间、每个账号可收发讯息的最大数量及可收发的单个消息的大小。通过服务存储或传送之任何信息、通讯资料和其他内容，如被删除或未予储存，优产不承担任何责任。用户同意，长时间未使用的账号，优产有权关闭。同时优产有权自行决定并无论通知用户与否，随时变更这些一般措施及限制。
          </Text>
        </View>
        <View className={styles.bold}>
          <Text>　 四、责任承担</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            1.优产将尽力为用户提供提供安全、及时、准确、高质量的服务，但不保证一定能满足用户的要求和期望，也不保证服务不会中断，对服务的及时性、安全性、准确性都不作保证。除非另有约定，否则用户因无法使用优产服务，或使用网站服务未达到心理预期的，优产不承担责任。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 2.
            对于用户通过优产提供的服务传送的内容，优产会尽合理努力按照国家有关规定严格审查，但无法完全控制经由软件/网站服务传送的内容，不保证内容的正确性、完整性或品质。因此用户在使用优产服务时，可能会接触到令人不快、不适当或令人厌恶的内容。在任何情况下，优产均不为用户经由软件/网站服务以张贴、发送电子邮件或其它方式传送的任何内容负责。但优产有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停用户使用软件/网站服务的全部或部分，保存有关记录，并根据国家法律法规、相关政策在必要时向有关机关报告并配合有关机关的行动。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　3.
            对于优产提供的各种第三方广告信息、链接、资讯等，优产不保证其内容的正确性、合法性或可靠性，相关责任由广告主承担；并且，对于用户经由优产服务与广告主进行联系或商业往来，完全属于用户和广告主之间的行为，与优产无关。对于前述商业往来所产生的任何损害或损失，优产不承担任何责任。{' '}
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 4.
            对于用户上传的照片、资料、证件等，优产已采用相关措施并已尽合理努力进行审核，但不保证其内容的正确性、合法性或可靠性，相关责任由上传上述内容的用户承担。{' '}
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 5.
            用户以自己的独立判断选择使用优产的相关服务，进行发表评论、回复、发布文字图片信息等行为，并独立承担自身的主动行为所可能产生的不利后果和责任，优产不承担任何法律责任。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 6.
            对于优产在线上或线下策划、发起、组织或是承办的任何用户活动（包括但不限于收取费用以及完全公益的活动），优产不对上述活动的效果向用户作出任何保证或承诺，也不担保活动期间用户自身行为的合法性、合理性。由此产生的任何对于用户个人或者他人的人身或者是名誉以及其他损害，应由行为实施主体承担责任。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 7.
            对于用户的投诉，优产将尽合理努力进行核实和处理，但不保证一定能满足投诉者的要求。优产有权决定是否向公众或向被投诉者公开投诉内容。对于投诉内容侵犯用户隐私权、名誉权等合法权利的，所有法律责任由投诉者承担，与优产无关。
          </Text>
        </View>
        <View className={styles.bold}>
          <Text>　 五、违约责任</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 1.
            用户使用虚假身份信息、公司信息进行注册，发布虚假工厂资料、订单需求，发布含有传销、色情、反动等严重违法内容，对外传播订单业务聊天等通讯记录等行为，视为严重违反本协议，应当承担给优产造成的经济损失和名誉损失。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 2.
            因用户通过优产提供的服务提供、张贴或传送内容、违反本服务条款、或侵害他人任何权利而导致任何第三人对优产提出任何索赔或请求，用户应当赔偿优产或其他合作伙伴的损失，包括但不限于赔偿金额、律师费和合理的调查费用等。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 3.
            用户在投诉其他用户有违法行为或违反本注册条款情形时，投诉者应承担不实投诉所产生的全部法律责任。如侵犯他人的合法权益，投诉人应独立承担全部法律责任。如给优产造成损失的，投诉人应对优产承担相应的赔偿责任。
          </Text>
        </View>
        <View className={styles.bold}>
          <Text>　 六、不可抗力</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 1.
            “不可抗力”是指优产不能合理控制、不可预见或即使预见亦无法避免的事件，该事件妨碍、影响或延误优产根据本注册条款履行其全部或部分义务。该事件包括但不限于政府行为、自然灾害、战争、黑客袭击、电脑病毒、网络故障等。不可抗力可能导致优产无法访问、访问速度缓慢、存储数据丢失、用户个人信息泄漏等不利后果。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 2.
            遭受不可抗力事件时，优产可中止履行本用户协议项下的义务直至不可抗力的影响消除为止，并且不因此承担违约责任；但应尽最大努力克服该事件，减轻其负面影响。
          </Text>
        </View>
        <View className={styles.bold}>
          <Text>　 七、协议的修改与终止</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            1.优产有权依法随时对本协议注册条款进行变更和修改。一旦发生注册条款的变动，优产将在软件内进行更新提示，或将最新版本的用户协议以邮件的形式发送给用户。用户如果不同意用户注册条款的修改，可以主动取消用户资格（如注销账号），如对部分服务支付了额外的费用，可以申请将费用全额或部分退回。如果用户继续使用用户账号，则视为用户已经接受用户注册条款的修改。
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　 2.
            用户若反对任何注册条款的内容或对之后注册条款修改有异议，或对优产服务不满，用户有以下权利：不再使用优产服务；结束用户使用优产服务的资格；通知优产停止该用户的服务。结束用户服务的同时，用户使用优产服务的权利立即终止，优产不再对用户承担任何义务。
          </Text>
        </View>
        <View className={styles.bold}>
          <Text>　 八、通知</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            当您注册帐号并接受优产服务时，您应该向优产提供真实有效的联系方式（包括您的工作邮箱、联系电话等），使优产能随时采用系统消息、弹窗、电子邮件或页面公告等形式向您发出有效的通知
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            您理解且同意，您应当保证所提供的联系方式是准确、有效的，并进行实时更新。如果因提供的联系方式不确切，或不及时告知变更后的联系方式，使通知无法送达或未及时送达，由您自行承担由此可能产生的法律后果。
          </Text>
        </View>
        <View className={styles.bold}>
          <Text>　 九、法律管辖适用及其他</Text>
        </View>
        <View className={styles.content}>
          <Text>
            　本协议的生效、履行、解释及争议的解决均适用中华人民共和国的现行法律，所发生的争议应提交杭州仲裁委员会，其仲裁裁决是终局的。本用户协议因与中华人民共和国现行法律相抵触而导致部分条款无效的，不影响其他条款的效力
          </Text>
        </View>
        <View className={styles.content}>
          <Text>
            　
            如您对本用户协议有任何问题或建议，请通过优产客服微信公众号（优产）或拨打客服热线（电话：15620621977）与我们取得联系。
          </Text>
        </View>
      </View>
    </View>
  )
}

export default userAgreement
