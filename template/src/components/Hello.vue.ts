import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import Component from 'vue-class-component'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import WithRender from './Hello.html?style=./Hello.css'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

@WithRender
@Component
export default class Hello extends Vue {
  msg = 'Welcome to Your Vue.js App'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}
