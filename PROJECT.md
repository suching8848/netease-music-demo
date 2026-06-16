# 云音乐复刻 — 项目介绍

仿网易云音乐风格的 uni-app 移动端课程作业项目，10 个页面，纯前端无后端，全 mock 数据。

---

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | uni-app（DCloud 跨平台：H5 / 微信小程序 / 原生 App） |
| UI 层 | Vue 2 Options API，单文件 `.vue` 组件 |
| 语言 | JavaScript（无 TypeScript） |
| 样式 | Scoped CSS + `rpx` 响应式单位（750rpx = 屏幕宽度） |
| 状态管理 | 组件内 `data()` + `uni.setStorageSync` / `uni.getStorageSync`（无 Vuex / Pinia） |
| 路由 | `pages.json` 文件式路由，`uni.navigateTo` / `uni.reLaunch` / `uni.navigateBack` |
| 构建 | 仅通过 HBuilderX IDE 运行，无 CLI、无 `package.json`、无 Node 工具链 |

---

## 页面结构

```
┌─────────────────────────────────────────────┐
│  主页面（底部 Tab · uni.reLaunch 切换）        │
│  ├── 首页    pages/home/index               │
│  ├── 搜索    pages/search/index              │
│  ├── 笔记    pages/note/index                │
│  └── 我的    pages/mine/index                │
├─────────────────────────────────────────────┤
│  次级页面（uni.navigateTo 推入导航栈）         │
│  ├── 登录      pages/login/index             │
│  ├── 全屏播放器  pages/player/index           │
│  ├── 歌单详情   pages/playlist/index          │
│  ├── 设置      pages/settings/index           │
│  └── 消息中心   pages/messages/index          │
├─────────────────────────────────────────────┤
│  演示页（开发用，无底部导航入口）                │
│  └── 演示      pages/index/index              │
└─────────────────────────────────────────────┘
```

### 页面功能一览

| 页面 | 路径 | 主要功能 |
|------|------|---------|
| 首页 | `pages/home/index` | 横向滚动 Tab（推荐/音乐/播客/听书），卡片推荐、推荐歌单、推荐歌曲、播客聚合组件 |
| 搜索 | `pages/search/index` | 搜索框激活/取消、分类发现图标、热门推荐 |
| 笔记 | `pages/note/index` | 双列瀑布流布局，卡片高度不一 |
| 我的 | `pages/mine/index` | 个人信息、登录态判断、歌单/播客/笔记三个分段，滚动驱动紧凑顶栏 |
| 登录 | `pages/login/index` | 学号+姓名+密码表单，一键填入测试账号，本地校验 |
| 播放器 | `pages/player/index` | 唱片旋转动画、可拖拽进度条、播放控制、自动滚动歌词 |
| 歌单详情 | `pages/playlist/index` | 歌单信息+歌曲列表，点击播放 |
| 设置 | `pages/settings/index` | 退出登录（清除 Storage）、清除缓存、跳转个人信息 |
| 消息中心 | `pages/messages/index` | 消息列表、已读/未读样式、全部标为已读 |
| 演示 | `pages/index/index` | SideDrawer 组件演示+交互日志 |

---

## 运行方式

1. 用 **HBuilderX**（DCloud 专有 IDE）打开项目文件夹
2. 用内置运行器启动 → 浏览器 / 手机模拟器
3. 没有 `npm install`、`npm run dev`、测试、lint 等命令

---

## 数据层

所有 mock 数据集中在一个文件：[`common/data.js`](common/data.js)

| 导出 | 内容 |
|------|------|
| `STUDENT` | 默认测试账号：学号 `2312505051`，姓名 `马望轩`，密码 `123456` |
| `LOGIN_KEY` | Storage 键名 `'musicFinalLoginUser'` |
| `allSongs` | 10 首歌曲完整信息（id、歌名、歌手、专辑、时长、封面） |
| `playerInfo` | 迷你播放器默认歌曲元数据 |
| `currentPlaySong` | **可变共享对象** `{ song }`，页面间传歌的桥梁 |
| `playlistDetailMap` | 歌单 ID → `{ title, image, desc, playCount, songIds[] }` |
| `mockLyrics` | 时间轴歌词数据 |
| `mockMessages` | 消息中心数据 |
| `homeCards`, `recommendSongs`, `recommendPlaylists` | 首页内容 |
| `discoverIcons`, `quickDiscover`, `browseAll` | 搜索/发现页内容 |
| `noteList`, `noteCardList` | 笔记瀑布流卡片 |
| `podcastList`, `podcastRecommendList` 等 | 播客相关数据 |

---

## 跨组件通信

项目没有 Vuex，用两种模式通信：

**事件总线**
```js
uni.$emit('playSong', songData)   // 迷你播放器监听，更新当前歌曲
uni.$emit('togglePlay')           // 暂停/播放切换
uni.$emit('playingChange', state) // 播放状态同步给全屏播放器
```

**共享可变对象**
```js
currentPlaySong.song = song       // 跳转前写入
// 播放器页面 onLoad 时读取 currentPlaySong.song
```
> `navigateTo` 的 URL 参数序列化有时机问题，共享对象是同步的，更可靠。

---

## 组件一览

| 组件 | 文件 | 用途 |
|------|------|------|
| 底部导航 | `components/bottom-tab.vue` | 4 个 Tab，active 指示条，笔记红点 |
| 迷你播放器 | `components/mini-player.vue` | 固定底部、旋转唱片、点击进入全屏播放器 |
| 播客首页 | `components/PodcastHomePage.vue` | 聚合组件：快捷入口 + 轮播 + 类型切换 + 推荐列表 |
| 播客区块 | `components/PodcastSection.vue` | 带子 Tab 筛选的播客列表（"我的"页内） |
| 笔记区块 | `components/NotesSection.vue` | 瀑布流笔记（"我的"页内） |
| 侧边抽屉 | `components/SideDrawer/SideDrawer.vue` | 组件版抽屉，❌ App 端不可用，仅演示页使用 |

---

## SideDrawer 架构（核心设计）

### 为什么不能用组件

uni-app App 平台（`compilerVersion: 3` + `usingComponents: true`）将每个子组件渲染在**隔离的原生视图层**中——`position: fixed` 不再相对于屏幕，而是相对于组件自己的视图，导致抽屉完全不可见。

### 解决方案：内联模板

4 个主页面**不引入** `<side-drawer>` 组件，而是在模板里直接写抽屉的 HTML。

```
┌──────────────────────────────────────────────┐
│ drawerMixin.js  →  共享 data / watch / methods │
│ App.vue 全局 CSS →  共享 drawer-* 样式          │
│ 各页面内联模板   →  抽屉 HTML 放在 .page 同级     │
└──────────────────────────────────────────────┘
```

### 页面布局约定

```html
<view class="page-root">       <!-- overflow: visible -->
  <view class="page">          <!-- overflow: hidden（内容裁剪） -->
    <status-bar />
    <top-bar />
    <scroll-view>…</scroll-view>
    <mini-player />
    <bottom-tab />
  </view>
  <!-- 抽屉是 .page 的兄弟节点，绝不能放在 overflow:hidden 容器内 -->
  <view v-if="showDrawer" class="drawer-root">…</view>
</view>
```

**关键规则**：
1. 抽屉元素必须与 `overflow: hidden` 容器同级，不能嵌套在内
2. 抽屉祖先不能有 `overflow: hidden`、`transform`、`filter`、`will-change`、`contain`
3. `.drawer-root` 使用 `z-index: 2147483647`（最大值）+ `position: fixed`

---

## 登录流程

```
进入"我的" → 检查 Storage
  ├── 已登录 → 显示用户信息
  └── 未登录 → 点击"去登录"
                → 跳转登录页
                → 输入学号/姓名/密码（或点"一键填入测试账号"）
                → 与 STUDENT 常量比对
                    ├── 匹配 → 写入 Storage → 返回
                    └── 不匹配 → 提示错误
退出登录 → uni.removeStorageSync('musicFinalLoginUser')
```

---

## 样式规范

- 主题背景：`#665D5F`，文字：`#F6F4F4`，强调红：`#FF2D55`
- 所有尺寸使用 `rpx`，跨平台自适应
- 全局隐藏滚动条：`::-webkit-scrollbar { width: 0; height: 0; }`
- H5 端限制手机宽度，桌面浏览器不拉伸
- 抽屉样式在 `App.vue` **全局**（非 scoped）`<style>` 中，class 前缀 `drawer-*`
- 页面淡入动画全局生效：`@keyframes pageFadeIn`

---

## 已知平台问题

| 问题 | 平台 | 解决方案 |
|------|------|---------|
| 子组件 `position:fixed` 不相对屏幕 | App | 内联模板替代组件 |
| 左边缘触摸坐标为负值 | Android App | ☰ 按钮 `margin-left: 24rpx`，`@tap.stop` 绑在 `<view>` 上 |
| `v-if` 挂载时 CSS 动画不触发 | App | `v-if` 挂载 → 初始闭合状态 → `setTimeout(50ms)` → 切换为打开状态 → 触发 CSS transition |
| `will-change` 创建新包含块 | App WebView | 抽屉元素上避免使用 |
| 启动闪屏不消失 | App | `manifest.json` 配置了 `waiting: true`，需调用 `plus.navigator.closeSplashscreen()`（目前未实现） |

---

## 素材替换

[`static/images/`](static/images/) 目录下有 27 张占位图（26 张 JPG 封面/笔记 + 1 张 PNG 头像）。替换图片时保持文件名不变，无需改代码。

---

## 默认测试账号

> 在 [`common/data.js`](common/data.js) 中配置

| 字段 | 值 |
|------|-----|
| 学号 | `2312505051` |
| 姓名 | `马望轩` |
| 密码 | `123456` |

修改 `STUDENT` 对象的 `id`、`name`、`password` 即可切换账号。

---

## 目录结构

```
music_final_uniapp/
├── App.vue                  # 根组件：全局 CSS 重置、抽屉样式、页面动画
├── main.js                  # Vue 入口，仅 productionTip = false
├── pages.json               # 路由注册（10 页，全部 custom nav）
├── manifest.json             # uni-app 清单：appid、版本、平台配置
├── common/
│   ├── data.js              # 🗄 全站唯一数据源（mock 数据 + 常量）
│   └── drawerMixin.js       # 📎 抽屉共享逻辑（4 个主页面 mixin）
├── components/
│   ├── bottom-tab.vue       # 底部 Tab 导航栏
│   ├── mini-player.vue      # 迷你播放器（事件总线驱动）
│   ├── PodcastHomePage.vue   # 播客首页聚合组件
│   ├── PodcastSection.vue   # 播客列表区块（"我的"页）
│   ├── NotesSection.vue     # 笔记瀑布流区块（"我的"页）
│   └── SideDrawer/          # 抽屉组件（⚠️ 仅演示页使用）
├── pages/
│   ├── home/index.vue       # 首页
│   ├── search/index.vue     # 搜索
│   ├── note/index.vue       # 笔记
│   ├── mine/index.vue       # 我的
│   ├── login/index.vue      # 登录
│   ├── player/index.vue     # 全屏播放器
│   ├── playlist/index.vue   # 歌单详情
│   ├── settings/index.vue   # 设置
│   ├── messages/index.vue   # 消息中心
│   └── index/index.vue      # 演示页
├── static/images/           # 27 张占位图
├── unpackage/               # HBuilderX 构建产物（gitignore）
└── .claude/                 # Claude Code 会话设置
```
