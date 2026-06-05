<template>
  <view class="page">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 搜索栏 — 点击切换输入模式 -->
    <view class="search-top">
      <view class="left-menu">
        <text class="menu-icon" @tap="openDrawer">☰</text>
        <view class="badge">99+</view>
      </view>

      <!-- 搜索框 — 点击激活输入，激活后显示真实 input -->
      <view class="search-box" :class="{ active: searching }" @tap="activateSearch">
        <text class="search-mark">⌕</text>
        <input
          v-if="searching"
          class="search-input"
          v-model="searchQuery"
          :focus="true"
          placeholder="搜索歌曲、歌手"
          placeholder-class="search-ph"
          @input="onSearchInput"
        />
        <template v-else>
          <text class="hot">!</text>
          <text class="search-text">ぴーなた 新歌发布</text>
        </template>
        <text class="scan" @tap.stop="toggleSearch">{{ searching ? '✕' : '⌗' }}</text>
      </view>

      <view class="mic" v-if="!searching">◉</view>
      <view class="cancel-btn" v-else @tap="cancelSearch">取消</view>
    </view>

    <!-- 搜索结果 -->
    <scroll-view v-if="searching" scroll-y class="content" :show-scrollbar="false">
      <view class="result-count" v-if="searchQuery">
        找到 {{ searchResults.length }} 首歌曲
      </view>
      <view
        v-for="song in searchResults"
        :key="song.id"
        class="result-item"
        @tap="playSearchResult(song)"
      >
        <image class="result-cover" :src="song.cover" mode="aspectFill" />
        <view class="result-info">
          <text class="result-name">{{ highlightMatch(song.name) }}</text>
          <text class="result-singer">{{ song.singer }} · {{ song.album }}</text>
        </view>
        <text class="result-duration">{{ song.duration }}</text>
      </view>
      <view class="result-empty" v-if="searchQuery && searchResults.length === 0">
        <text class="empty-icon">♪</text>
        <text class="empty-text">未找到相关歌曲</text>
      </view>
      <view class="bottom-safe"></view>
    </scroll-view>

    <!-- 正常内容（非搜索状态） -->
    <scroll-view v-else scroll-y class="content" :show-scrollbar="false">
      <view class="icon-row">
        <view class="icon-item" v-for="item in icons" :key="item.id" @tap="onDiscoverTap(item)">
          <view class="round-icon">{{ item.icon }}</view>
          <view class="icon-name">{{ item.name }}</view>
        </view>
      </view>

      <view class="title">快速发现</view>

      <scroll-view scroll-x class="quick-scroll" :show-scrollbar="false">
        <view class="quick-row">
          <view
            class="quick-card"
            v-for="(item, idx) in quickList"
            :key="item.id"
            @tap="goPlaylist(idx + 1)"
          >
            <image class="quick-img" :src="item.image" mode="aspectFill"></image>
            <view class="quick-mask">
              <view class="quick-title">{{ item.title }}</view>
              <view class="quick-sub">{{ item.sub }}</view>
            </view>
          </view>
        </view>
      </scroll-view>

      <view class="title browse-title">浏览全部</view>

      <view class="grid">
        <view
          class="grid-card"
          v-for="(item, idx) in browseList"
          :key="item.id"
          @tap="goPlaylist(idx + 1)"
        >
          <image class="grid-img" :src="item.image" mode="aspectFill"></image>
          <view class="grid-mask">
            <view class="grid-title">{{ item.title }}</view>
            <view class="grid-sub">{{ item.sub }}</view>
          </view>
        </view>
      </view>

      <view class="bottom-safe"></view>
    </scroll-view>

    <mini-player></mini-player>
    <bottom-tab active="search"></bottom-tab>

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
import { discoverIcons, quickDiscover, browseAll, allSongs, currentPlaySong } from '../../common/data.js'
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'
import drawerMixin from '../../common/drawerMixin.js'

export default {
  mixins: [drawerMixin],
  components: {
    MiniPlayer,
    BottomTab
  },
  data() {
    return {
      statusBarHeight: 44,
      icons: discoverIcons,
      quickList: quickDiscover,
      browseList: browseAll,
      searching: false,
      searchQuery: '',
      searchResults: []
    }
  },
  created() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44
  },
  methods: {
    /* ====== 搜索逻辑 ====== */
    activateSearch() {
      this.searching = true
    },
    toggleSearch(e) {
      if (this.searching) {
        this.cancelSearch()
      } else {
        this.activateSearch()
      }
    },
    onSearchInput() {
      const q = this.searchQuery.trim().toLowerCase()
      if (!q) {
        this.searchResults = []
        return
      }
      this.searchResults = allSongs.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.singer.toLowerCase().includes(q) ||
        s.album.toLowerCase().includes(q)
      )
    },
    cancelSearch() {
      this.searching = false
      this.searchQuery = ''
      this.searchResults = []
    },
    playSearchResult(song) {
      currentPlaySong.song = song
      uni.$emit('playSong', song)
      uni.navigateTo({ url: '/pages/player/index' })
    },
    highlightMatch(text) {
      return text
    },

    /* ====== 导航 ====== */
    goPlaylist(playlistId) {
      uni.navigateTo({ url: '/pages/playlist/index?playlistId=' + playlistId })
    },
    onDiscoverTap(item) {
      uni.showToast({ title: `"${item.name}" 功能开发中`, icon: 'none', duration: 1200 })
    }
  }
}
</script>

<style scoped>
.page {
  height: 100vh;
  background: linear-gradient(180deg, #5a5053 0%, #665D5F 30%, #4a4245 100%);
  overflow: hidden;
}

/* 搜索栏 */
.search-top {
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
}

.left-menu {
  width: 84rpx;
  position: relative;
}

.menu-icon {
  color: #fff;
  font-size: 48rpx;
  transition: transform 0.15s;
}

.menu-icon:active { transform: scale(0.88); }

.badge {
  position: absolute;
  left: 24rpx;
  top: -6rpx;
  height: 32rpx;
  line-height: 32rpx;
  background: #ff2d55;
  color: #fff;
  font-size: 18rpx;
  padding: 0 10rpx;
  border-radius: 16rpx;
  font-weight: 700;
  box-shadow: 0 2rpx 8rpx rgba(255, 45, 85, 0.4);
}

.search-box {
  flex: 1;
  height: 72rpx;
  border-radius: 36rpx;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 22rpx;
  color: rgba(255, 255, 255, 0.4);
  transition: background 0.2s;
}

.search-box.active {
  background: rgba(255, 255, 255, 0.16);
}

.search-mark { font-size: 40rpx; margin-right: 12rpx; }

.hot {
  color: #ff2d55;
  font-size: 36rpx;
  font-weight: 900;
  margin-right: 14rpx;
}

.search-text {
  flex: 1;
  font-size: 28rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 0.5);
}

.search-input {
  flex: 1;
  height: 72rpx;
  color: #fff;
  font-size: 28rpx;
  margin: 0 8rpx;
}

.search-ph { color: rgba(255, 255, 255, 0.35); }

.scan {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.5);
  padding: 8rpx;
}

.mic {
  width: 72rpx;
  text-align: right;
  color: #fff;
  font-size: 42rpx;
}

.cancel-btn {
  width: 100rpx;
  text-align: center;
  color: #fff;
  font-size: 26rpx;
  white-space: nowrap;
}

/* ====== 搜索结果 ====== */
.result-count {
  padding: 20rpx 36rpx 8rpx;
  color: rgba(255,255,255,0.45);
  font-size: 24rpx;
}

.result-item {
  display: flex;
  align-items: center;
  height: 116rpx;
  padding: 0 36rpx;
  transition: background 0.12s;
}

.result-item:active { background: rgba(255,255,255,0.05); }

.result-cover {
  width: 68rpx;
  height: 68rpx;
  border-radius: 8rpx;
  background: #554d4f;
  flex-shrink: 0;
}

.result-info {
  flex: 1;
  margin-left: 20rpx;
  overflow: hidden;
}

.result-name {
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-singer {
  margin-top: 4rpx;
  color: rgba(255,255,255,0.4);
  font-size: 22rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-duration {
  color: rgba(255,255,255,0.35);
  font-size: 24rpx;
  font-family: monospace;
  margin-left: 12rpx;
}

.result-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 180rpx;
}

.empty-icon { font-size: 100rpx; color: rgba(255,255,255,0.2); margin-bottom: 20rpx; }
.empty-text { color: rgba(255,255,255,0.35); font-size: 28rpx; }

/* ====== 原有发现内容 ====== */
.content { height: calc(100vh - var(--status-bar-height) - 96rpx); }

.icon-row {
  height: 180rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8rpx 16rpx 0;
}

.icon-item {
  width: 128rpx;
  text-align: center;
  transition: transform 0.15s;
}

.icon-item:active { transform: scale(0.9); }

.round-icon {
  width: 72rpx;
  height: 72rpx;
  line-height: 72rpx;
  margin: 0 auto;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #e8cfcf;
  font-size: 46rpx;
  font-weight: 900;
}

.icon-name { margin-top: 10rpx; color: rgba(255, 255, 255, 0.7); font-size: 26rpx; }

.title {
  margin: 40rpx 36rpx 22rpx;
  color: #fff;
  font-size: 38rpx;
  font-weight: 900;
  letter-spacing: 1rpx;
}

.quick-scroll { white-space: nowrap; padding-left: 28rpx; }
.quick-row { display: flex; gap: 18rpx; }

.quick-card {
  width: 240rpx;
  height: 370rpx;
  border-radius: 14rpx;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: #544c4e;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;
}

.quick-card:active { transform: scale(0.96); }
.quick-img { width: 100%; height: 100%; }

.quick-mask {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 0 24rpx 24rpx;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
}

.quick-title { color: #fff; font-size: 30rpx; font-weight: 900; }

.quick-sub {
  margin-top: 6rpx;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.browse-title { margin-top: 52rpx; }

.grid {
  padding: 0 28rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.grid-card {
  width: 342rpx;
  height: 216rpx;
  border-radius: 14rpx;
  overflow: hidden;
  position: relative;
  background: #544c4e;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.grid-card:active { transform: scale(0.96); }
.grid-img { width: 100%; height: 100%; }

.grid-mask {
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  padding: 52rpx 28rpx 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.05));
}

.grid-title {
  color: #fff;
  font-size: 32rpx;
  font-weight: 900;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.grid-sub {
  margin-top: 10rpx;
  color: rgba(255, 255, 255, 0.75);
  font-size: 24rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom-safe { height: 280rpx; }
</style>
