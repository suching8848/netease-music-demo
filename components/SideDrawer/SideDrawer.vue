<template>
  <!--
    SideDrawer - 左侧滑出抽屉菜单  v2
    使用 CSS animation 替代 transition，App 端可靠渲染
  -->
  <view
    v-show="showPanel"
    class="drawer-root"
    :class="{ 'drawer-out': isClosing }"
  >
    <!-- 全屏遮罩 — 点击右侧 20% 关闭 -->
    <view
      class="drawer-mask"
      @tap.stop="handleMaskTap"
    ></view>

    <!-- 抽屉面板 80vw -->
    <view
      class="drawer-panel"
      @tap.stop
      :style="{ paddingTop: statusBarHeight + 'px' }"
    >
      <!-- 1. 顶部用户栏 -->
      <view class="drawer-top">
        <view class="user-info" @tap="handleUserClick">
          <image class="user-avatar" src="/static/avatar.png" mode="aspectFill" />
          <view class="user-name-row">
            <text class="user-name">su_ching蘇清</text>
            <text class="user-arrow">›</text>
          </view>
        </view>
        <view class="user-actions">
          <view class="icon-mic"><view class="mic-body"></view><view class="mic-stand"></view></view>
          <view class="icon-scan"><view class="scan-box"></view></view>
        </view>
      </view>

      <!-- 2. 可滚动内容 -->
      <scroll-view class="drawer-scroll" scroll-y :show-scrollbar="false" enhanced>
        <!-- A. SVIP 卡片 -->
        <view class="svip-card">
          <view class="svip-top">
            <view class="svip-title-row">
              <text class="svip-icon">◆</text>
              <text class="svip-title">黑胶 SVIP · 柒</text>
              <text class="svip-arrow">›</text>
            </view>
            <view class="svip-btn">会员中心</view>
          </view>
          <view class="svip-sub">享专属数专、AI调音等30+权益</view>
          <view class="svip-bottom">
            <view class="svip-partner">
              <view class="partner-avatars">
                <view class="partner-avatar pa-left"></view>
                <view class="partner-avatar pa-right"></view>
              </view>
              <text class="partner-text">和Ta一起开启音乐之旅</text>
            </view>
            <view class="svip-double"><text>双人空间</text><text class="svip-arrow">›</text></view>
          </view>
        </view>

        <!-- B. 粉色活动横幅 -->
        <view class="banner-card">
          <view class="banner-triangle"></view>
          <view class="banner-content">
            <view class="banner-left">
              <text class="banner-svip-badge">SVIP</text>
              <text class="banner-text">周年庆！ 免费天数已发放</text>
            </view>
            <text class="banner-action">立抢 ›</text>
          </view>
        </view>

        <!-- C. 主菜单 -->
        <view class="menu-card">
          <block v-for="(item, index) in menuItems" :key="item.key">
            <view class="menu-item" @tap="handleItemClick(item)">
              <view class="menu-left">
                <text class="menu-icon">{{ item.icon }}</text>
                <text class="menu-title">{{ item.title }}</text>
              </view>
              <view class="menu-right">
                <text v-if="item.badge" class="menu-badge">{{ item.badge }}</text>
                <text v-else-if="item.subtitle" class="menu-subtitle">{{ item.subtitle }}</text>
                <text v-else-if="item.arrow !== false" class="menu-arrow">›</text>
              </view>
            </view>
            <view v-if="item.divider" class="menu-divider"></view>
          </block>
        </view>

        <view class="scroll-bottom-spacer"></view>
      </scroll-view>

      <!-- 3. 底部操作栏 -->
      <view class="drawer-bottom" :style="{ paddingBottom: safeAreaBottom + 'px' }">
        <view class="bottom-btn" @tap="handleSettingClick">
          <text class="bottom-btn-icon">⚙</text>
          <text class="bottom-btn-text">设置</text>
        </view>
        <view class="bottom-btn" @tap="handleMoreClick">
          <text class="bottom-btn-icon">⋯</text>
          <text class="bottom-btn-text">更多</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SideDrawer',
  props: {
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      showPanel: false,    // v-show 控制
      isClosing: false,    // 关闭动画中
      statusBarHeight: 44,
      safeAreaBottom: 0,
      menuItems: [
        { key: 'messages',  icon: '✉', title: '我的消息',   badge: '99+', divider: false, arrow: false },
        { key: 'cloudbean', icon: '☁', title: '我的云贝',   subtitle: '你的60云贝待使用', divider: false, arrow: false },
        { key: 'dress',     icon: '♛', title: '装扮中心',   subtitle: '一只小白熊来咯！', divider: false, arrow: false },
        { key: 'creator',   icon: '✦', title: '创作者中心', divider: false },
        { key: 'ai-song',   icon: '♪', title: 'AI写歌',     divider: true },
        { key: 'recent',    icon: '◷', title: '最近播放',   subtitle: '3台设备登录', divider: false, arrow: false },
        { key: 'timer',     icon: '⏳', title: '定时关闭',   divider: true },
        { key: 'shop',      icon: '♠', title: '商城',       subtitle: '艺人专辑周边上新中', divider: false, arrow: false },
        { key: 'ticket',    icon: '🎫', title: '云村有票',   divider: false },
        { key: 'promote',   icon: '📢', title: '云推歌',     divider: false },
        { key: 'service',   icon: '☏', title: '我的客服',   divider: false }
      ]
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.showPanel = true
        this.isClosing = false
      } else if (this.showPanel) {
        // 播放关闭动画 → 动画结束后隐藏
        this.isClosing = true
        clearTimeout(this._closeTimer)
        this._closeTimer = setTimeout(() => {
          this.showPanel = false
          this.isClosing = false
        }, 280)
      }
    }
  },
  created() {
    const info = uni.getSystemInfoSync()
    this.statusBarHeight = info.statusBarHeight || 44
    const model = info.model || ''
    this.safeAreaBottom = (model.includes('iPhone') && info.safeAreaInsets)
      ? info.safeAreaInsets.bottom : 0
  },
  beforeDestroy() {
    clearTimeout(this._closeTimer)
  },
  methods: {
    handleMaskTap() {
      this.$emit('input', false)
    },
    handleUserClick() {
      this.$emit('user-click')
    },
    handleItemClick(item) {
      this.$emit('item-click', { key: item.key, title: item.title })
    },
    handleSettingClick() {
      this.$emit('setting-click')
    },
    handleMoreClick() {
      this.$emit('more-click')
    }
  }
}
</script>

<style scoped>
/* === Root — 全屏覆盖，v-show 控制 === */
.drawer-root {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 10000;
}

/* === Mask — 打开时淡入，关闭时淡出 === */
.drawer-mask {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.55);
  animation: maskIn 280ms ease forwards;
}
.drawer-out .drawer-mask {
  animation: maskOut 280ms ease forwards;
}
@keyframes maskIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes maskOut { from { opacity: 1; } to { opacity: 0; } }

/* === Panel — 80vw，滑入/滑出 === */
.drawer-panel {
  position: absolute;
  top: 0; left: 0;
  width: 80vw; height: 100vh;
  background: linear-gradient(180deg, #50484a 0%, #5c5456 20%, #4a4345 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 12rpx 0 48rpx rgba(0, 0, 0, 0.35);
  animation: panelIn 280ms ease forwards;
}
.drawer-out .drawer-panel {
  animation: panelOut 280ms ease forwards;
}
@keyframes panelIn  { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes panelOut { from { transform: translateX(0); }     to { transform: translateX(-100%); } }

/* === 顶部用户栏 === */
.drawer-top {
  flex-shrink: 0;
  height: 170rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28rpx;
}
.user-info { display: flex; align-items: center; flex: 1; min-width: 0; }
.user-info:active { opacity: 0.7; }
.user-avatar { width: 58rpx; height: 58rpx; border-radius: 50%; background: #888; flex-shrink: 0; }
.user-name-row { display: flex; align-items: center; margin-left: 16rpx; min-width: 0; }
.user-name { color: #fff; font-size: 28rpx; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-arrow { color: rgba(255,255,255,0.5); font-size: 32rpx; margin-left: 6rpx; }
.user-actions { display: flex; align-items: center; gap: 28rpx; flex-shrink: 0; }

/* 麦克风图标 */
.icon-mic { width: 36rpx; height: 48rpx; display: flex; flex-direction: column; align-items: center; }
.mic-body { width: 22rpx; height: 26rpx; border: 2rpx solid rgba(255,255,255,0.8); border-radius: 11rpx 11rpx 0 0; border-bottom: none; }
.mic-stand { width: 2rpx; height: 14rpx; background: rgba(255,255,255,0.8); margin-top: 2rpx; position: relative; }
.mic-stand::after { content: ''; position: absolute; bottom: -2rpx; left: 50%; transform: translateX(-50%); width: 14rpx; height: 2rpx; background: rgba(255,255,255,0.8); }

/* 扫码图标 */
.icon-scan { width: 36rpx; height: 36rpx; }
.scan-box { width: 100%; height: 100%; border: 2rpx solid rgba(255,255,255,0.8); border-radius: 4rpx; position: relative; }
.scan-box::after { content: ''; position: absolute; top: 50%; left: 10%; width: 80%; height: 2rpx; background: rgba(255,255,255,0.5); }

/* === 滚动区 === */
.drawer-scroll { flex: 1; overflow-y: auto; }
.scroll-bottom-spacer { height: 40rpx; }

/* === SVIP 卡片 === */
.svip-card { margin: 0 36rpx; padding: 28rpx 28rpx 24rpx; border-radius: 12rpx; background: linear-gradient(145deg, #fdf3d0 0%, #f3dc92 40%, #e6c87c 100%); }
.svip-top { display: flex; justify-content: space-between; align-items: center; }
.svip-title-row { display: flex; align-items: center; }
.svip-icon { font-size: 30rpx; color: #8b6f2e; margin-right: 8rpx; }
.svip-title { font-size: 28rpx; font-weight: 700; color: #4a3510; }
.svip-arrow { font-size: 26rpx; color: #8b6f2e; margin-left: 4rpx; }
.svip-btn { padding: 8rpx 20rpx; border-radius: 24rpx; background: #fff; color: #5c3d0a; font-size: 22rpx; font-weight: 600; white-space: nowrap; }
.svip-sub { margin-top: 12rpx; color: #8b6f2e; font-size: 22rpx; }
.svip-bottom { margin-top: 22rpx; display: flex; justify-content: space-between; align-items: center; }
.svip-partner { display: flex; align-items: center; }
.partner-avatars { width: 52rpx; height: 36rpx; position: relative; margin-right: 10rpx; }
.partner-avatar { width: 32rpx; height: 32rpx; border-radius: 50%; border: 3rpx solid #f3dc92; background: #ccc; position: absolute; }
.pa-left { left: 0; top: 2rpx; z-index: 1; }
.pa-right { right: 0; top: 2rpx; }
.partner-text { font-size: 22rpx; color: #5c3d0a; }
.svip-double { display: flex; align-items: center; color: #8b6f2e; font-size: 22rpx; }

/* === 粉色活动横幅 === */
.banner-card { margin: 0 36rpx; height: 106rpx; border-radius: 10rpx; background: #ffe0e5; position: relative; display: flex; align-items: center; padding: 0 24rpx; }
.banner-triangle { position: absolute; top: -14rpx; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 16rpx solid transparent; border-right: 16rpx solid transparent; border-bottom: 16rpx solid #ffe0e5; }
.banner-content { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.banner-left { display: flex; align-items: center; flex: 1; min-width: 0; }
.banner-svip-badge { background: #d43030; color: #fff; font-size: 18rpx; font-weight: 700; padding: 4rpx 10rpx; border-radius: 6rpx; margin-right: 12rpx; flex-shrink: 0; }
.banner-text { color: #a02030; font-size: 24rpx; font-weight: 500; white-space: nowrap; }
.banner-action { color: #c0392b; font-size: 24rpx; font-weight: 600; flex-shrink: 0; }

/* === 菜单卡片 === */
.menu-card { margin: 24rpx 36rpx 0; border-radius: 14rpx; background: rgba(255,255,255,0.07); overflow: hidden; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.12); }
.menu-item { height: 112rpx; display: flex; align-items: center; justify-content: space-between; padding: 0 28rpx; transition: background 0.12s; }
.menu-item:active { background: rgba(255,255,255,0.05); }
.menu-left { display: flex; align-items: center; flex: 1; min-width: 0; }
.menu-icon { width: 52rpx; font-size: 34rpx; text-align: center; flex-shrink: 0; color: rgba(255,255,255,0.85); }
.menu-title { color: #fff; font-size: 30rpx; font-weight: 600; margin-left: 16rpx; white-space: nowrap; }
.menu-right { display: flex; align-items: center; flex-shrink: 0; margin-left: 16rpx; }
.menu-badge { background: #ff2d55; color: #fff; font-size: 20rpx; font-weight: 600; padding: 6rpx 16rpx; border-radius: 20rpx; white-space: nowrap; }
.menu-subtitle { color: rgba(255,255,255,0.45); font-size: 24rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220rpx; }
.menu-arrow { color: rgba(255,255,255,0.35); font-size: 30rpx; }
.menu-divider { height: 2rpx; background: rgba(255,255,255,0.12); margin: 0 28rpx; }

/* === 底部操作栏 === */
.drawer-bottom { flex-shrink: 0; height: 132rpx; display: flex; align-items: center; justify-content: space-between; padding: 0 36rpx; background: #5c5c5c; }
.bottom-btn { width: 278rpx; height: 96rpx; border-radius: 12rpx; background: rgba(255,255,255,0.10); display: flex; align-items: center; justify-content: center; }
.bottom-btn:active { background: rgba(255,255,255,0.16); }
.bottom-btn-icon { color: #fff; font-size: 32rpx; margin-right: 12rpx; }
.bottom-btn-text { color: #fff; font-size: 30rpx; font-weight: 500; }
</style>
