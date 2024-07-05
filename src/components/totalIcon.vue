<template>
  <div class="energy-total" :class="{ 'f-c': type == '1', 'f-r': type == '2' }">
    <div class="top f-r">
      <img :src="imgUrl" />
      <div class="name">{{ name }}</div>
    </div>
    <div class="bottom-num" :style="{ color: color }">
      {{ num }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: ''
  },
  num: {
    type: [String, Number],
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  imgUrl: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: '1'
  }
})
</script>

<style lang="less" scoped>
.energy-total {
  margin: 5px 10px;
  .top {
    justify-content: flex-start;
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    img {
      width: 16px;
      height: 18px;
    }
    .name {
      margin-left: 4px;
    }
  }
  .bottom-num {
    font-family: Microsoft YaHei;
    font-size: 16px;
  }
}
.f-r {
  align-items: center;
}
</style>
