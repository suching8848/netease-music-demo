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
  name: '音乐用户',
  signature: '这个人很懒，还没有填写签名',
  tags: '♂ · 127枚徽章 · 音乐爱好者 · 校园用户',
  follow: 292,
  fans: 67,
  level: 'Lv.10',
  hours: 8267
}

export const myPlaylists = [
  {
    id: 1,
    image: '/static/images/pl1.jpg',
    title: '我喜欢的音乐',
    desc: '11646首 · 3669次播放'
  },
  {
    id: 2,
    image: '/static/images/pl2.jpg',
    title: '今日私人雷达',
    desc: '歌单 · 35首 · 云音乐私人推荐'
  },
  {
    id: 3,
    image: '/static/images/pl3.jpg',
    title: '学习时听的歌',
    desc: '歌单 · 295首 · 音乐用户'
  },
  {
    id: 4,
    image: '/static/images/pl4.jpg',
    title: '深夜循环歌单',
    desc: '歌单 · 82首 · 最近常听'
  }
]

export const playerInfo = {
  cover: '/static/images/player-cover.jpg',
  song: '游戏《Orzmic》第九章魔王曲',
  singer: 'CS4W'
}
