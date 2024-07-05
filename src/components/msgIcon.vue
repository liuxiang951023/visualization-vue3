<template>
  <div class="people-total-item">
    <div class="label">{{ label }}</div>
    <div class="num">{{ num }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  num: {
    type: [String, Number],
    default: ''
  }
})
</script>

<style lang="less" scoped>
.people-total-item {
  width: 98px;
  height: 55px;
  background: url('../assets/image/people_icon.png') no-repeat center;
  background-size: cover;
  .label {
    height: 18px;
    text-align: center;
    line-height: 28px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
  }
  .num {
    text-align: center;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    line-height: 38px;
    font-size: 16px;
    color: #01f2f3;
  }
}
</style>
