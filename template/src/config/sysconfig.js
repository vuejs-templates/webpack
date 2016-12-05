module.exports = {
    'skin': 'blue',
    'lang': 'cn',
    'contextPath': (() => {
        return window.location.href.split('#!')[0];
    })()
};
