// vue-template-loader (@see https://github.com/ktsn/vue-template-loader)
/* tslint:disable:interface-name no-duplicate-imports */
declare module '*.html' {
  import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  interface WithRender {
    <V extends Vue>(options: Vue.ComponentOptions<V>): Vue.ComponentOptions<V>{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
    <V extends typeof Vue>(component: V): V{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  }
  const withRender: WithRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  export = withRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}

declare module '*.scss' {
  import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  interface WithRender {
    <V extends Vue>(options: Vue.ComponentOptions<V>): Vue.ComponentOptions<V>{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
    <V extends typeof Vue>(component: V): V{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  }
  const withRender: WithRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  export = withRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}

declare module '*.css' {
  import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  interface WithRender {
    <V extends Vue>(options: Vue.ComponentOptions<V>): Vue.ComponentOptions<V>{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
    <V extends typeof Vue>(component: V): V{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  }
  const withRender: WithRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  export = withRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}
