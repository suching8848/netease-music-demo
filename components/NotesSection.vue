<template>
  <!-- 笔记页 — 播放全部 + 瀑布流 + 悬浮按钮 -->
  <view class="notes-section">
    <!-- 播放全部 -->
    <view class="play-header">
      <view class="play-left" @tap="onPlayAll">
        <view class="play-btn">
          <text class="play-icon">▶</text>
        </view>
        <view class="play-info">
          <text class="play-title">播放全部</text>
          <text class="play-sub">25篇笔记 · 6首歌</text>
        </view>
      </view>
      <view class="play-right">
        <text class="play-sort">☷</text>
      </view>
    </view>

    <!-- 双列瀑布流 -->
    <view class="waterfall">
      <view class="col">
        <view
          v-for="card in leftCards"
          :key="card.id"
          class="note-card"
          @tap="onCardTap(card)"
        >
          <image
            class="card-img"
            :src="card.image"
            mode="widthFix"
            :style="{ height: card.h + 'rpx' }"
          />
          <view class="card-body">
            <view class="card-title">{{ card.title }}</view>
            <view class="card-author">
              <image class="author-avatar" src="/static/avatar.png" mode="aspectFill" />
              <text class="author-name">su_ching蘇清</text>
              <view class="like-wrap">
                <text class="like-icon">♥</text>
                <text class="like-text">赞</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="col">
        <view
          v-for="card in rightCards"
          :key="card.id"
          class="note-card"
          @tap="onCardTap(card)"
        >
          <image
            class="card-img"
            :src="card.image"
            mode="widthFix"
            :style="{ height: card.h + 'rpx' }"
          />
          <view class="card-body">
            <view class="card-title">{{ card.title }}</view>
            <view class="card-author">
              <image class="author-avatar" src="/static/avatar.png" mode="aspectFill" />
              <text class="author-name">su_ching蘇清</text>
              <view class="like-wrap">
                <text class="like-icon">♥</text>
                <text class="like-text">赞</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部占位（为 mini-player + bottom-tab + FAB 留空间） -->
    <view class="notes-bottom-safe"></view>

    <!-- 悬浮红色加号按钮 -->
    <view class="fab" @tap="onFabTap">
      <text class="fab-icon">＋</text>
    </view>
  </view>
</template>

<script>
import { noteCardList } from '../common/data.js'

export default {
  name: 'NotesSection',
  data() {
    return {
      cards: noteCardList
    }
  },
  computed: {
    leftCards() {
      return this.cards.filter((_, i) => i % 2 === 0)
    },
    rightCards() {
      return this.cards.filter((_, i) => i % 2 === 1)
    }
  },
  methods: {
    onPlayAll() {
      uni.showToast({ title: '播放全部开发中', icon: 'none', duration: 1200 })
    },
    onCardTap(card) {
      uni.showToast({ title: `"${card.title.substring(0, 10)}..." 开发中`, icon: 'none', duration: 1200 })
    },
    onFabTap() {
      uni.showToast({ title: '发布笔记开发中', icon: 'none', duration: 1200 })
    }
  }
}
</script>

<style scoped>
.notes-section {
  position: relative;
  padding: 0 20rpx;
}

/* ---- 播放全部 ---- */
.play-header {
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16rpx;
}

.play-left {
  display: flex;
  align-items: center;
}

.play-btn {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background: #ff2d55;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(255, 45, 85, 0.35);
}

.play-btn:active {
  transform: scale(0.92);
  opacity: 0.85;
}

.play-icon {
  color: #fff;
  font-size: 24rpx;
  margin-left: 3rpx;
}

.play-info {
  margin-left: 18rpx;
  display: flex;
  flex-direction: column;
}

.play-title {
  color: #fff;
  font-size: 30rpx;
  font-weight: 700;
}

.play-sub {
  margin-top: 4rpx;
  color: rgba(255, 255, 255, 0.42);
  font-size: 22rpx;
}

.play-right {
  display: flex;
  align-items: center;
}

.play-sort {
  color: rgba(255, 255, 255, 0.55);
  font-size: 38rpx;
}

/* ---- 瀑布流 ---- */
.waterfall {
  display: flex;
  gap: 16rpx;
  padding: 0 4rpx;
}

.col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

/* ---- 卡片 ---- */
.note-card {
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}

.note-card:active {
  opacity: 0.8;
}

.card-img {
  width: 100%;
  display: block;
  background: linear-gradient(145deg, #554d4f 0%, #6c6365 100%);
  object-fit: cover;
}

.card-body {
  padding: 16rpx 18rpx 20rpx;
}

.card-title {
  color: #fff;
  font-size: 26rpx;
  font-weight: 600;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.card-author {
  margin-top: 14rpx;
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  background: #888;
  flex-shrink: 0;
}

.author-name {
  flex: 1;
  margin-left: 10rpx;
  color: rgba(255, 255, 255, 0.45);
  font-size: 22rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.like-wrap {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 8rpx;
  color: rgba(255, 255, 255, 0.40);
  font-size: 22rpx;
}

.like-icon {
  margin-right: 4rpx;
  font-size: 20rpx;
}

/* ---- 底部占位 ---- */
.notes-bottom-safe {
  height: 160rpx;
}

/* ---- 悬浮加号按钮 ---- */
.fab {
  position: fixed;
  right: 36rpx;
  /* 播放栏 bottom ≈ 108rpx(tab) + safe-area + 104rpx(player) + 24rpx(gap) */
  bottom: calc(108rpx + 104rpx + 56rpx + env(safe-area-inset-bottom));
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: #ff2d55;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9997;
  box-shadow: 0 8rpx 28rpx rgba(255, 45, 85, 0.45);
}

.fab:active {
  transform: scale(0.9);
  opacity: 0.85;
}

.fab-icon {
  color: #fff;
  font-size: 50rpx;
  line-height: 1;
  font-weight: 300;
}
</style>
