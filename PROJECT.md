# 云音乐复刻 — 项目架构文档

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

## 启动流程

```
main.js  →  new Vue(App)  →  $mount()
  │
  └── App.vue
        ├── <script>   — onLaunch / onShow / onHide (日志打印)
        └── <style>    — 全局 CSS (页面背景、reset、抽屉样式、淡入动画)
              │
              └── pages.json  — 注册 10 条路由，全部隐藏原生导航栏
```

[`main.js`](main.js) 是唯一入口，仅做两件事：关闭 Vue 的 `productionTip`，实例化 `App.vue` 并挂载。没有 Vue Router、没有 Vuex、没有任何插件。

[`App.vue`](App.vue) 脚本层只是生命周期日志，**真正的核心是全局 `<style>` 块**：

| 全局样式 | 说明 |
|----------|------|
| `page` | 深灰渐变背景 (`#5a5053 → #665D5F → #4a4345`)，统一字体栈，抗锯齿 |
| `view/text/image/…` | 统一 `box-sizing: border-box` |
| `button` / `button::after` | 去掉 uni-app 默认按钮样式 |
| `::-webkit-scrollbar` | 全局隐藏滚动条 (宽高为 0) |
| `uni-page` | 页面切换淡入动画 `pageFadeIn` (0.25s) |
| `.status-bar` | 毛玻璃状态栏 (`backdrop-filter: blur(16px)`) |
| `.drawer-*` (30+ 个类) | **全局抽屉样式** (非 scoped)，供 4 个主页面内联使用 |

---

## 目录结构

```
music_final_uniapp/
├── App.vue                    # 根组件 — 全局 CSS 重置、抽屉样式、页面动画
├── main.js                    # Vue 入口，仅 productionTip = false
├── pages.json                 # 路由注册 (10 页，全部 custom nav)
├── manifest.json               # uni-app 清单 (appid/版本/平台配置/闪屏)
├── PROJECT.md                 # 📖 本文件 — 项目架构文档
├── README.md                  # 项目简介
├── CLAUDE.md                  # Claude Code AI 辅助开发指南
├── common/
│   ├── data.js                # 🗄 全站唯一数据源 (mock 数据 + 常量)
│   └── drawerMixin.js         # 📎 抽屉共享逻辑 (4 个主页面 mixin)
├── components/
│   ├── bottom-tab.vue          # 底部 Tab 导航栏
│   ├── mini-player.vue         # 迷你播放器 (事件总线驱动)
│   ├── PodcastHomePage.vue     # 播客首页聚合组件
│   ├── PodcastQuickActions.vue # 播客快捷入口
│   ├── PodcastHeroCarousel.vue # 播客推荐大卡片轮播
│   ├── PodcastTypeTabs.vue     # 播客类型 Tab 切换
│   ├── PodcastRecommendList.vue# 播客推荐列表
│   ├── PodcastSection.vue      # 播客列表区块 ("我的"页)
│   ├── NotesSection.vue        # 笔记瀑布流区块 ("我的"页)
│   └── SideDrawer/
│       └── SideDrawer.vue      # 抽屉组件 (⚠️ 仅演示页使用)
├── pages/
│   ├── home/index.vue          # 首页
│   ├── search/index.vue        # 搜索
│   ├── note/index.vue          # 笔记
│   ├── mine/index.vue          # 我的
│   ├── login/index.vue         # 登录
│   ├── player/index.vue        # 全屏播放器
│   ├── playlist/index.vue      # 歌单详情
│   ├── settings/index.vue      # 设置
│   ├── messages/index.vue      # 消息中心
│   └── index/index.vue         # 演示页 (SideDrawer 组件展示)
├── static/images/              # 27 张占位图 (26 JPG + 1 PNG)
├── unpackage/                  # HBuilderX 构建产物 (gitignore)
├── .hbuilderx/                 # IDE 状态 (gitignore)
└── .claude/                    # Claude Code 会话设置
```

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
| 首页 | `pages/home/index` | 横向滚动 Tab (推荐/音乐/播客/听书)，卡片推荐、推荐歌单/歌曲，播客 Tab 渲染 `PodcastHomePage` 聚合组件 |
| 搜索 | `pages/search/index` | 搜索框激活/取消、分类发现图标、热门推荐 |
| 笔记 | `pages/note/index` | 双列瀑布流布局，卡片高度不一 (由 `h` 字段控制) |
| 我的 | `pages/mine/index` | 个人信息、登录态判断、歌单/播客/笔记分段，滚动驱动紧凑顶栏 |
| 登录 | `pages/login/index` | 学号+姓名+密码表单，一键填入测试账号，本地校验 |
| 播放器 | `pages/player/index` | 唱片旋转动画、可拖拽进度条、播放控制、自动滚动歌词 |
| 歌单详情 | `pages/playlist/index` | 歌单信息 + 歌曲列表，点击播放 |
| 设置 | `pages/settings/index` | 退出登录 (清除 Storage)、清除缓存、跳转个人信息 |
| 消息中心 | `pages/messages/index` | 消息列表、已读/未读样式、全部标为已读 |
| 演示 | `pages/index/index` | SideDrawer **组件版** 演示 + 交互日志记录器 |

---

## 组件层级

### 播客组件树

```
PodcastHomePage.vue (首页"播客" Tab)
  ├── PodcastQuickActions.vue      快捷分类按钮 (我的播客/全部分类/排行榜/音乐百科)
  ├── PodcastHeroCarousel.vue      推荐大卡片轮播
  ├── PodcastTypeTabs.vue          类型切换 (速递/人间剧场/私人播客/情感赫兹/真实故事)
  └── PodcastRecommendList.vue     推荐播客列表

PodcastSection.vue ("我的"页面)
  └── 内联子 Tab 筛选 + 播客列表

NotesSection.vue ("我的"页面)
  └── 双列瀑布流笔记卡片
```

### 共享组件使用范围

| 组件 | 首页 | 搜索 | 笔记 | 我的 | 演示页 | 登录 | 播放器 | 歌单 | 设置 | 消息 |
|------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `bottom-tab` | ✓ | ✓ | ✓ | ✓ | ✓ | | | | | |
| `mini-player` | ✓ | ✓ | ✓ | ✓ | ✓ | | | | | |
| `PodcastHomePage` | ✓¹ | | | | | | | | | |
| `PodcastSection` | | | | ✓ | | | | | | |
| `NotesSection` | | | | ✓ | | | | | | |
| `SideDrawer` | | | | | ✓² | | | | | |

> ¹ 仅在首页"播客" Tab 激活时渲染  
> ² 组件版 — 仅演示页使用，App 端不可靠

---

## 页面布局模式

项目中有**两种**页面布局模式，取决于 header 是否需要 `position: fixed`。

### 模式 A — 首页

```
.page-root
  └── .page                    (overflow-x: hidden — 允许纵向溢出)
        └── .header-fixed      (在 .page 内部，不需要 fixed)
              ├── 状态栏
              ├── 顶部导航 (☰ + Tab 滚动 + ⌕)
        └── .content
              ├── 占位 view (headerSpacerH)
              ├── 横向卡片 / 歌单列表 / 播客组件
              ├── <mini-player />
              └── <bottom-tab />
        └── .drawer-root       (v-if — 与 .page 内的内容平级)
```

首页使用 `overflow-x: hidden` (而非 `overflow: hidden`)，因此 header 可以放在 `.page` 内部。

### 模式 B — 搜索 / 笔记 / 我的

```
.page-root                      (overflow: visible; position: relative)
  ├── .header-bar               (position: fixed; z-index: 100 — 在 .page 外部!)
  │     ├── 状态栏
  │     └── 顶部导航 (☰ + 标题 / 搜索框)
  ├── .page                     (overflow: hidden — 内容裁剪)
  │     ├── 占位 view (headerSpacerH)
  │     ├── <scroll-view>…
  │     ├── <mini-player />
  │     └── <bottom-tab />
  └── .drawer-root              (v-if — 与 .page 平级!)
```

Header 必须放在 `.page` **外部**，因为 `.page` 有 `overflow: hidden` 会裁剪 `position: fixed` 元素。内容区顶部需要占位 `<view>` 防止被 header 遮挡，高度 = 状态栏高度 + 96rpx (top bar 高度转换为 px)。

---

## SideDrawer 架构（核心设计）

这是项目最关键的设计决策，经过多轮 App 端调试。

### 问题根源

uni-app App 平台 (`compilerVersion: 3` + `usingComponents: true`) 将每个子组件渲染在**隔离的原生视图层**中：

- `position: fixed` 不再相对屏幕视口，而是相对组件自己的原生视图
- 组件内部 `v-if` 数据变化可能不触发可见的重新渲染
- 组件 `mounted()` 触发、DOM 存在，但视觉上完全不可见

### 解决方案：内联模板

**4 个主页面不使用 `<side-drawer>` 组件**，改为在页面模板中直接写抽屉 HTML。

```
┌──────────────────────────────────────────────┐
│ drawerMixin.js  →  共享 data / watch / methods │
│ App.vue 全局 CSS →  共享 drawer-* 样式类        │
│ 各页面内联模板   →  抽屉 HTML 放在 .page 同级     │
└──────────────────────────────────────────────┘
```

### 页面布局约定

```html
<view class="page-root">       <!-- overflow: visible; position: relative -->
  <view class="page">          <!-- overflow: hidden (内容裁剪区) -->
    <status-bar />
    <top-bar />
    <scroll-view>…</scroll-view>
    <mini-player />
    <bottom-tab />
  </view>
  <!-- ⚠️ 抽屉必须与 .page 平级，绝不能放在 overflow:hidden 容器内 -->
  <view v-if="showDrawer" class="drawer-root">
    <view class="drawer-mask" @tap="handleDrawerMaskTap" />
    <view class="drawer-panel" :class="{ 'drawer-active': drawerActive }">
      <!-- 用户信息、SVIP卡片、菜单项、底部按钮… -->
    </view>
  </view>
</view>
```

### 关键规则

1. 抽屉元素必须是 `overflow: hidden` 容器的**兄弟节点**，绝不能嵌套在内
2. 抽屉祖先元素不能有：`overflow: hidden`、`transform`、`filter`、`perspective`、`will-change`、`contain` — 这些会创建新的包含块，破坏 `position: fixed`
3. `.drawer-root` 使用 `z-index: 2147483647` (最大值) + `position: fixed`

### 入场动画技巧

App 端 CSS `@keyframes` 在 `v-if` 挂载时不会触发（元素"出生"时动画已设置完毕）。解决方案：

```
v-if 挂载 → 初始闭合状态 (drawerActive = false)
  → $nextTick
    → setTimeout(50ms)
      → drawerActive = true  (CSS transition 检测到变化，播放动画)
```

这个模式实现在 [`drawerMixin._animateIn()`](common/drawerMixin.js) 中。关闭时先移除 `drawerActive`，等待 320ms（CSS transition 完成后）再设 `showDrawer = false` 移除 DOM。

### ☰ 菜单按钮要求

- 必须设置 `margin-left: 24rpx`（最小值）— Android 端屏幕左边缘触摸坐标可能变为负值 (如 `-1,72`)，导致 uni-app 找不到目标视图
- 使用固定尺寸触摸区域 (88rpx × 88rpx)
- `@tap.stop` 必须绑定在 `<view>` 上（不能绑在 `<text>` 上）

### drawerMixin 提供的内容

| 类别 | 详情 |
|------|------|
| data | `drawerActive` (动画状态)、`drawerStatusBarH`、`drawerSafeBottom`、`drawerMenuItems` (13 个菜单项) |
| watch | `showDrawer(val)` → `true` 时调用 `_animateIn()` |
| created | 读取 `uni.getSystemInfoSync()` 获取状态栏高度和 iPhone 安全区 |
| beforeDestroy | 清除动画定时器 |
| methods | `openDrawer()`、`closeDrawer()`、`_animateIn()`、`handleDrawerMaskTap`、`handleDrawerUserClick`、`handleDrawerItemClick`、`handleDrawerSettingClick`、`handleDrawerMoreClick` |

---

## 数据层 ([`common/data.js`](common/data.js))

全站唯一数据源，集中管理所有 mock 数据。

### 导出清单

| 导出 | 用途 | 状态 |
|------|------|:--:|
| `STUDENT` | 默认测试账号 (id, name, password) | ✓ |
| `LOGIN_KEY` | Storage 键名 `'musicFinalLoginUser'` | ✓ |
| `homeCards` | 首页横向卡片 (带 image) | ⚠️ 已弃用 |
| `recommendSongs` | 首页推荐歌曲 | ⚠️ 已弃用 |
| `recommendPlaylists` | 首页推荐歌单 | ⚠️ 已弃用 |
| `discoverIcons` | 搜索页分类图标 | ✓ |
| `quickDiscover` | 搜索页快速发现卡片 | ✓ |
| `browseAll` | 搜索页浏览全部 | ✓ |
| `noteList` | 首页笔记瀑布流卡片 (含 `h` 字段控制高度) | ✓ |
| `profile` | 用户资料 (头像/昵称/签名/标签/粉丝/等级) | ✓ |
| `myPlaylists` | "我的"页面 4 个歌单 | ✓ |
| `playerInfo` | 迷你播放器默认歌曲元数据 | ✓ |
| `currentPlaySong` | **可变共享对象** `{ song }` — 跨页面传歌桥梁 | ✓ |
| `allSongs` | 完整曲库 (10 首，含 id/歌名/歌手/专辑/时长/封面) | ✓ |
| `playlistDetailMap` | 歌单 ID → { title, image, desc, playCount, songIds[] } | ✓ |
| `mockLyrics` | 时间轴歌词数据 (用于全屏播放器) | ✓ |
| `mockMessages` | 消息中心数据 (含 read/unread 状态) | ✓ |
| `podcastSubTabs` | "我的"页播客二级筛选栏 | ✓ |
| `podcastList` | "我的"页播客列表 | ✓ |
| `noteCardList` | "我的"页笔记瀑布流卡片 | ✓ |
| `podcastQuickActions` | 首页播客快捷分类按钮 | ✓ |
| `podcastHeroCards` | 首页播客推荐大卡片 | ✓ |
| `podcastTypeTabs` | 首页播客类型 Tab | ✓ |
| `podcastRecommendList` | 首页播客推荐列表 | ✓ |

> ⚠️ `theme` 和 `homeTabs` 已被注释掉 (`@deprecated`)，不再导出。  
> ⚠️ `homeCards`、`recommendSongs`、`recommendPlaylists` 仍导出但**未被使用** — 首页自行定义了带 `className` 渐变背景的本地数据。

### 数据关系

```
playlistDetailMap[id].songIds  ──→  allSongs[id]  (歌单页解析歌曲列表)

currentPlaySong.song           ←──  各页面写入      (播放器页 onLoad 读取)

playerInfo                     ←──  mini-player 默认显示
```

---

## 跨组件通信（无 Vuex）

### 事件总线 (`uni.$on` / `uni.$emit` / `uni.$off`)

```
uni.$emit('playSong', songData)
  → mini-player 监听，更新显示的歌曲并开始播放

uni.$emit('togglePlay')
  → mini-player / 全屏播放器 监听，切换播放/暂停

uni.$emit('playingChange', state)
  → 全屏播放器 监听，同步播放状态
```

### 共享可变对象 (`currentPlaySong`)

```js
// 跳转全屏播放器前
currentPlaySong.song = songData
uni.navigateTo({ url: '/pages/player/index' })

// 播放器页面 onLoad 时
const song = currentPlaySong.song
```

> `navigateTo` 的 URL 参数有序列化时序问题，共享对象是同步的、更可靠。

---

## 登录流程

```
进入"我的" → onShow 检查 uni.getStorageSync(LOGIN_KEY)
  ├── 有值  → 显示用户信息 (profile)
  └── 无值  → 显示"去登录"按钮
                → 点击 → uni.navigateTo('/pages/login/index')
                          → 输入学号/姓名/密码 (或点"一键填入测试账号")
                          → 与 STUDENT 常量比对
                              ├── 匹配 → setStorageSync → reLaunch 回"我的"
                              └── 不匹配 → uni.showToast 提示
退出登录 → uni.removeStorageSync(LOGIN_KEY) → reLaunch
```

---

## CSS 变量模式

需要 `calc()` 计算状态栏高度的页面，必须在 `.page` 元素上设置 CSS 变量：

```html
<view class="page" :style="{ '--status-bar-height': statusBarPx }">
```

```js
data() {
  return { statusBarPx: '44px' }
},
created() {
  const h = uni.getSystemInfoSync().statusBarHeight || 44
  this.statusBarPx = h + 'px'
}
```

使用此模式的页面：**搜索、笔记、我的**。首页不使用（`overflow-x: hidden` 而非 `overflow: hidden`）。

---

## 样式规范

| 规范 | 详情 |
|------|------|
| 主题配色 | 背景 `#665D5F`，文字 `#F6F4F4`，强调红 `#FF2D55`（全部硬编码在 scoped CSS 中） |
| 尺寸单位 | 统一 `rpx`（750rpx = 屏幕宽度，跨平台自适应） |
| 滚动条 | 全局隐藏 `::-webkit-scrollbar { width: 0; height: 0 }` |
| H5 适配 | 约束为手机宽度容器，避免桌面端拉伸 |
| 毛玻璃 | 状态栏 / mini-player / bottom-tab 使用 `backdrop-filter: blur()` |
| 抽屉样式 | 放在 `App.vue` **全局**（非 scoped）`<style>` 中，class 前缀 `drawer-*` |
| 页面动画 | 全局 `@keyframes pageFadeIn`（淡入 + 轻微上移） |
| 字体 | `-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Arial, sans-serif` |

---

## 已知平台问题

| 问题 | 平台 | 原因 | 解决方案 |
|------|------|------|---------|
| 子组件 `position:fixed` 不相对屏幕 | App | 子组件渲染在隔离的原生视图层 | **内联模板**替代组件 |
| 左边缘触摸坐标为负值 (`-1,72`) | Android App | 触摸坐标越界 | ☰ 按钮 `margin-left: 24rpx`，`@tap.stop` 绑在 `<view>` 上 |
| `v-if` 挂载时 CSS 动画不触发 | App | 元素"出生"时动画已设置完毕 | 挂载→闭合态→`setTimeout(50ms)`→打开态→触发 CSS transition |
| `will-change: transform` 创建包含块 | App WebView | 创建新的 CSS 包含块 | 抽屉元素上避免使用 `will-change` |
| 启动闪屏不消失 | App | `manifest.json` 配置 `waiting: true`，需手动关闭 | 在 `App.vue` 的 `onLaunch`/`onReady` 中调用 `plus.navigator.closeSplashscreen()` (目前未实现) |

---

## 素材替换

[`static/images/`](static/images/) 目录下有 27 张占位图 (26 张 JPG 封面/笔记 + 1 张 PNG 头像)。替换图片时保持文件名不变，无需改代码。

---

## 默认测试账号

> 在 [`common/data.js`](common/data.js) 中配置

| 字段 | 值 |
|------|-----|
| 学号 | `2312505051` |
| 姓名 | `马望轩` |
| 密码 | `123456` |

修改 `STUDENT` 对象的 `id`、`name`、`password` 即可切换账号。登录页有"一键填入测试账号"按钮自动填充。

---

## 版本

**v1.4.0** (与 `manifest.json` 保持一致) — SideDrawer 内联模板方案、播客主界面、我的页面重构、全站风格统一。
