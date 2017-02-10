import router from 'router';
import routes from 'src/pages/bh-sample/routes';
import index from 'src/pages/bh-sample/bhSample';

router.init(routes);

router.start(index, '#app');
