module.exports = {
  presets: [
    ["@babel/preset-env", {
      "modules": false
    }],
    ["@babel/preset-stage-2", {
      decoratorsLegacy: true
    }]
],
  plugins: ["transform-vue-jsx", "@babel/plugin-transform-runtime"]{{#if_or unit e2e}},
  env: {
    test: {
      presets: [
        "@babel/preset-env",
        ["@babel/preset-stage-2", {
          decoratorsLegacy: true
        }]
      ]{{#if_eq runner "karma"}},
      plugins: [
        "transform-vue-jsx",
        "istanbul"
      ]{{/if_eq}}{{#if_eq runner "jest"}},
      plugins: [
        "transform-vue-jsx",
        "@babel/plugin-transform-modules-commonjs",
        "dynamic-import-node"
      ]{{/if_eq}}
    }
  }{{/if_or}}
}
