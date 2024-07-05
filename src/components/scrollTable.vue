<template>
  <el-table ref="tableRef" :data="tableData" height="100%" size="small" class="table-scroll">
    <el-table-column
      v-for="(column, index) in columns"
      :key="index"
      :width="index === 0 ? columeWidth : null"
      :prop="column.prop"
      :label="column.label"
    >
      <template #default="scope">
        <span :class="column.dynamicClass">
          {{ scope.row[column.prop] }}
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['pageChange'])
const tableScroll = ref(true)
const scrollTimer = ref(null)
const columeWidth = ref(180)
const tableRef = ref(null)
onMounted(() => {
  const docElement = document.documentElement
  const screenWidth = docElement.clientWidth
  columeWidth.value = screenWidth > 1920 ? 340 : 180
  startAutoScroll()
})
onUnmounted(() => {
  stopAutoScroll()
})
// 自动滚动
const startAutoScroll = () => {
  const tableBodyWrapper =
    tableRef.value.$refs.bodyWrapper.getElementsByClassName('el-scrollbar__wrap')[0]
  tableBodyWrapper.addEventListener('mouseover', () => {
    tableScroll.value = false
  })
  tableBodyWrapper.addEventListener('mouseout', () => {
    tableScroll.value = true
  })
  scrollTimer.value = setInterval(() => {
    if (tableScroll.value) {
      tableBodyWrapper.scrollTop++
      if (
        tableBodyWrapper.clientHeight + tableBodyWrapper.scrollTop ===
        tableBodyWrapper.scrollHeight
      ) {
        emit('pageChange')
      }
    }
  }, 100)
}
// 清楚定时器
const stopAutoScroll = () => {
  if (scrollTimer.value) {
    clearInterval(scrollTimer.value)
  }
}
</script>

<style lang="less" scoped></style>
