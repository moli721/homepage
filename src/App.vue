<template>
  <!-- 加载 -->
  <Loading />
  <!-- 壁纸 -->
  <Background @loadComplete="loadComplete" />
  <!-- 主界面 -->
  <Transition name="fade" mode="out-in">
    <main id="main" v-if="store.imgLoadStatus">
      <div class="container" v-show="!store.backgroundShow">
        <section class="all" ref="mainContentRef" v-show="!store.setOpenState">
          <MainLeft />
          <MainRight v-show="!store.boxOpenState" />
          <Box v-show="store.boxOpenState" />
        </section>
        <section class="more" v-show="store.setOpenState" @click="store.setOpenState = false">
          <MoreSet />
        </section>
      </div>
      <!-- 移动端底部 Tab -->
      <MobileTab v-show="!store.backgroundShow && !store.setOpenState" />
      <!-- 页脚 -->
      <Transition name="fade" mode="out-in">
        <Footer class="f-ter" v-show="!store.backgroundShow && !store.setOpenState" />
      </Transition>
    </main>
  </Transition>
  <!-- 自定义右键菜单 -->
  <ContextMenu ref="contextMenuRef" />
</template>

<script setup>
import { helloInit, checkDays } from "@/utils/getTime.js";
import { mainStore } from "@/store";
import Loading from "@/components/Loading.vue";
import MainLeft from "@/views/Main/Left.vue";
import MainRight from "@/views/Main/Right.vue";
import Background from "@/components/Background.vue";
import Footer from "@/components/Footer.vue";
import Box from "@/views/Box/index.vue";
import MoreSet from "@/views/MoreSet/index.vue";
import MobileTab from "@/components/MobileTab.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import cursorInit from "@/utils/cursor.js";
import { useSwipe } from "@/utils/useSwipe.js";
import config from "@/../package.json";

const store = mainStore();

// 移动端滑动切换 Tab
const mainContentRef = ref(null);
const contextMenuRef = ref(null);
const { bindSwipe, unbindSwipe } = useSwipe({
  threshold: 50,
  onSwipeLeft: () => {
    if (store.innerWidth <= 720 && !store.boxOpenState && !store.setOpenState) {
      const nextIndex = Math.min(store.mobileTabIndex + 1, 2);
      store.setMobileTabIndex(nextIndex);
    }
  },
  onSwipeRight: () => {
    if (store.innerWidth <= 720 && !store.boxOpenState && !store.setOpenState) {
      const prevIndex = Math.max(store.mobileTabIndex - 1, 0);
      store.setMobileTabIndex(prevIndex);
    }
  },
});

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

// 加载完成事件
const loadComplete = () => {
  nextTick(() => {
    // 欢迎提示
    helloInit();
    // 默哀模式
    checkDays();
  });
};

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    if (value < 721) {
      store.boxOpenState = false;
      store.setOpenState = false;
    }
  },
);

// 图片加载完成后绑定滑动手势
watch(
  () => store.imgLoadStatus,
  (loaded) => {
    if (loaded) {
      nextTick(() => {
        if (mainContentRef.value) {
          bindSwipe(mainContentRef.value);
        }
      });
    }
  },
  { immediate: true }, // 立即执行一次，处理页面刷新时已加载的情况
);

onMounted(() => {
  // 自定义鼠标
  cursorInit();

  // 自定义右键菜单
  document.oncontextmenu = (e) => {
    e.preventDefault();
    contextMenuRef.value?.show(e);
    return false;
  };

  // 鼠标中键事件
  window.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
      store.backgroundShow = !store.backgroundShow;
      ElMessage({
        message: `已${store.backgroundShow ? "开启" : "退出"}壁纸展示状态`,
        grouping: true,
      });
    }
  });

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);

  // 控制台输出
  const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
  const styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
  const styleContent = "color: rgb(30,152,255);";
  const title1 = "陌离の主页";
  const title2 = `
 __  __  ___  _     ___ _____ ____  _
|  \\/  |/ _ \\| |   |_ _|___  |___ \\/ |
| |\\/| | | | | |    | |   / /  __) | |
| |  | | |_| | |___ | |  / /  / __/| |
|_|  |_|\\___/|_____|___|/_/  |_____|_|`;
  const content = `\n\n版本: ${config.version}\n主页: ${config.home}\nGithub: ${config.github}`;
  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
  // 解绑滑动手势
  if (mainContentRef.value) {
    unbindSwipe(mainContentRef.value);
  }
});
</script>

<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
  .container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 0 0.5vw;
    .all {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade 0.5s;
    }
    @media (max-width: 1200px) {
      padding: 0 2vw;
    }
    // 移动端适配
    @media (max-width: 720px) {
      padding: 0;
      overflow-x: hidden;
      .all {
        padding: 0;
        overflow-x: hidden;
      }
    }
  }
  // 移动端 footer 固定在底部 Tab 上方
  @media (max-width: 720px) {
    overflow-x: hidden;
    .f-ter {
      position: fixed;
      top: auto !important;
      bottom: calc(56px + env(safe-area-inset-bottom, 0px));
    }
  }
  @media (max-height: 720px) {
    overflow-y: auto;
    overflow-x: hidden;
    .container {
      height: 721px;
      .more {
        height: 721px;
        width: calc(100% + 6px);
      }
      @media (min-width: 391px) {
        // w 1201px ~ max
        padding-left: 0.7vw;
        padding-right: 0.25vw;
        @media (max-width: 1200px) { // w 1101px ~ 1280px
          padding-left: 2.3vw;
          padding-right: 1.75vw;
        }
        @media (max-width: 1100px) { // w 993px ~ 1100px
          padding-left: 2vw;
          padding-right: calc(2vw - 6px);
        }
        @media (max-width: 992px) { // w 901px ~ 992px
          padding-left: 2.3vw;
          padding-right: 1.7vw;
        }
        @media (max-width: 900px) { // w 391px ~ 900px
          padding-left: 2vw;
          padding-right: calc(2vw - 6px);
        }
      }
    }
    .f-ter {
      top: 675px; // 721px - 46px
      @media (min-width: 391px) {
        padding-left: 6px;
      }
    }
  }
  @media (max-width: 390px) {
    overflow-x: hidden;
    overflow-y: auto;
    .container {
      width: 100%;
    }
    .f-ter {
      width: 100%;
    }
  }
}
</style>
