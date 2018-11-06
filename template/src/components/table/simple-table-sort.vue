<template>
<td-draggable element="div" :list="$attrs.data" dragSelector="tbody" :options="{draggable: '.el-table__row'}">
	<simple-table v-on="$listeners" v-bind="$attrs" :head-data="handleHeadData">
		<template slot="index" slot-scope="scope">
        <div>
          <span class="mr-10">{{scope.row.index + 1}}</span>
          <span class="text-green ff-consolas right" v-if="scope.row.index !== scope.$index"
            :class="{'text-green': !getIsUp(scope), 'text-danger': getIsUp(scope)}"
          >
            {{getIsUp(scope) ? '↑' : '↓'}}
            {{Math.abs(scope.$index - scope.row.index)}}
          </span>
        </div>
      </template>
		<template :slot="prop" slot-scope="scope" v-for="(value, prop) in $scopedSlots">
        <slot :name="prop" v-bind="scope"></slot>
      </template>
	</simple-table>
</td-draggable>
</template>

<script>
import Vue from 'vue'
import vuePlugIn from '@/assets/packages'
import {
	deepCopy
} from '../../utils/utils'
Vue.use(vuePlugIn) // 2018-5-29 10:02:58 测试拖拽表格
export default {
	name: 'simple-table-sort', // 带排序功能的简单表格
	data() {
		this.$attrs.data.forEach((row, index) => {
			row.index = index
		})
		return {
			templateData: deepCopy(this.$attrs.data),
			handleHeadData: [{
				label: '序号',
				prop: 'index'
			}, ...this.$attrs['head-data']]
		}
	},
	props: {},
	created() {},
	mounted() {},
	watch: {},
	methods: {
		getIsUp(scope) {
			return scope.row.index > scope.$index
		},
		cancel() { // 对外提供一个数据复原的功能
			this.$attrs.data.splice(0, this.$attrs.data.length) // 清空数组
			this.$attrs.data.push(...this.templateData)
		}
	},
	computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>
