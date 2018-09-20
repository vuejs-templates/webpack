import SearchComp from './SearchComp'
import TableComp from './TableComp'
import Layout from './Layout'
const comArr = [SearchComp, TableComp, Layout]
export default {
  async install (vue, options) {
    comArr.forEach(item => {
      vue.use(item, (item.name && (options[item.name] || {})) || options)
    })
  }
}
