<template>
  <div class="video-grid f-c">
    <div class="video-grid-top f-r" v-show="isTab">
      <div class="tabs-wrap">
        <div
          class="tab-item-row"
          v-for="(item, index) in props.gridList"
          :key="index"
          :class="{ active: activeName == item.value }"
          @click="clickGrid(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="video-grid-bottom f-r">
      <div class="tabs">
        <div
          class="tab-item-column"
          :class="{ checked: checkTab == cItem.value }"
          v-for="(cItem, cIndex) in props.tabList"
          :key="cIndex"
          @click="tabClick(cItem)"
        >
          {{ cItem.name }}
        </div>
      </div>
      <div class="video-box" :class="`grid-layout-${activeName}`">
        <div class="video-item" v-for="(vItem, vIndex) in props.videoList" :key="vIndex">
          <Play class="video" :id="'player' + vIndex" @loaded="handleVideoLoaded(vIndex)" />
          <div class="text">{{ vItem.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Play from './playComponent.vue'
const props = defineProps({
  gridList: {
    type: Array,
    default: () => []
  },
  tabList: {
    type: Array,
    default: () => []
  },
  videoList: {
    type: Array,
    default: () => []
  },
  isTab: {
    type: Boolean,
    default: () => true
  },
  activeTab: {
    type: String,
    default: '1'
  }
})
const activeName = ref('1')
const checkTab = ref('1')
watch(
  () => props.activeTab,
  (newValue) => {
    activeName.value = newValue
  }
)
const emit = defineEmits(['gridChange'])
const tabClick = (item) => {
  checkTab.value = item.value
}
const clickGrid = (item) => {
  activeName.value = item.value
  emit('gridChange', activeName.value)
}
const handleVideoLoaded = () => {}
</script>

<style lang="less" scoped>
.video-grid {
  margin: 0;
  width: 100%;
  &-top {
    justify-content: flex-end;
    align-items: center;
    margin-right: 30px;
    margin-top: 10px;
    .tabs-wrap {
      width: 156px;
      border: 1px solid #038ef4;
      .tab-item-row {
        width: 50%;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 19px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        float: right;
        cursor: pointer;
      }
      .active {
        background: #038ef4;
        color: #fff;
      }
    }
  }
  &-bottom {
    margin-top: 10px;
    flex-grow: 1;
    justify-content: space-between;
    .tabs {
      width: 70px;
      .tab-item-column {
        padding: 4px 0;
        font-family: Microsoft YaHei;
        font-weight: 400;
        font-size: 12px;
        color: #6fbbf6;
        text-align: center;
        cursor: pointer;
      }
      .checked {
        color: #fff;
        border-top: 1px solid #00ccff;
        border-bottom: 1px solid #00ccff;
      }
    }
    .video-box {
      width: 500px;
      display: grid;
      grid-template-columns: repeat(3); /* 三个等宽159px的列 */
      grid-template-rows: repeat(2, 108px);
      margin-left: 20px;
      .video-item {
        width: 90%;
        .video {
          width: 100%;
          height: 73px;
          border-radius: 5px;
        }
        .text {
          text-align: center;
          font-family: Microsoft YaHei;
          font-weight: 400;
          font-size: 13px;
          color: #ffffff;
          margin-top: 5px;
        }
      }
    }
    .grid-layout-1 {
      /* 对应4*4布局 */
      grid-template-columns: repeat(2, 1fr);
    }

    .grid-layout-2 {
      /* 对应2*2布局 */
      grid-template-columns: repeat(1fr, 100%);
      grid-template-rows: repeat(2, 50%);
    }
  }
}
</style>
