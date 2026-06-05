<template>
  <view class="bottom-tab">
    <view
      v-for="item in tabs"
      :key="item.key"
      class="tab-item"
      :class="{ active: active === item.key }"
      @tap="goPage(item.key)"
    >
      <!-- 激活指示条 -->
      <view v-if="active === item.key" class="active-bar"></view>
      <text class="tab-icon">{{ item.icon }}</text>
      <text class="tab-label">{{ item.label }}</text>
      <view v-if="item.dot && active !== item.key" class="red-dot"></view>
    </view>

    <!-- 安全区占位 -->
    <view class="safe-area" />
  </view>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      tabs: [
        { key: 'home',   label: '首页', icon: '♫' },
        { key: 'search', label: '搜索', icon: '⌕' },
        { key: 'note',   label: '笔记', icon: '◫', dot: true },
        { key: 'mine',   label: '我的', icon: '♟' }
      ]
    }
  },
  methods: {
    goPage(name) {
      if (name === this.active) return
      const urls = {
        home: '/pages/home/index',
        search: '/pages/search/index',
        note: '/pages/note/index',
        mine: '/pages/mine/index'
      }
      uni.reLaunch({ url: urls[name] })
    }
  }
}
</script>

<style scoped>
.bottom-tab {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-around;
  background: rgba(22, 20, 21, 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.3);
}

/* 安全区占位 — 适配 iPhone 底部横条 */
.safe-area {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: env(safe-area-inset-bottom);
  background: rgba(22, 20, 21, 0.95);
  pointer-events: none;
}

.tab-item {
  flex: 1;
  height: 108rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: rgba(255, 255, 255, 0.42);
  transition: color 0.2s ease;
  /* 给安全区留位置 */
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item.active {
  color: #fff;
}

/* 激活态顶部指示条 — 小而精致的短线 */
.active-bar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 36rpx;
  height: 4rpx;
  border-radius: 2rpx;
  background: #ff2d55;
}

.tab-icon {
  font-size: 40rpx;
  line-height: 1;
  margin-bottom: 4rpx;
  transition: transform 0.2s ease;
}

.tab-item.active .tab-icon {
  transform: scale(1.1);
}

.tab-label {
  font-size: 22rpx;
  font-weight: 700;
  letter-spacing: 0.5rpx;
}

.red-dot {
  position: absolute;
  top: 16rpx;
  /* 红点对齐图标右上角: 图标宽约 40rpx，在 flex 居中后居右约 50% + 20rpx */
  left: calc(50% + 14rpx);
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #ff2d55;
  border: 2rpx solid rgba(22, 20, 21, 0.95);
}
</style>
