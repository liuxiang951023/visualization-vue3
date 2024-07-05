module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 100, // 根据基础字体大小计算rem值，这里假设html的font-size为100px
      propList: ['*'], // 转换所有属性的px值
      unitPrecision: 5, // 允许小数点后最大精确度
      selectorBlackList: [], // 忽略的选择器列表，使用正则表达式
      replace: true, // 是否替换原始值
      mediaQuery: false, // 不转换媒体查询中的px
      minPixelValue: 0, // 设置最小的转换数值，低于这个值的px不转换
      exclude: /node_modules/i // 排除某些文件夹下的样式
    })
  ]
}
