import router from 'router';
import routes from './routes';
import Home from './pages/home/home';

const title = 'Hello';

new Vue({
    el: document.documentElement,
    data () {
        return {
            winTitle: title
        };
    }
});

router.init(routes);

router.start(Home, '#app');
