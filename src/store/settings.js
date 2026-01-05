import { defineStore } from "pinia";

/**
 * 用户设置状态管理（持久化）
 */
export const useSettingsStore = defineStore("settings", {
  state: () => ({
    // 壁纸设置
    coverType: "4", // 壁纸种类 (0-默认,1-每日一图,2-随机风景,3-随机动漫,4-自定义)

    // 音乐设置
    musicVolume: 0.7, // 音乐音量
    musicClick: false, // 音乐链接是否跳转
    playerLrcShow: true, // 是否显示底栏歌词
    playerAutoplay: false, // 是否自动播放
    playerLoop: "all", // 循环播放 "all", "one", "none"
    playerOrder: "list", // 循环顺序 "list", "random"

    // 显示设置
    siteStartShow: false, // 建站日期显示
    footerBlur: true, // 底栏模糊
  }),

  getters: {
    // 获取音量（确保在 0-1 范围内）
    volume: (state) => Math.max(0, Math.min(1, state.musicVolume)),
  },

  actions: {
    // 设置音量
    setVolume(value) {
      this.musicVolume = Math.max(0, Math.min(1, value));
    },

    // 设置壁纸类型
    setCoverType(type) {
      this.coverType = type;
    },

    // 切换歌词显示
    toggleLrcShow() {
      this.playerLrcShow = !this.playerLrcShow;
    },

    // 切换底栏模糊
    toggleFooterBlur() {
      this.footerBlur = !this.footerBlur;
    },

    // 切换自动播放
    toggleAutoplay() {
      this.playerAutoplay = !this.playerAutoplay;
    },

    // 设置循环模式
    setLoopMode(mode) {
      if (["all", "one", "none"].includes(mode)) {
        this.playerLoop = mode;
      }
    },

    // 设置播放顺序
    setPlayOrder(order) {
      if (["list", "random"].includes(order)) {
        this.playerOrder = order;
      }
    },
  },

  persist: {
    key: "settings",
    storage: window.localStorage,
    paths: [
      "coverType",
      "musicVolume",
      "musicClick",
      "siteStartShow",
      "playerLrcShow",
      "footerBlur",
      "playerAutoplay",
      "playerLoop",
      "playerOrder",
    ],
  },
});
