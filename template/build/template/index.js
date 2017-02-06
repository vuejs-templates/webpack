import router from 'router';
import routes from 'src/pages/[PAGE_NAME]/routes';
import index from 'src/pages/[PAGE_NAME]/[ENTRY_NAME]';

router.init(routes);

router.start(index, '#app');
