<template>
  <!-- 桌面端始终显示，移动端只在 Tab 0 时显示 -->
  <div class="left" :class="{ 'mobile-hidden': store.innerWidth <= 720 && store.mobileTabIndex !== 0 }">
    <Message />
    <SocialLinks />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import Message from "@/components/Message.vue";
import SocialLinks from "@/components/SocialLinks.vue";
const store = mainStore();
</script>

<style lang="scss" scoped>
.left {
  width: 50%;
  margin-right: 10px;
  transform: translateY(20px);

  &.mobile-hidden {
    display: none;
  }

  @media (max-width: 720px) {
    margin-right: 0;
    width: 100%;
    transform: none;
    padding: 16px;
    padding-bottom: 120px; // 为 Footer + Tab 留空间
  }
}
</style>
