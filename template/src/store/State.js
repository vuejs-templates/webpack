export default {
  layoutConfig: {
    colNum: 120,
    rowHeight: 10,
    margin: [0, 0]
  },
  currentProtal: localStorage.getItem('currentPortal') ? JSON.parse(localStorage.getItem('currentPortal')) : {}
}
