import router from 'router';
import routes from 'src/pages/world/routes';
import index from 'src/pages/world/world';

router.init(routes);

router.start(index, '#app');
