<template>
  <scroll-view scroll-x class="carousel-wrap" :show-scrollbar="false">
    <view class="carousel-row">
      <view
        v-for="item in cards"
        :key="item.id"
        class="hero-card"
      >
        <image class="hero-cover" :src="item.cover" mode="aspectFill" />
        <view class="hero-info">
          <view class="hero-title">{{ item.title }}</view>
          <view class="hero-count">{{ item.playCount }}</view>
          <view class="hero-source">{{ item.source }}</view>
        </view>
        <view class="hero-play" @tap.stop="$emit('play', item)">
          <text class="hero-play-icon">▶</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { podcastHeroCards } from '../common/data.js'

export default {
  name: 'PodcastHeroCarousel',
  data() {
    return { cards: podcastHeroCards }
  }
}
</script>

<style scoped>
.carousel-wrap {
  padding: 0 24rpx;
  white-space: nowrap;
}

.carousel-row {
  display: flex;
  gap: 24rpx;
}

.hero-card {
  width: 620rpx;
  height: 200rpx;
  border-radius: 22rpx;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  flex-shrink: 0;
}

.hero-cover {
  width: 130rpx;
  height: 130rpx;
  border-radius: 16rpx;
  background: #554d4f;
  flex-shrink: 0;
}

.hero-info {
  flex: 1;
  margin-left: 24rpx;
  overflow: hidden;
}

.hero-title {
  color: #fff;
  font-size: 30rpx;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hero-count {
  margin-top: 10rpx;
  color: rgba(255, 255, 255, 0.45);
  font-size: 24rpx;
}

.hero-source {
  margin-top: 6rpx;
  color: rgba(255, 255, 255, 0.40);
  font-size: 22rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hero-play {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 16rpx;
}

.hero-play:active {
  transform: scale(0.9);
  opacity: 0.8;
}

.hero-play-icon {
  color: #fff;
  font-size: 28rpx;
  margin-left: 4rpx;
}
</style>
