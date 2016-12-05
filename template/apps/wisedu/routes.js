export default {
    '/': {
        component: (resolve) => {
            require(['./pages/home/home'], resolve);
        }
    }
};
