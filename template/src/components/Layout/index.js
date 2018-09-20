import Tabs from './Tabs'
import Header from './Header'
import Menu from './Menu'
import TabContent from './TabContent'
import Crumb from './Crumb'

const options = {
  Tabs,
  Header,
  Menu,
  TabContent,
  Crumb
}
options.install = (Vue) => {
  for (let component in options) {
    const componentInstaller = options[component]
    if (componentInstaller && component !== 'install') {
      Vue.use(componentInstaller)
    }
  }
  Vue.component('Layout', () => import('./Layout.vue'))
}
export default options
