import { defineStore } from "pinia";

/**
 * 音乐播放器状态管理
 */
export const usePlayerStore = defineStore("player", {
  state: () => ({
    // 播放器状态
    isReady: false, // 音乐是否加载完成
    isPlaying: false, // 当前播放状态
    progress: 0, // 播放进度百分比 (0-100)

    // 当前歌曲信息
    currentTitle: null, // 当前播放歌曲名
    currentArtist: null, // 当前播放歌手名
    currentLrc: "歌词加载中", // 当前播放歌词
  }),

  getters: {
    // 获取歌词
    lrc: (state) => state.currentLrc,

    // 获取歌曲信息
    songInfo: (state) => ({
      name: state.currentTitle,
      artist: state.currentArtist,
    }),

    // 是否有歌曲在播放
    hasSong: (state) => !!state.currentTitle,
  },

  actions: {
    // 设置播放器就绪状态
    setReady(value) {
      this.isReady = value;
    },

    // 切换播放状态
    togglePlay() {
      this.isPlaying = !this.isPlaying;
    },

    // 设置播放状态
    setPlaying(value) {
      this.isPlaying = value;
    },

    // 更新歌词
    setLrc(value) {
      this.currentLrc = value;
    },

    // 更新播放进度
    setProgress(value) {
      this.progress = value;
    },

    // 更新歌曲信息
    setSongInfo(title, artist) {
      this.currentTitle = title;
      this.currentArtist = artist;
    },

    // 重置播放器状态
    reset() {
      this.isPlaying = false;
      this.progress = 0;
      this.currentTitle = null;
      this.currentArtist = null;
      this.currentLrc = "歌词加载中";
    },
  },
});
