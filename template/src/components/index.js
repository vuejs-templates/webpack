import Vue from 'vue'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const requireComponent = require.context(
  '.', true, /\.vue$/
   //找到components文件夹下以.vue命名的文件
)
requireComponent.keys().forEach(fileName => {
  // fileName = fileName.split('/').pop();
  const componentConfig = requireComponent(fileName)

  let componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  );
  let trueName = componentName.split('/').pop();
  Vue.component(trueName, componentConfig.default || componentConfig);
});
