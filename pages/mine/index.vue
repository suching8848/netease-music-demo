<template>
  <view class="page">
    <view class="status-bar"></view>

    <view class="top-bar">
      <text class="icon left">☰</text>
      <text class="status-text">+ 添加状态</text>
      <view class="right-icons">
        <text class="icon">＋</text>
        <text class="icon search">⌕</text>
        <text class="icon">⋮</text>
      </view>
    </view>

    <scroll-view scroll-y class="content" :show-scrollbar="false">
      <view class="profile-box">
        <image class="avatar" :src="profile.avatar" mode="aspectFill"></image>

        <view class="name-line">
          <text class="name">{{ loginUser ? loginUser.name : profile.name }}</text>
          <text class="vip">SVIP·柒</text>
          <text class="badge2">初音未来</text>
        </view>

        <view class="signature">{{ loginUser ? '学号：' + loginUser.id : '学号：2024000000' }}</view>
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

        <view class="tool-row">
          <view class="tool"><text class="tool-icon">◷</text><text>最近</text></view>
          <view class="tool"><text class="tool-icon">▣</text><text>本地</text></view>
          <view class="tool"><text class="tool-icon">VIP</text><text>会员</text></view>
          <view class="tool"><text class="tool-icon">♜</text><text>装扮</text></view>
          <view class="tool small">◫</view>
        </view>
      </view>

      <view class="main-card">
        <view class="top-tabs">
          <view class="top-tab active">音乐</view>
          <view class="top-tab">播客</view>
          <view class="top-tab">笔记</view>
        </view>

        <view class="sub-tabs">
          <view class="sub-tab active">▣ 近期</view>
          <view class="sub-tab">创建<text>95</text></view>
          <view class="sub-tab">收藏<text>297</text></view>
          <view class="sub-tab">专辑<text>96</text></view>
          <view class="sub-more">⋮</view>
        </view>

        <view v-if="!loginUser" class="login-card">
          <view class="login-title">登录后查看个人音乐空间</view>
          <button class="login-btn" @tap="goLogin">去登录</button>
        </view>

        <view class="playlist-item" v-for="item in playlists" :key="item.id">
          <image class="playlist-img" :src="item.image" mode="aspectFill"></image>
          <view class="playlist-info">
            <view class="playlist-name">{{ item.title }}</view>
            <view class="playlist-desc">{{ item.desc }}</view>
          </view>
          <view class="more">⋮</view>
        </view>

        <button v-if="loginUser" class="logout-btn" @tap="logout">退出登录</button>
      </view>

      <view class="bottom-safe"></view>
    </scroll-view>

    <mini-player></mini-player>
    <bottom-tab active="mine"></bottom-tab>
  </view>
</template>

<script>
import { profile, myPlaylists, LOGIN_KEY } from '../../common/data.js'
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'

export default {
  components: {
    MiniPlayer,
    BottomTab
  },
  data() {
    return {
      profile,
      playlists: myPlaylists,
      loginUser: null
    }
  },
  onShow() {
    this.loginUser = uni.getStorageSync(LOGIN_KEY) || null
  },
  methods: {
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
.page {
  height: 100vh;
  background: #665D5F;
  overflow: hidden;
}
.top-bar {
  height: 96rpx;
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  color: #fff;
}
.icon {
  color: #fff;
  font-size: 48rpx;
  line-height: 1;
}
.left {
  width: 120rpx;
}
.status-text {
  flex: 1;
  text-align: center;
  color: rgba(255,255,255,.55);
  font-size: 26rpx;
}
.right-icons {
  width: 230rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search {
  font-size: 56rpx;
}
.content {
  height: calc(100vh - var(--status-bar-height) - 96rpx);
}
.profile-box {
  padding: 40rpx 36rpx 0;
  text-align: center;
}
.avatar {
  width: 198rpx;
  height: 198rpx;
  border-radius: 50%;
  background: #554d4f;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,.12);
}
.name-line {
  margin-top: 34rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.name {
  color: #fff;
  font-size: 42rpx;
  font-weight: 900;
  margin-right: 16rpx;
}
.vip,
.badge2 {
  height: 36rpx;
  line-height: 36rpx;
  padding: 0 12rpx;
  border-radius: 18rpx;
  background: rgba(0,0,0,.42);
  color: #F4D59A;
  font-size: 22rpx;
  font-weight: 700;
  margin-right: 10rpx;
}
.badge2 {
  color: #fff;
}
.signature {
  margin-top: 20rpx;
  color: rgba(255,255,255,.72);
  font-size: 28rpx;
}
.tags {
  margin-top: 22rpx;
  color: rgba(255,255,255,.72);
  font-size: 27rpx;
}
.stats {
  display: flex;
  justify-content: center;
  margin-top: 34rpx;
}
.stat {
  margin: 0 20rpx;
  color: #fff;
  font-size: 27rpx;
  font-weight: 700;
}
.num {
  font-size: 34rpx;
  font-weight: 900;
  margin-right: 8rpx;
}
.lab {
  color: rgba(255,255,255,.7);
}
.tool-row {
  display: flex;
  gap: 22rpx;
  margin-top: 40rpx;
}
.tool {
  flex: 1;
  height: 78rpx;
  border-radius: 10rpx;
  background: rgba(255,255,255,.10);
  color: rgba(255,255,255,.76);
  font-size: 28rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tool.small {
  flex: 0 0 76rpx;
  font-size: 40rpx;
}
.tool-icon {
  margin-right: 10rpx;
  font-size: 26rpx;
}
.main-card {
  margin-top: 54rpx;
  background: #6C6365;
  border-radius: 20rpx 20rpx 0 0;
  padding-bottom: 26rpx;
  min-height: 600rpx;
}
.top-tabs {
  height: 110rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1rpx solid rgba(255,255,255,.08);
}
.top-tab {
  height: 110rpx;
  line-height: 110rpx;
  color: rgba(255,255,255,.45);
  font-size: 36rpx;
  font-weight: 900;
  position: relative;
}
.top-tab.active {
  color: #fff;
}
.top-tab.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 5rpx;
  background: #fff;
  border-radius: 5rpx;
}
.sub-tabs {
  height: 84rpx;
  display: flex;
  align-items: center;
  padding: 0 36rpx;
}
.sub-tab {
  margin-right: 42rpx;
  color: rgba(255,255,255,.50);
  font-size: 27rpx;
  font-weight: 700;
}
.sub-tab.active {
  color: #fff;
  font-weight: 900;
}
.sub-tab text {
  font-size: 20rpx;
  vertical-align: top;
}
.sub-more {
  margin-left: auto;
  color: rgba(255,255,255,.50);
  font-size: 40rpx;
}
.login-card {
  margin: 0 36rpx 24rpx;
  padding: 30rpx;
  border-radius: 22rpx;
  background: rgba(255,255,255,.08);
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
.playlist-item {
  height: 126rpx;
  display: flex;
  align-items: center;
  padding: 0 36rpx;
}
.playlist-img {
  width: 82rpx;
  height: 82rpx;
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
  font-size: 32rpx;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.playlist-desc {
  margin-top: 10rpx;
  color: rgba(255,255,255,.50);
  font-size: 26rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.more {
  color: rgba(255,255,255,.45);
  font-size: 42rpx;
  margin-left: 20rpx;
}
.logout-btn {
  margin: 30rpx 36rpx 0;
  height: 74rpx;
  line-height: 74rpx;
  text-align: center;
  border-radius: 40rpx;
  background: rgba(255,255,255,.10);
  color: rgba(255,255,255,.78);
  font-size: 26rpx;
}
.bottom-safe {
  height: 260rpx;
}
</style>
