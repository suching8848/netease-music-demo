<template>
  <!-- 播客页 — 二级筛选 + 播客列表 -->
  <view class="podcast-section">
    <!-- 二级筛选栏 -->
    <view class="sub-filter-bar">
      <scroll-view scroll-x class="filter-scroll" :show-scrollbar="false">
        <view class="filter-items">
          <view
            v-for="item in subTabs"
            :key="item.name"
            class="filter-item"
            :class="{ active: activeSubTab === item.name }"
            @tap="activeSubTab = item.name"
          >
            <text class="filter-name">{{ item.name }}</text>
            <text class="filter-count">{{ item.count }}</text>
          </view>
        </view>
      </scroll-view>
      <view class="filter-actions">
        <text class="filter-sort">⇅</text>
        <text class="filter-more">⋮</text>
      </view>
    </view>

    <!-- 播客列表 -->
    <view class="podcast-list">
      <view
        v-for="item in list"
        :key="item.id"
        class="podcast-item"
        @tap="onItemTap(item)"
      >
        <!-- 封面 -->
        <view class="cover-wrap">
          <image
            class="cover"
            :src="item.cover"
            mode="aspectFill"
          />
          <!-- 未读红色角标 -->
          <view v-if="item.badge" class="badge">{{ item.badge }}</view>
        </view>

        <!-- 文字区 -->
        <view class="info">
          <view class="title">{{ item.title }}</view>
          <view class="subtitle">{{ item.subtitle }}</view>
        </view>

        <!-- 更多按钮 -->
        <view class="more-btn" @tap.stop="onMore(item)">⋮</view>
      </view>
    </view>
  </view>
</template>

<script>
import { podcastSubTabs, podcastList } from '../common/data.js'

export default {
  name: 'PodcastSection',
  data() {
    return {
      subTabs: podcastSubTabs,
      list: podcastList,
      activeSubTab: '全部'
    }
  },
  methods: {
    onItemTap(item) {
      uni.showToast({ title: `"${item.title}" 开发中`, icon: 'none', duration: 1200 })
    },
    onMore(item) {
      uni.showToast({ title: '更多选项开发中', icon: 'none', duration: 1000 })
    }
  }
}
</script>

<style scoped>
.podcast-section {
  padding-bottom: 20rpx;
}

/* ---- 二级筛选栏 ---- */
.sub-filter-bar {
  height: 84rpx;
  display: flex;
  align-items: center;
  padding: 0 10rpx 0 28rpx;
}

.filter-scroll {
  flex: 1;
  height: 84rpx;
}

.filter-items {
  display: flex;
  align-items: center;
  height: 84rpx;
  white-space: nowrap;
}

.filter-item {
  display: inline-flex;
  align-items: flex-start;
  margin-right: 44rpx;
  height: 84rpx;
  line-height: 84rpx;
  position: relative;
}

.filter-name {
  color: rgba(255, 255, 255, 0.50);
  font-size: 28rpx;
  font-weight: 700;
  transition: color 0.2s;
}

.filter-item.active .filter-name {
  color: #fff;
}

.filter-count {
  color: rgba(255, 255, 255, 0.40);
  font-size: 18rpx;
  font-weight: 600;
  margin-left: 2rpx;
  line-height: 1;
  margin-top: 18rpx;
}

.filter-actions {
  display: flex;
  align-items: center;
  gap: 24rpx;
  flex-shrink: 0;
  padding-right: 28rpx;
}

.filter-sort,
.filter-more {
  color: rgba(255, 255, 255, 0.50);
  font-size: 34rpx;
}

/* ---- 播客列表 ---- */
.podcast-list {
  padding: 0 28rpx;
}

.podcast-item {
  height: 126rpx;
  display: flex;
  align-items: center;
  padding: 0 8rpx;
  border-radius: 12rpx;
}

.podcast-item:active {
  background: rgba(255, 255, 255, 0.04);
}

/* 封面 */
.cover-wrap {
  position: relative;
  width: 90rpx;
  height: 90rpx;
  flex-shrink: 0;
}

.cover {
  width: 90rpx;
  height: 90rpx;
  border-radius: 8rpx;
  background: #554d4f;
}

/* 未读红色角标 */
.badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  min-width: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  padding: 0 8rpx;
  border-radius: 16rpx;
  background: #ff2d55;
  color: #fff;
  font-size: 18rpx;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.3);
}

/* 文字区 */
.info {
  flex: 1;
  margin-left: 24rpx;
  overflow: hidden;
}

.title {
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subtitle {
  margin-top: 8rpx;
  color: rgba(255, 255, 255, 0.42);
  font-size: 24rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 更多按钮 */
.more-btn {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.40);
  font-size: 38rpx;
  flex-shrink: 0;
  margin-left: 12rpx;
}

.more-btn:active {
  opacity: 0.5;
}
</style>
