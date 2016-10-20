import Vue from 'vue';
import App from 'App';
import Vuex from 'vuex';
import router from 'router';
import routes from './config/routes';

Vue.use(Vuex);

const title = 'Hello';

var resetWinSize = () => {
    BH_UTILS.setContentMinHeight($('main'), 'noHeader', 44);
    $('body').niceScroll();
};

$(window).resize(resetWinSize);

new Vue({
    el: document.documentElement,
    data () {
        return {
            winTitle: title
        };
    }
});

router.init(routes, {
    beforeEach (transition) {
        $.bhPaperPileDialog.hide();
        $('.jqx-window').each(function () {
            $(this).jqxWindow('destroy');
        });
        transition.next();
    },
    afterEach (transition) {
        resetWinSize();
    }
});

router.start(App, '#app');
