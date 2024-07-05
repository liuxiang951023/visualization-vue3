<template>
  <div class="home f-c">
    <!-- 头部 -->
    <div class="header f-r">
      <div class="header-left f-r">
        <img src="../assets/image/logo.png" class="logo" />
        <img src="../assets/image/title.png" class="title" />
      </div>
      <div class="header-right f-r">
        <div class="tabs f-r">
          <div
            class="tab-item"
            :class="{ active: item.name == activeName }"
            v-for="(item, index) in tabs"
            :key="index"
            @click="tabClick(item)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="weather">
          <div class="weather-top"><span>2024年5月05日</span><span>18:59:50</span></div>
          <div class="weather-bottom f-r">
            <img src="../assets/image/weather.png" />
            <span>晴</span>
            <span>26℃~36℃</span>
            <span>东南风2级</span>
            <span>6m/s</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tabs = ref([
  {
    name: '项⽬总览',
    path: '/'
  },
  {
    name: '资源管理',
    path: '/resource-management'
  },
  {
    name: '安质环监管',
    path: '/safety-quality'
  },
  {
    name: '智慧党建',
    path: '/smart-party'
  }
])
const activeName = ref('资源管理')
const tabClick = (item) => {
  activeName.value = item.name
  router.push(item.path)
}
onMounted(() => {
  const path = router.currentRoute.value.path
  tabs.value.forEach((item) => {
    if (item.path === path) {
      activeName.value = item.name
    }
  })
})
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../assets/image/model_bg.png') no-repeat center;
  background-size: cover;
  .header {
    position: fixed;
    top: 0;
    z-index: 999;
    align-items: center;
    width: 100%;
    height: 0.71rem;
    background: url('../assets/image/header_bg.png') no-repeat center;
    background-size: cover;
    &-left {
      width: 7.66rem;
      height: 100%;
      background: url('../assets/image/title_bg.png') no-repeat center;
      background-size: cover;
      align-items: center;
      .logo {
        width: 1.47rem;
        height: 0.54rem;
        margin-left: 0.1rem;
      }
      .title {
        width: 4.21rem;
        height: 0.35rem;
        margin-left: 0.24rem;
        margin-top: 0.1rem;
      }
    }
    &-right {
      justify-content: space-between;
      align-items: center;
      flex: 1;
      .tabs {
        align-items: center;
        margin-left: 0.4rem;
        .tab-item {
          width: 1.37rem;
          height: 0.67rem;
          text-align: center;
          line-height: 0.67rem;
          cursor: pointer;
          font-family: Microsoft YaHei;
          font-weight: bold;
          font-size: 0.19rem;
          color: #ffffff;
        }
        .active {
          background: url('../assets/image/tab_bg.png') no-repeat center;
          background-size: cover;
        }
      }
      .weather {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 0.14rem;
        color: #ffffff;
        margin-right: 0.15rem;
        &-top {
          text-align: center;
          span:last-child {
            margin-left: 0.1rem;
          }
        }
        &-bottom {
          margin-top: 0.04rem;
          img {
            width: 0.23rem;
            height: 0.22rem;
          }
          > span {
            margin-right: 0.08rem;
          }
          > span:nth-child(3) {
            margin-top: -0.04rem;
          }
        }
      }
    }
  }
  .content {
    width: 100%;
    margin-top: 0.7rem;
    flex: 1;
    height: 100%;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
