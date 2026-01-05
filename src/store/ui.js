import { defineStore } from "pinia";
import { BREAKPOINTS } from "@/utils/constants";

// Tab 切换节流时间（毫秒）
const TAB_SWITCH_THROTTLE = 350;
let lastTabSwitchTime = 0;

/**
 * UI 状态管理
 */
export const useUIStore = defineStore("ui", {
  state: () => ({
    // 窗口状态
    innerWidth: null, // 当前窗口宽度
    imgLoadStatus: false, // 壁纸加载状态

    // 面板开关状态
    backgroundShow: false, // 壁纸展示状态
    boxOpenState: false, // 盒子开启状态
    setOpenState: false, // 设置页面开启状态
    musicOpenState: false, // 音乐面板开启状态

    // 移动端状态
    mobileOpenState: false, // 移动端开启状态
    mobileFuncState: false, // 移动端功能区开启状态
    mobileTabIndex: 0, // 移动端 Tab 索引 (0-首页, 1-功能, 2-导航)
    mobileTabSwitching: false, // Tab 切换中状态
  }),

  getters: {
    // 是否为移动端
    isMobile: (state) => state.innerWidth <= BREAKPOINTS.MOBILE,

    // 是否为平板
    isTablet: (state) =>
      state.innerWidth > BREAKPOINTS.MOBILE && state.innerWidth <= BREAKPOINTS.TABLET,

    // 是否为桌面端
    isDesktop: (state) => state.innerWidth > BREAKPOINTS.TABLET,

    // 获取页面宽度
    width: (state) => state.innerWidth,
  },

  actions: {
    // 更改当前页面宽度
    setInnerWidth(value) {
      this.innerWidth = value;
      // 切换到桌面端时重置移动端状态
      if (value >= BREAKPOINTS.MOBILE) {
        this.mobileOpenState = false;
        this.mobileFuncState = false;
        this.mobileTabIndex = 0;
      }
    },

    // 设置移动端 Tab 索引（带节流）
    setMobileTabIndex(index) {
      const now = Date.now();
      // 节流：防止快速连续切换
      if (now - lastTabSwitchTime < TAB_SWITCH_THROTTLE) {
        return;
      }
      if (this.mobileTabIndex === index) {
        return;
      }
      lastTabSwitchTime = now;
      this.mobileTabIndex = index;
      // 切换 Tab 时重置音乐面板状态
      if (index !== 1) {
        this.musicOpenState = false;
      }
    },

    // 更改壁纸加载状态
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },

    // 切换壁纸展示状态
    toggleBackground() {
      this.backgroundShow = !this.backgroundShow;
    },

    // 切换设置页面
    toggleSettings() {
      this.setOpenState = !this.setOpenState;
    },

    // 切换音乐面板
    toggleMusicPanel() {
      this.musicOpenState = !this.musicOpenState;
    },

    // 切换盒子状态
    toggleBox() {
      this.boxOpenState = !this.boxOpenState;
    },

    // 关闭所有面板（用于移动端切换时）
    closeAllPanels() {
      this.boxOpenState = false;
      this.setOpenState = false;
      this.musicOpenState = false;
    },
  },
});
