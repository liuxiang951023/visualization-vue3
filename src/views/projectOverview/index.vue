<template>
  <div class="project-overview f-r">
    <div class="content-left f-r">
      <div class="content-left-box f-c">
        <div class="title-box f-c">
          <Title text="项目信息" />
          <div class="msg-icon-box f-r">
            <div class="msg-icon f-r">
              <img src="@/assets/image/msg_1.png" />
              <div class="msg">
                <div class="num">1134个</div>
                <div class="text">项目总数</div>
              </div>
            </div>
            <div class="msg-icon f-r">
              <img src="@/assets/image/msg_2.png" />
              <div class="msg">
                <div class="num pt">129个</div>
                <div class="text">平台接入项目总数</div>
              </div>
            </div>
          </div>
          <div class="project-box f-r">
            <div class="project-list">
              <el-tree
                :data="projectList"
                node-key="id"
                :props="defaultProps"
                :render-content="renderNode"
              ></el-tree>
            </div>
            <div class="project-msg">
              <div class="project-msg-item f-r">
                <div class="label">项⽬名称：</div>
                <div class="text">店湾镇卫⽣院门诊楼、 住院楼建设项⽬</div>
              </div>
              <div class="project-msg-item f-r">
                <div class="label">项⽬类型：</div>
                <div class="text">房屋建筑/医疗卫⽣</div>
              </div>
              <div class="project-msg-item f-r">
                <div class="label">项⽬规模：</div>
                <div class="text">20000 ㎡</div>
              </div>
              <div class="project-msg-item f-r">
                <div class="label">项⽬参建单位：</div>
                <div class="text">⼭⻄⼀建集团第九施⼯队</div>
              </div>
              <div class="project-msg-item f-r">
                <div class="label">开⼯时间：</div>
                <div class="text">2024-4-14</div>
              </div>
              <div class="project-msg-item f-r">
                <div class="label">计划完⼯时间：</div>
                <div class="text">2024-9-30</div>
              </div>
            </div>
          </div>
        </div>
        <div class="prople-box f-c">
          <Title text="⼈员管理" />
          <div class="people-total">
            <MsgIcon
              v-for="(item, index) in peopleTotal"
              :key="index"
              :label="item.name"
              :num="item.value"
            ></MsgIcon>
          </div>
          <BarChars
            class="people-chart"
            v-if="yAxisPeopleData.length > 0"
            id="peopleChart"
            :xAxisData="xAxisPeopleData"
            :yAxisData="yAxisPeopleData"
          ></BarChars>
        </div>
        <Title text="监控视频"></Title>
        <div class="video-box">
          <videoGrid
            :gridList="gridList"
            :videoList="videoList"
            :tabList="tabList"
            @gridChange="gridChange"
          ></videoGrid>
        </div>
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
      <div class="content-center-box f-c">
        <Title text="进度统计"></Title>
        <div class="progress-wrap f-r">
          <div class="progress-item f-r" v-for="(item, index) in progressList" :key="index">
            <div class="progress-item-left f-c">
              <div class="top">
                项目个数:<span
                  :class="{
                    num1: item.type == '1',
                    num2: item.type == '2',
                    num3: item.type == '3'
                  }"
                  >{{ item.num }}个</span
                >
              </div>
              <img src="@/assets/image/total_1.png" v-if="item.type == '1'" />
              <img src="@/assets/image/total_2.png" v-if="item.type == '2'" />
              <img src="@/assets/image/total_3.png" v-if="item.type == '3'" />
              <div
                class="bottom f-r"
                :class="{
                  bottom1: item.type == '1',
                  bottom2: item.type == '2',
                  bottom3: item.type == '3'
                }"
              >
                <div class="border-left"></div>
                <div class="text">
                  {{ item.name }}
                </div>
                <div class="border-right"></div>
              </div>
            </div>
            <div class="arrow-box f-r">
              <div class="arrow-item"></div>
              <div class="arrow-item"></div>
              <div class="arrow-item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="content-right-box f-c">
        <div class="safety-statistics f-c">
          <Title text="安全统计">
            <div class="detail">查看详情</div>
          </Title>
          <Total percentage="66.7%" text="整改完成率" :list="totalList"></Total>
          <div class="table-warp">
            <ScrollTable
              v-if="tableData.length"
              :tableData="tableData"
              :columns="columns"
              @pageChange="pageChange"
            ></ScrollTable>
          </div>
        </div>
        <div class="quality-statistics">
          <Title text="质量统计">
            <div class="detail">查看详情</div>
          </Title>
          <Total percentage="66.7%" text="整改完成率" :list="totalList"></Total>
        </div>
        <Title text="能耗双碳统计"></Title>
        <div class="energy-top f-r">
          <TotalIcon
            v-for="(item, index) in energyTotal"
            :key="index"
            :name="item.name"
            :num="item.num"
            :imgUrl="getImg(item.type)"
            :color="getColor(item.type)"
          ></TotalIcon>
        </div>
        <el-select
          v-model="activeNnergy"
          :teleported="false"
          placeholder="请选择"
          class="energy-select"
        >
          <el-option
            v-for="item in energyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div class="chart-box f-r">
          <div class="pie-box">
            <div id="container" class="energy-container"></div>
          </div>
          <div class="legend-list">
            <div class="legend-item" v-for="(item, index) in totallist" :key="index">
              <span class="label">{{ item.name }}</span>
              <span class="value">{{ item.percentage }}</span>
              <span class="unit">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
import Title from '@/components/titlePage.vue'
import Total from '@/components/totalPage.vue'
import videoGrid from '@/components/videoGrid.vue'
import BarChars from '@/components/barChars.vue'
import ScrollTable from '@/components/scrollTable.vue'
import MsgIcon from '@/components/msgIcon.vue'
import TotalIcon from '@/components/totalIcon.vue'
import icon1 from '@/assets/image/energy_1.png'
import icon2 from '@/assets/image/energy_2.png'
import icon3 from '@/assets/image/energy_3.png'
// 初始化3D模块
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)
const activeMenu = ref('1')
// 首页菜单
const menuList = ref([
  { name: 'GIS地图', value: '1' },
  { name: '全景视图', value: '2' }
])
const projectList = ref([
  {
    label: '⼭⻄建设投资集团有限公司'
  },
  {
    label: '⼭⻄⼀建集团有限公司',
    children: [
      {
        label: '⼤同左云店弯镇卫⽣院'
      },
      {
        label: '⻓治武乡县污⽔处理⼚'
      },
      {
        label: '太原尖草坪区⼈⺠法院'
      }
    ]
  },
  {
    label: '⼭⻄二建集团有限公司'
  },
  {
    label: '⼭⻄三建集团有限公司'
  },
  {
    label: '⼭⻄四建集团有限公司'
  }
])
const peopleTotal = ref([
  { name: '项目总数', value: '2713人' },
  { name: '技术员', value: '134人' },
  { name: '质量员', value: '225人' },
  { name: '施工员', value: '120人' },
  { name: '管理人员', value: '424人' },
  { name: '安全员', value: '361人' }
])
const xAxisPeopleData = ref(['一建', '二建', '三建', '四建', '五建', '六建', '七建'])
const yAxisPeopleData = ref([10, 20, 30, 40, 10, 70, 10])
const totalList = ref([
  { name: '待整改', value: 0 },
  { name: '待复查', value: 1 },
  { name: '已完成', value: 0 }
])
const tableData = ref([
  { type: '机械设备类', rectified: 0, review: 0, completed: 1 },
  { type: '安全防护类', rectified: 0, review: 0, completed: 0 },
  { type: '易燃易爆类', rectified: 0, review: 0, completed: 1 },
  { type: '职业伤害防护类', rectified: 0, review: 0, completed: 1 }
])
const columns = ref([
  { prop: 'type', label: '重大危险源管理：', dynamicClass: 'column1' },
  { prop: 'rectified', label: '待整改', dynamicClass: 'column2' },
  { prop: 'review', label: '待复查', dynamicClass: 'column3' },
  { prop: 'completed', label: '已完成', dynamicClass: 'column4' }
])
const gridList = ref([
  { name: '2*2', value: '2' },
  { name: '4*4', value: '1' }
])
const tabList = ref([
  { name: '大门', value: '1' },
  { name: '基坑', value: '2' },
  { name: '塔吊', value: '3' },
  { name: '停⻋场', value: '4' },
  { name: '堆料场', value: '5' },
  { name: '员⼯宿舍', value: '6' },
  { name: '办公楼', value: '7' }
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
const progressList = ref([
  {
    num: 13,
    name: '准备阶段',
    type: '1'
  },
  {
    num: 14,
    name: '基础施⼯阶段',
    type: '1'
  },
  {
    num: 15,
    name: '结构施⼯阶段',
    type: '2'
  },
  {
    num: 15,
    name: '屋⾯⼯程阶段',
    type: '2'
  },
  {
    num: 15,
    name: '安装⼯程阶段',
    type: '3'
  },
  {
    num: 15,
    name: '装修⼯程阶段',
    type: '3'
  }
])
const energyTotal = ref([
  {
    num: '200KWH',
    name: '总电耗',
    type: '1'
  },
  {
    num: '100L',
    name: '汽油耗',
    type: '2'
  },
  {
    num: '200L',
    name: '柴油耗',
    type: '3'
  }
])
const activeNnergy = ref('1')
const energyList = [
  { label: '建筑物化碳排放核算值kgCO2', value: '1' },
  { label: '建筑物化碳排放核算值kgCO7', value: '2' }
]
const totallist = ref([
  {
    name: '清洁能源',
    percentage: 40
  },
  {
    name: '建筑垃圾再利⽤',
    percentage: 30
  },
  {
    name: '外购绿电',
    percentage: 15
  },
  {
    name: '碳捕获',
    percentage: 10
  },
  {
    name: '碳配额',
    percentage: 5
  }
])
const totalColor = ref({
  1: { color: '#ffff63', imgUrl: icon1 },
  2: { color: '#0290ff', imgUrl: icon2 },
  3: { color: '#19ffa1', imgUrl: icon3 }
})
const getColor = computed({
  get() {
    return (index) => totalColor.value[index].color
  }
})
const getImg = computed({
  get() {
    return (index) => totalColor.value[index].imgUrl
  }
})
onMounted(async () => {
  initEnergyChart()
})

// 初始3d饼状图
const initEnergyChart = () => {
  Highcharts.chart('container', {
    chart: {
      type: 'pie',
      spacingTop: -20,
      options3d: {
        enabled: true,
        alpha: 45
      },
      backgroundColor: 'transparent'
    },
    title: {
      // 移除标题
      text: null
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        innerSize: '70%',
        depth: 20,
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        data: [
          {
            name: '清洁能源',
            y: 8,
            color: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, 'rgba(231, 183, 67, 1)'],
                [1, 'rgba(231, 183, 67, 1)']
              ]
            }
          },
          {
            name: '建筑垃圾再利⽤',
            y: 3,
            color: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, 'rgba(0, 228, 255, 1)'],
                [1, 'rgba(0, 228, 255, 1)']
              ]
            }
          },
          {
            name: '外购绿电',
            y: 1,
            color: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, 'rgba(8, 255, 217, 1)'],
                [1, 'rgba(8, 255, 217, 1)']
              ]
            }
          },
          {
            name: '碳捕获',
            y: 6,
            color: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, 'rgba(0, 139, 180, 1)'],
                [1, 'rgba(0, 139, 180, 1)']
              ]
            }
          },
          {
            name: '碳配额',
            y: 8,
            color: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, 'rgba(2, 144, 255, 1)'],
                [1, 'rgba(2, 144, 255, 1)']
              ]
            }
          }
        ]
      }
    ],
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.5)',
      style: {
        fontSize: '14px',
        color: '#fff'
      },
      formatter: function () {
        return '<b>' + this.point.name + '</b>: ' + this.y
      }
    },
    legend: {
      enabled: false
    }
  })
}
// 获取列表数据
const pageChange = () => {
  tableData.value = [...tableData.value, ...tableData.value]
}
// 视频宫格切换
const gridChange = (index) => {
  if (index === '1') {
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
</script>
<style lang="less" scoped>
.project-overview {
  width: 100%;
  height: 100%;
  justify-content: space-between;
  .detail {
    margin-right: 40px;
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
  }
  .content-left {
    width: 25%;
    height: 100%;
    padding-bottom: 80px;
    margin-left: 10px;
    position: relative;
    .content-left-box {
      overflow-y: auto;
      justify-content: space-around;
      .title-box {
        width: 100%;
        .msg-icon-box {
          justify-content: space-around;
          .msg-icon {
            margin: 10px 26px;
            > img {
              width: 70px;
              height: 70px;
              margin-top: 16px;
            }
            .msg {
              margin-top: 10px;
              .num {
                width: 93px;
                height: 29px;
                line-height: 29px;
                padding-left: 8px;
                background: url('@/assets/image/msg_bg_1.png') no-repeat center;
                background-size: cover;
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                font-size: 23px;
                color: #ffffff;
              }
              .pt {
                background: url('@/assets/image/msg_bg_2.png') no-repeat center;
                background-size: cover;
              }
              .text {
                margin-top: 7px;
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                font-size: 14px;
                color: #ffffff;
              }
            }
          }
        }
        .project-box {
          align-items: center;
          .project-list {
            width: 40%;
            height: 149px;
            border-top: 1px solid rgba(11, 132, 172, 0.5);
            border-bottom: 1px solid rgba(11, 132, 172, 0.5);
            padding: 9px 0;
            margin: 0 14px;
            overflow-x: hidden;
            overflow-y: auto;
            .el-tree {
              width: 100%;
              height: 100%;
              background-color: transparent;
              font-family: Adobe Heiti Std;
              font-weight: normal;
              font-size: 12px;
              color: #ffffff;
            }
            :deep(.el-tree-node__children) {
              > div > div > span {
                font-family: Adobe Heiti Std;
                font-weight: normal;
                font-size: 11px;
                color: rgba(255, 255, 255, 0.5);
              }
            }
            :deep(.el-tree-node__content) {
              background-color: inherit;
            }
          }
          .project-msg {
            width: 60%;
            height: 170px;
            background: url('@/assets/image/project_msg.png') no-repeat center;
            background-size: cover;
            padding: 6px 10px;
            .project-msg-item {
              margin: 2px;
              .label {
                width: 100px;
                font-family: Adobe Heiti Std;
                font-weight: normal;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
              }
              .text {
                width: 170px;
                line-height: 18px;
                font-family: Adobe Heiti Std;
                font-weight: normal;
                font-size: 12px;
                color: #ffffff;
              }
            }
          }
        }
      }
      .prople-box {
        width: 100%;
        margin-top: 10px;
        .people-total {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 0.06px;
          margin-top: 7px;
          margin-left: 20px;
          :deep(.people-total-item:first-child) {
            .num {
              color: #ff9601;
            }
          }
        }
        .people-chart {
          height: 140px;
          width: 90%;
          margin: 10px 10px;
        }
      }
      .video-box {
        margin-left: 20px;
      }
    }
    .menu-box {
      position: absolute;
      z-index: 22;
      top: 10px;
      right: -126px;
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
    flex: 1;
    padding-bottom: 90px;
    justify-content: flex-end;
    .content-center-box {
      .progress-wrap {
        align-items: center;
        margin: 10px 20px;
        .progress-item {
          align-items: center;
          .progress-item-left {
            align-items: center;
            .top {
              width: 106px;
              height: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              font-size: 14px;
              text-align: center;
              line-height: 16px;
              color: #19ffa1;
              > span {
                color: #0bf5f3;
                font-weight: 600;
                margin-left: 6px;
              }
              .num2 {
                color: #fff94a;
              }
              .num3 {
                color: #19ffa1;
              }
            }
            > img {
              width: 63px;
              height: 60px;
              margin-top: 13px;
              margin-bottom: 4px;
            }
            .bottom {
              width: 100px;
              height: 20px;
              align-items: center;
              justify-content: center;
              text-align: center;
              line-height: 20px;
              position: relative;
              .border-left {
                width: 10px;
                height: 26px;
                border: 1px solid #22e5f1;
                border-right: none;
                position: absolute;
                left: -8px;
              }
              .text {
                font-family: Microsoft YaHei;
                font-weight: bold;
                font-size: 13px;
                color: #ffffff;
              }
              .border-right {
                width: 10px;
                height: 26px;
                border: 1px solid #22e5f1;
                border-left: none;
                position: absolute;
                right: -8px;
              }
            }
            .bottom1 {
              background: linear-gradient(0deg, #0b84ac -50%, rgba(0, 0, 0, 0) 100%);
            }
            .bottom2 {
              background: linear-gradient(0deg, #eb8020 -50%, rgba(0, 0, 0, 0) 100%);
              .border-left {
                width: 10px;
                height: 26px;
                border: 1px solid #fb871d;
                border-right: none;
                position: absolute;
                left: -8px;
              }
              .border-right {
                width: 10px;
                height: 26px;
                border: 1px solid #fb871d;
                border-left: none;
                position: absolute;
                right: -8px;
              }
            }
            .bottom3 {
              background: linear-gradient(0deg, #0bf544 -50%, rgba(0, 0, 0, 0) 100%);
              .border-left {
                width: 10px;
                height: 26px;
                border: 1px solid #0bf544;
                border-right: none;
                position: absolute;
                left: -8px;
              }
              .border-right {
                width: 10px;
                height: 26px;
                border: 1px solid #0bf544;
                border-left: none;
                position: absolute;
                right: -8px;
              }
            }
          }
          .arrow-box {
            align-items: center;
            .arrow-item {
              width: 7px;
              height: 7px;
              border-top: 7px solid transparent;
              border-bottom: 7px solid transparent;
              border-left: 7px solid #0bf5f3;
              margin-right: 10px;
            }
          }
        }
        .progress-item:last-child {
          .arrow-box {
            display: none;
          }
        }
      }
    }
  }
  .content-right {
    width: 25%;
    height: 100%;
    padding-bottom: 95px;
    .content-right-box {
      height: 100%;
      overflow-y: auto;
      justify-content: space-around;
      .safety-statistics {
        width: 100%;
        .table-warp {
          margin: 10px;
          height: 173px;
          overflow: auto;
          background: rgba(0, 0, 0, 0.2);
        }
        :deep(.column2) {
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 21px;
          color: #ffff63;
        }
        :deep(.column3) {
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 21px;
          color: #0290ff;
        }
        :deep(.column4) {
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 21px;
          color: #19ffa1;
        }
      }
      .quality-statistics {
        width: 100%;
      }
      .energy-top {
        justify-content: space-around;
        height: 60px;
        align-items: center;
      }
      .energy-select {
        width: 268px;
        height: 26px;
        margin: 0 40px;
      }
      .chart-box {
        height: 160px;
        position: relative;
        .pie-box {
          width: 241px;
          height: 150px;
          position: relative;
          margin-top: 30px;
          .energy-container {
            width: 241px;
            height: 150px;
            background: url('@/assets/image/chart_bg.png') no-repeat center;
            background-size: 90%;
            .highcharts-3d-chart {
              width: 100%;
              height: 100%;
            }
          }
        }
        .legend-list {
          margin-left: 20px;
          .legend-item {
            width: 200px;
            margin-top: 8px;
            .label {
              display: inline-block;
              width: 100px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
              text-align: right;
            }
            .value {
              font-family: Microsoft YaHei;
              font-weight: bold;
              font-size: 14px;
              line-height: 16px;
              margin-left: 10px;
            }
            .unit {
              font-family: Microsoft YaHei;
              font-size: 10px;
              line-height: 19px;
            }
          }
          .legend-item:nth-child(1) {
            .value {
              color: #fff11e;
            }
            .unit {
              color: #fff11e;
            }
          }
          .legend-item:nth-child(2) {
            .value {
              color: #00e4ff;
            }
            .unit {
              color: #00e4ff;
            }
          }
          .legend-item:nth-child(3) {
            .value {
              color: #08ffd9;
            }
            .unit {
              color: #08ffd9;
            }
          }
          .legend-item:nth-child(4) {
            .value {
              color: #008bb4;
            }
            .unit {
              color: #008bb4;
            }
          }
          .legend-item:nth-child(5) {
            .value {
              color: #0290ff;
            }
            .unit {
              color: #0290ff;
            }
          }
        }
      }
    }
  }
}
</style>
