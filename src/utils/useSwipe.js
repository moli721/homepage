/**
 * 滑动手势 Composable
 * 用于检测触摸滑动方向
 */
import { ref, onMounted, onBeforeUnmount } from "vue";

export function useSwipe(options = {}) {
  const {
    threshold = 50, // 最小滑动距离
    onSwipeLeft = null,
    onSwipeRight = null,
  } = options;

  const startX = ref(0);
  const startY = ref(0);
  const isSwiping = ref(false);

  const handleTouchStart = (e) => {
    startX.value = e.touches[0].clientX;
    startY.value = e.touches[0].clientY;
    isSwiping.value = true;
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.value) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX.value;
    const diffY = endY - startY.value;

    // 确保是水平滑动（水平距离 > 垂直距离）
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (diffX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    isSwiping.value = false;
  };

  const bindSwipe = (element) => {
    if (!element) return;
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });
  };

  const unbindSwipe = (element) => {
    if (!element) return;
    element.removeEventListener("touchstart", handleTouchStart);
    element.removeEventListener("touchend", handleTouchEnd);
  };

  return {
    bindSwipe,
    unbindSwipe,
    isSwiping,
  };
}
