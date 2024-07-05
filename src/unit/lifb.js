function adjustRem() {
  const docElement = document.documentElement
  const pixelRatio = window.devicePixelRatio || 1 // 设备像素比
  const screenWidth = docElement.clientWidth * pixelRatio // 实际像素宽度

  // 基准设置：1920px宽时，1rem = 100px，对应fontSize为19.2px
  const baseScreenWidth = 1920 * pixelRatio
  const baseRemSize = 100

  // 计算rem值，确保在不同分辨率下比例恰当
  const remSize = (screenWidth / baseScreenWidth) * baseRemSize

  // 可选：根据项目需求决定是否保持maxWidth逻辑，以控制最大字体大小
  // const maxWidth = 3840 * pixelRatio;
  // remSize = Math.min(remSize, (maxWidth / baseScreenWidth) * baseRemSize);

  docElement.style.fontSize = `${remSize}px`
}

// 初始化执行
adjustRem()

// 监听窗口大小变化
window.addEventListener('resize', adjustRem)
