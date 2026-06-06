<template>
  <view class="podcast-home">
    <podcast-quick-actions @action="onAction" />
    <podcast-hero-carousel @play="onPlay" />
    <podcast-type-tabs @change="onTypeChange" />
    <podcast-recommend-list @itemClick="onItemClick" />
    <view class="bottom-safe"></view>
  </view>
</template>

<script>
import PodcastQuickActions from './PodcastQuickActions.vue'
import PodcastHeroCarousel from './PodcastHeroCarousel.vue'
import PodcastTypeTabs from './PodcastTypeTabs.vue'
import PodcastRecommendList from './PodcastRecommendList.vue'

export default {
  name: 'PodcastHomePage',
  components: {
    PodcastQuickActions,
    PodcastHeroCarousel,
    PodcastTypeTabs,
    PodcastRecommendList
  },
  methods: {
    onAction(item) {
      uni.showToast({ title: `"${item.title}" 开发中`, icon: 'none', duration: 1200 })
    },
    onPlay(item) {
      uni.showToast({ title: `播放 "${item.title}" 开发中`, icon: 'none', duration: 1200 })
    },
    onTypeChange(key) {
      // 类型切换，子组件自行处理 UI，此处预留数据请求入口
    },
    onItemClick(item) {
      uni.showToast({ title: `"${item.title.substring(0, 12)}..." 开发中`, icon: 'none', duration: 1200 })
    }
  }
}
</script>

<style scoped>
.podcast-home {
  padding-top: 20rpx;
  padding-bottom: 40rpx;
}

.bottom-safe {
  height: 280rpx;
}
</style>
