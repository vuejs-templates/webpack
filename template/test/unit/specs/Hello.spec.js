import { mount } from 'vue-test'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Hello from 'src/components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const el = mount(Hello){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    expect(el.find('h1').text())
      .to.equal('Welcome to Your Vue.js App'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
