// A custom Nightwatch assertion.
// the name of the method is the filename.
// can be used in tests like this:
//
//   browser.assert.elementCount(selector, count)
//
// for how to write custom assertions see
// http://nightwatchjs.org/guide#writing-custom-assertions
exports.assertion = function (selector, count) {
  this.message = 'Testing if element <' + selector + '> has count: ' + count{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  this.expected = count{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  this.pass = function (val) {
    return val === this.expected{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }
  this.value = function (res) {
    return res.value{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }
  this.command = function (cb) {
    var self = this{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    return this.api.execute(function (selector) {
      return document.querySelectorAll(selector).length{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }, [selector], function (res) {
      cb.call(self, res){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }
}
