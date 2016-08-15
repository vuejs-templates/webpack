import Vue from 'vue';

var VueRouter = require('vue-router');
Vue.use(VueRouter);

window.Vue = Vue;

var router = new VueRouter();

var _routes = null;

var _setRoutes = (routes) => {
    router.map(routes);
    _routes = routes;
};

var _getRoutes = () => {
    return _routes;
};

var _addSubRouter = (path, subRoutes, segments) => {
    router._addRoute(path, subRoutes, segments);
};

var _init = (routes, callbacks) => {
    _setRoutes(routes);

    if (callbacks) {
        callbacks.beforeEach && router.beforeEach(callbacks.beforeEach);
        callbacks.afterEach && router.afterEach(callbacks.afterEach);
    }
};

var _start = (comp, selector) => {
    router.start(comp, selector);
};

export default {
    init: _init,
    start: _start,
    getRoutes: _getRoutes,
    setRoutes: _setRoutes,
    addSubRouter: _addSubRouter
};
