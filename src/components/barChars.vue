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
  }
})
const barChart = ref(null)
const barChartRef = ref(null)
const barWidth = ref(15)
const fontSize = ref(14)
const barMargin = ref(20)
onMounted(() => {
  initbarChart()
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
// 初始化3D柱状图
const initbarChart = () => {
  const docElement = document.documentElement
  const screenWidth = docElement.clientWidth
  barWidth.value = screenWidth > 1920 ? 30 : 15
  fontSize.value = screenWidth > 1920 ? 30 : 14
  barMargin.value = screenWidth > 1920 ? 40 : 20
  barChartRef.value = document.getElementById(props.id)
  barChart.value = markRaw(echarts.init(barChartRef.value))
  const markPointData = []
  props.yAxisData.forEach((v, i) => {
    markPointData.push({
      xAxis: props.xAxisData[i],
      yAxis: v,
      symbol: 'rect',
      symbolSize: computedBarHeight,
      symbolOffset: ['-50%', '50%'],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(4, 172, 221,1)'
            },
            {
              offset: 1,
              color: 'rgba(4, 172, 221,0)'
            }
          ],
          global: false
        }
      }
    })
    markPointData.push({
      xAxis: props.xAxisData[i],
      yAxis: v,
      symbol: 'rect',
      symbolSize: computedBarHeight,
      symbolOffset: ['50%', '50%'],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(10, 194, 248,1)'
            },
            {
              offset: 1,
              color: 'rgba(10, 194, 248,0)'
            }
          ],
          global: false
        }
      }
    })
    markPointData.push({
      xAxis: props.xAxisData[i],
      yAxis: v,
      symbol: 'path://M 0 5 L 15 10 L 30 5 L 15 0 L 0 5 Z',
      symbolSize: [barWidth.value, barWidth.value * 0.5],
      itemStyle: {
        color: 'rgba(2, 189, 229,1)'
      }
    })
  })
  const option = {
    title: {
      text: ''
    },
    grid: {
      top: barMargin.value,
      bottom: barMargin.value
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        fontSize: fontSize.value,
        color: '#fff'
      },
      formatter(params) {
        return `<b>${params.name}</b>: ${params.value}`
      }
    },
    xAxis: {
      data: props.xAxisData,
      axisLabel: {
        fontSize: fontSize.value,
        color: 'rgba(255, 255, 255, 0.75)',
        interval: 0
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      axisLabel: {
        fontSize: fontSize.value,
        color: 'rgba(255, 255, 255, 0.5)'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: props.yAxisData,
        barWidth: barWidth.value,
        markPoint: {
          data: markPointData,
          silent: true
        },
        z: 3,
        itemStyle: {
          color: 'rgba(0, 0, 0,0.1)'
        }
      }
    ]
  }
  option && barChart.value.setOption(option)
  window.addEventListener('resize', handleResize)
}
const handleResize = () => {
  barChart.value.resize()
}
const computedBarHeight = (value, params) => {
  const zeroHeight = barChart.value.convertToPixel({ yAxisIndex: 0 }, 0)
  const height = barChart.value.convertToPixel({ yAxisIndex: 0 }, params.data.yAxis)
  return [barWidth.value / 2, zeroHeight - height]
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
