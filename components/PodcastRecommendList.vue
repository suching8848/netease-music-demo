<template>
  <view class="recommend-section">
    <view class="section-header">
      <text class="section-title">你常听的「生活」</text>
    </view>

    <view class="recommend-list">
      <view
        v-for="item in list"
        :key="item.id"
        class="recommend-item"
        @tap="$emit('itemClick', item)"
      >
        <image class="rec-cover" :src="item.cover" mode="aspectFill" />
        <view class="rec-info">
          <view class="rec-channel">{{ item.channel }}</view>
          <view class="rec-title">{{ item.title }}</view>
          <view class="rec-meta">
            <text class="rec-tag">{{ item.tag }}</text>
            <text class="rec-plays">▶ {{ item.playCount }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { podcastRecommendList } from '../common/data.js'

export default {
  name: 'PodcastRecommendList',
  data() {
    return { list: podcastRecommendList }
  }
}
</script>

<style scoped>
.recommend-section {
  margin-top: 28rpx;
  padding: 0 32rpx;
}

.section-header {
  margin-bottom: 20rpx;
}

.section-title {
  color: #fff;
  font-size: 36rpx;
  font-weight: 700;
}

/* ---- 推荐项 ---- */
.recommend-item {
  display: flex;
  padding: 20rpx 0;
  border-radius: 14rpx;
}

.recommend-item:active {
  background: rgba(255, 255, 255, 0.04);
}

.rec-cover {
  width: 150rpx;
  height: 150rpx;
  border-radius: 12rpx;
  background: #554d4f;
  flex-shrink: 0;
}

.rec-info {
  flex: 1;
  margin-left: 24rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rec-channel {
  color: rgba(255, 255, 255, 0.40);
  font-size: 22rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8rpx;
}

.rec-title {
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 10rpx;
}

.rec-meta {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.rec-tag {
  color: rgba(255, 255, 255, 0.40);
  font-size: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.20);
  border-radius: 6rpx;
  padding: 2rpx 10rpx;
}

.rec-plays {
  color: rgba(255, 255, 255, 0.38);
  font-size: 22rpx;
}
</style>
