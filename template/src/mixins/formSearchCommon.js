import formGroupBtns from "@/views/common/form-group-btns";
import {formLabelWidth} from "@/utils/default-setting";
// 表单筛选默认数据
export default {
	data() {
		return {
			formLabelWidth
		};
	},
	components: {
		formGroupBtns // 筛选组件
	},
	methods: {
		/* 按钮组业务逻辑 start */
		// 有些操作不能在编辑状态下执行，需要先提示用户保存再给提交
		handleOperate(cb, ids, tips) {
			if (ids.length === 0) {
				this.$alert(`请至少选择一条要进行操作的数据`);
				return;
			}
			this.$confirm(tips).then(() => {
				cb();
			});
		}
		/* 按钮组业务逻辑 end */
	}
};
