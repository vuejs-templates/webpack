module.exports = {
  {{#if_eq eslintConfig "standard"}}
  extends: 'stylelint-config-standard',
  {{/if_eq}}
  {{#if_eq eslintConfig "recommended"}}
  extends: 'stylelint-config-recommended',
  {{/if_eq}}
  {{#if_eq eslintConfig "wikimedia"}}
  extends: 'stylelint-config-wikimedia',
  {{/if_eq}}
  // add your custom rules here
  rules: {
  }
};
