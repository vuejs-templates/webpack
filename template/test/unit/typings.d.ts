interface WebpackRequire extends NodeRequire {
  context(file: string, flag?: boolean, exp?: RegExp): any;
}
