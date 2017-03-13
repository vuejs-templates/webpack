import Hello from '@/component/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
const Hello2 = resolve => require(['@/component/Hello'], resolve)
const NotFound = {template: '<h1>404!</h1>'}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
const routes = [
    {
      path: '/',
      name: 'Hello',
      component: Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    },
    {
      path: '/hello2',
      name: 'Hello2',
      component: Hello2{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    },
    {
        path: '/404',
        name: '404',
        component: NotFound
    },
    {
        path: '*',
        redirect: '/404'
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
]{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default routes{{#if_eq lintConfig "airbnb"}};{{/if_eq}}