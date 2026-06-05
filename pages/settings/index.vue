<!-- 设置页面 -->
<template>
  <view class="page">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <view class="top-bar">
      <view class="back" @tap="goBack">‹</view>
      <text class="top-title">设置</text>
      <view class="placeholder"></view>
    </view>

    <scroll-view scroll-y class="content" :show-scrollbar="false">
      <!-- 账号设置 -->
      <view class="section-title">账号</view>
      <view class="card">
        <view class="row" @tap="goProfile">
          <text class="row-label">个人信息</text>
          <text class="row-arrow">›</text>
        </view>
        <view class="row">
          <text class="row-label">账号与安全</text>
          <text class="row-arrow">›</text>
        </view>
      </view>

      <!-- 通用设置 -->
      <view class="section-title">通用</view>
      <view class="card">
        <view class="row">
          <text class="row-label">音乐品质</text>
          <text class="row-value">极高 320kbps</text>
          <text class="row-arrow">›</text>
        </view>
        <view class="row">
          <text class="row-label">下载设置</text>
          <text class="row-arrow">›</text>
        </view>
        <view class="row" @tap="clearCache">
          <text class="row-label">清理缓存</text>
          <text class="row-value">{{ cacheSize }}</text>
          <text class="row-arrow">›</text>
        </view>
        <view class="row">
          <text class="row-label">深色模式</text>
          <switch class="row-switch" :checked="true" color="#ff2d55" />
        </view>
      </view>

      <!-- 其他 -->
      <view class="section-title">其他</view>
      <view class="card">
        <view class="row" @tap="checkUpdate">
          <text class="row-label">检查更新</text>
          <text class="row-value">v1.1.0</text>
          <text class="row-arrow">›</text>
        </view>
        <view class="row">
          <text class="row-label">关于云音乐复刻</text>
          <text class="row-arrow">›</text>
        </view>
      </view>

      <!-- 登录状态按钮 -->
      <view v-if="isLogin" class="logout-btn" @tap="handleLogout">退出登录</view>
      <view v-else class="login-btn" @tap="goLogin">去登录</view>

      <view class="bottom-safe"></view>
    </scroll-view>
  </view>
</template>

<script>
import { LOGIN_KEY } from '../../common/data.js'

export default {
  data() {
    return {
      statusBarHeight: 44,
      cacheSize: '2.6 MB',
      isLogin: false
    }
  },
  onLoad() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44
    this.isLogin = !!uni.getStorageSync(LOGIN_KEY)
  },
  methods: {
    goLogin() {
      uni.navigateTo({ url: '/pages/login/index' })
    },
    goBack() { uni.navigateBack() },
    goProfile() {
      uni.reLaunch({ url: '/pages/mine/index' })
    },
    clearCache() {
      uni.showModal({
        title: '清理缓存',
        content: `当前缓存 ${this.cacheSize}，确定清理？`,
        success: (res) => {
          if (res.confirm) {
            this.cacheSize = '0 B'
            uni.showToast({ title: '缓存已清理', icon: 'success' })
          }
        }
      })
    },
    checkUpdate() {
      uni.showToast({ title: '已是最新版本', icon: 'none' })
    },
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync(LOGIN_KEY)
            this.isLogin = false
            uni.showToast({ title: '已退出登录', icon: 'none' })
            setTimeout(() => {
              uni.reLaunch({ url: '/pages/mine/index' })
            }, 800)
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
  background: linear-gradient(180deg, #5a5053 0%, #665D5F 30%, #4a4245 100%);
  display: flex;
  flex-direction: column;
}

.top-bar {
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  flex-shrink: 0;
}

.back {
  width: 80rpx;
  color: #fff;
  font-size: 60rpx;
  transition: opacity 0.15s;
}
.back:active { opacity: 0.5; }

.top-title {
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  font-weight: 700;
}

.placeholder { width: 80rpx; }

.content { flex: 1; }

.section-title {
  margin: 36rpx 36rpx 16rpx;
  color: rgba(255,255,255,0.45);
  font-size: 24rpx;
  font-weight: 600;
}

.card {
  margin: 0 36rpx;
  background: rgba(255,255,255,0.06);
  border-radius: 14rpx;
  overflow: hidden;
}

.row {
  height: 100rpx;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  border-bottom: 1rpx solid rgba(255,255,255,0.06);
  transition: background 0.12s;
}

.row:last-child { border-bottom: none; }
.row:active { background: rgba(255,255,255,0.04); }

.row-label {
  color: #fff;
  font-size: 28rpx;
  flex-shrink: 0;
}

.row-value {
  flex: 1;
  text-align: right;
  color: rgba(255,255,255,0.4);
  font-size: 26rpx;
  margin-right: 12rpx;
}

.row-arrow {
  color: rgba(255,255,255,0.25);
  font-size: 32rpx;
}

.row-switch {
  margin-left: auto;
}

.logout-btn {
  margin: 60rpx 36rpx 0;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 44rpx;
  background: rgba(255, 45, 85, 0.12);
  color: #ff2d55;
  font-size: 30rpx;
  font-weight: 600;
}

.logout-btn:active { background: rgba(255, 45, 85, 0.22); }

.login-btn {
  margin: 60rpx 36rpx 0;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 44rpx;
  background: linear-gradient(135deg, #ff2d55, #ff6b81);
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
  box-shadow: 0 8rpx 24rpx rgba(255, 45, 85, 0.3);
}

.login-btn:active { opacity: 0.8; }

.bottom-safe { height: 80rpx; }
</style>
