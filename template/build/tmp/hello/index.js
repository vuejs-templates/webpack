import router from 'router';
import routes from 'src/pages/hello/routes';
import index from 'src/pages/hello/hello';

new Vue({
    el: document.documentElement
});

router.init(routes);

router.start(index, '#app');
