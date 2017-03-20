import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Hello from '@/components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#vuex}}
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
Vue.use(Vuex){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
describe('Hello.vue', () => {
  {{#vuex}}
  let getters{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  let store{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  beforeEach(() => {
    getters = {
      subWelcomeMsg: () => 'Essential Links'
    }
    store = new Vuex.Store({
      getters
    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  {{/vuex}}
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    {{#if vuex}}
    const vm = new Constructor({ store }).$mount(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    {{else}}
    const vm = new Constructor().$mount(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    {{/if}}
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    expect(vm.$el.querySelector('.hello h2').textContent)
      .to.equal('Essential Links'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
