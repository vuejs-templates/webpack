module.exports = {
  {{#if_eq eslintConfig "standard"}}
  extends: 'stylelint-config-standard',
  {{/if_eq}}
  // add your custom rules here
  rules: {
  }
};
