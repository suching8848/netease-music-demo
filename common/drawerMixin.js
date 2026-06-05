/**
 * drawerMixin — 侧边抽屉菜单共享逻辑
 * 页面需自行在 data 中声明 showDrawer: false
 */
import SideDrawer from '../components/SideDrawer/SideDrawer.vue'

export default {
  components: { SideDrawer },
  onHide() {
    this.showDrawer = false
  },
  methods: {
    openDrawer() { this.showDrawer = true },
    onUserClick() {
      this.showDrawer = false
      uni.reLaunch({ url: '/pages/mine/index' })
    },
    onDrawerItemClick(item) {
      this.showDrawer = false
      this.navigateByDrawerKey(item.key, item.title)
    },
    onSettingClick() {
      this.showDrawer = false
      uni.navigateTo({ url: '/pages/settings/index' })
    },
    onMoreClick() {
      this.showDrawer = false
      uni.showToast({ title: '更多功能开发中', icon: 'none', duration: 1200 })
    },
    navigateByDrawerKey(key, title) {
      const routes = {
        messages: '/pages/messages/index',
        recent:   '/pages/player/index'
      }
      const url = routes[key]
      if (url) {
        uni.navigateTo({ url })
      } else {
        uni.showToast({ title: `"${title}" 功能开发中`, icon: 'none', duration: 1500 })
      }
    }
  }
}
