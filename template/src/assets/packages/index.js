import TdDraggable from './draggable/index' // 引入表格拖拽插件

const components = [
  TdDraggable
]

const install = function (Vue, options) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
