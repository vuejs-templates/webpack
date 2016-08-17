module.exports = {
    'skin': 'blue',
    'contextPath': (() => {
        return window.location.href.split('#!')[0];
    })()
};
