<template>
  <div id="carChart" class="car-pie-right"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  }
})
const fontSize = ref(14)
const pieChart = ref(null)
onMounted(() => {
  initpieChart()
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
const initpieChart = () => {
  const docElement = document.documentElement
  const screenWidth = docElement.clientWidth
  fontSize.value = screenWidth > 1920 ? 30 : 14
  pieChart.value = markRaw(echarts.init(document.getElementById(props.id)))
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: false
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '90%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside'
        },
        labelLine: {
          // 引导线配置
          show: true, // 首先确保引导线显示
          smooth: false, // 是否平滑曲线
          length: 6, // 第一段引导线长度
          length2: 10, // 第二段引导线长度，即靠近标签的部分
          lineStyle: {
            width: 1,
            type: 'dashed'
          }
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: props.data.map((item) => ({
          ...item, // 保留原有属性
          itemStyle: {
            // 添加itemStyle来指定颜色
            color: item.color
          },
          label: {
            show: true, // 确保标签显示
            formatter: function (params) {
              return `{b|${params.name}}\n{c|${params.value}}`
            },
            rich: {
              b: {
                fontSize: 14,
                color: '#fff',
                lineHeight: 20,
                align: 'center'
              },
              c: {
                fontSize: 14,
                color: item.color,
                fontWeight: 'bold',
                align: 'center'
              }
            },
            position: 'start'
          }
        }))
      }
    ]
  }
  option && pieChart.value.setOption(option)
  window.addEventListener('resize', handleResize)
}
const handleResize = () => {
  pieChart.value.resize()
}
</script>

<style lang="less" scoped></style>
