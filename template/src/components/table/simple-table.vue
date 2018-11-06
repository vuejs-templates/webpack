<template>
<el-table :data="data" v-on="$listeners" v-bind="$attrs" class="simple-table">
	<el-table-column v-bind="head.props" v-on="head.on" :key="index" v-for="(head, index) in headData" :label="head.label" :prop="head.prop" :width="head.width">
		<template slot-scope="scope">
        <template v-if="!$scopedSlots[head.prop]" class="cell-content">{{scope.row[head.prop]}}</template>
		<slot v-else :name="head.prop" v-bind="scope"></slot>
		</template>
	</el-table-column>
</el-table>
</template>

<script>
export default {
	name: 'simple-table', // 封装数组驱动完成基本功能的表格
	data() {
		return {}
	},
	props: {
		data: Array,
		headData: Array
	},
	created() {
		// this.$options.components.simpleTable = simpleTable
	},
	mounted() {
		// console.log(this.$scopedSlots)
	},
	watch: {},
	methods: {},
	computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.simple-table
  .cell
    font-size 13px
  .el-table th>.cell
    font-size 14px
  .el-table__footer-wrapper tbody td
    background-color oldlace
</style>
