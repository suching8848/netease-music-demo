<template>
  <view class="page-root">
    <!-- 统一顶栏：fixed，在 .page 外部避免 overflow:hidden 裁剪 -->
    <view class="header-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="top-bar">
      <view class="left-menu" @tap.stop="openDrawer">
        <text class="icon">☰</text>
        <view class="menu-badge">99+</view>
      </view>

      <!-- 未滚动：+ 添加状态；滚动后：小头像 + 用户名 -->
      <text v-if="!isScrolled" class="status-text">+ 添加状态</text>
      <view v-else class="compact-header">
        <image class="compact-avatar" src="/static/avatar.png" mode="aspectFill" />
        <text class="compact-name">{{ profile.name }}</text>
      </view>

      <view class="right-icons">
        <text class="icon">＋</text>
        <text class="icon search" @tap="goSearch">⌕</text>
        <text class="icon">⋮</text>
      </view>
    </view>
    </view><!-- .header-bar -->

    <view class="page" :style="{ '--status-bar-height': statusBarPx }">
    <!-- ========== 主内容滚动区 ========== -->
    <scroll-view
      ref="contentScroller"
      scroll-y
      class="content"
      :show-scrollbar="false"
      @scroll="onScroll"
      :style="{ height: contentHeight }"
      :scroll-top="scrollToTop"
    >
      <!-- 固定 header 占位 -->
      <view :style="{ height: headerSpacerH + 'px' }"></view>
      <!-- ===== 用户信息区域 ===== -->
      <view class="profile-box">
        <image class="avatar" :src="profile.avatar" mode="aspectFill"></image>

        <!-- 未登录：仅显示头像 + 未登录提示 -->
        <template v-if="!loginUser">
          <view class="name-line">
            <text class="name" @tap="goLogin">未登录</text>
          </view>
          <view class="signature">点击登录享受完整功能</view>
        </template>

        <!-- 已登录：完整用户信息 -->
        <template v-else>
          <view class="name-line">
            <text class="name">{{ loginUser.name }}</text>
            <text class="vip">SVIP·柒</text>
            <text class="badge2">初音未来</text>
          </view>

          <view class="signature">{{ profile.signature }}</view>
          <view class="tags">{{ profile.tags }}</view>

          <view class="stats">
            <view class="stat">
              <text class="num">{{ profile.follow }}</text>
              <text class="lab">关注</text>
            </view>
            <view class="stat">
              <text class="num">{{ profile.fans }}</text>
              <text class="lab">粉丝</text>
            </view>
            <view class="stat">
              <text class="num">{{ profile.level }}</text>
            </view>
            <view class="stat">
              <text class="num">{{ profile.hours }}</text>
              <text class="lab">小时</text>
            </view>
          </view>
        </template>

        <view class="tool-row">
          <view class="tool"><text class="tool-icon">◷</text><text>最近</text></view>
          <view class="tool"><text class="tool-icon">▣</text><text>本地</text></view>
          <view class="tool"><text class="tool-icon">◇</text><text>会员</text></view>
          <view class="tool"><text class="tool-icon">♜</text><text>装扮</text></view>
          <view class="tool small">◫</view>
        </view>
      </view>

      <!-- ===== 主卡片（Tab + 内容） ===== -->
      <view class="main-card">
        <!-- 一级 Tab（卡片内的原始 tab，吸顶激活后隐藏） -->
        <view class="top-tabs" ref="topTabs">
          <view
            v-for="(tab, index) in mainTabs"
            :key="tab"
            class="top-tab"
            :class="{ active: activeMainTab === tab }"
            @tap="switchMainTab(tab)"
          >
            {{ tab }}
          </view>
          <!-- 指示线跟随 active 索引滑动 -->
          <view class="tab-indicator" :style="{ transform: 'translateX(' + (tabIndicatorOffset) + ')' }"></view>
        </view>

        <!-- Tab 内容区 -->
          <view class="tab-content-area" :style="{ minHeight: tabMinHeight + 'rpx' }">

            <!-- ===== 音乐 Tab（登录态控制） ===== -->
            <view v-if="activeMainTab === '音乐'" key="music">
              <!-- 未登录：引导登录 -->
              <view v-if="!loginUser" class="login-card">
                <view class="login-title">登录后查看个人音乐空间</view>
                <button class="login-btn" @tap="goLogin">去登录</button>
              </view>
              <!-- 非默认账号：未注册提示 -->
              <view v-else-if="!isDefaultAccount" class="login-card">
                <view class="login-title">该账号未注册（功能未开发）</view>
              </view>
              <!-- 默认账号：完整内容 -->
              <template v-else>
                <view class="sub-tabs">
                  <view class="sub-tab active">▣ 近期</view>
                  <view class="sub-tab">创建<text>95</text></view>
                  <view class="sub-tab">收藏<text>297</text></view>
                  <view class="sub-tab">专辑<text>96</text></view>
                  <view class="sub-more">⋮</view>
                </view>

                <view class="playlist-item" v-for="item in playlists" :key="item.id" @tap="goPlaylist(item.id)">
                  <image class="playlist-img" :src="item.image" mode="aspectFill"></image>
                  <view class="playlist-info">
                    <view class="playlist-name">{{ item.title }}</view>
                    <view class="playlist-desc">{{ item.desc }}</view>
                  </view>
                  <view class="more">⋮</view>
                </view>

                <button class="logout-btn" @tap="logout">退出登录</button>
              </template>
            </view>

            <!-- ===== 播客 Tab（登录态控制） ===== -->
            <view v-if="activeMainTab === '播客'" key="podcast">
              <view v-if="!loginUser" class="login-card">
                <view class="login-title">登录后查看播客内容</view>
                <button class="login-btn" @tap="goLogin">去登录</button>
              </view>
              <view v-else-if="!isDefaultAccount" class="login-card">
                <view class="login-title">该账号未注册（功能未开发）</view>
              </view>
              <podcast-section v-if="loginUser && isDefaultAccount" />
            </view>

            <!-- ===== 笔记 Tab（登录态控制） ===== -->
            <view v-if="activeMainTab === '笔记'" key="note">
              <view v-if="!loginUser" class="login-card">
                <view class="login-title">登录后查看笔记内容</view>
                <button class="login-btn" @tap="goLogin">去登录</button>
              </view>
              <view v-else-if="!isDefaultAccount" class="login-card">
                <view class="login-title">该账号未注册（功能未开发）</view>
              </view>
              <notes-section v-if="loginUser && isDefaultAccount" />
            </view>

          </view>
      </view>

      <view class="bottom-safe"></view>
    </scroll-view>

    <mini-player></mini-player>
    <bottom-tab active="mine"></bottom-tab>
  </view><!-- .page -->

  <!-- ========== 吸顶 Tab 浮层 — 位于 .page 外部，绝对定位，CSS 过渡平滑显隐 ========== -->
  <view
    class="sticky-tabs-float"
    :class="{ visible: showStickyTabs }"
    :style="{ top: stickyTabsTop }"
  >
    <view
      v-for="tab in mainTabs"
      :key="tab"
      class="sticky-tab"
      :class="{ active: activeMainTab === tab }"
      @tap="switchMainTab(tab)"
    >
      <text>{{ tab }}</text>
    </view>
    <view class="sticky-indicator" :style="{ transform: 'translateX(' + tabIndicatorOffset + ')' }"></view>
  </view>

  <!-- ========== SideDrawer 抽屉 ========== -->
  <view v-if="showDrawer" class="drawer-root">
    <view class="drawer-mask" :style="{ opacity: drawerActive ? 1 : 0 }" @tap.stop="handleDrawerMaskTap"></view>
    <view class="drawer-panel" @tap.stop :style="{ transform: drawerActive ? 'translateX(0)' : 'translateX(-100%)', paddingTop: drawerStatusBarH + 'px' }">
      <view class="drawer-top">
        <view class="drawer-user-info" @tap="handleDrawerUserClick">
          <image class="drawer-avatar" src="/static/avatar.png" mode="aspectFill" />
          <view class="drawer-user-name-row">
            <text v-if="!loginUser" class="drawer-user-name" style="color:rgba(255,255,255,0.45)">未登录</text>
            <text v-else class="drawer-user-name">{{ loginUser.name }}</text>
            <text class="drawer-user-arrow">›</text>
          </view>
        </view>
      </view>
      <scroll-view class="drawer-scroll" scroll-y :show-scrollbar="false" enhanced>
        <view class="drawer-svip">
          <view class="drawer-svip-top">
            <view class="drawer-svip-title-row"><text class="drawer-svip-icon">◆</text><text class="drawer-svip-title">黑胶 SVIP · 柒</text><text class="drawer-svip-arrow">›</text></view>
            <view class="drawer-svip-btn">会员中心</view>
          </view>
          <view class="drawer-svip-sub">享专属数专、AI调音等30+权益</view>
        </view>
        <view class="drawer-banner">
          <view class="drawer-banner-triangle"></view>
          <view class="drawer-banner-body">
            <view class="drawer-banner-left"><text class="drawer-banner-badge">SVIP</text><text class="drawer-banner-text">周年庆！ 免费天数已发放</text></view>
            <text class="drawer-banner-action">立抢 ›</text>
          </view>
        </view>
        <view class="drawer-menu-card">
          <block v-for="item in drawerMenuItems" :key="item.key">
            <view class="drawer-menu-item" @tap="handleDrawerItemClick(item)">
              <view class="drawer-menu-left"><text class="drawer-menu-icon">{{ item.icon }}</text><text class="drawer-menu-title">{{ item.title }}</text></view>
              <view class="drawer-menu-right">
                <text v-if="item.badge" class="drawer-menu-badge">{{ item.badge }}</text>
                <text v-else-if="item.subtitle" class="drawer-menu-subtitle">{{ item.subtitle }}</text>
                <text v-else-if="item.arrow !== false" class="drawer-menu-arrow">›</text>
              </view>
            </view>
            <view v-if="item.divider" class="drawer-menu-divider"></view>
          </block>
        </view>
        <view class="drawer-scroll-spacer"></view>
      </scroll-view>
      <view class="drawer-bottom" :style="{ paddingBottom: drawerSafeBottom + 'px' }">
        <view class="drawer-bottom-btn" @tap="handleDrawerSettingClick"><text class="drawer-bottom-icon">⚙</text><text class="drawer-bottom-text">设置</text></view>
        <view class="drawer-bottom-btn" @tap="handleDrawerMoreClick"><text class="drawer-bottom-icon">⋯</text><text class="drawer-bottom-text">更多</text></view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
import { profile, myPlaylists, LOGIN_KEY, STUDENT } from '../../common/data.js'
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'
import PodcastSection from '../../components/PodcastSection.vue'
import NotesSection from '../../components/NotesSection.vue'
import drawerMixin from '../../common/drawerMixin.js'

export default {
  mixins: [drawerMixin],
  components: {
    MiniPlayer,
    BottomTab,
    PodcastSection,
    NotesSection
  },
  data() {
    return {
      statusBarHeight: 44,
      statusBarPx: '44px',
      headerSpacerH: 140,
      showDrawer: false,
      profile,
      playlists: myPlaylists,
      loginUser: null,

      // --- Tab ---
      mainTabs: ['音乐', '播客', '笔记'],
      activeMainTab: '音乐',

      // --- 滚动 ---
      scrollTop: 0,
      isScrolled: false,
      showStickyTabs: false,
      scrollToTop: 0,
      profileBoxHeight: 400,
      tabsOffsetY: 400,
      tabMinHeight: 600,

      // --- 滚动节流 ---
      _scrollThrottle: null
    }
  },
  computed: {
    /** 内容区高度 — header 已 fixed，scroll-view 撑满全屏 */
    contentHeight() {
      return '100vh'
    },
    /** 吸顶浮层 top — 状态栏 + 顶栏高度 */
    stickyTabsTop() {
      const topBarPx = 96 * (uni.getSystemInfoSync().screenWidth / 750)
      return (this.statusBarHeight + topBarPx) + 'px'
    },
    /** 是否为默认测试账号 */
    isDefaultAccount() {
      return this.loginUser && this.loginUser.id === STUDENT.id
    },
    /** Tab 指示线水平偏移 — 指示线宽度 33.33%，translateX(0/100%/200%) 对齐三个 tab */
    tabIndicatorOffset() {
      const index = this.mainTabs.indexOf(this.activeMainTab)
      return (index * 100) + '%'
    }
  },
  created() {
    const info = uni.getSystemInfoSync()
    this.statusBarHeight = info.statusBarHeight || 44
    this.statusBarPx = this.statusBarHeight + 'px'
    const topBarPx = 96 * (info.screenWidth / 750)
    this.headerSpacerH = this.statusBarHeight + topBarPx
  },
  mounted() {
    this.$nextTick(() => {
      this._measureLayout()
    })
  },
  onShow() {
    this.loginUser = uni.getStorageSync(LOGIN_KEY) || null
  },
  beforeDestroy() {
    if (this._scrollThrottle) clearTimeout(this._scrollThrottle)
  },
  methods: {
    /* ====== 测量布局偏移 ====== */
    _measureLayout() {
      // 测量 profile 区域 + main-card margin 总高度，作为吸顶 tab 出现的阈值
      const query = uni.createSelectorQuery().in(this)
      query.select('.profile-box').boundingClientRect()
      query.select('.main-card').boundingClientRect()
      query.exec(res => {
        if (res[0]) {
          this.profileBoxHeight = res[0].height || 400
        }
        if (res[1]) {
          // main-card 顶部相对于视口的位置 = 吸顶触发点
          // 减去 scroll-view 顶部偏移（状态栏 + 顶栏），转为 scrollTop 坐标
          const topBarPx = 96 * (uni.getSystemInfoSync().screenWidth / 750)
          this.tabsOffsetY = res[1].top - this.statusBarHeight - topBarPx
          if (this.tabsOffsetY < 0) this.tabsOffsetY = this.profileBoxHeight
        }
      })
    },

    /* ====== Tab 切换 ====== */
    switchMainTab(tab) {
      if (this.activeMainTab === tab) return

      // 根据当前 tab 和切换方向调整 minHeight，避免高度塌陷
      if (tab === 'music') {
        this.tabMinHeight = 600
      } else if (tab === 'podcast') {
        this.tabMinHeight = 800
      } else {
        this.tabMinHeight = 700
      }

      this.activeMainTab = tab

      // 切换到非音乐 tab 时确保有足够内容可滚动
      this.$nextTick(() => {
        this._measureLayout()
      })
    },

    /* ====== 滚动处理（节流） ====== */
    onScroll(e) {
      if (this._scrollThrottle) return
      this._scrollThrottle = setTimeout(() => {
        this._scrollThrottle = null
        this._onScrollTick(e.detail.scrollTop)
      }, 16)
    },

    _onScrollTick(top) {
      this.scrollTop = top

      // 滚动超过 ~80px 时切换顶部栏为紧凑模式
      this.isScrolled = top > 80

      // 滚动超过 profile 区域高度时显示吸顶 tabs
      const threshold = this.tabsOffsetY > 0 ? this.tabsOffsetY : this.profileBoxHeight
      const shouldSticky = top > threshold
      if (this.showStickyTabs !== shouldSticky) {
        this.showStickyTabs = shouldSticky
      }
    },

    /* ====== 导航 ====== */
    goSearch() {
      uni.reLaunch({ url: '/pages/search/index' })
    },
    // 已在「我的」页，点用户区只关抽屉
    handleDrawerUserClick() {
      this.closeDrawer()
    },
    goPlaylist(playlistId) {
      uni.navigateTo({ url: '/pages/playlist/index?playlistId=' + playlistId })
    },
    goLogin() {
      uni.navigateTo({ url: '/pages/login/index' })
    },
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定退出登录吗？',
        success: res => {
          if (res.confirm) {
            uni.removeStorageSync(LOGIN_KEY)
            this.loginUser = null
            uni.showToast({ title: '已退出登录', icon: 'none' })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.page-root {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: visible;
  background: linear-gradient(180deg, #5a5053 0%, #665D5F 30%, #4a4245 100%);
}
.page {
  height: 100vh;
  overflow: hidden;
}

/* ---- 统一顶栏：状态栏背景 + 导航栏 ---- */
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(102, 93, 95, 0.75);
}

/* ---- 顶部导航栏 ---- */
.top-bar {
  height: 96rpx;
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  color: #fff;
}
.left-menu {
  width: 88rpx;
  height: 88rpx;
  margin-left: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}
.left-menu:active {
  opacity: 0.6;
}
/* 红色角标 99+ */
.menu-badge {
  position: absolute;
  top: 6rpx;
  right: -4rpx;
  min-width: 38rpx;
  height: 30rpx;
  line-height: 30rpx;
  padding: 0 8rpx;
  border-radius: 15rpx;
  background: #ff2d55;
  color: #fff;
  font-size: 18rpx;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.3);
}
.icon {
  color: #fff;
  font-size: 44rpx;
  line-height: 1;
  transition: transform 0.15s;
}
.icon:active { transform: scale(0.85); }
.status-text {
  flex: 1;
  text-align: center;
  color: rgba(255,255,255,.55);
  font-size: 26rpx;
}
/* 滚动后紧凑头部 */
.compact-header {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.compact-avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #888;
  flex-shrink: 0;
}
.compact-name {
  color: #fff;
  font-size: 28rpx;
  font-weight: 700;
  margin-left: 14rpx;
}
.right-icons {
  width: 230rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.search {
  font-size: 56rpx;
}

/* ---- 吸顶 Tab 浮层 — 绝对定位在 .page 外部，CSS 过渡平滑显隐 ---- */
.sticky-tabs-float {
  position: absolute;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  align-items: center;
  background: #6C6365;
  z-index: 99;
  /* 隐藏态：上方不可见 */
  opacity: 0;
  transform: translateY(-100%);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.sticky-tabs-float.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.sticky-tab {
  flex: 1;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  color: rgba(255, 255, 255, 0.45);
  font-size: 32rpx;
  font-weight: 700;
  transition: color 0.2s;
}
.sticky-tab.active {
  color: #fff;
}
.sticky-indicator {
  position: absolute;
  bottom: 0;
  width: 33.33%;
  height: 5rpx;
  background: #fff;
  border-radius: 5rpx;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---- 内容滚动区 ---- */
.content {
  /* height 由 computed contentHeight 通过 :style 动态设置 */
}

/* ---- 用户信息 ---- */
.profile-box {
  padding: 40rpx 36rpx 0;
  text-align: center;
}
.avatar {
  width: 180rpx;
  height: 180rpx;
  border-radius: 50%;
  background: #554d4f;
  box-shadow: 0 12rpx 36rpx rgba(0, 0, 0, 0.3);
  border: 4rpx solid rgba(255, 255, 255, 0.08);
}
.name-line {
  margin-top: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.name {
  color: #fff;
  font-size: 42rpx;
  font-weight: 700;
  margin-right: 16rpx;
}
/* SVIP 金色胶囊 */
.vip {
  height: 38rpx;
  line-height: 38rpx;
  padding: 0 14rpx;
  border-radius: 19rpx;
  background: linear-gradient(135deg, #3a2c1b 0%, #5c3d0a 100%);
  color: #F4D59A;
  font-size: 22rpx;
  font-weight: 700;
  margin-right: 10rpx;
  border: 1rpx solid rgba(244, 213, 154, 0.3);
}
/* 初音未来 蓝绿色胶囊 */
.badge2 {
  height: 38rpx;
  line-height: 38rpx;
  padding: 0 14rpx;
  border-radius: 19rpx;
  background: linear-gradient(135deg, #1a3a3a 0%, #0d7377 100%);
  color: #5eead4;
  font-size: 22rpx;
  font-weight: 700;
  border: 1rpx solid rgba(94, 234, 212, 0.25);
}
.signature {
  margin-top: 18rpx;
  color: rgba(255, 255, 255, 0.58);
  font-size: 26rpx;
}
.tags {
  margin-top: 18rpx;
  color: rgba(255, 255, 255, 0.60);
  font-size: 24rpx;
}
.stats {
  display: flex;
  justify-content: center;
  margin-top: 32rpx;
}
.stat {
  margin: 0 24rpx;
  color: #fff;
  font-size: 24rpx;
  font-weight: 700;
  display: flex;
  align-items: baseline;
}
.num {
  font-size: 34rpx;
  font-weight: 700;
  margin-right: 6rpx;
}
.lab {
  color: rgba(255, 255, 255, 0.50);
  font-weight: 400;
  font-size: 24rpx;
}
.tool-row {
  display: flex;
  gap: 20rpx;
  margin-top: 38rpx;
}
.tool {
  flex: 1;
  height: 76rpx;
  border-radius: 10rpx;
  background: rgba(255, 255, 255, 0.10);
  color: rgba(255, 255, 255, 0.76);
  font-size: 26rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tool.small {
  flex: 0 0 74rpx;
  font-size: 38rpx;
}
.tool-icon {
  margin-right: 8rpx;
  font-size: 24rpx;
}

/* ---- 主卡片 ---- */
.main-card {
  margin-top: 48rpx;
  background: #6C6365;
  border-radius: 22rpx 22rpx 0 0;
  padding-bottom: 26rpx;
  min-height: 600rpx;
}

/* ---- 一级 Tab（卡片内） ---- */
.top-tabs {
  height: 110rpx;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.08);
}
.top-tab {
  flex: 1;
  height: 110rpx;
  line-height: 110rpx;
  text-align: center;
  color: rgba(255, 255, 255, 0.42);
  font-size: 34rpx;
  font-weight: 700;
  transition: color 0.2s;
}
.top-tab.active {
  color: #fff;
}
/* 指示线 — 根据 activeMainTab 索引平滑滑动 */
.tab-indicator {
  position: absolute;
  bottom: 0;
  width: 33.33%;
  height: 5rpx;
  background: #fff;
  border-radius: 5rpx;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-content-area {
  /* min-height 由 JS 动态设置，防止切换时高度塌陷 */
}

/* ---- 音乐 Tab：二级筛选 ---- */
.sub-tabs {
  height: 80rpx;
  display: flex;
  align-items: center;
  padding: 0 36rpx;
}
.sub-tab {
  margin-right: 42rpx;
  color: rgba(255, 255, 255, 0.48);
  font-size: 27rpx;
  font-weight: 700;
}
.sub-tab.active {
  color: #fff;
  font-weight: 700;
}
.sub-tab text {
  font-size: 20rpx;
  vertical-align: top;
}
.sub-more {
  margin-left: auto;
  color: rgba(255, 255, 255, 0.48);
  font-size: 40rpx;
}

/* ---- 音乐 Tab：登录卡片 ---- */
.login-card {
  margin: 0 36rpx 24rpx;
  padding: 30rpx;
  border-radius: 22rpx;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-title {
  color: #fff;
  font-size: 28rpx;
  font-weight: 700;
}
.login-btn {
  width: 150rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  border-radius: 32rpx;
  background: #ff1935;
  color: #fff;
  font-size: 26rpx;
  font-weight: 700;
}

/* ---- 音乐 Tab：歌单列表 ---- */
.playlist-item {
  height: 120rpx;
  display: flex;
  align-items: center;
  padding: 0 36rpx;
}
.playlist-item:active {
  background: rgba(255, 255, 255, 0.04);
}
.playlist-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 8rpx;
  background: #554d4f;
}
.playlist-info {
  flex: 1;
  margin-left: 28rpx;
  overflow: hidden;
}
.playlist-name {
  color: #fff;
  font-size: 30rpx;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.playlist-desc {
  margin-top: 8rpx;
  color: rgba(255, 255, 255, 0.45);
  font-size: 24rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.more {
  color: rgba(255, 255, 255, 0.42);
  font-size: 40rpx;
  margin-left: 20rpx;
}

/* ---- 音乐 Tab：退出 ---- */
.logout-btn {
  margin: 28rpx 36rpx 0;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.10);
  color: rgba(255, 255, 255, 0.75);
  font-size: 26rpx;
}

/* ---- 底部占位 ---- */
.bottom-safe {
  height: 280rpx;
}
</style>
