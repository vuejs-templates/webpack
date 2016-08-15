export default {
    '/': {
        component: (resolve) => {
            require(['pages/home/home'], resolve);
        }
    },
    '/apps/:id': {
        component: (resolve) => {
            require(['pages/plugin/plugin'], resolve);
        }
    },
    '/hello': {
        component: (resolve) => {
            require(['apps/hello/hello'], resolve);
        }
    }
};
