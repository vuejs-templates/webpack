import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import Component from 'vue-class-component'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import WithRender from './App.html?style=./App.css'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
{{#unless router}}

import Hello from './components/Hello.vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
{{/unless}}

@WithRender
@Component{{#unless router}}({
  components: { Hello }{{#if_eq tslintConfig "airbnb"}},{{/if_eq}}
}){{/unless}}
export default class App extends Vue {
  name = 'app'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}
