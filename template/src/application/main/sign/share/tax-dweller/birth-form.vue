<!-- 这是一个示例文件
  展示如何创建一个给 check-block-item 组件使用的 slot 组件
  1、 引入 health_custItem_mixin  必须
  2、 $ioptions 为 mixin 使用的变量名，请不要直接修改！！！
  3、 该组件内部使用的组件暂只支持 v-mode 绑定方式
 -->
<template>
  <div>
    <div v-for="(item, name, key) in $ioptions" :key="key">
      <root-item>
        <template slot="val">
        	<span>{{item.label}}</span>
          <root-input
            :style="'margin-left:20px;width:90%;'"
            @formChange="onChange"
            :name="'0'+name"
            :rules="item.rules"
            v-model="item.value">
            </root-input>
        </template>
      </root-item>

      <!--这是二级列表 -->
<!--       <template v-show="item.yesorno==='yes'">
        <div v-for="(subitem, subname, subkey) in item.child" :key="subkey" style="padding-left:10px">
          <template v-if="subitem.type === 'input'">
            <root-item>
              <template slot="val">
                <root-input
                :style="'border:1px solid #000;margin: 0 20px;width:90%'"
                @formChange="onChange"
                :name="'0'+subname"
                :rules="subitem.rules"
                v-model="subitem.value">
                </root-input>
              </template>
            </root-item>
          </template>
        </div>
      </template> -->
    </div>
  </div>
</template>
<script>

import rootItem from "@/components/root-items/root-base"
import rootInput from "@/components/root-items/root-input"
import yesornoItem from "@/components/item/yesorno-item"
import healthItemMix from "@/components/mixin/health_custItem_mixin"

export default {
  name: "birth",
  components: {
    rootItem,
    rootInput,
    yesornoItem
  },
  mixins: [healthItemMix]
}
</script>
