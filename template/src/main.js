import App from './App';
import routes from 'config/routes';
import router from 'src/router';

var resetWinSize = () => {
    BH_UTILS.setContentMinHeight($('main > article'), 'noHeader', 44);
    $('body').niceScroll();
};

$(window).resize(resetWinSize);

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
