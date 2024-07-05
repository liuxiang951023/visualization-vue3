<template>
  <div class="smart-party f-r">
    <div class="smart-party-left">
      <div class="smart-party-left-box"></div>
      <div class="menu-box">
        <div class="menu-item" v-for="(item, index) in menuList" :key="index">
          <img src="@/assets/image/active_menu_bg.png" v-show="activeMenu == item.value" />
          <img src="@/assets/image/menu_bg.png" v-show="activeMenu != item.value" />
          <div class="text" :class="{ active: activeMenu == item.value }">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="smart-party-center f-c">
      <div class="smart-party-center-box"></div>
    </div>
    <div class="smart-party-right">
      <div class="smart-party-right-box"></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const activeMenu = ref('1')
// 首页菜单
const menuList = ref([
  { name: 'GIS地图', value: '1' },
  { name: '全景视图', value: '2' }
])
</script>
<style lang="less" scoped>
.smart-party {
  width: 100%;
  height: 100%;
  .smart-party-left {
    width: 25%;
    height: 100%;
    position: relative;
    .smart-party-left-box {
      width: 100%;
      height: 98%;
      overflow-y: auto;
    }
    .menu-box {
      position: absolute;
      z-index: 22;
      top: 10px;
      right: -136px;
      .menu-item {
        width: 136px;
        height: 29px;
        position: relative;
        margin-bottom: 19px;
        > img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .text {
          text-align: center;
          line-height: 29px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 99;
        }
        .active {
          color: #fff;
        }
      }
    }
  }
  .smart-party-center {
    flex: 1;
    height: 100%;
    justify-content: flex-end;
    .smart-party-center-box {
      width: 100%;
      height: 200px;
      margin-bottom: 2%;
    }
  }
  .smart-party-right {
    width: 25%;
    height: 100%;
    .smart-party-right-box {
      width: 100%;
      height: 98%;
      overflow-y: auto;
    }
  }
}
</style>
