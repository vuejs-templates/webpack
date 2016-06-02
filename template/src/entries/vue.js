/**
 * This entry point is used to ensure that we have a single instance of Vue.
 * This may be because we need to use Vue.js direct API. Initialise other
 * Vue plugins here, to ensure that the single Vue instance is bootloaded.
 *
 * This also allows us to set Vue to debug mode once.
 */
import Vue from 'vue';
// import VueResource from 'vue-resource';

// Set to debug mode when not in production
Vue.config.debug = process.env.NODE_ENV !== 'production';

// Install Vue plugins
// Vue.use(VueResource);

export default Vue;
