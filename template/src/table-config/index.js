let viewConfig = {};

(r => r.keys().map(sourcePath => {
  const viewName = sourcePath.replace('./', '').replace('.json', '')

  viewConfig[viewName] = r(sourcePath)
}))(require.context('./', false, /\.json$/))

export default viewConfig
