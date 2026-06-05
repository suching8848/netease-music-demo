<template>
  <view class="page">
    <view class="status-bar"></view>

    <view class="search-top">
      <view class="left-menu">
        <text class="menu-icon" @tap="openDrawer">☰</text>
        <view class="badge">99+</view>
      </view>

      <view class="search-box">
        <text class="search-mark">⌕</text>
        <text class="hot">!</text>
        <text class="search-text">ぴーなた 新歌发布</text>
        <text class="scan">⌗</text>
      </view>

      <view class="mic">◉</view>
    </view>

    <scroll-view scroll-y class="content" :show-scrollbar="false">
      <view class="icon-row">
        <view class="icon-item" v-for="item in icons" :key="item.id">
          <view class="round-icon">{{ item.icon }}</view>
          <view class="icon-name">{{ item.name }}</view>
        </view>
      </view>

      <view class="title">快速发现</view>

      <scroll-view scroll-x class="quick-scroll" :show-scrollbar="false">
        <view class="quick-row">
          <view class="quick-card" v-for="item in quickList" :key="item.id">
            <image class="quick-img" :src="item.image" mode="aspectFill"></image>
            <view class="quick-mask">
              <view class="quick-title">{{ item.title }}</view>
              <view class="quick-sub">{{ item.sub }}</view>
            </view>
          </view>
        </view>
      </scroll-view>

      <view class="title browse-title">浏览全部</view>

      <view class="grid">
        <view class="grid-card" v-for="item in browseList" :key="item.id">
          <image class="grid-img" :src="item.image" mode="aspectFill"></image>
          <view class="grid-mask">
            <view class="grid-title">{{ item.title }}</view>
            <view class="grid-sub">{{ item.sub }}</view>
          </view>
        </view>
      </view>

      <view class="bottom-safe"></view>
    </scroll-view>

    <mini-player></mini-player>
    <bottom-tab active="search"></bottom-tab>

    <side-drawer
      v-model="showDrawer"
      @user-click="onUserClick"
      @item-click="onDrawerItemClick"
      @setting-click="onSettingClick"
      @more-click="onMoreClick"
    />
  </view>
</template>

<script>
import { discoverIcons, quickDiscover, browseAll } from '../../common/data.js'
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'
import SideDrawer from '../../components/SideDrawer/SideDrawer.vue'

export default {
  components: {
    MiniPlayer,
    BottomTab,
    SideDrawer
  },
  data() {
    return {
      showDrawer: false,
      icons: discoverIcons,
      quickList: quickDiscover,
      browseList: browseAll
    }
  },
  onHide() {
    this.showDrawer = false
  },
  methods: {
    openDrawer() {
      this.showDrawer = true
    },
    onUserClick() {
      this.showDrawer = false
      uni.reLaunch({ url: '/pages/mine/index' })
    },
    onDrawerItemClick(item) {
      console.log('抽屉菜单点击:', item.key, item.title)
      this.showDrawer = false
    },
    onSettingClick() {
      console.log('设置点击')
      this.showDrawer = false
    },
    onMoreClick() {
      console.log('更多点击')
      this.showDrawer = false
    }
  }
}
</script>

<style scoped>
.page {
  height: 100vh;
  background: #665D5F;
  overflow: hidden;
}
.search-top {
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
}
.left-menu {
  width: 88rpx;
  position: relative;
}
.menu-icon {
  color: #fff;
  font-size: 50rpx;
}
.badge {
  position: absolute;
  left: 26rpx;
  top: -8rpx;
  height: 34rpx;
  line-height: 34rpx;
  background: #ff1935;
  color: #fff;
  font-size: 20rpx;
  padding: 0 12rpx;
  border-radius: 18rpx;
}
.search-box {
  flex: 1;
  height: 74rpx;
  border-radius: 38rpx;
  background: rgba(255,255,255,.12);
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  color: rgba(255,255,255,.42);
}
.search-mark {
  font-size: 42rpx;
  margin-right: 14rpx;
}
.hot {
  color: #ff3b4d;
  font-size: 38rpx;
  font-weight: 900;
  margin-right: 16rpx;
}
.search-text {
  flex: 1;
  font-size: 30rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.scan {
  font-size: 34rpx;
  color: rgba(255,255,255,.55);
}
.mic {
  width: 74rpx;
  text-align: right;
  color: #fff;
  font-size: 46rpx;
}
.content {
  height: calc(100vh - var(--status-bar-height) - 96rpx);
}
.icon-row {
  height: 188rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10rpx 20rpx 0;
}
.icon-item {
  width: 132rpx;
  text-align: center;
}
.round-icon {
  height: 74rpx;
  line-height: 74rpx;
  color: #E7C9C9;
  font-size: 52rpx;
  font-weight: 900;
}
.icon-name {
  margin-top: 12rpx;
  color: #fff;
  font-size: 28rpx;
}
.title {
  margin: 44rpx 36rpx 26rpx;
  color: #fff;
  font-size: 38rpx;
  font-weight: 900;
}
.quick-scroll {
  white-space: nowrap;
  padding-left: 28rpx;
}
.quick-row {
  display: flex;
  gap: 20rpx;
}
.quick-card {
  width: 246rpx;
  height: 384rpx;
  border-radius: 12rpx;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: #544c4e;
}
.quick-img {
  width: 100%;
  height: 100%;
}
.quick-mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 26rpx 26rpx;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.68) 100%);
}
.quick-title {
  color: #fff;
  font-size: 32rpx;
  font-weight: 900;
}
.quick-sub {
  margin-top: 8rpx;
  color: rgba(255,255,255,.85);
  font-size: 25rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.browse-title {
  margin-top: 58rpx;
}
.grid {
  padding: 0 28rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.grid-card {
  width: 344rpx;
  height: 220rpx;
  border-radius: 12rpx;
  overflow: hidden;
  position: relative;
  background: #544c4e;
  margin-bottom: 18rpx;
}
.grid-img {
  width: 100%;
  height: 100%;
}
.grid-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 56rpx 30rpx 0;
  background: linear-gradient(90deg, rgba(0,0,0,.48), rgba(0,0,0,.1));
}
.grid-title {
  color: #fff;
  font-size: 34rpx;
  font-weight: 900;
}
.grid-sub {
  margin-top: 12rpx;
  color: rgba(255,255,255,.78);
  font-size: 26rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bottom-safe {
  height: 260rpx;
}
</style>
