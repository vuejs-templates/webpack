import menus from './modules/menus';

Vue.use(Vuex);
Vue.config.debug = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        menus
    },
    strict: debug
});
