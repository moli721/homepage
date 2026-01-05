<template>
  <!-- 桌面端始终显示，移动端根据 Tab 显示不同内容 -->
  <div class="right" :class="{ 'mobile-hidden': store.innerWidth <= 720 && store.mobileTabIndex === 0 }">
    <!-- 移动端：功能区和导航区用过渡动画切换 -->
    <template v-if="store.innerWidth <= 720">
      <Transition name="fade-slide" mode="out-in">
        <div class="mobile-func" v-if="store.mobileTabIndex === 1" key="func">
          <Func />
        </div>
        <div class="mobile-links" v-else-if="store.mobileTabIndex === 2" key="links">
          <Link />
        </div>
      </Transition>
    </template>
    <!-- 桌面端：正常显示 -->
    <template v-else>
      <Func />
      <Link />
    </template>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import Func from "@/views/Func/index.vue";
import Link from "@/components/Links.vue";

const store = mainStore();
</script>

<style lang="scss" scoped>
.right {
  width: 50%;
  margin-left: 0.75rem;

  &.mobile-hidden {
    display: none;
  }

  @media (max-width: 720px) {
    margin-left: 0;
    width: 100%;
    padding: 16px;
    padding-bottom: 120px; // 为 Footer + Tab 留空间
  }

  .mobile-func {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mobile-links {
    width: 100%;
  }
}

// 淡入淡出 + 轻微滑动
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
