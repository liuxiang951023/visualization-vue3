<template>
  <div :id="id" ref="playerRef" class="player"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onIntersection } from '../unit/intersection-helper'

const player = ref(null)
const playerRef = ref(null)
const props = defineProps(['id', 'url'])
const emit = defineEmits(['loaded'])

onMounted(() => {
  onIntersection(playerRef.value, () => {
    initPlayer()
  })
})

function initPlayer() {
  if (!player.value) {
    player.value = new window.Jessibuca({
      container: `#${props.id}`,
      url: 'https://live.nodemedia.cn:8443/live/b480_264.flv',
      supportDblclickFullscreen: true,
      useWCS: true,
      autoWasm: true,
      useMSE: true
    })
    player.value.play()
    emit('loaded')
  }
}

onUnmounted(() => {
  if (player.value) {
    player.value.destroy()
  }
})
</script>

<style lang="less" scoped>
.player {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0);
}
</style>
