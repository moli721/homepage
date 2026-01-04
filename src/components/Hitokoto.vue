<template>
  <div
    class="hitokoto cards"
    v-show="!store.musicOpenState"
    @mouseenter="openMusicShow = true"
    @mouseleave="openMusicShow = false"
    @click.stop
  >
    <!-- 打开音乐面板 -->
    <Transition name="el-fade-in-linear">
      <div
        class="open-music"
        v-show="openMusicShow"
        @click="store.musicOpenState = true"
      >
        <music-menu theme="filled" size="18" fill="#efefef" />
        <span>打开音乐播放器</span>
      </div>
    </Transition>
    <!-- 一言内容 -->
    <div class="content" @click="updateHitokoto">
      <Transition name="hitokoto-slide" mode="out-in">
        <div class="inner" :key="hitokotoData.text">
          <span class="text">{{ isLoading ? '新的一言正在赶来的路上' : hitokotoData.text }}</span>
          <span class="from">-「&nbsp;{{ isLoading ? '请稍候' : hitokotoData.from }}&nbsp;」</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { MusicMenu, Error } from "@icon-park/vue-next";
import { getHitokoto } from "@/api";
import { mainStore } from "@/store";

const store = mainStore();

// 开启音乐面板按钮显隐
const openMusicShow = ref(false);

// 一言数据 - 使用 ref 而非 reactive，确保整体替换
const hitokotoData = ref({
  text: "这里应该显示一句话",
  from: "無名",
});

// 是否正在加载
const isLoading = ref(true); // 默认加载状态

// 获取一言数据
const getHitokotoData = async () => {
  // 立即设置加载状态
  isLoading.value = true;

  try {
    const result = await getHitokoto();

    // 检查结果有效性，整体替换对象
    if (result && result.hitokoto) {
      hitokotoData.value = {
        text: result.hitokoto,
        from: result.from || "佚名",
      };
    }
  } catch (error) {
    ElMessage({
      message: "一言获取失败",
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
  } finally {
    isLoading.value = false;
  }
};

// 更新一言数据
const updateHitokoto = () => {
  getHitokotoData();
};

onMounted(() => {
  getHitokotoData();
});
</script>

<style lang="scss" scoped>
// 一言滑动动画
.hitokoto-slide-enter-active,
.hitokoto-slide-leave-active {
  transition: all 0.3s ease;
}

.hitokoto-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.hitokoto-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.hitokoto {
  width: 100%;
  height: 100%;
  padding: 20px;
  animation: fade 0.5s;
  .open-music {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000026;
    padding: 4px 0;
    border-radius: 8px 8px 0 0;
    .i-icon {
      width: 18px;
      height: 18px;
      display: block;
      margin-right: 8px;
    }
    span {
      font-size: 0.95rem;
    }
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    .inner {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;
    }

    .text {
      font-size: 1.1rem;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .from {
      margin-top: 10px;
      font-weight: bold;
      align-self: flex-end;
      font-size: 1.1rem;
    }
  }
}
</style>
