<template>
<div>
  <el-form :model="formData" :label-position="labelPosition" ref="serachForm" :label-width="labelWidth">
    <el-row :type="flexSet.type" :justify="flexSet.justify" :gutter="gutter" v-for="(sy, i) in Math.ceil(config.length / columns)" :key="i">
      <el-col :span="colsm" v-for="(item,index) in config.slice(columns*i, columns*(i+1))" :key="index" :style="{minWidth: colMinWidth}">
        <el-form-item :label='item.label' v-if="item.type === 'input'" :prop="item.modelname">
          <el-input
            :placeholder='item.placeholder'
            :clearable="item.clearable ? item.clearable : false"
            :size="size"
            :disabled="item.disabled ? true : false"
            v-model="formData[item.modelname]"
            :suffix-icon="item['suffixIcon'] ? item['suffixIcon'] : null"
            :prefix-icon="item['prefixIcon'] ? item['prefixIcon'] : null"
          />
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'inputNumber'" :prop="item.modelname">
          <el-input-number
            :min="item.min ? item.min : 0"
            :max="item.max ? item.max : 10000000000000"
            :step="item.step ? item.step : 1"
            :controls-position="item.position ? item.position : 'right'"
            :precision="item.precision ? item.precision : 0"
            :clearable="item.clearable ? item.clearable : false"
            :size="size"
            class="widthStyle"
            :disabled="item.disabled ? true : false"
            v-model="formData[item.modelname]"
          />
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'textarea'" :prop="item.modelname">
          <el-input
            :type="item.type"
            :placeholder='item.placeholder'
            :size="size"
            :disabled="item.disabled ? true : false"
            v-model="formData[item.modelname]"
            :autosize="item.autosize ? item.autosize : true"
          />
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'composite'" :prop="item.modelname">
          <el-input
            :placeholder='item.placeholder'
            :clearable="item.clearable ? item.clearable : false"
            :size="size"
            :disabled="item.disabled ? true : false"
            v-model="formData[item.modelname]"
            :suffix-icon="item['suffixIcon'] ? item['suffixIcon'] : null"
            :prefix-icon="item['prefixIcon'] ? item['prefixIcon'] : null"
          >
            <template v-if="item.slotText" :slot="item.slotText.positionType">{{item.slotText.text}}</template>
            <el-button v-if="item.slotButton" :slot="item.slotButton.positionType">{{item.slotButton.text}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'select'" :prop="item.modelname">
          <el-select
            v-model="formData[item.modelname]"
            class="widthStyle"
            :size="size"
            :clearable="item.clearable ? item.clearable : false"
            :multiple="item.multiple ? item.multiple : false"
            :filterable="item.filterable ? item.filterable : false"
            :disabled="item.disabled ? item.disabled : false"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="(op, index) in item.options"
              :key="index"
              :disabled="op.disabled ? op.disabled : false"
              :label="op.label"
              :value="op.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'cascader'" :prop="item.modelname">
          <el-cascader
            class="widthStyle"
            :clearable="item.clearable ? item.clearable : false"
            :filterable="item.filterable ? item.filterable : false"
            :change-on-select="item.changeOnSelect ? item.changeOnSelect : false"
            :expand-trigger="item.expandTrigger ? item.expandTrigger : 'click'"
            :size="size"
            :options="item.options"
            v-model="formData[item.modelname]"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'activeCascader'" :prop="item.modelname">
          <el-cascader
            class="widthStyle"
            :clearable="item.clearable ? item.clearable : false"
            :expand-trigger="item.expandTrigger ? item.expandTrigger : 'click'"
            @active-item-change="item.handleItemChange"
            :props="item.cascaderProps"
            :size="size"
            :options="item.options"
            v-model="formData[item.modelname]"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'radioGroup'" :prop="item.modelname">
          <el-radio-group v-model="formData[item.modelname]">
            <el-radio-button v-for="(j, index) in item.options" :key="index"
              :label="j.value"
              :size="size"
              :disabled="j.disabled ? true : false"
              v-if="item.radioButton"
            >
              {{j.label}}
            </el-radio-button>
            <el-radio v-for="(j, index) in item.options" :key="index"
              :label="j.value"
              :size="size"
              :disabled="j.disabled ? true : false"
              v-if="!item.radioButton"
            >
              {{j.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'checkbox'" :prop="item.modelname">
          <el-checkbox
            :size="size"
            :disabled="item.disabled ? true : false"
            v-model="formData[item.modelname]"
          >
            {{item.CheckboxText}}
          </el-checkbox>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'checkboxGroup'" :prop="item.modelname">
          <el-checkbox-group v-model="formData[item.modelname]" :min="item.min ? item.min : 0" :max="item.max ? item.max : 100000">
            <el-checkbox v-for="(j, index) in item.options" :key="index"
              :label="j.value"
              :size="size"
              :disabled="j.disabled ? true : false"
              v-if="!item.checkboxButton"
            >
              {{j.label}}
            </el-checkbox>
            <el-checkbox-button v-for="(j, index) in item.options" :key="index"
              :label="j.value"
              :size="size"
              :disabled="j.disabled ? true : false"
              v-if="item.checkboxButton"
            >
              {{j.label}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'baseDatePicker'" :prop="item.modelname">
          <el-date-picker
            class="widthStyle"
            v-model="formData[item.modelname]"
            :align="item.align ? item.align : 'left'"
            :type="item.pickerType ? item.pickerType : 'date'"
            :placeholder="item.placeholder"
            :picker-options="item.pickerOptions ? item.pickerOptions : null"
            :default-value="item.defaultValue ? item.defaultValue : ''"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'otherDatePicker'" :prop="item.modelname">
          <el-date-picker
            class="widthStyle"
            v-model="formData[item.modelname]"
            :align="item.align ? item.align : 'left'"
            :type="item.pickerType ? item.pickerType : 'date'"
            :placeholder="item.placeholder"
            :format="item.format ? item.format : null"
            :default-value="item.defaultValue ? item.defaultValue : ''"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'dateTimePicker'" :prop="item.modelname">
          <el-date-picker
            class="widthStyle"
            v-model="formData[item.modelname]"
            :type="item.pickerType ? item.pickerType : 'datetime'"
            :placeholder="item.placeholder ? item.placeholder : ''"
            :align="item.align ? item.align : 'left'"
            :default-time="item.defaultValue ? item.defaultValue : ''"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label='item.label' v-if="item.type === 'datetimerange'" :prop="item.modelname">
          <el-date-picker
            class="widthStyle"
            v-model="formData[item.modelname]"
            type="datetimerange"
            :range-separator="item.rangeSeparator ? item.rangeSeparator : '-'"
            :start-placeholder="item.startPlaceholder ? item.startPlaceholder : '开始日期'"
            :end-placeholder="item.endPlaceholder ? item.endPlaceholder : '结束日期'"
            :align="item.align ? item.align : 'left'"
            :default-time="item.defaultValue ? item.defaultValue : ''"
          >
          </el-date-picker>
        </el-form-item>
        <template v-if="item.type === 'slot'">
          <slot :name='item.slot'/>
        </template>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'searchComp',
  data () {
    return {
      formData: this.getFromData()
    }
  },
  mounted () {
    this.$emit('Search', this)
  },
  computed: {
    colMinWidth () {
      return this.searchConfig.colMinWidth ? this.searchConfig.colMinWidth : '400px'
    },
    labelPosition () {
      return this.searchConfig.labelPosition ? this.searchConfig.labelPosition : 'right'
    },
    flexSet () {
      return this.searchConfig.flexJustify ? {type: 'flex', justify: this.searchConfig.flexJustify} : {type: null, justify: 'start'}
    },
    gutter () {
      return this.searchConfig.gutter ? this.searchConfig.gutter : 0
    },
    size () {
      return this.searchConfig.size ? this.searchConfig.size : 'small'
    },
    colsm () {
      return this.searchConfig.columns ? parseInt(24 / this.searchConfig.columns) : 24
    },
    columns () {
      return this.searchConfig.columns ? this.searchConfig.columns : 1
    },
    labelWidth () {
      return this.searchConfig.labelWidth ? this.searchConfig.labelWidth : null
    },
    config () {
      return [].concat(this.searchConfig.config)
    },
    controlButtonList () {
      return [].concat(this.searchConfig.controlButton)
    }
  },
  methods: {
    // 根据搜索配置塞选出model属性
    getFromData () {
      let testObj = {}
      this.searchConfig.config.map((item) => {
        if (item.modelname) {
          testObj[item.modelname] = item.defaultValue
        }
      })
      return testObj
    }
  },
  props: {
    searchConfig: Object
  }
}
</script>

<style lang="scss" scoped>
.el-form-item{
  padding: 10px 0;
  margin: 0!important;
}
.InputGroup {
  margin-bottom: 0 !important;
}
.widthStyle{
  width: 100%;
}
</style>
