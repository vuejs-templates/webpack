import router from 'router';
import routes from 'src/pages/world/routes';
import index from 'src/pages/world/world';

new Vue({
    el: document.documentElement
});

router.init(routes);

router.start(index, '#app');
