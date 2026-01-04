<template>
  <!-- 桌面端始终显示，移动端根据 Tab 显示不同内容 -->
  <div class="right" :class="{ 'mobile-hidden': store.innerWidth <= 720 && store.mobileTabIndex === 0 }">
    <!-- 移动端：功能区和导航区始终渲染，用 v-show 切换显示 -->
    <template v-if="store.innerWidth <= 720">
      <div class="mobile-func" v-show="store.mobileTabIndex === 1">
        <Func />
      </div>
      <div class="mobile-links" v-show="store.mobileTabIndex === 2">
        <Link />
      </div>
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
    visibility: hidden;
    position: absolute;
    pointer-events: none;
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
</style>
