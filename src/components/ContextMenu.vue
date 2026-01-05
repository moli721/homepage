<template>
  <Transition name="context-menu">
    <div
      v-if="visible"
      class="context-menu"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
      @click.stop
    >
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        v-ripple
        class="menu-item"
        @click="handleClick(item)"
      >
        <component :is="item.icon" theme="filled" size="16" fill="#efefef" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Home, Music, SettingTwo, FullScreen, Copy, Github } from "@icon-park/vue-next";
import { mainStore } from "@/store";

const store = mainStore();
const visible = ref(false);
const position = reactive({ x: 0, y: 0 });

const menuItems = [
  {
    label: "切换壁纸模式",
    icon: FullScreen,
    action: () => {
      store.backgroundShow = !store.backgroundShow;
      ElMessage({
        message: `已${store.backgroundShow ? "开启" : "退出"}壁纸展示状态`,
        grouping: true,
      });
    },
  },
  {
    label: "打开音乐播放器",
    icon: Music,
    action: () => {
      if (store.innerWidth <= 720) {
        store.setMobileTabIndex(1);
      }
      store.musicOpenState = true;
    },
  },
  {
    label: "打开设置",
    icon: SettingTwo,
    action: () => {
      store.boxOpenState = true;
      store.setOpenState = true;
    },
  },
  {
    label: "复制站点链接",
    icon: Copy,
    action: async () => {
      const url = window.location.href;
      try {
        // 优先使用 Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
          ElMessage.success("链接已复制到剪贴板");
        } else {
          // 降级方案：使用传统方法
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          ElMessage.success("链接已复制到剪贴板");
        }
      } catch {
        ElMessage.error("复制失败，请手动复制");
      }
    },
  },
  {
    label: "查看源码",
    icon: Github,
    action: () => {
      window.open("https://github.com/moli721/homepage", "_blank");
    },
  },
];

const handleClick = (item) => {
  item.action();
  visible.value = false;
};

const show = (e) => {
  e.preventDefault();
  // 计算位置，防止菜单超出屏幕
  const menuWidth = 160;
  const menuHeight = menuItems.length * 40 + 16;
  let x = e.clientX;
  let y = e.clientY;

  if (x + menuWidth > window.innerWidth) {
    x = window.innerWidth - menuWidth - 10;
  }
  if (y + menuHeight > window.innerHeight) {
    y = window.innerHeight - menuHeight - 10;
  }

  position.x = x;
  position.y = y;
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

// 点击其他区域关闭菜单
onMounted(() => {
  document.addEventListener("click", hide);
  document.addEventListener("scroll", hide);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", hide);
  document.removeEventListener("scroll", hide);
});

defineExpose({ show, hide });
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  z-index: 9999;
  min-width: 160px;
  padding: 8px 0;
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #efefef;
    font-size: 13px;

    .i-icon {
      flex-shrink: 0;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    &:active {
      transform: scale(0.98);
      background: rgba(255, 255, 255, 0.18);
    }
  }
}

// 菜单动画
.context-menu-enter-active {
  animation: context-menu-in 0.2s ease-out;
}

.context-menu-leave-active {
  animation: context-menu-in 0.15s ease-in reverse;
}

@keyframes context-menu-in {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
