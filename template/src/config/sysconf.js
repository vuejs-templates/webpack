export default {
    'skin': 'blue',
    'contextPath': (() => {
        return window.location.href.split('#!')[0];
    })()
};
