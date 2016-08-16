module.exports = {
    props: ['contextPath'],
    methods: {
        routeLink (url) {
            return this.contextPath + url;
        }
    },
    activate (done) {
        this.$dispatch('widget-active', this.routes);
        done();
    },
    route: {
        activate: function (transition) {
            // console.log('hello activate!', transition);
            this.contextPath = transition.to.path;
            this.$dispatch('widget-active', this.routes);
            transition.next();
        }
    }
};
