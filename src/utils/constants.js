/**
 * 全局常量配置
 */

// 响应式断点
export const BREAKPOINTS = {
  MOBILE: 720, // 移动端断点
  TABLET: 992, // 平板断点
  DESKTOP: 1200, // 桌面端断点
  LARGE: 1400, // 大屏断点
};

// Tab 相关常量
export const TAB_CONFIG = {
  HOME: 0, // 首页
  FUNC: 1, // 功能
  LINKS: 2, // 导航
  SWITCH_THROTTLE: 350, // 切换节流时间（毫秒）
};

// 壁纸类型
export const COVER_TYPES = {
  DEFAULT: "0", // 默认
  DAILY: "1", // 每日一图
  RANDOM_LANDSCAPE: "2", // 随机风景
  RANDOM_ANIME: "3", // 随机动漫
  CUSTOM: "4", // 自定义
};

// 音乐服务器类型
export const MUSIC_SERVERS = {
  NETEASE: "netease", // 网易云音乐
  TENCENT: "tencent", // QQ音乐
  KUGOU: "kugou", // 酷狗音乐
  XIAMI: "xiami", // 虾米音乐
  BAIDU: "baidu", // 百度音乐
};

// 播放模式
export const PLAY_MODES = {
  LOOP: {
    ALL: "all", // 列表循环
    ONE: "one", // 单曲循环
    NONE: "none", // 不循环
  },
  ORDER: {
    LIST: "list", // 顺序播放
    RANDOM: "random", // 随机播放
  },
};

// 动画时长（毫秒）
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// 默认配置
export const DEFAULTS = {
  VOLUME: 0.7,
  PLAYER_THEME: "#efefef",
};

// 纪念日配置
export const ANNIVERSARIES = {
  "4.4": "清明节",
  "5.12": "汶川大地震纪念日",
  "7.7": "中国人民抗日战争纪念日",
  "9.18": "九·一八事变纪念日",
  "12.13": "南京大屠杀死难者国家公祭日",
};
