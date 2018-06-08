# form-unit 使用说明
## 初始化：
- 模板部分
```html
<template>
  <form-unit
  :name="demo1" 
  :formModels="yourFormModel"
  @onInit="formUnitInit"
  ></form-unit>
</template>
```
- js部分
```js
import { formUnit } from 'vformer'
/** formUnit 包含方法：
* validateAll() 验证所有表单项
*   return Promise, response: true|self
* getError() 获取当前报错的表单返回值对象
* getErrorMsg() 获取当前表单报错信息（第一条）
* getItem(name) 获取指定的表单对象 eg: getItem("userName')
* [emit] onInit 在formUnit完成初始化后emit，将自身反射给父组件
* [emit] formEvent 表单被手动修改后触发该事件
* [emit] formChange 表单变更后触发该事件
* */
export default {
  name: 'your-component-name',
  data(){
    return {
      // 表单模型，用来初始化formUnit
      yourFormModel:{},
       /* 建立一个本地索引，用来管理所有formUnit
       如果只有一个formUnit,则可以省去这个对象
        * */
      formCOllection: {}
    }
  },
  components: {formUnit},
  methods: {
    formUnitInit (v) {
     /* @params: v 指向了formUnit 内部作用域
     *  因此v 可以访问到formUnit内部方法包括：
     *  name, 
     * */
     this.formCOllection[v.name] = v
    }
  }
}
```
