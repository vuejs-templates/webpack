import Vue from 'vue';

import App from 'app/App';
import router from 'app/plugins/routes.js';


// Instanciate the vue
const app = new Vue({
    el: '#app',
    router,
    template: '<App></App>',
    components: {App}
});

