<template>
  <scroll-view scroll-x class="quick-wrap" :show-scrollbar="false">
    <view class="quick-row">
      <view
        v-for="item in actions"
        :key="item.key"
        class="quick-btn"
        @tap="$emit('action', item)"
      >
        <!-- 我的播客：带封面和角标 -->
        <template v-if="item.cover">
          <view class="quick-cover-wrap">
            <image class="quick-cover" :src="item.cover" mode="aspectFill" />
            <view v-if="item.badge" class="quick-badge">{{ item.badge }}</view>
          </view>
          <text class="quick-text">{{ item.title }}</text>
        </template>
        <text v-else class="quick-text-only">{{ item.title }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { podcastQuickActions } from '../common/data.js'

export default {
  name: 'PodcastQuickActions',
  data() {
    return { actions: podcastQuickActions }
  }
}
</script>

<style scoped>
.quick-wrap {
  padding: 0 32rpx;
  white-space: nowrap;
}

.quick-row {
  display: flex;
  gap: 20rpx;
}

.quick-btn {
  height: 80rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.09);
  display: inline-flex;
  align-items: center;
  padding: 0 24rpx;
  flex-shrink: 0;
}

.quick-btn:active {
  opacity: 0.7;
}

.quick-cover-wrap {
  position: relative;
  width: 52rpx;
  height: 52rpx;
  border-radius: 10rpx;
  overflow: hidden;
  flex-shrink: 0;
}

.quick-cover {
  width: 52rpx;
  height: 52rpx;
}

.quick-badge {
  position: absolute;
  top: -6rpx;
  right: -6rpx;
  min-width: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  padding: 0 6rpx;
  border-radius: 14rpx;
  background: #ff2d55;
  color: #fff;
  font-size: 18rpx;
  font-weight: 700;
  text-align: center;
}

.quick-text {
  margin-left: 14rpx;
  color: #fff;
  font-size: 26rpx;
  font-weight: 600;
}

.quick-text-only {
  color: rgba(255, 255, 255, 0.75);
  font-size: 26rpx;
  font-weight: 600;
}
</style>
