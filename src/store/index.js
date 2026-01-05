/**
 * Store 统一导出
 *
 * 重构说明：
 * - 原 mainStore 已拆分为三个独立 Store
 * - usePlayerStore: 音乐播放器状态
 * - useUIStore: UI 状态（窗口、面板等）
 * - useSettingsStore: 用户设置（持久化）
 *
 * 为保持向后兼容，mainStore 作为组合 Store 保留
 */

import { defineStore, storeToRefs } from "pinia";
import { usePlayerStore } from "./player";
import { useUIStore } from "./ui";
import { useSettingsStore } from "./settings";
import { BREAKPOINTS } from "@/utils/constants";

// 导出独立 Store（推荐使用）
export { usePlayerStore } from "./player";
export { useUIStore } from "./ui";
export { useSettingsStore } from "./settings";

// Tab 切换节流时间（毫秒）
const TAB_SWITCH_THROTTLE = 350;
let lastTabSwitchTime = 0;

/**
 * 兼容性 Store（向后兼容）
 * @deprecated 请使用 usePlayerStore, useUIStore, useSettingsStore
 */
export const mainStore = defineStore("main", {
  state: () => {
    return {
      // UI 状态
      imgLoadStatus: false,
      innerWidth: null,
      backgroundShow: false,
      boxOpenState: false,
      mobileOpenState: false,
      mobileFuncState: false,
      mobileTabIndex: 0,
      mobileTabSwitching: false,
      setOpenState: false,
      musicOpenState: false,

      // 播放器状态
      musicIsOk: false,
      playerState: false,
      playerTitle: null,
      playerArtist: null,
      playerLrc: "歌词加载中",
      playerProgress: 0,

      // 用户设置（持久化）
      coverType: "4",
      siteStartShow: false,
      musicClick: false,
      musicVolume: 0,
      playerLrcShow: true,
      footerBlur: true,
      playerAutoplay: false,
      playerLoop: "all",
      playerOrder: "list",
    };
  },
  getters: {
    getPlayerLrc: (state) => state.playerLrc,
    getPlayerData: (state) => ({
      name: state.playerTitle,
      artist: state.playerArtist,
    }),
    getInnerWidth: (state) => state.innerWidth,
  },
  actions: {
    setInnerWidth(value) {
      this.innerWidth = value;
      if (value >= BREAKPOINTS.MOBILE) {
        this.mobileOpenState = false;
        this.mobileFuncState = false;
        this.mobileTabIndex = 0;
      }
    },
    setMobileTabIndex(index) {
      const now = Date.now();
      if (now - lastTabSwitchTime < TAB_SWITCH_THROTTLE) {
        return;
      }
      if (this.mobileTabIndex === index) {
        return;
      }
      lastTabSwitchTime = now;
      this.mobileTabIndex = index;
      if (index !== 1) {
        this.musicOpenState = false;
      }
    },
    setPlayerState(value) {
      this.playerState = !value;
    },
    setPlayerLrc(value) {
      this.playerLrc = value;
    },
    setPlayerProgress(value) {
      this.playerProgress = value;
    },
    setPlayerData(title, artist) {
      this.playerTitle = title;
      this.playerArtist = artist;
    },
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },
  },
  persist: {
    key: "data",
    storage: window.localStorage,
    paths: [
      "coverType",
      "musicVolume",
      "siteStartShow",
      "musicClick",
      "playerLrcShow",
      "footerBlur",
      "playerAutoplay",
      "playerLoop",
      "playerOrder",
    ],
  },
});
