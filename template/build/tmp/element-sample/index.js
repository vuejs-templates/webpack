import router from 'router';
import routes from 'src/pages/element-sample/routes';
import index from 'src/pages/element-sample/elementSample';

router.init(routes);

router.start(index, '#app');
