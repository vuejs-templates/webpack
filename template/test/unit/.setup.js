var Vue = require('vue');
Vue.config.productionTip = false

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM('', {
  userAgent: 'node.js',
});

global.window = dom.window;

Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});

global.Element = window.Element;
