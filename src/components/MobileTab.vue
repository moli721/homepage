<template>
  <div class="mobile-tab">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      v-ripple
      class="tab-item"
      :class="{ active: store.mobileTabIndex === index }"
      @click="store.setMobileTabIndex(index)"
    >
      <component :is="tab.icon" theme="filled" size="20" :fill="store.mobileTabIndex === index ? '#fff' : '#ffffffaa'" />
      <span>{{ tab.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Home, MusicMenu, ApplicationMenu } from "@icon-park/vue-next";
import { mainStore } from "@/store";

const store = mainStore();

const tabs = [
  { label: "首页", icon: Home },
  { label: "功能", icon: MusicMenu },
  { label: "导航", icon: ApplicationMenu },
];
</script>

<style lang="scss" scoped>
.mobile-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(56px + env(safe-area-inset-bottom, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 8px;
  z-index: 10;
  animation: fade 0.3s;

  @media (min-width: 721px) {
    display: none;
  }

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6px 20px;
    border-radius: 8px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    .i-icon {
      width: 20px;
      height: 20px;
      margin-bottom: 2px;
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    span {
      font-size: 11px;
      color: #ffffffaa;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.active {
      background: rgba(255, 255, 255, 0.15);

      .i-icon {
        transform: scale(1.1);
      }

      span {
        color: #fff;
        font-weight: 500;
      }
    }

    &:active {
      transform: scale(0.92);
    }
  }
}
</style>
