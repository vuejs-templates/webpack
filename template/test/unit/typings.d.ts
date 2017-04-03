interface WebpackRequire extends NodeRequire {
  context(file: string, flag?: boolean, exp?: RegExp): any{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}
