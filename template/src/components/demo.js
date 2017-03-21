/**
 *
 * @authors yangce
 * @date    2017/3/20
 * @version $
 */
let myPublic = {};
myPublic.install = function (_vue, options) {
  let Vue = _vue;
  Vue.mixin({
    create:{
      btnClick:{
        
      }
    }
  })
};

module.exports = myPublic;
