<template>
<!-- 该组件仅做demo展示，具体视场景进行封装改良 -->
<el-tabs v-model="activeTab" type="card">
	<el-tab-pane label="条件查询" name="1">
		<pagoda-form-group :form-options="formOptions" v-model="formData" inline>
			<el-button type="primary" @click="tableFilterData = Object.assign({}, formData)">查询</el-button>
		</pagoda-form-group>
		<pagoda-table :request="request" selection-column="single" :table-filter-data="tableFilterData" @selection-change="handleSelectChange" ref="selectGoodsTable">
		</pagoda-table>
		<div class="fz12 text-gray">是否多选视场景而定</div>
		<pagoda-row-btns class="text-center mt-20" :btns="rowBtnsTmpl" :visibles="btnVisibles"></pagoda-row-btns>
	</el-tab-pane>
	<el-tab-pane label="分组筛选" name="2">
		<advanced-search-groups @confirm="$emit('confirm', $event)" @cancel="$emit('cancel')"></advanced-search-groups>
	</el-tab-pane>
</el-tabs>
</template>

<script>
export default {
	data() {
		return {
			activeTab: '1',
			formData: {},
			tableFilterData: {},
			selection: null,
			formOptions: [{
				label: '商品名称',
				key: 'key',
				type: 'input'
      }],
			rowBtnsTmpl: {
				confirm: {
					type: 'primary',
					text: '确定',
					onClick: () => {
						// console.log(this.selection)
						if (!this.selection || this.selection.length === 0) {
							this.$message.error('请选择')
							return
						}
						this.$emit('confirm', this.selection.map(el => el.code))
					}
				},
				cancel: {
					text: '取消',
					onClick: () => {
						this.$emit('cancel')
					}
				}
			},
			btnVisibles: ['confirm', 'cancel']
		}
	},
	props: {},
	created() {},
	mounted() {

	},
	watch: {},
	methods: {
		request(tableFilterData) {
			return new Promise(resolve => {
				this.AjaxService.get('order/tb_req_orderService/goods/list?resourceTagCode=purchaseGoods&key=' + (tableFilterData.key || ''))
					.then(res => {
						console.log(res)
						resolve({
							head: [{
								label: '商品代码',
								prop: 'code'
              }, {
								label: '商品名称',
								prop: 'name'
              }],
							data: res.data.slice(0, 10)
						})
					})
			})
		},
		handleSelectChange(selection) {
			console.log(selection)
			this.selection = selection
		}
	},
	computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>
