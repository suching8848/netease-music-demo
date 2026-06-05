<template>
  <view class="page-root">
    <view class="page" :style="{ '--status-bar-height': statusBarPx }">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <view class="note-top">
      <view class="menu" @tap="openDrawer">☰</view>

      <view class="tabs">
        <view
          class="tab follow"
          :class="{ active: activeTab === 'follow' }"
          @tap="switchTab('follow')"
        >关注</view>
        <view
          class="tab"
          :class="{ active: activeTab === 'recommend' }"
          @tap="switchTab('recommend')"
        >推荐</view>
      </view>

      <view class="icons">
        <text class="search" @tap="goSearch">⌕</text>
        <text class="plus" @tap="createNote">＋</text>
      </view>
    </view>

    <scroll-view scroll-y class="content" :show-scrollbar="false">
      <view class="waterfall">
        <view class="col">
          <view class="note-card" v-for="item in leftList" :key="item.id">
            <image class="note-img" :src="item.image" mode="aspectFill" :style="{ height: item.h + 'rpx' }"></image>
            <view class="note-body">
              <view class="note-title">{{ item.title }}</view>
              <view class="note-foot">
                <text class="user">{{ item.user }}</text>
                <text class="like">♡ {{ item.like }}</text>
              </view>
            </view>
          </view>
        </view>

        <view class="col">
          <view class="note-card" v-for="item in rightList" :key="item.id">
            <image class="note-img" :src="item.image" mode="aspectFill" :style="{ height: item.h + 'rpx' }"></image>
            <view class="note-body">
              <view class="note-title">{{ item.title }}</view>
              <view class="note-foot">
                <text class="user">{{ item.user }}</text>
                <text class="like">♡ {{ item.like }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom-safe"></view>
    </scroll-view>

    <view class="feedback" @tap="showFeedback">✎ 意见反馈</view>
    <mini-player></mini-player>
    <bottom-tab active="note"></bottom-tab>
  </view>

  <view v-if="showDrawer" class="drawer-root">
    <view class="drawer-mask" :style="{ opacity: drawerActive ? 1 : 0 }" @tap.stop="handleDrawerMaskTap"></view>
    <view class="drawer-panel" @tap.stop :style="{ transform: drawerActive ? 'translateX(0)' : 'translateX(-100%)', paddingTop: drawerStatusBarH + 'px' }">
      <view class="drawer-top">
        <view class="drawer-user-info" @tap="handleDrawerUserClick">
          <image class="drawer-avatar" src="/static/avatar.png" mode="aspectFill" />
          <view class="drawer-user-name-row"><text class="drawer-user-name">su_ching蘇清</text><text class="drawer-user-arrow">›</text></view>
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
import { noteList } from '../../common/data.js'
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'
import drawerMixin from '../../common/drawerMixin.js'

export default {
  mixins: [drawerMixin],
  components: {
    MiniPlayer,
    BottomTab
  },
  data() {
    return {
      statusBarHeight: 44,
      statusBarPx: '44px',
      showDrawer: false,
      activeTab: 'recommend',
      leftList: [],
      rightList: []
    }
  },
  created() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44
    this.statusBarPx = this.statusBarHeight + 'px'
  },
  onLoad() {
    this.leftList = noteList.filter((item, index) => index % 2 === 0)
    this.rightList = noteList.filter((item, index) => index % 2 !== 0)
  },
  methods: {
    goSearch() {
      uni.reLaunch({ url: '/pages/search/index' })
    },
    createNote() {
      uni.showToast({ title: '发布笔记开发中', icon: 'none', duration: 1200 })
    },
    switchTab(tab) {
      this.activeTab = tab
      if (tab === 'follow') {
        uni.showToast({ title: '关注列表开发中', icon: 'none', duration: 1200 })
      }
    },
    showFeedback() {
      uni.showToast({ title: '意见反馈开发中', icon: 'none', duration: 1200 })
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
.note-top {
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  background: rgba(102, 93, 95, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1rpx solid rgba(255,255,255,.06);
}
.menu {
  width: 88rpx;
  height: 88rpx;
  margin-left: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 48rpx;
  z-index: 999;
  flex-shrink: 0;
  transition: transform 0.15s;
}
.menu:active { transform: scale(0.88); }
.tabs {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab {
  margin: 0 34rpx;
  color: rgba(255,255,255,.45);
  font-size: 36rpx;
  font-weight: 700;
  position: relative;
  padding-bottom: 20rpx;
}
.follow::after {
  content: '';
  position: absolute;
  right: -22rpx;
  top: -8rpx;
  width: 14rpx;
  height: 14rpx;
  background: #ff1935;
  border-radius: 50%;
}
.tab.active {
  color: #fff;
}
.tab.active::after {
  content: '';
  position: absolute;
  left: -8rpx;
  right: -8rpx;
  bottom: 0;
  height: 6rpx;
  background: #fff;
  border-radius: 6rpx;
}
.icons {
  width: 160rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24rpx;
}
.search {
  color: #fff;
  font-size: 54rpx;
}
.plus {
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  background: #ff1935;
  color: #fff;
  font-size: 48rpx;
  line-height: 58rpx;
  text-align: center;
}
.content {
  height: calc(100vh - var(--status-bar-height) - 96rpx);
}
.waterfall {
  display: flex;
  padding: 14rpx 10rpx 0;
  gap: 12rpx;
}
.col {
  flex: 1;
  min-width: 0;
}
.note-card {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 14rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.18);
  transition: transform 0.2s;
}
.note-card:active { transform: scale(0.97); }
.note-img {
  width: 100%;
  background: #554d4f;
  display: block;
}
.note-body {
  padding: 20rpx 22rpx 18rpx;
}
.note-title {
  color: #fff;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 40rpx;
}
.note-foot {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255,255,255,.55);
  font-size: 24rpx;
}
.user {
  max-width: 190rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.like {
  color: rgba(255,255,255,.72);
}
.feedback {
  position: fixed;
  right: 0;
  top: 600rpx;
  z-index: 30;
  color: #fff;
  background: rgba(0,0,0,.55);
  padding: 18rpx 24rpx;
  border-radius: 40rpx 0 0 40rpx;
  font-size: 26rpx;
}
.bottom-safe {
  height: 280rpx;
}
</style>
