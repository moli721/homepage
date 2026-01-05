/**
 * 涟漪效果指令
 * 用于按钮点击时的视觉反馈
 * 使用: v-ripple
 */

const rippleStyle = `
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: scale(0);
  animation: ripple-effect 0.6s ease-out;
  pointer-events: none;
`;

const keyframesStyle = `
  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// 注入全局样式
let styleInjected = false;
const injectStyle = () => {
  if (styleInjected) return;
  const style = document.createElement("style");
  style.textContent = keyframesStyle;
  document.head.appendChild(style);
  styleInjected = true;
};

const createRipple = (e, el) => {
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.style.cssText = rippleStyle;
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  el.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
};

export const vRipple = {
  mounted(el) {
    injectStyle();
    // 确保元素有相对定位和溢出隐藏
    const position = getComputedStyle(el).position;
    if (position === "static") {
      el.style.position = "relative";
    }
    el.style.overflow = "hidden";

    el._rippleHandler = (e) => createRipple(e, el);
    el.addEventListener("click", el._rippleHandler);
    el.addEventListener("touchstart", el._rippleHandler, { passive: true });
  },
  unmounted(el) {
    el.removeEventListener("click", el._rippleHandler);
    el.removeEventListener("touchstart", el._rippleHandler);
  },
};

export default vRipple;
