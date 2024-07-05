<template>
  <div :id="id" class="chart-container"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  xAxisData: {
    type: Array,
    default: () => []
  },
  yAxisData: {
    type: Array,
    default: () => []
  },
  legend: {
    type: Array,
    default: () => []
  }
})
const fontSize = ref(14)
const lineChart = ref(null)
onMounted(() => {
  initLineChart()
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
const initLineChart = () => {
  const docElement = document.documentElement
  const screenWidth = docElement.clientWidth
  const lineMargin = ref(20)
  fontSize.value = screenWidth > 1920 ? 30 : 14
  lineMargin.value = screenWidth > 1920 ? 40 : 20
  lineChart.value = markRaw(echarts.init(document.getElementById(props.id)))
  const option = {
    grid: {
      top: lineMargin.value + 10,
      bottom: lineMargin.value
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        fontSize: fontSize.value,
        color: '#fff'
      }
    },
    legend: {
      icon: 'circle',
      right: lineMargin.value + 20,
      textStyle: {
        color: '#fff'
      },
      data: props.legend
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xAxisData,
      axisLabel: {
        fontSize: fontSize.value,
        color: 'rgba(255, 255, 255, 1)',
        interval: 0
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: fontSize.value,
        color: 'rgba(255, 255, 255, 1)'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: props.yAxisData
  }
  option && lineChart.value.setOption(option)
  window.addEventListener('resize', handleResize)
}
const handleResize = () => {
  lineChart.value.resize()
}
</script>

<style lang="less" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    height: 100%;
    .canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
