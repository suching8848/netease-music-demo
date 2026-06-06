// 默认测试账号。提交作业前可以改成自己的学号、姓名和自定义密码。
export const STUDENT = {
  id: '2312505051',
  name: '马望轩',
  password: '123456'
}

// 登录缓存 key 使用新版名称，避免浏览器里残留旧账号信息。
export const LOGIN_KEY = 'musicFinalLoginUser'

export const theme = {
  bg: '#665D5F',
  panel: '#746B6D',
  panelDark: '#5E5658',
  text: '#FFFFFF',
  subText: '#D8D0D1',
  red: '#FF2D55'
}

export const homeTabs = ['心动', '推荐', '音乐', '会员大促', '播客']

export const homeCards = [
  {
    id: 1,
    title: '每日推荐',
    sub: '今日限定好歌推荐',
    image: '/static/images/cover1.jpg'
  },
  {
    id: 2,
    title: '心动模式',
    sub: '红心歌曲和相似推荐',
    image: '/static/images/cover2.jpg'
  },
  {
    id: 3,
    title: '新歌首发',
    sub: '深陷这场旋律风暴',
    image: '/static/images/cover3.jpg'
  },
  {
    id: 4,
    title: '宝藏电台',
    sub: '夜晚也要保持浪漫',
    image: '/static/images/cover4.jpg'
  }
]

export const recommendSongs = [
  {
    id: 1,
    cover: '/static/images/song1.jpg',
    name: '声',
    tag: '超45%人收藏',
    singer: 'Feryquitous'
  },
  {
    id: 2,
    cover: '/static/images/song2.jpg',
    name: 'SYSTEM ERROR',
    tag: 'Hi-Res',
    singer: 'Laur'
  },
  {
    id: 3,
    cover: '/static/images/song3.jpg',
    name: 'MEGATON BLAST',
    tag: '超72%人播放',
    singer: 'BlackY / Yooh'
  }
]

export const recommendPlaylists = [
  { id: 1, title: '粉色电波', image: '/static/images/pl1.jpg' },
  { id: 2, title: '雨天漫画', image: '/static/images/pl2.jpg' },
  { id: 3, title: '赛博节奏', image: '/static/images/pl3.jpg' },
  { id: 4, title: '深夜治愈', image: '/static/images/pl4.jpg' }
]

export const discoverIcons = [
  { id: 1, name: '排行榜', icon: '100' },
  { id: 2, name: '歌手', icon: '人' },
  { id: 3, name: '曲风', icon: '♪' },
  { id: 4, name: '新歌新碟', icon: '●' },
  { id: 5, name: '听书', icon: '▥' }
]

export const quickDiscover = [
  { id: 1, title: '日系流行', sub: '心做し(Live)-...', image: '/static/images/discover1.jpg' },
  { id: 2, title: '华语流行', sub: '谭维维杭州演...', image: '/static/images/discover2.jpg' },
  { id: 3, title: '新歌速递', sub: 'Mouth Go La...', image: '/static/images/discover3.jpg' },
  { id: 4, title: '电子节拍', sub: '高能旋律开启', image: '/static/images/discover4.jpg' }
]

export const browseAll = [
  { id: 1, title: '漫游', sub: '多样频道无限畅听', image: '/static/images/browse1.jpg' },
  { id: 2, title: '歌单广场', sub: '4月新番精选歌单', image: '/static/images/browse2.jpg' },
  { id: 3, title: '播客', sub: '放松类节目推荐', image: '/static/images/browse3.jpg' },
  { id: 4, title: '日语', sub: '从热门日语歌开始听', image: '/static/images/browse4.jpg' }
]

export const noteList = [
  { id: 1, title: '这首歌太适合循环了', user: '音乐同学A', like: 1270, image: '/static/images/note1.jpg', h: 520 },
  { id: 2, title: '今日推荐歌单分享，快来听！', user: '校园音乐人', like: 486, image: '/static/images/note2.jpg', h: 610 },
  { id: 3, title: '#本周宝藏歌曲', user: '耳机收藏家', like: 2680, image: '/static/images/note3.jpg', h: 590 },
  { id: 4, title: '个人认为全专最好听的一首', user: '夜晚听歌', like: 253, image: '/static/images/note4.jpg', h: 500 },
  { id: 5, title: '这首歌循环了一整个晚上', user: '午夜耳机', like: 921, image: '/static/images/note5.jpg', h: 560 },
  { id: 6, title: '今天的歌单很适合通勤', user: '雨天便利店', like: 738, image: '/static/images/note6.jpg', h: 470 }
]

export const profile = {
  avatar: '/static/images/avatar.png',
  name: 'su_ching蘇清',
  signature: '我有点不知道填什么?',
  tags: '♂ · 127枚徽章 · 真夜乐迷 · VOCALOID厨',
  follow: 292,
  fans: 67,
  level: 'Lv.10',
  hours: 8288
}

export const myPlaylists = [
  {
    id: 5,
    image: '/static/images/pl1.jpg',
    title: '我喜欢的音乐',
    desc: '11646首 · 3669次播放'
  },
  {
    id: 6,
    image: '/static/images/pl2.jpg',
    title: '今日私人雷达',
    desc: '歌单 · 35首 · 云音乐私人推荐'
  },
  {
    id: 7,
    image: '/static/images/pl3.jpg',
    title: '学习时听的歌',
    desc: '歌单 · 295首 · 音乐用户'
  },
  {
    id: 8,
    image: '/static/images/pl4.jpg',
    title: '深夜循环歌单',
    desc: '歌单 · 82首 · 最近常听'
  }
]

export const playerInfo = {
  id: 0,
  cover: '/static/images/player-cover.jpg',
  song: '游戏《Orzmic》第九章魔王曲',
  singer: 'CS4W'
}

// 跨页面共享的当前播放歌曲引用 — 解决 navigateTo 传参时序问题
export const currentPlaySong = { song: null }

// ============================================================
// 全屏播放器 & 歌单详情 扩展数据
// ============================================================

// 曲库 — 所有可播放的歌曲
export const allSongs = [
  { id: 1, name: '声', singer: 'Feryquitous', album: 'Diverse System', duration: '04:32', cover: '/static/images/song1.jpg' },
  { id: 2, name: 'SYSTEM ERROR', singer: 'Laur', album: 'Last Dance', duration: '03:15', cover: '/static/images/song2.jpg' },
  { id: 3, name: 'MEGATON BLAST', singer: 'BlackY / Yooh', album: 'HARDCORE SYNDROME', duration: '02:48', cover: '/static/images/song3.jpg' },
  { id: 4, name: '心做し (Live)', singer: 'majiko', album: '寂寞的人最虚伪', duration: '05:21', cover: '/static/images/discover1.jpg' },
  { id: 5, name: 'Mouth Go La', singer: 'Snail\'s House', album: 'Pixel Galaxy', duration: '03:44', cover: '/static/images/discover3.jpg' },
  { id: 6, name: 'ピースサイン', singer: '米津玄師', album: 'BOOTLEG', duration: '03:57', cover: '/static/images/note1.jpg' },
  { id: 7, name: '夜に駆ける', singer: 'YOASOBI', album: 'THE BOOK', duration: '04:18', cover: '/static/images/note3.jpg' },
  { id: 8, name: 'Lemon', singer: '米津玄師', album: 'STRAY SHEEP', duration: '04:16', cover: '/static/images/note5.jpg' },
  { id: 9, name: '打上花火', singer: 'DAOKO × 米津玄師', album: 'THANK YOU BLUE', duration: '04:49', cover: '/static/images/cover1.jpg' },
  { id: 10, name: '炎', singer: 'LiSA', album: 'LEO-NiNE', duration: '04:34', cover: '/static/images/cover2.jpg' }
]

// 歌单详情 — 每个歌单包含的歌曲 ID 和描述
export const playlistDetailMap = {
  1: {
    id: 1,
    title: '粉色电波',
    image: '/static/images/pl1.jpg',
    desc: '电子音乐与流行旋律的完美融合，粉色的声波穿透耳膜',
    playCount: '286万',
    songIds: [1, 2, 3, 5, 7]
  },
  2: {
    id: 2,
    title: '雨天漫画',
    image: '/static/images/pl2.jpg',
    desc: '窗外的雨声和耳机里的旋律，是最搭的漫画背景音乐',
    playCount: '154万',
    songIds: [4, 6, 8, 9, 1]
  },
  3: {
    id: 3,
    title: '赛博节奏',
    image: '/static/images/pl3.jpg',
    desc: '高速电子节拍 × 赛博朋克美学，未来感十足',
    playCount: '421万',
    songIds: [2, 3, 5, 7, 10]
  },
  4: {
    id: 4,
    title: '深夜治愈',
    image: '/static/images/pl4.jpg',
    desc: '温柔的人声和轻缓的旋律，陪你度过每一个深夜',
    playCount: '198万',
    songIds: [6, 8, 9, 4, 1]
  },
  // 「我的」页面 4 个歌单 (ID 5-8)
  5: {
    id: 5,
    title: '我喜欢的音乐',
    image: '/static/images/pl1.jpg',
    desc: '11646首 · 3669次播放',
    playCount: '3669次',
    songIds: [1, 6, 7, 8, 9, 2, 3, 10]
  },
  6: {
    id: 6,
    title: '今日私人雷达',
    image: '/static/images/pl2.jpg',
    desc: '歌单 · 35首 · 云音乐私人推荐',
    playCount: '35首',
    songIds: [5, 3, 7, 1, 4, 6]
  },
  7: {
    id: 7,
    title: '学习时听的歌',
    image: '/static/images/pl3.jpg',
    desc: '歌单 · 295首 · 音乐用户',
    playCount: '295首',
    songIds: [10, 8, 6, 9, 4]
  },
  8: {
    id: 8,
    title: '深夜循环歌单',
    image: '/static/images/pl4.jpg',
    desc: '歌单 · 82首 · 最近常听',
    playCount: '82首',
    songIds: [8, 6, 9, 1, 7, 2]
  }
}

// 模拟歌词 — 用于全屏播放器
export const mockLyrics = [
  { time: 0, text: '♬ 纯音乐，请您欣赏 ♬' },
  { time: 5, text: '夜の街を駆け抜けて' },
  { time: 10, text: 'ネオンの海を泳いで' },
  { time: 15, text: '君のいないこの世界は' },
  { time: 20, text: 'まるで色のない絵画のよう' },
  { time: 25, text: '♬' },
  { time: 30, text: 'それでも朝は来るから' },
  { time: 35, text: '新しいページをめくろう' },
  { time: 40, text: '昨日までの涙は' },
  { time: 45, text: '明日への道しるべ' },
  { time: 50, text: '♬' },
  { time: 55, text: '耳を澄ませば聴こえる' },
  { time: 60, text: '遠くの街のざわめきが' },
  { time: 65, text: '誰もが誰かを想いながら' },
  { time: 70, text: '今日を生きているんだ' },
  { time: 75, text: '♬ 間奏 ♬' },
  { time: 105, text: 'さあ手を伸ばして' },
  { time: 110, text: '光の方へ歩き出そう' },
  { time: 115, text: '君がくれた勇気を胸に' },
  { time: 120, text: '新しい歌を歌おう' },
  { time: 125, text: '♬' }
]

// 消息中心 mock 数据
export const mockMessages = [
  { id: 1, title: '系统通知', text: '您的歌单「深夜循环歌单」被推荐到首页', time: '10分钟前', read: false, icon: '🔔', iconClass: 'system' },
  { id: 2, title: '歌单更新', text: '「今日私人雷达」已更新，快来听听新歌', time: '2小时前', read: false, icon: '📋', iconClass: 'playlist' },
  { id: 3, title: '版本更新', text: '云音乐复刻 v1.1.0 已发布，新增全屏播放器', time: '昨天', read: false, icon: '🆕', iconClass: 'update' },
  { id: 4, title: '活动提醒', text: '周年庆活动进行中，免费天数已发放到您的账户', time: '2天前', read: true, icon: '🎁', iconClass: 'activity' },
  { id: 5, title: '音乐周报', text: '本周您一共听了 127 首歌，总时长 8.4 小时', time: '3天前', read: true, icon: '📊', iconClass: 'notice' }
]

// ============================================================
// 「我的」页面 — 播客 & 笔记 扩展数据
// ============================================================

// 播客二级筛选栏
export const podcastSubTabs = [
  { name: '全部', count: 30 },
  { name: '播客', count: 29 },
  { name: '有声书', count: 0 },
  { name: '我的创建', count: 1 }
]

// 播客列表（封面使用项目已有图片作为占位）
export const podcastList = [
  { id: 1, title: '最近更新', subtitle: '前天更新：The Beast is UNLEASHED!', cover: '/static/images/discover1.jpg', badge: null },
  { id: 2, title: '点赞的单集', subtitle: '共12个', cover: '/static/images/discover2.jpg', badge: null },
  { id: 3, title: '雨声', subtitle: '2020-04更新：Vol.25 小街巷雨', cover: '/static/images/discover3.jpg', badge: null },
  { id: 4, title: '♧世界情绪♪', subtitle: '05-01更新：永久に枯れぬ花', cover: '/static/images/discover4.jpg', badge: '2' },
  { id: 5, title: '【深度迷幻】Psychedelic Trance', subtitle: '1天前更新：Liquid Soul & Ace Ventura - Psy-Nation Radio 102', cover: '/static/images/browse1.jpg', badge: null },
  { id: 6, title: '存流 -ARU- / 明透 -ASU-', subtitle: '2天前更新：美しい鰭 - スピッツ covered by 明透', cover: '/static/images/browse2.jpg', badge: '3' },
  { id: 7, title: '蔚蓝档案 原声集', subtitle: '05-29更新：ブルアカみゅーじっく♪3D LIVE Opening Theme', cover: '/static/images/browse3.jpg', badge: '11' },
  { id: 8, title: 'THE FIRST TAKE', subtitle: '05-24更新：670 - HALCALI - おつかれ SUMMER', cover: '/static/images/browse4.jpg', badge: '99+' },
  { id: 9, title: '神椿 - 花谱 理芽 异世界情绪 春猿…', subtitle: '05-06更新：【歌ってみた】「BAD LOVE HANA」covered by 春猿火 × 理芽', cover: '/static/images/cover1.jpg', badge: '99+' }
]

// 笔记卡片（瀑布流，h 字段控制图片区高度以形成参差）
export const noteCardList = [
  { id: 1, title: '叮！新鲜出炉的年度报告！你的年度歌手是谁？', image: '/static/images/note1.jpg', h: 380 },
  { id: 2, title: '2021年度听歌报告 期待好久的#2021年度听…', image: '/static/images/note2.jpg', h: 460 },
  { id: 3, title: 'Satisfied (feat. MAX) […]', image: '/static/images/note3.jpg', h: 340 },
  { id: 4, title: 'su_ching蘇清喜欢的音乐', image: '/static/images/note4.jpg', h: 400 }
]

// ============================================================
// 播客主界面 扩展数据
// ============================================================

// 快捷分类按钮
export const podcastQuickActions = [
  { key: 'my', title: '我的播客', cover: '/static/images/cover1.jpg', badge: '2' },
  { key: 'all', title: '全部分类', cover: null, badge: null },
  { key: 'rank', title: '排行榜', cover: null, badge: null },
  { key: 'wiki', title: '音乐百科', cover: null, badge: null }
]

// 播客推荐大卡片
export const podcastHeroCards = [
  {
    id: 1,
    title: '花谱 - 原来这就是所谓的…',
    playCount: '4345次播放',
    source: '花谱 ♧世界情緒（异世界情绪）v…',
    cover: '/static/images/discover1.jpg'
  },
  {
    id: 2,
    title: '深夜情绪电台',
    playCount: '8210次播放',
    source: '私人播客精选',
    cover: '/static/images/discover2.jpg'
  },
  {
    id: 3,
    title: '雨声与白噪音',
    playCount: '41759次播放',
    source: '生活助眠频道',
    cover: '/static/images/discover3.jpg'
  }
]

// 播客类型 tabs
export const podcastTypeTabs = [
  { name: '速递', key: 'express' },
  { name: '人间剧场', key: 'theatre' },
  { name: '私人播客', key: 'private' },
  { name: '情感赫兹', key: 'emotion' },
  { name: '真实故事', key: 'story' }
]

// 推荐播客列表
export const podcastRecommendList = [
  {
    id: 1,
    channel: '《放松原创白噪音电台｜住在小森林》',
    title: '【白噪音】3小时森林雨天露营氛围：雨声、搭帐篷声、翻…',
    tag: '根据常听推荐',
    playCount: '41759',
    cover: '/static/images/note1.jpg'
  },
  {
    id: 2,
    channel: '神秘的吃播',
    title: '爱吃苹果拦不住的',
    tag: '美食生活',
    playCount: '6685',
    cover: '/static/images/note2.jpg'
  },
  {
    id: 3,
    channel: '洪晃和朋友聊天｜晃+朋友们',
    title: '和索拉唠嗑：离经叛道，与世无争',
    tag: '时尚潮流',
    playCount: '22',
    cover: '/static/images/note3.jpg'
  },
  {
    id: 4,
    channel: '深夜私人电台',
    title: '一个人也可以好好生活的声音日记',
    tag: '私人播客',
    playCount: '9801',
    cover: '/static/images/note4.jpg'
  },
  {
    id: 5,
    channel: '情绪疗愈所',
    title: '允许自己慢下来，听一场温柔的雨',
    tag: '情感赫兹',
    playCount: '12034',
    cover: '/static/images/note5.jpg'
  }
]
