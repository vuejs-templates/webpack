import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Hello from 'src/components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><hello></hello></div>',
      components: { Hello }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }).$mount(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    expect(vm.$el.querySelector('.hello h1').textContent).to.contain('Hello World!'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
