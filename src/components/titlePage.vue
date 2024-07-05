<template>
  <div class="title">
    <div class="title-left f-r">
      <img src="@/assets/image/h_icon.png" />
      <div class="text">{{ props.text }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.title {
  display: flex;
  width: 100%;
  padding: 10px 0;
  margin-top: 5px;
  justify-content: space-between;
  align-items: center;
  background: url('../assets/image/title-icon.png') no-repeat center;
  background-size: cover;
  .title-left {
    align-items: center;
    > img {
      width: 11px;
      height: 19px;
    }
    .text {
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 18px;
      color: #ffffff;
      margin-left: 14px;
    }
  }
}
</style>
