import simpleTable from './simple-table'
import simpleTableSort from './simple-table-sort'

let components = {
  simpleTable,
  simpleTableSort
}

const install = Vue => {
  for (const component of Object.values(components)) {
    Vue.component(component.name, component)
  }
}
export default {
  install
}
