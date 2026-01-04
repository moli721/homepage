<template>
  <div class="box cards" @mouseenter="closeShow = true" @mouseleave="closeShow = false" @click="handleMobileClick">
    <close-one
      class="close"
      theme="filled"
      size="28"
      fill="#ffffff60"
      :style="{ opacity: closeShow || isMobile ? 1 : 0 }"
      @click.stop="store.boxOpenState = false"
    />
    <setting-two
      class="setting"
      theme="filled"
      size="28"
      fill="#ffffff60"
      :style="{ opacity: closeShow || isMobile ? 1 : 0 }"
      @click.stop="store.setOpenState = true"
    />
    <div class="content">
      <!-- 可在此处自定义任意内容 -->
      <TimeCapsule />
      <MoreContent />
    </div>
  </div>
</template>

<script setup>
import { CloseOne, SettingTwo } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import TimeCapsule from "@/components/TimeCapsule.vue";
import MoreContent from "@/components/MoreContent.vue";

const store = mainStore();
const closeShow = ref(false);

// 判断是否为移动端
const isMobile = computed(() => store.innerWidth <= 720);

// 移动端点击空白区域关闭
const handleMobileClick = (e) => {
  if (isMobile.value && e.target.classList.contains('box')) {
    store.boxOpenState = false;
  }
};
</script>

<style lang="scss" scoped>
.box {
  flex: 1 0 0%;
  margin-left: 0.75rem;
  height: 80%;
  max-width: 50%;
  position: relative;
  animation: fade 0.5s;

  &:hover {
    transform: scale(1);
  }

  .close,
  .setting {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;
    transition:
      transform 0.3s,
      opacity 0.3s;

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      transform: scale(1);
    }
  }

  .setting {
    right: 56px;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 100%;
    height: 100%;
  }

  // 移动端弹窗样式（非全屏）
  @media (max-width: 720px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 32px);
    height: auto;
    max-height: calc(100dvh - 180px);
    max-width: 100%;
    margin: 0;
    border-radius: 12px;
    z-index: 100;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);

    // 添加遮罩层
    &::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: -1;
    }

    .content {
      padding: 50px 20px 20px;
      overflow-y: auto;
      max-height: calc(100dvh - 220px);
    }
  }
}
</style>
