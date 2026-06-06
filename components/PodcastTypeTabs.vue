<template>
  <view class="type-section">
    <!-- 类型 tabs -->
    <view class="type-tabs">
      <view
        v-for="item in tabs"
        :key="item.key"
        class="type-tab"
        :class="{ active: activeType === item.key }"
        @tap="switchType(item.key)"
      >
        <text>{{ item.name }}</text>
      </view>
    </view>

    <!-- 调频刻度尺 -->
    <view class="ruler">
      <view class="ruler-bar">
        <view
          v-for="i in 40"
          :key="i"
          class="ruler-tick"
          :class="{
            'tick-tall': i % 5 === 0,
            'tick-red': i >= 18 && i <= 22
          }"
        ></view>
      </view>
      <!-- 红色指示柱 -->
      <view class="ruler-indicator" :style="{ left: indicatorLeft }"></view>
    </view>

    <!-- 类型内容区 -->
    <transition name="type-fade" mode="out-in">
      <view :key="activeType" class="type-desc">
        <text class="type-label">{{ activeTypeName }} · 为你精选</text>
      </view>
    </transition>
  </view>
</template>

<script>
import { podcastTypeTabs } from '../common/data.js'

export default {
  name: 'PodcastTypeTabs',
  data() {
    return {
      tabs: podcastTypeTabs,
      activeType: 'private'
    }
  },
  computed: {
    activeTypeName() {
      const t = this.tabs.find(t => t.key === this.activeType)
      return t ? t.name : ''
    },
    indicatorLeft() {
      const idx = this.tabs.findIndex(t => t.key === this.activeType)
      // 指示器对齐到选中 tab 中心附近
      const pct = 18 + idx * (64 / (this.tabs.length - 1))
      return pct + '%'
    }
  },
  methods: {
    switchType(key) {
      if (this.activeType === key) return
      this.activeType = key
      this.$emit('change', key)
    }
  }
}
</script>

<style scoped>
.type-section {
  margin-top: 36rpx;
}

/* ---- 类型 tab ---- */
.type-tabs {
  display: flex;
  justify-content: space-around;
  padding: 0 24rpx;
}

.type-tab {
  color: rgba(255, 255, 255, 0.42);
  font-size: 28rpx;
  font-weight: 600;
  padding: 8rpx 0;
  transition: color 0.2s, font-size 0.2s;
}

.type-tab.active {
  color: #fff;
  font-size: 32rpx;
  font-weight: 700;
}

/* ---- 调频刻度尺 ---- */
.ruler {
  margin-top: 20rpx;
  padding: 0 20rpx;
  position: relative;
  height: 48rpx;
  display: flex;
  align-items: flex-end;
}

.ruler-bar {
  display: flex;
  align-items: flex-end;
  gap: 4rpx;
  width: 100%;
}

.ruler-tick {
  flex: 1;
  height: 18rpx;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 2rpx;
  transition: background 0.25s;
}

.ruler-tick.tick-tall {
  height: 30rpx;
  background: rgba(255, 255, 255, 0.28);
}

.ruler-tick.tick-red {
  background: #ff2d55;
  height: 36rpx;
}

/* 红色指示柱 */
.ruler-indicator {
  position: absolute;
  bottom: 0;
  width: 6rpx;
  height: 44rpx;
  border-radius: 3rpx;
  background: #ff2d55;
  transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---- 类型描述 ---- */
.type-desc {
  margin-top: 18rpx;
  padding: 0 32rpx;
}

.type-label {
  color: rgba(255, 255, 255, 0.45);
  font-size: 24rpx;
}

/* 过渡 */
.type-fade-enter-active,
.type-fade-leave-active {
  transition: opacity 0.22s ease;
}
.type-fade-enter,
.type-fade-leave-to {
  opacity: 0;
}
</style>
