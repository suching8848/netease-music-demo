<!--
  pages/index/index.vue
  演示页面 — 展示 SideDrawer 左侧抽屉菜单的用法
  点击左上角头像/菜单按钮即可打开抽屉
-->
<template>
  <view class="page">
    <!-- 状态栏占位 (custom nav 模式需要) -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 顶部导航栏 -->
    <view class="top-bar">
      <view class="top-left" @tap="openDrawer">
        <!-- 头像按钮 — 点击打开抽屉 -->
        <image
          class="top-avatar"
          src="/static/avatar.png"
          mode="aspectFill"
        />
        <text class="top-menu-icon">☰</text>
      </view>
      <text class="top-title">云音乐</text>
      <view class="top-right">
        <text class="top-icon">⌕</text>
        <text class="top-icon">⋮</text>
      </view>
    </view>

    <!-- 页面主体内容 -->
    <scroll-view class="page-content" scroll-y :show-scrollbar="false">
      <view class="welcome-card">
        <text class="welcome-icon">♪</text>
        <text class="welcome-text">点击左上角头像或菜单图标</text>
        <text class="welcome-sub">打开侧边抽屉菜单</text>
      </view>

      <!-- 事件日志区域，展示抽屉交互回调 -->
      <view class="log-card" v-if="logs.length">
        <view class="log-header">交互日志</view>
        <view
          class="log-item"
          v-for="(log, i) in logs"
          :key="i"
        >
          <text class="log-time">{{ log.time }}</text>
          <text class="log-msg">{{ log.msg }}</text>
        </view>
      </view>

      <view class="bottom-safe"></view>
    </scroll-view>

    <!-- 公共组件：迷你播放器 + 底部导航栏 -->
    <mini-player></mini-player>
    <bottom-tab active="home"></bottom-tab>

    <!-- ========== SideDrawer 抽屉菜单 ========== -->
    <side-drawer
      v-model="showDrawer"
      @item-click="onMenuItemClick"
      @setting-click="onSettingClick"
      @more-click="onMoreClick"
    />
  </view>
</template>

<script>
import SideDrawer from '../../components/SideDrawer/SideDrawer.vue'
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'

export default {
  components: {
    SideDrawer,
    MiniPlayer,
    BottomTab
  },
  data() {
    return {
      showDrawer: false,
      statusBarHeight: 44,
      logs: []
    }
  },
  created() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44
  },
  methods: {
    /** 打开抽屉 */
    openDrawer() {
      this.showDrawer = true
    },

    /** 点击菜单项 */
    onMenuItemClick(item) {
      this.addLog(`点击菜单: ${item.title} (key: ${item.key})`)
      // 点击菜单项后关闭抽屉
      this.showDrawer = false
      // 实际项目中可根据 item.key 路由跳转:
      // uni.navigateTo({ url: '/pages/' + item.key + '/index' })
    },

    /** 点击设置 */
    onSettingClick() {
      this.addLog('点击: 设置')
      this.showDrawer = false
    },

    /** 点击更多 */
    onMoreClick() {
      this.addLog('点击: 更多')
      this.showDrawer = false
    },

    /** 记录交互日志 */
    addLog(msg) {
      const now = new Date()
      const time =
        String(now.getHours()).padStart(2, '0') +
        ':' +
        String(now.getMinutes()).padStart(2, '0') +
        ':' +
        String(now.getSeconds()).padStart(2, '0')
      this.logs.unshift({ time, msg })
      // 最多保留 20 条
      if (this.logs.length > 20) {
        this.logs.pop()
      }
    }
  }
}
</script>

<style scoped>
.page {
  height: 100vh;
  background: #665d5f;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ---- 顶部导航栏 ---- */
.top-bar {
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  flex-shrink: 0;
}

.top-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
  width: 160rpx;
}

.top-avatar {
  width: 52rpx;
  height: 52rpx;
  border-radius: 50%;
  background: #888;
}

.top-menu-icon {
  color: #fff;
  font-size: 40rpx;
  line-height: 1;
}

.top-title {
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  font-weight: 700;
}

.top-right {
  width: 160rpx;
  display: flex;
  justify-content: flex-end;
  gap: 30rpx;
}

.top-icon {
  color: #fff;
  font-size: 44rpx;
  line-height: 1;
}

/* ---- 页面主体 ---- */
.page-content {
  flex: 1;
  padding: 0 36rpx;
}

.welcome-card {
  margin-top: 120rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 0;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 20rpx;
}

.welcome-icon {
  font-size: 100rpx;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 30rpx;
}

.welcome-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 28rpx;
  margin-bottom: 12rpx;
}

.welcome-sub {
  color: rgba(255, 255, 255, 0.4);
  font-size: 24rpx;
}

/* ---- 交互日志 ---- */
.log-card {
  margin-top: 40rpx;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16rpx;
  padding: 24rpx 28rpx;
}

.log-header {
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
}

.log-item {
  display: flex;
  align-items: flex-start;
  padding: 10rpx 0;
}

.log-time {
  color: rgba(255, 255, 255, 0.4);
  font-size: 22rpx;
  width: 120rpx;
  flex-shrink: 0;
  font-family: monospace;
}

.log-msg {
  color: rgba(255, 255, 255, 0.7);
  font-size: 24rpx;
}

/* ---- 底部安全区：为 mini-player(104rpx, bottom:132rpx) + bottom-tab(126rpx) 留空间 ---- */
.bottom-safe {
  height: 260rpx;
}
</style>
