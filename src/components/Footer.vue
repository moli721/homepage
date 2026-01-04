<template>
  <footer id="footer" :class="store.footerBlur ? 'blur' : null">
    <Transition name="fade" mode="out-in">
      <div v-if="!store.playerState || !store.playerLrcShow" class="power">
        <span>
          <span :class="startYear < fullYear ? 'c-hidden' : 'hidden'">Copyright&nbsp;</span>
          &copy;
          <span v-if="startYear < fullYear"
            class="site-start">
            {{ startYear }}
            -
          </span>
          {{ fullYear }}
          <a :href="siteUrl">{{ siteAuthor }}</a>
        </span>
        <!-- 以下信息请不要修改哦 -->
        <span class="hidden">
          &amp;&nbsp;Made&nbsp;by
          <a :href="config.github" target="_blank">
            {{ config.author }}
          </a>
        </span>
        <!-- 站点备案 -->
        <span v-if="siteIcp">
          &amp;
          <a href="https://beian.miit.gov.cn" target="_blank">
            {{ siteIcp }}
          </a>
        </span>
        <!-- 萌ICP备案 -->
        <span>
          &amp;
          <a href="https://icp.gov.moe/?keyword=20261721" target="_blank">萌ICP备20261721号</a>
        </span>
      </div>
      <div v-else class="lrc">
        <!-- 进度条 -->
        <div
          class="progress-bar"
          :class="{ dragging: isDragging }"
          ref="progressBar"
          @click="handleProgressClick"
          @mousedown="startDrag"
          @touchstart.passive="startDrag"
        >
          <div class="progress-fill" :style="{ width: displayProgress + '%' }"></div>
          <div class="progress-thumb" :style="{ left: displayProgress + '%' }"></div>
        </div>
        <Transition name="fade" mode="out-in">
          <div class="lrc-all" :key="store.getPlayerLrc">
            <music-one theme="filled" size="18" fill="#efefef" />
            <span class="lrc-text text-hidden" v-html="store.getPlayerLrc" />
            <music-one theme="filled" size="18" fill="#efefef" />
          </div>
        </Transition>
      </div>
    </Transition>
  </footer>
</template>

<script setup>
import { MusicOne } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import config from "@/../package.json";

const store = mainStore();
const fullYear = new Date().getFullYear();

// 进度条拖动相关
const progressBar = ref(null);
const isDragging = ref(false);
const dragProgress = ref(0);

// 平滑进度相关
const smoothProgress = ref(0);
let animationId = null;
let seekLockUntil = 0; // seek 后锁定时间戳

// 使用 RAF 平滑插值进度
const updateSmoothProgress = () => {
  if (isDragging.value) {
    animationId = requestAnimationFrame(updateSmoothProgress);
    return;
  }

  const now = performance.now();
  const target = store.playerProgress;
  const current = smoothProgress.value;

  // 如果在锁定期内，只有当 store 值接近我们设置的值时才解锁
  if (now < seekLockUntil) {
    // store 已经更新到接近我们 seek 的位置，可以解锁
    if (Math.abs(target - current) < 2) {
      seekLockUntil = 0;
    } else {
      // 继续锁定，不追踪 store 的旧值
      animationId = requestAnimationFrame(updateSmoothProgress);
      return;
    }
  }

  const diff = target - current;

  // 如果差距很小或进度跳跃（如切歌），直接设置
  if (Math.abs(diff) < 0.05 || Math.abs(diff) > 5) {
    smoothProgress.value = target;
  } else {
    // 平滑插值
    smoothProgress.value = current + diff * 0.15;
  }

  animationId = requestAnimationFrame(updateSmoothProgress);
};

// 显示的进度（拖动时显示拖动进度，否则显示平滑进度）
const displayProgress = computed(() => {
  return isDragging.value ? dragProgress.value : smoothProgress.value;
});

// 启动/停止平滑动画
onMounted(() => {
  updateSmoothProgress();
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});

// 计算点击/拖动位置对应的进度
const getProgressFromEvent = (e) => {
  if (!progressBar.value) return 0;
  const rect = progressBar.value.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const x = clientX - rect.left;
  const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
  return percent;
};

// 点击进度条跳转
const handleProgressClick = (e) => {
  if (isDragging.value) return;
  const percent = getProgressFromEvent(e);
  // 立即同步平滑进度，并锁定 500ms 防止闪回
  smoothProgress.value = percent;
  seekLockUntil = performance.now() + 500;
  if (window.$seekTo) {
    window.$seekTo(percent);
  }
};

// 开始拖动
const startDrag = (e) => {
  isDragging.value = true;
  dragProgress.value = getProgressFromEvent(e);

  const onMove = (e) => {
    if (isDragging.value) {
      // 使用 requestAnimationFrame 优化性能
      requestAnimationFrame(() => {
        dragProgress.value = getProgressFromEvent(e);
      });
    }
  };

  const onEnd = () => {
    if (isDragging.value) {
      // 先同步平滑进度到拖动位置，并锁定 500ms 防止闪回
      smoothProgress.value = dragProgress.value;
      seekLockUntil = performance.now() + 500;
      if (window.$seekTo) {
        window.$seekTo(dragProgress.value);
      }
    }
    isDragging.value = false;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onEnd);
    document.removeEventListener("touchmove", onMove, { passive: true });
    document.removeEventListener("touchend", onEnd);
  };

  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onEnd);
  document.addEventListener("touchmove", onMove, { passive: true });
  document.addEventListener("touchend", onEnd);
};

// 加载配置数据
// const siteStartDate = ref(import.meta.env.VITE_SITE_START);
const startYear = ref(
  import.meta.env.VITE_SITE_START?.length >= 4 ?
  import.meta.env.VITE_SITE_START.substring(0, 4) : null
);
const siteIcp = ref(import.meta.env.VITE_SITE_ICP);
const siteAuthor = ref(import.meta.env.VITE_SITE_AUTHOR);
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "https://www.imsyy.top";
  // 判断协议前缀
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "//" + url;
  }
  return url;
});
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  text-align: center;
  z-index: 0;
  font-size: 14px;
  // 文字不换行
  word-break: keep-all;
  white-space: nowrap;
  .power {
    animation: fade 0.3s;
  }
  .lrc {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.2);
      cursor: pointer;

      // 扩大点击热区（上下各扩展 12px）
      &::before {
        content: "";
        position: absolute;
        top: -12px;
        left: 0;
        right: 0;
        bottom: -12px;
      }

      .progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 0 3px 3px 0;
        pointer-events: none;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
      }

      .progress-thumb {
        position: absolute;
        top: 50%;
        width: 16px;
        height: 16px;
        background: #ffffff;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        box-shadow:
          0 0 0 4px rgba(255, 255, 255, 0.25),
          0 2px 8px rgba(0, 0, 0, 0.3);
        pointer-events: none;
        transition: transform 0.15s ease-out;
      }

      &:hover .progress-thumb,
      &.dragging .progress-thumb {
        transform: translate(-50%, -50%) scale(1);
      }

      &.dragging .progress-thumb {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
    .lrc-all {
      width: 98%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .lrc-text {
        margin: 0 8px;
      }
      .i-icon {
        width: 18px;
        height: 18px;
        display: inherit;
      }
    }
  }
  &.blur {
    backdrop-filter: blur(10px);
    background: rgb(0 0 0 / 25%);
    font-size: 16px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease-in-out;
  }
  @media (max-width: 720px) {
    font-size: 0.9rem;
    &.blur {
      font-size: 0.9rem;
    }
  }
  @media (max-width: 560px) {
    .c-hidden {
      display: none;
    }
  }
  @media (max-width: 480px) {
    .hidden {
      display: none;
    }
  }
}
</style>
