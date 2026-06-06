<template>
  <view class="page-root">
    <view class="page">
    <!-- 固定顶部区域：状态栏 + 导航栏 -->
    <view class="header-fixed" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="top-nav">
      <view class="left-menu" @tap.stop="openDrawer">
        <text class="menu-icon">☰</text>
        <view class="menu-badge">99+</view>
      </view>

      <scroll-view scroll-x class="tabs-scroll" :show-scrollbar="false">
        <view class="tabs">
          <view
            v-for="(item, index) in tabs"
            :key="index"
            class="tab"
            :class="{ active: currentTab === index }"
            @tap="currentTab = index"
          >
            {{ item }}
          </view>
        </view>
      </scroll-view>

      <view class="search-icon" @tap="goSearch">⌕</view>
    </view>
    </view><!-- .header-fixed -->

    <!-- 首页内容 -->
    <view class="content">
      <!-- 固定头部的占位，防止内容被遮挡 -->
      <view :style="{ height: headerSpacerH + 'px' }"></view>

      <!-- 播客频道：显示播客主界面 -->
      <podcast-home-page v-if="isPodcastTab" />

      <!-- 其他频道：原有首页内容 -->
      <template v-else>
      <!-- 顶部横向卡片 -->
      <scroll-view
        scroll-x
        class="card-scroll"
        :show-scrollbar="false"
        enhanced
      >
        <view class="card-row">
          <view
            class="top-card"
            v-for="item in topCards"
            :key="item.id"
            :class="item.className"
          >
            <view class="card-disc"></view>
            <view class="card-title">{{ item.title }}</view>
            <view class="card-sub">{{ item.sub }}</view>
          </view>
        </view>
      </scroll-view>

      <!-- 推荐标题 -->
      <view class="section-title">根据「Sphalerite」为你推荐</view>

      <!-- 推荐歌曲 -->
      <view class="song-list">
        <view
          class="song-item"
          v-for="item in songs"
          :key="item.id"
          @tap="playSong(item)"
        >
          <view class="song-cover" :class="item.coverClass">
            <view class="small-disc"></view>
          </view>

          <view class="song-info">
            <view class="song-name">{{ item.name }}</view>
            <view class="song-desc">
              <text class="song-tag">{{ item.tag }}</text>
              <text class="singer">{{ item.singer }}</text>
            </view>
          </view>

          <view class="play-icon">▶</view>
        </view>
      </view>

      <!-- 推荐歌单 -->
      <view class="section-title playlist-title">推荐歌单 ></view>

      <scroll-view
        scroll-x
        class="playlist-scroll"
        :show-scrollbar="false"
        enhanced
      >
        <view class="playlist-row">
          <view
            class="playlist-card"
            v-for="item in playlists"
            :key="item.id"
            @tap="goPlaylist(item.id)"
          >
            <view class="playlist-cover" :class="item.className">
              <view class="cover-disc"></view>
            </view>
            <view class="playlist-name">{{ item.name }}</view>
          </view>
        </view>
      </scroll-view>

      <view class="bottom-space"></view>
      </template>
    </view>

    <!-- 底部播放器 -->
    <mini-player></mini-player>

    <!-- 底部导航 -->
    <bottom-tab active="home"></bottom-tab>
  </view>

  <!-- ====== SideDrawer 内联模板 ====== -->
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
            <view class="drawer-svip-title-row">
              <text class="drawer-svip-icon">◆</text>
              <text class="drawer-svip-title">黑胶 SVIP · 柒</text>
              <text class="drawer-svip-arrow">›</text>
            </view>
            <view class="drawer-svip-btn">会员中心</view>
          </view>
          <view class="drawer-svip-sub">享专属数专、AI调音等30+权益</view>
        </view>
        <view class="drawer-banner">
          <view class="drawer-banner-triangle"></view>
          <view class="drawer-banner-body">
            <view class="drawer-banner-left">
              <text class="drawer-banner-badge">SVIP</text>
              <text class="drawer-banner-text">周年庆！ 免费天数已发放</text>
            </view>
            <text class="drawer-banner-action">立抢 ›</text>
          </view>
        </view>
        <view class="drawer-menu-card">
          <block v-for="item in drawerMenuItems" :key="item.key">
            <view class="drawer-menu-item" @tap="handleDrawerItemClick(item)">
              <view class="drawer-menu-left">
                <text class="drawer-menu-icon">{{ item.icon }}</text>
                <text class="drawer-menu-title">{{ item.title }}</text>
              </view>
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
        <view class="drawer-bottom-btn" @tap="handleDrawerSettingClick">
          <text class="drawer-bottom-icon">⚙</text>
          <text class="drawer-bottom-text">设置</text>
        </view>
        <view class="drawer-bottom-btn" @tap="handleDrawerMoreClick">
          <text class="drawer-bottom-icon">⋯</text>
          <text class="drawer-bottom-text">更多</text>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'
import PodcastHomePage from '../../components/PodcastHomePage.vue'
import { allSongs, currentPlaySong, LOGIN_KEY } from '../../common/data.js'
import drawerMixin from '../../common/drawerMixin.js'

export default {
  mixins: [drawerMixin],
  components: {
    MiniPlayer,
    BottomTab,
    PodcastHomePage
  },
  data() {
    return {
      statusBarHeight: 44,
      headerSpacerH: 140,
      showDrawer: false,
      loginUser: null,
      currentTab: 0,
      tabs: ['推荐', '音乐', '播客', '听书'],
      topCards: [
        {
          id: 1,
          title: '每日推荐',
          sub: '今日限定好歌推荐',
          className: 'card-red'
        },
        {
          id: 2,
          title: '心动模式',
          sub: '红心歌曲和相似推荐',
          className: 'card-purple'
        },
        {
          id: 3,
          title: '新歌首发',
          sub: '深陷这场旋律风暴',
          className: 'card-green'
        },
        {
          id: 4,
          title: '宝藏电台',
          sub: '夜晚也要保持浪漫',
          className: 'card-pink'
        }
      ],
      songs: [
        {
          id: 1,
          name: '声',
          tag: '超45%人收藏',
          singer: 'Feryquitous',
          coverClass: 'song-black'
        },
        {
          id: 2,
          name: 'SYSTEM ERROR',
          tag: 'Hi-Res',
          singer: 'Laur',
          coverClass: 'song-red'
        },
        {
          id: 3,
          name: 'MEGATON BLAST',
          tag: '超72%人播放',
          singer: 'BlackY / Yooh',
          coverClass: 'song-blue'
        }
      ],
      playlists: [
        {
          id: 1,
          name: '粉色电波',
          className: 'list-blue'
        },
        {
          id: 2,
          name: '雨天漫画',
          className: 'list-red'
        },
        {
          id: 3,
          name: '赛博节奏',
          className: 'list-purple'
        },
        {
          id: 4,
          name: '深夜治愈',
          className: 'list-green'
        }
      ]
    }
  },
  computed: {
    isPodcastTab() {
      return this.tabs[this.currentTab] === '播客'
    }
  },
  created() {
    const info = uni.getSystemInfoSync()
    this.statusBarHeight = info.statusBarHeight || 44
    const topBarPx = 96 * (info.screenWidth / 750)
    this.headerSpacerH = this.statusBarHeight + topBarPx
  },
  onShow() {
    this.loginUser = uni.getStorageSync(LOGIN_KEY) || null
  },
  methods: {
    /** 播放指定歌曲 → 全屏播放器 */
    goSearch() {
      uni.reLaunch({ url: '/pages/search/index' })
    },
    playSong(item) {
      const song = allSongs.find(s => s.id === item.id)
      if (song) {
        currentPlaySong.song = song
        uni.$emit('playSong', song)
      }
      uni.navigateTo({ url: '/pages/player/index' })
    },
    /** 跳转歌单详情 */
    goPlaylist(playlistId) {
      uni.navigateTo({ url: '/pages/playlist/index?playlistId=' + playlistId })
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
  color: #fff;
}
.page {
  overflow-x: hidden;
}

/* 固定头部 — 状态栏背景 + 导航栏，始终在屏幕顶部 */
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(102, 93, 95, 0.75);
}

/* 顶部导航 */
.top-nav {
  height: 96rpx;
  padding: 0 28rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.06);
}

.left-menu {
  width: 88rpx;
  height: 88rpx;
  margin-left: 24rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

.left-menu:active {
  opacity: 0.6;
}

.menu-icon {
  font-size: 44rpx;
  color: #fff;
  line-height: 1;
  transition: transform 0.15s;
}

.menu-icon:active { transform: scale(0.88); }

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

.badge {
  position: absolute;
  left: 28rpx;
  top: 4rpx;
  height: 30rpx;
  line-height: 30rpx;
  padding: 0 10rpx;
  border-radius: 15rpx;
  background: #ff2d55;
  color: #fff;
  font-size: 18rpx;
  font-weight: 700;
  box-shadow: 0 2rpx 8rpx rgba(255, 45, 85, 0.4);
}

.tabs-scroll {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
}

.tabs {
  height: 96rpx;
  display: flex;
  align-items: center;
  width: max-content;
}

.tab {
  height: 96rpx;
  line-height: 96rpx;
  margin: 0 22rpx;
  font-size: 38rpx;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  position: relative;
  flex-shrink: 0;
  transition: color 0.25s;
}

.tab.active {
  color: #fff;
}

.tab.active::after {
  content: '';
  position: absolute;
  left: 20%;
  right: 20%;
  bottom: 6rpx;
  height: 6rpx;
  border-radius: 3rpx;
  background: #fff;
  box-shadow: 0 2rpx 8rpx rgba(255, 255, 255, 0.3);
}

.search-icon {
  width: 56rpx;
  text-align: right;
  font-size: 46rpx;
  color: #fff;
}

/* 主内容 */
.content {
  padding-top: 28rpx;
  padding-bottom: 280rpx;
}

/* ===== 横向推荐卡片 ===== */
.card-scroll {
  width: 100%;
  white-space: nowrap;
  padding-left: 46rpx;
  overflow: hidden;
}

.card-row {
  display: flex;
  gap: 24rpx;
  width: max-content;
}

.top-card {
  width: 330rpx;
  height: 430rpx;
  border-radius: 24rpx;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  padding: 42rpx 28rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}

.top-card:active { transform: scale(0.96); }

.card-red    { background: linear-gradient(145deg, #c0392b 0%, #e74c3c 40%, #f39c6d 100%); }
.card-purple { background: linear-gradient(145deg, #2c1050 0%, #6c30b0 40%, #9b6fd4 100%); }
.card-green  { background: linear-gradient(145deg, #064847 0%, #0d8a7a 40%, #20c9b0 100%); }
.card-pink   { background: linear-gradient(145deg, #c2185b 0%, #e91e63 40%, #f78da7 100%); }

/* 卡片装饰纹理 */
.top-card::before,
.playlist-cover::before,
.song-cover::before {
  content: '';
  position: absolute;
  left: -20%;
  right: -20%;
  top: 18%;
  height: 3rpx;
  background: rgba(255, 255, 255, 0.3);
  box-shadow:
    0 52rpx 0 rgba(255, 255, 255, 0.22),
    0 104rpx 0 rgba(255, 255, 255, 0.16),
    0 156rpx 0 rgba(255, 255, 255, 0.22),
    0 208rpx 0 rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  transform: rotate(-2deg);
}

.top-card::after,
.playlist-cover::after,
.song-cover::after {
  content: '';
  position: absolute;
  width: 86rpx;
  height: 86rpx;
  right: 36rpx;
  top: 32rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  box-shadow:
    -150rpx 76rpx 0 rgba(255, 255, 255, 0.14),
    -56rpx 182rpx 0 rgba(255, 255, 255, 0.1),
    46rpx 242rpx 0 rgba(255, 255, 255, 0.1);
}

.card-disc {
  position: absolute;
  width: 170rpx;
  height: 170rpx;
  left: 50%;
  top: 50%;
  margin-left: -85rpx;
  margin-top: -85rpx;
  border-radius: 50%;
  border: 3rpx solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.14);
}

.card-disc::after {
  content: '';
  position: absolute;
  width: 66rpx;
  height: 66rpx;
  left: 50%;
  top: 50%;
  margin-left: -33rpx;
  margin-top: -33rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.52);
}

.card-title {
  position: relative;
  z-index: 2;
  margin-top: 120rpx;
  font-size: 42rpx;
  font-weight: 700;
  text-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.2);
}

.card-sub {
  position: absolute;
  left: 28rpx;
  bottom: 34rpx;
  z-index: 2;
  font-size: 28rpx;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

/* 标题行 */
.section-title {
  margin: 68rpx 46rpx 28rpx;
  font-size: 42rpx;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1rpx;
}

.playlist-title {
  margin-top: 56rpx;
}

/* ===== 歌曲列表 ===== */
.song-list {
  padding: 0 42rpx;
}

.song-item {
  display: flex;
  align-items: center;
  min-height: 112rpx;
  padding: 12rpx 4rpx;
  border-radius: 14rpx;
  margin-bottom: 8rpx;
  transition: background 0.15s;
}

.song-item:active { background: rgba(255, 255, 255, 0.05); }

.song-cover {
  width: 92rpx;
  height: 92rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.3);
}

.song-black { background: linear-gradient(135deg, #2c2c30, #5e5e66); }
.song-red   { background: linear-gradient(135deg, #c0392b, #ff5b7d); }
.song-blue  { background: linear-gradient(135deg, #1a5276, #5dade2); }

.small-disc {
  position: absolute;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(255, 255, 255, 0.25);
  left: 22rpx;
  top: 22rpx;
  background: rgba(0, 0, 0, 0.18);
}

.small-disc::after {
  content: '';
  position: absolute;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  left: 50%;
  top: 50%;
  margin-left: -9rpx;
  margin-top: -9rpx;
}

.song-info {
  flex: 1;
  margin-left: 24rpx;
  overflow: hidden;
}

.song-name {
  font-size: 34rpx;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-desc {
  margin-top: 6rpx;
  display: flex;
  align-items: center;
  font-size: 26rpx;
  overflow: hidden;
}

.song-tag {
  color: #ff2d55;
  background: rgba(255, 45, 85, 0.14);
  border-radius: 6rpx;
  padding: 2rpx 10rpx;
  margin-right: 10rpx;
  white-space: nowrap;
  font-weight: 600;
}

.singer {
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play-icon {
  width: 72rpx;
  flex-shrink: 0;
  text-align: right;
  font-size: 48rpx;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.15s;
}

.song-item:active .play-icon { transform: scale(0.88); }

/* ===== 歌单卡片 ===== */
.playlist-scroll {
  width: 100%;
  white-space: nowrap;
  padding-left: 46rpx;
  overflow: hidden;
}

.playlist-row {
  display: flex;
  gap: 24rpx;
  width: max-content;
}

.playlist-card {
  width: 300rpx;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.playlist-card:active { transform: scale(0.96); }

.playlist-cover {
  width: 300rpx;
  height: 300rpx;
  border-radius: 20rpx;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.3);
}

.list-blue   { background: linear-gradient(135deg, #1a3a5c, #5dade2); }
.list-red    { background: linear-gradient(135deg, #8b1a3a, #e8436e); }
.list-purple { background: linear-gradient(135deg, #2e1654, #9357d8); }
.list-green  { background: linear-gradient(135deg, #0a4a48, #1db9a8); }

.cover-disc {
  position: absolute;
  width: 160rpx;
  height: 160rpx;
  left: 50%;
  top: 50%;
  margin-left: -80rpx;
  margin-top: -80rpx;
  border-radius: 50%;
  border: 3rpx solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.14);
}

.cover-disc::after {
  content: '';
  position: absolute;
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  margin-left: -28rpx;
  margin-top: -28rpx;
  background: rgba(255, 255, 255, 0.58);
}

.playlist-name {
  margin-top: 14rpx;
  font-size: 26rpx;
  color: #fff;
  white-space: nowrap;
  font-weight: 600;
}

.bottom-space {
  height: 280rpx;
}
</style>
