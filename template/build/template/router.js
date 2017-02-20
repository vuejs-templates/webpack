/**
 * vue路由辅助类，
 * 支持在运行时动态加入子级路由（基于 vue1.0 / vue-router1.0）
 */
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

module.exports = {
    init: _init,
    start: _start,
    getRoutes: _getRoutes,
    setRoutes: _setRoutes,
    addSubRouter: _addSubRouter
};
