<template>
  <view class="page">
    <!-- 顶部导航 -->
    <view class="top-nav">
      <view class="left-menu">
        <text class="menu-icon" @tap="openDrawer">☰</text>
        <view class="badge">99+</view>
      </view>

      <scroll-view scroll-x class="tabs-scroll" :show-scrollbar="false">
        <view class="tabs">
          <view
            v-for="(item, index) in tabs"
            :key="index"
            class="tab"
            :class="{ active: currentTab === index }"
            @tap="currentTab = index"
          >
            {{ item }}
          </view>
        </view>
      </scroll-view>

      <view class="search-icon">⌕</view>
    </view>

    <!-- 首页内容 -->
    <view class="content">
      <!-- 顶部横向卡片 -->
      <scroll-view
        scroll-x
        class="card-scroll"
        :show-scrollbar="false"
        enhanced
      >
        <view class="card-row">
          <view
            class="top-card"
            v-for="item in topCards"
            :key="item.id"
            :class="item.className"
          >
            <view class="card-disc"></view>
            <view class="card-title">{{ item.title }}</view>
            <view class="card-sub">{{ item.sub }}</view>
          </view>
        </view>
      </scroll-view>

      <!-- 推荐标题 -->
      <view class="section-title">根据「Sphalerite」为你推荐</view>

      <!-- 推荐歌曲 -->
      <view class="song-list">
        <view
          class="song-item"
          v-for="item in songs"
          :key="item.id"
        >
          <view class="song-cover" :class="item.coverClass">
            <view class="small-disc"></view>
          </view>

          <view class="song-info">
            <view class="song-name">{{ item.name }}</view>
            <view class="song-desc">
              <text class="song-tag">{{ item.tag }}</text>
              <text class="singer">{{ item.singer }}</text>
            </view>
          </view>

          <view class="play-icon">▶</view>
        </view>
      </view>

      <!-- 推荐歌单 -->
      <view class="section-title playlist-title">推荐歌单 ></view>

      <scroll-view
        scroll-x
        class="playlist-scroll"
        :show-scrollbar="false"
        enhanced
      >
        <view class="playlist-row">
          <view
            class="playlist-card"
            v-for="item in playlists"
            :key="item.id"
          >
            <view class="playlist-cover" :class="item.className">
              <view class="cover-disc"></view>
            </view>
            <view class="playlist-name">{{ item.name }}</view>
          </view>
        </view>
      </scroll-view>

      <view class="bottom-space"></view>
    </view>

    <!-- 底部播放器 -->
    <mini-player></mini-player>

    <!-- 底部导航 -->
    <bottom-tab active="home"></bottom-tab>

    <side-drawer
      v-model="showDrawer"
      @user-click="onUserClick"
      @item-click="onDrawerItemClick"
      @setting-click="onSettingClick"
      @more-click="onMoreClick"
    />
  </view>
</template>

<script>
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'
import SideDrawer from '../../components/SideDrawer/SideDrawer.vue'

export default {
  components: {
    MiniPlayer,
    BottomTab,
    SideDrawer
  },
  data() {
    return {
      showDrawer: false,
      currentTab: 1,
      tabs: ['心动', '推荐', '音乐', '会员大促', '播客'],
      topCards: [
        {
          id: 1,
          title: '每日推荐',
          sub: '今日限定好歌推荐',
          className: 'card-red'
        },
        {
          id: 2,
          title: '心动模式',
          sub: '红心歌曲和相似推荐',
          className: 'card-purple'
        },
        {
          id: 3,
          title: '新歌首发',
          sub: '深陷这场旋律风暴',
          className: 'card-green'
        },
        {
          id: 4,
          title: '宝藏电台',
          sub: '夜晚也要保持浪漫',
          className: 'card-pink'
        }
      ],
      songs: [
        {
          id: 1,
          name: '声',
          tag: '超45%人收藏',
          singer: 'Feryquitous',
          coverClass: 'song-black'
        },
        {
          id: 2,
          name: 'SYSTEM ERROR',
          tag: 'Hi-Res',
          singer: 'Laur',
          coverClass: 'song-red'
        },
        {
          id: 3,
          name: 'MEGATON BLAST',
          tag: '超72%人播放',
          singer: 'BlackY / Yooh',
          coverClass: 'song-blue'
        }
      ],
      playlists: [
        {
          id: 1,
          name: '粉色电波',
          className: 'list-blue'
        },
        {
          id: 2,
          name: '雨天漫画',
          className: 'list-red'
        },
        {
          id: 3,
          name: '赛博节奏',
          className: 'list-purple'
        },
        {
          id: 4,
          name: '深夜治愈',
          className: 'list-green'
        }
      ]
    }
  },
  onHide() {
    this.showDrawer = false
  },
  methods: {
    openDrawer() {
      this.showDrawer = true
    },
    onUserClick() {
      this.showDrawer = false
      // 跳转到「我的」页面进行登入/登出操作
      uni.reLaunch({ url: '/pages/mine/index' })
    },
    onDrawerItemClick(item) {
      console.log('抽屉菜单点击:', item.key, item.title)
      this.showDrawer = false
    },
    onSettingClick() {
      console.log('设置点击')
      this.showDrawer = false
    },
    onMoreClick() {
      console.log('更多点击')
      this.showDrawer = false
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #665D5F;
  color: #fff;
  overflow-x: hidden;
}

/* 顶部导航 */
.top-nav {
  height: 96rpx;
  padding: 0 28rpx;
  display: flex;
  align-items: center;
  background: #665D5F;
  position: sticky;
  top: 0;
  z-index: 30;
}

.left-menu {
  width: 82rpx;
  height: 82rpx;
  position: relative;
  display: flex;
  align-items: center;
}

.menu-icon {
  font-size: 56rpx;
  color: #fff;
  line-height: 1;
}

.badge {
  position: absolute;
  left: 30rpx;
  top: 6rpx;
  height: 32rpx;
  line-height: 32rpx;
  padding: 0 12rpx;
  border-radius: 18rpx;
  background: #ff1e3c;
  color: #fff;
  font-size: 20rpx;
  font-weight: 700;
}

.tabs-scroll {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
}

.tabs {
  height: 96rpx;
  display: flex;
  align-items: center;
  width: max-content;
}

.tab {
  height: 96rpx;
  line-height: 96rpx;
  margin: 0 24rpx;
  font-size: 38rpx;
  font-weight: 900;
  color: #d1cbcc;
  position: relative;
  flex-shrink: 0;
}

.tab.active {
  color: #fff;
}

.tab.active::after {
  content: '';
  position: absolute;
  left: 18%;
  right: 18%;
  bottom: 8rpx;
  height: 6rpx;
  border-radius: 6rpx;
  background: #fff;
}

.search-icon {
  width: 56rpx;
  text-align: right;
  font-size: 48rpx;
  color: #fff;
}

/* 主内容 */
.content {
  padding-top: 34rpx;
  padding-bottom: 280rpx;
}

/* 横向卡片 */
.card-scroll {
  width: 100%;
  white-space: nowrap;
  padding-left: 46rpx;
  overflow: hidden;
}

.card-row {
  display: flex;
  gap: 28rpx;
  width: max-content;
}

.top-card {
  width: 330rpx;
  height: 430rpx;
  border-radius: 22rpx;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  padding: 42rpx 28rpx;
}

.card-red {
  background: linear-gradient(135deg, #8a102e, #d53266);
}

.card-purple {
  background: linear-gradient(135deg, #251240, #814ac0);
}

.card-green {
  background: linear-gradient(135deg, #064847, #139184);
}

.card-pink {
  background: linear-gradient(135deg, #b01b4b, #ff83b2);
}

.top-card::before,
.playlist-cover::before,
.song-cover::before {
  content: '';
  position: absolute;
  left: -20%;
  right: -20%;
  top: 20%;
  height: 4rpx;
  background: rgba(255, 255, 255, 0.38);
  box-shadow:
    0 54rpx 0 rgba(255, 255, 255, 0.28),
    0 108rpx 0 rgba(255, 255, 255, 0.2),
    0 162rpx 0 rgba(255, 255, 255, 0.28),
    0 216rpx 0 rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  transform: rotate(-2deg);
}

.top-card::after,
.playlist-cover::after,
.song-cover::after {
  content: '';
  position: absolute;
  width: 90rpx;
  height: 90rpx;
  right: 40rpx;
  top: 36rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.24);
  box-shadow:
    -160rpx 80rpx 0 rgba(255, 255, 255, 0.18),
    -60rpx 190rpx 0 rgba(255, 255, 255, 0.12),
    50rpx 250rpx 0 rgba(255, 255, 255, 0.12);
}

.card-disc {
  position: absolute;
  width: 180rpx;
  height: 180rpx;
  left: 50%;
  top: 50%;
  margin-left: -90rpx;
  margin-top: -90rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.16);
}

.card-disc::after {
  content: '';
  position: absolute;
  width: 74rpx;
  height: 74rpx;
  left: 50%;
  top: 50%;
  margin-left: -37rpx;
  margin-top: -37rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.58);
}

.card-title {
  position: relative;
  z-index: 2;
  margin-top: 120rpx;
  font-size: 42rpx;
  font-weight: 900;
}

.card-sub {
  position: absolute;
  left: 28rpx;
  bottom: 34rpx;
  z-index: 2;
  font-size: 28rpx;
  font-weight: 800;
  color: #fff;
  white-space: nowrap;
}

/* 标题 */
.section-title {
  margin: 72rpx 46rpx 32rpx;
  font-size: 42rpx;
  line-height: 56rpx;
  font-weight: 900;
  color: #fff;
}

.playlist-title {
  margin-top: 60rpx;
}

/* 歌曲 */
.song-list {
  padding: 0 46rpx;
}

.song-item {
  display: flex;
  align-items: center;
  min-height: 112rpx;
  margin-bottom: 24rpx;
}

.song-cover {
  width: 92rpx;
  height: 92rpx;
  border-radius: 10rpx;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.song-black {
  background: linear-gradient(135deg, #1f1f22, #5b5b61);
}

.song-red {
  background: linear-gradient(135deg, #aa1436, #ff5b7d);
}

.song-blue {
  background: linear-gradient(135deg, #0b4c82, #60b7f4);
}

.small-disc {
  position: absolute;
  width: 52rpx;
  height: 52rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(255, 255, 255, 0.28);
  left: 20rpx;
  top: 20rpx;
  background: rgba(0, 0, 0, 0.2);
}

.small-disc::after {
  content: '';
  position: absolute;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.65);
  left: 50%;
  top: 50%;
  margin-left: -10rpx;
  margin-top: -10rpx;
}

.song-info {
  flex: 1;
  margin-left: 26rpx;
  overflow: hidden;
}

.song-name {
  font-size: 36rpx;
  font-weight: 900;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-desc {
  margin-top: 8rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  overflow: hidden;
}

.song-tag {
  color: #ff2d55;
  background: rgba(255, 45, 85, 0.16);
  border-radius: 8rpx;
  padding: 2rpx 8rpx;
  margin-right: 12rpx;
  white-space: nowrap;
}

.singer {
  color: #d6d0d1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play-icon {
  width: 78rpx;
  flex-shrink: 0;
  text-align: right;
  font-size: 54rpx;
  color: #fff;
}

/* 歌单 */
.playlist-scroll {
  width: 100%;
  white-space: nowrap;
  padding-left: 46rpx;
  overflow: hidden;
}

.playlist-row {
  display: flex;
  gap: 28rpx;
  width: max-content;
}

.playlist-card {
  width: 320rpx;
  flex-shrink: 0;
}

.playlist-cover {
  width: 320rpx;
  height: 320rpx;
  border-radius: 18rpx;
  position: relative;
  overflow: hidden;
}

.list-blue {
  background: linear-gradient(135deg, #193758, #72b2e8);
}

.list-red {
  background: linear-gradient(135deg, #741326, #e53d72);
}

.list-purple {
  background: linear-gradient(135deg, #2a164e, #8a57cc);
}

.list-green {
  background: linear-gradient(135deg, #064746, #19a593);
}

.cover-disc {
  position: absolute;
  width: 170rpx;
  height: 170rpx;
  left: 50%;
  top: 50%;
  margin-left: -85rpx;
  margin-top: -85rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.16);
}

.cover-disc::after {
  content: '';
  position: absolute;
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  margin-left: -31rpx;
  margin-top: -31rpx;
  background: rgba(255, 255, 255, 0.62);
}

.playlist-name {
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #fff;
  white-space: nowrap;
}

.bottom-space {
  height: 300rpx;
}
</style>
