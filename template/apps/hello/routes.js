export default {
    '/': {
        component: (resolve) => {
            require(['./pages/first/first'], resolve);
        }
    }
};
