<template>
  <div class="total f-r">
    <div class="total-left">
      <img src="../assets/image/total_bg.png" />
      <div class="percentage">
        <div class="percentage-top">{{ props.percentage }}</div>
        <div class="percentage-bottom">{{ props.text }}</div>
      </div>
    </div>
    <div class="total-right f-c">
      <div class="total-right-item" v-for="(item, index) in props.list" :key="index">
        {{ item.name }} <span>{{ item.value }}</span> 项
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  percentage: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="less" scoped>
.total {
  margin: 10px 56px;
  .total-left {
    width: 146px;
    height: 146px;
    position: relative;
    border-radius: 50%;
    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: scale(1.3);
    }
    .percentage {
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      .percentage-top {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
      }
      .percentage-bottom {
        text-align: center;
        font-size: 14px;
      }
    }
  }
  .total-right {
    margin-left: 61px;
    justify-content: space-around;
    .total-right-item {
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      font-weight: 600;
    }
    .total-right-item:first-child {
      > span {
        color: #ffff63;
      }
    }
    .total-right-item:nth-child(2) {
      > span {
        color: #0290ff;
      }
    }
    .ttotal-right-item:last-child {
      > span {
        color: #19ffa1;
      }
    }
  }
}
</style>
