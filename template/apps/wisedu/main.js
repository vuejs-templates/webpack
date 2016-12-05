import App from 'App';
import router from 'router';
import routes from './routes';

const title = 'wisedu';

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
