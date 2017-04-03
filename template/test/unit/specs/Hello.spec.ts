import Vue from 'vue'{{#if_eq eslintConfig 'airbnb'}};{{/if_eq}}

import { expect } from 'chai'{{#if_eq eslintConfig 'airbnb'}};{{/if_eq}}

import Hello from '@/components/Hello.vue'{{#if_eq eslintConfig 'airbnb'}};{{/if_eq}}

describe('Hello component', () => {
  it('should render correct contents', () => {
    const hello = new Hello(){{#if_eq eslintConfig 'airbnb'}};{{/if_eq}}
    const vm = hello.$mount(){{#if_eq eslintConfig 'airbnb'}};{{/if_eq}}
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App'){{#if_eq eslintConfig 'airbnb'}};{{/if_eq}}
  }){{#if_eq eslintConfig 'airbnb'}};{{/if_eq}}
}){{#if_eq eslintConfig 'airbnb'}};{{/if_eq}}
