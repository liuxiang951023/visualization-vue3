<template>
  <div class="resource-management f-r">
    <div class="content-left f-r">
      <div class="content-left-box f-c">
        <Title text="设备统计" />
        <TotalIcon
          name="平台接⼊设备总数："
          num="12913个"
          :imgUrl="icon1"
          color="#FFD800"
          type="2"
        ></TotalIcon>
        <div class="table-warp">
          <ScrollTable
            v-if="equipmentTable.length"
            :tableData="equipmentTable"
            :columns="equipmentColumns"
            @pageChange="equipmentPageChange"
          ></ScrollTable>
        </div>
        <BarChars
          v-if="equipmentyAxisPeopleData.length > 0"
          id="equipmentyChart"
          class="equipmenty-chart"
          :xAxisData="equipmentxAxisPeopleData"
          :yAxisData="equipmentyAxisPeopleData"
        ></BarChars>
        <Title text="车辆统计" />
        <TotalIcon
          name="平台接⼊⼯程⻋辆总数："
          num="341辆"
          :imgUrl="icon1"
          color="#FFD800"
          type="2"
        ></TotalIcon>
        <div class="table-warp2">
          <ScrollTable
            v-if="equipmentTable.length"
            :tableData="equipmentTable"
            :columns="equipmentColumns"
            @pageChange="equipmentPageChange"
          ></ScrollTable>
        </div>
        <div class="car-pie f-r">
          <div class="car-pie-left">
            <div
              class="tab-item"
              :class="{ activeTime: activeTime == item.value }"
              v-for="(item, index) in timeTabs"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
          <PieCharts id="carChart" :data="carData" class="car-pie-right"></PieCharts>
        </div>
        <Title text="监控视频">
          <div class="tabs-wrap">
            <div
              class="tab-item-row"
              v-for="(item, index) in gridList"
              :key="index"
              :class="{ active: activeName == item.value }"
              @click="clickGrid(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </Title>
        <div class="video-total f-r">
          <TotalIcon
            v-for="(item, index) in totalList"
            :key="index"
            :name="item.name"
            :num="item.num"
            :imgUrl="item.imgUrl"
            :color="item.color"
            type="1"
          ></TotalIcon>
        </div>
        <videoGrid
          :gridList="gridList"
          :videoList="videoList"
          :tabList="tabList"
          :activeTab="activeName"
          :isTab="false"
        ></videoGrid>
      </div>
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
    <div class="content-center f-c">
      <Title text="人员统计" />
      <div class="people-table f-r">
        <div class="people-table-left">
          <div class="people-total f-r">
            <TotalIcon
              v-for="(item, index) in peopleTotal"
              :key="index"
              :name="item.name"
              :num="item.num"
              :imgUrl="item.imgUrl"
              :color="item.color"
              type="1"
            ></TotalIcon>
          </div>
          <div class="people-table">
            <ScrollTable
              v-if="peopleTable.length"
              :tableData="peopleTable"
              :columns="peopleColumns"
              @pageChange="peoplePageChange"
            ></ScrollTable>
          </div>
        </div>
        <div class="people-table-right">
          <div class="people-total f-r">
            <TotalIcon
              v-for="(item, index) in peopleTotal"
              :key="index"
              :name="item.name"
              :num="item.num"
              :imgUrl="item.imgUrl"
              :color="item.color"
              type="1"
            ></TotalIcon>
          </div>
          <div class="people-table">
            <ScrollTable
              v-if="peopleTable.length"
              :tableData="peopleTable"
              :columns="peopleColumns"
              @pageChange="peoplePageChange"
            ></ScrollTable>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right f-c">
      <div class="content-right-box f-c">
        <Title text="塔吊统计">
          <div class="detail">查看详情</div>
        </Title>
        <div class="tower-crane-total f-r">
          <div class="tower-crane-total-left">
            <div class="label">塔吊总数</div>
            <div class="num">17台</div>
          </div>
          <div class="tower-crane-total-right f-r">
            <MsgIcon
              v-for="(item, index) in towerCraneTotal"
              :key="index"
              :label="item.name"
              :num="item.value"
            ></MsgIcon>
          </div>
        </div>
        <BarChars
          v-if="towerCraneyAxisData.length > 0"
          id="towerCraneChart"
          class="towerCraneChart"
          :xAxisData="towerCranexAxisData"
          :yAxisData="towerCraneyAxisData"
        ></BarChars>
        <Title text="升降机统计">
          <div class="detail">查看详情</div>
        </Title>
        <div class="elevator-total f-r">
          <TotalIcon
            v-for="(item, index) in elevatorTotal"
            :key="index"
            :name="item.name"
            :num="item.num"
            :imgUrl="item.imgUrl"
            :color="item.color"
            type="1"
          ></TotalIcon>
        </div>
        <LineCharts
          id="elevatorCharts"
          class="elevator-charts"
          v-if="elevatoryAxisData.length > 0"
          :xAxisData="elevatorxAxisData"
          :yAxisData="elevatoryAxisData"
          :legend="elevatoryLegend"
        ></LineCharts>
        <Title text="高支模统计">
          <div class="detail">查看详情</div>
        </Title>
        <div class="elevator-total f-r">
          <TotalIcon
            v-for="(item, index) in elevatorTotal"
            :key="index"
            :name="item.name"
            :num="item.num"
            :imgUrl="item.imgUrl"
            :color="item.color"
            type="1"
          ></TotalIcon>
        </div>
        <LineCharts
          id="supportMoldCharts"
          class="support-charts"
          v-if="supportMoldyAxisData.length > 0"
          :xAxisData="supportMoldxAxisData"
          :yAxisData="supportMoldyAxisData"
          :legend="supportMoldLegend"
        ></LineCharts>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Title from '@/components/titlePage.vue'
import TotalIcon from '@/components/totalIcon.vue'
import ScrollTable from '@/components/scrollTable.vue'
import BarChars from '@/components/barChars.vue'
import PieCharts from '@/components/pieCharts.vue'
import LineCharts from '@/components/lineCharts.vue'
import videoGrid from '@/components/videoGrid.vue'
import MsgIcon from '@/components/msgIcon.vue'
import icon1 from '@/assets/image/elevator.png'
import icon2 from '@/assets/image/monitor.png'
import icon3 from '@/assets/image/online.png'
import icon4 from '@/assets/image/offline.png'
import icon5 from '@/assets/image/total_people.png'
import icon6 from '@/assets/image/meet.png'
import icon7 from '@/assets/image/nan.png'
const activeMenu = ref('1')
// 首页菜单
const menuList = ref([
  { name: 'GIS地图', value: '1' },
  { name: '全景视图', value: '2' }
])
const equipmentTable = ref([
  { type: '塔吊', onLine: 123, offLine: 0 },
  { type: '基坑', onLine: 20, offLine: 0 },
  { type: '⾼⽀模', onLine: 2, offLine: 0 },
  { type: '升降机', onLine: 3, offLine: 0 },
  { type: '⽔电', onLine: 0, offLine: 20 }
])
const equipmentColumns = ref([
  { prop: 'type', label: '监测点类型', dynamicClass: 'column1' },
  { prop: 'onLine', label: '在线（个）', dynamicClass: 'column2' },
  { prop: 'offLine', label: '离线（个）', dynamicClass: 'column3' }
])
const equipmentyAxisPeopleData = ref([2, 34, 45, 45, 23, 146, 76])
const equipmentxAxisPeopleData = ref([
  '06-17',
  '06-18',
  '06-19',
  '06-20',
  '06-21',
  '06-22',
  '06-23'
])
const timeTabs = ref([
  { name: '今日', value: 'today' },
  { name: '本月', value: 'month' },
  { name: '本季', value: 'season' },
  { name: '本年', value: 'year' }
])
const activeTime = ref('today')
const carData = ref([
  { value: 500, name: '正常油耗', color: '#0078FF' },
  { value: 778, name: '异常油耗', color: '#FF4E00' }
])
const gridList = ref([
  { name: '2*2', value: '2' },
  { name: '4*4', value: '1' }
])
const activeName = ref('1')
const tabList = ref([
  { name: '大门', value: '1' },
  { name: '基坑', value: '2' },
  { name: '塔吊', value: '3' },
  { name: '停⻋场', value: '4' },
  { name: '堆料场', value: '5' },
  { name: '员⼯宿舍', value: '6' },
  { name: '办公楼', value: '7' }
])
const totalList = ref([
  { name: '平台接⼊监控总数', num: '3412台', imgUrl: icon2, color: '#FFD800' },
  { name: '在线', num: '3412台', imgUrl: icon3, color: '#19FFA1' },
  { name: '离线', num: '0台', imgUrl: icon4, color: '#FF0000' }
])
const videoList = ref([
  {
    name: '南门',
    url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
  },
  {
    name: '北门',
    url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
  },
  {
    name: '西门',
    url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
  },
  {
    name: '东门',
    url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
  }
])
const peopleTotal = ref([
  { name: '在册总⼈数', num: '3512⼈', imgUrl: icon5, color: '#FFD800' },
  { name: '登记总⼈数', num: '2713⼈', imgUrl: icon6, color: '#19FFA1' },
  { name: '男性', num: '1735人', imgUrl: icon7, color: '#FF0000' }
])
const peopleTable = ref([
  { type: '塔吊', onLine: 123, offLine: 0 },
  { type: '基坑', onLine: 20, offLine: 0 },
  { type: '⾼⽀模', onLine: 2, offLine: 0 },
  { type: '升降机', onLine: 3, offLine: 0 },
  { type: '⽔电', onLine: 0, offLine: 20 }
])
const peopleColumns = ref([
  { prop: 'type', label: '监测点类型', dynamicClass: 'column1' },
  { prop: 'onLine', label: '在线（个）', dynamicClass: 'column2' },
  { prop: 'offLine', label: '离线（个）', dynamicClass: 'column3' }
])
const towerCraneTotal = ref([
  { name: '平臂塔吊', value: '8台' },
  { name: '动臂塔吊', value: '2台' },
  { name: '导轨塔吊', value: '1台' },
  { name: '塔头塔吊', value: '6台' }
])
const towerCranexAxisData = ref(['0001', '0002', '0003', '0004', '0005', '0006', '0007'])
const towerCraneyAxisData = ref([2, 34, 45, 45, 23, 146, 76])
const elevatorTotal = ref([
  { name: '升降机总数', num: '17台', imgUrl: icon1, color: '#FFD800' },
  { name: '在线', num: '10台', imgUrl: icon3, color: '#19FFA1' },
  { name: '离线', num: '7台', imgUrl: icon4, color: '#FF0000' }
])
const elevatorxAxisData = ref(['0001', '0002', '0003', '0004', '0005', '0006', '0007'])
const elevatoryAxisData = ref([
  {
    name: '⼯作次数',
    type: 'line',
    areaStyle: {
      color: {
        type: 'linear', // 渐变类型为线性渐变
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(255, 255, 82, 0.1)' },
          { offset: 1, color: 'rgba(255, 255, 82, 0.2)' }
        ],
        global: false
      }
    },
    symbol: 'none',
    smooth: true,
    color: '#FFFF52',
    data: [120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: '报警次数',
    type: 'line',
    areaStyle: {
      color: {
        type: 'linear', // 渐变类型为线性渐变
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(0, 114, 255, 0.1)' },
          { offset: 1, color: 'rgba(0, 114, 255, 0.2)' }
        ],
        global: false
      }
    },
    symbol: 'none',
    smooth: true,
    color: '#0AC2F8',
    data: [12, 13, 11, 34, 9, 23, 20]
  }
])
const elevatoryLegend = ref(['⼯作次数', '报警次数'])
const supportMoldxAxisData = ref(['0001', '0002', '0003', '0004', '0005', '0006', '0007'])
const supportMoldyAxisData = ref([
  {
    name: '倾斜度',
    type: 'line',
    areaStyle: {
      color: {
        type: 'linear', // 渐变类型为线性渐变
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(255, 255, 82, 0.1)' },
          { offset: 1, color: 'rgba(255, 255, 82, 0.2)' }
        ],
        global: false
      }
    },
    symbol: 'none',
    smooth: true,
    color: '#FFFF52',
    data: [120, 13, 101, 134, 90, 230, 210]
  },
  {
    name: '沉降mm',
    type: 'line',
    areaStyle: {
      color: {
        type: 'linear', // 渐变类型为线性渐变
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(0, 114, 255, 0.1)' },
          { offset: 1, color: 'rgba(0, 114, 255, 0.2)' }
        ],
        global: false
      }
    },
    symbol: 'none',
    smooth: true,
    color: '#0AC2F8',
    data: [222, 132, 11, 34, 9, 23, 20]
  }
])
const supportMoldLegend = ref(['倾斜度', '沉降mm'])
const clickGrid = (item) => {
  activeName.value = item.value
  if (activeName.value === '1') {
    videoList.value = [
      {
        name: '南门',
        url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
      },
      {
        name: '北门',
        url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
      },
      {
        name: '西门',
        url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
      },
      {
        name: '东门',
        url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
      }
    ]
  } else {
    videoList.value = [
      {
        name: '南门',
        url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
      },
      {
        name: '北门',
        url: 'https://img1.baidu.com/it/u=805103204,11749913&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200'
      }
    ]
  }
}
// 获取列表数据
const equipmentPageChange = () => {
  equipmentTable.value = [...equipmentTable.value, ...equipmentTable.value]
}
// 获取列表数据
const peoplePageChange = () => {
  peopleTable.value = [...peopleTable.value, ...peopleTable.value]
}
</script>

<style lang="less" scoped>
.resource-management {
  width: 100%;
  height: 98%;
  justify-content: space-between;
  align-items: flex-end;
  .detail {
    margin-right: 40px;
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
  }
  .tabs-wrap {
    margin-right: 40px;
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
  .content-left {
    width: 25%;
    height: 100%;
    flex-shrink: 0;
    flex-grow: 0;
    padding-bottom: 70px;
    position: relative;
    .content-left-box {
      width: 100%;
      overflow-y: auto;
      margin-left: 20px;
      justify-content: space-around;
      .table-warp {
        width: 100%;
        height: 118px;
      }
      :deep(.column2) {
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 21px;
        color: #19ffa1;
      }
      :deep(.column3) {
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 21px;
        color: #ff1f01;
      }
      .equipmenty-chart {
        width: 100%;
        height: 180px;
      }
      .table-warp2 {
        width: 100%;
        height: 118px;
      }
      .car-pie {
        width: 100%;
        height: 108px;
        margin-top: 10px;
        margin-bottom: 10px;
        .car-pie-left {
          width: 51px;
          height: 109px;
          border: 1px solid #038ef4;
          .tab-item {
            width: 100%;
            height: 27px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
            line-height: 27px;
          }
          .activeTime {
            background: rgba(3, 142, 244, 1);
            color: #fff;
          }
        }
        .car-pie-right {
          width: 80%;
          height: 109px;
          > div {
            width: 100%;
            height: 100%;
            .canvas {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .video-total {
        justify-content: space-between;
      }
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
  .content-center {
    width: 50%;
    margin-right: 20px;
    padding-bottom: 130px;
    .people-total {
      justify-content: space-between;
    }
    .people-table {
      width: 100%;
      height: 137px;
      :deep(.column2) {
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 21px;
        color: #19ffa1;
      }
      :deep(.column3) {
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 21px;
        color: #ff1f01;
      }
      .people-table-left {
        width: 50%;
        margin-left: 22px;
      }
      .people-table-right {
        width: 50%;
        margin-left: 22px;
      }
    }
  }
  .content-right {
    width: 25% !important;
    height: 100%;
    flex-shrink: 0;
    flex-grow: 0;
    padding-bottom: 70px;
    .content-right-box {
      overflow-y: auto;
      height: 100%;
      justify-content: space-around;
      .tower-crane-total {
        margin: 10px 20px 0 20px;
        justify-content: space-between;
        .tower-crane-total-left {
          width: 122px;
          height: 100px;
          margin-top: 4px;
          margin-left: 25px;
          background: url(../../assets/image/big_total.png) no-repeat center;
          background-size: cover;
          text-align: center;
          .label {
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            font-size: 14px;
            color: #ffffff;
            line-height: 44px;
          }
          .num {
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            font-size: 25px;
            line-height: 44px;
            color: #f3ac01;
          }
        }
        .tower-crane-total-right {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* 创建两列，每列宽度为1fr，表示可用空间的等分 */
          grid-template-rows: repeat(2, auto); /* 创建两行，行高根据内容自动调整 */
          gap: 10px;
        }
      }
      .elevator-total {
        width: 90%;
        justify-content: space-between;
        margin-left: 10px;
      }
      .towerCraneChart {
        width: 100%;
        height: 155px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .elevator-charts {
        height: 172px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .support-charts {
        height: 172px;
      }
    }
  }
}
</style>
