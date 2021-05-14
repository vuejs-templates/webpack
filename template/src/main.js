// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
{{#vuex}}
import store from './store';
{{/vuex}}

{{#router}}
import VueRouter from 'vue-router';
{{/router}}
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
{{#validate}}
/* 校验器相关 */
import VeeValidate from 'vee-validate'
import zh_CN from '@/public/zh_CN'
Validator.localize(Validator.locale, {
  messages: zh_CN.messages,
  attributes: {
    required: '',
    email: ''
  }
})
Vue.use(VeeValidate)
{{/validate}}
let instance = null;

function render(props = {}) {
    const { container, routerBase } = props;
    {{#router}}
    const router = new VueRouter({
        base: window.__POWERED_BY_QIANKUN__ ? routerBase : '/',
        mode: 'hash',
        routes,
    });
    {{/router}}
    instance = new Vue({
        {{#router}}
        router,
        {{/router}}
        {{#vuex}}
        store,
        {{/vuex}}
        render: h => h(App),
    }).$mount(container ? container.querySelector('#app') : '#app');
}

function handleProps(props) {
    Vue.prototype.mainApp = {};
    if (props.registerEvent) {
        Vue.prototype.mainApp.registerEvent = function (param) {
            // eslint-disable-next-line
            props.registerEvent.call(props, param);
        };
    }
    if (props.fns) {
        Object.keys(props.fns).forEach(fn => {
            if (Object.prototype.toString.call(props.fns[fn]) !== '[object Function]') {
                console.error(new Error(`${fn} is not a function`));
            } else if (Vue.prototype.mainApp[fn]) {
                console.error(new Error(`${fn} has registered`));
            } else {
                Vue.prototype.mainApp[fn] = props.fns[fn];
            }
        });
    }
    if (props.data) {
        // handle mainApp data
    }
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('[micro-app] bootstraped');
}

export async function mount(props) {
    handleProps(props);
    render(props);
}

export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
}
