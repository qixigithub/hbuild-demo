<template>
  <div class="formTable" :style="styles">
    <Table ref="
" border :columns="checkColumns(columns)" :data="realModel">
      <template slot="input" slot-scope="props">
        <Form :ref="_.uniqueId('formDynamic_')" :model="props.row">
          <FormItem :prop="props.column.key" :rules="checkRules(props.column.rules)" :show-message="true">
            <Input v-model="props.row[props.column.key]" size="small" :placeholder="props.column.placeholder"></Input>
          </FormItem>
        </Form>
      </template>

      <template slot="dataRange" slot-scope="props">
        <Form :ref="_.uniqueId('formDynamic_')" :model="props.row">
          <FormItem :prop="props.column.key" :show-message="true" :rules="checkRules(props.column.rules)">
            <DatePicker type="daterange" :options="optionsData"
                        :placeholder="props.column.placeholder"
                        :value="props.row[props.column.key]"
                        @on-change="dataChange"
                        @on-open-change="handleClose(props)"
                        :editable="false">
            </DatePicker>
          </FormItem>
        </Form>
      </template>

      <template slot="select" slot-scope="props">
        <Form :ref="_.uniqueId('formDynamic_')" :model="props.row">
          <FormItem :prop="props.column.key" :rules="checkRules(props.column.rules)" :show-message="true">
            <Select v-model="props.row[props.column.key]" clearable style="width:200px">
              <Option v-for="item in props.options" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>

      </template>
      <!-- 操作 -->
      <template slot="icoDel" slot-scope="props">
        <Icon v-if="props.idx>=minRows" type="ios-trash-outline" @click="delRow(props.idx)" style="font-size: 24px">删除
        </Icon>
      </template>
    </Table>
    <Button @click="addRow" style="margin-top: 10px" v-if="isBtnMsg">{{btnMsg}}</Button>
    <div style="display:none;"> {{act}}</div>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'
  import formTableRender from './formTableRender'

  export default {
    name: 'TyFormTable',
    mixins: [PtMixins.component],
    props: {
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      // note 按钮是否要显示
      isBtnMsg: {
        type: Boolean,
        default: true,
      },
      //note 按钮名称
      btnMsg: {
        type: String
      },
      prop: {
        type: [String, Array]
      },
      //note 是否参与校验
      validator: {
        default: false,
      },
      //note 默认初始行数
      minRows: {
        default: 2,
      },
      //note 不能删除的最少行数
      disableDelRows: {
        default: 2,
      },
      //note 样式 padding
      padding: {
        type: [String, Number],
        default: '50px',
      },
      //note 样式 margin
      margin: {
        type: [String, Number],
        default: 'auto',
      },
      //note 宽度
      width: {
        type: [String, Number],
        default: 'auto',
      }
    },
    data() {
      return {
        act: false, // 用于触发渲染
        flag: true,
        //当前日期前面的日期不可点击
        optionsData: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        tempIdx: 0, // 记录当前数据在表格数据里的下表
        key: null  // 记录对应的字段
      }
    },
    computed: {
      styles() {
        let styles = {};
        styles.margin = `${this.margin}`;
        styles.padding = `${this.padding}`;
        styles.width = `${this.width}px`;
        return styles;
      },
    },
    methods: {
      //note 校验
      formValidator() {
        let flag = true;
        if (this.$refs instanceof Object) {
          for (let key in this.$refs) {
            if (key.match(/^formDynamic_/) && this.$refs[key]) {
              this.$refs[key].validate(valid => {
                if (valid) {
                } else {
                  flag = false;
                }
              })
            }
          }
        }
        return flag;
      },
      //note 删除行
      delRow(idx) {
        this.realModel.splice(idx, 1)
        this.$nextTick(() => {
          this.act = !this.act
        })
      },
      //note 添加行
      addRow() {
        this.realModel.push({})
        this.$nextTick(() => {
          this.act = !this.act
        })
      },
      //note 处理列对象
      checkColumns(cols) {
        let result = []
        if (cols instanceof Array) {
          cols.forEach(item => {
            result.push({...item, ...{render: formTableRender[item.type](this, this.realModel, this.fullModel, item)}})
          })
        }
        return result
      },
      //note 检测校验规则类型
      checkRules(rules) {
        if (rules instanceof Array) {
          let result = [];
          rules.forEach(item => {
            result.push(this.checkRulesObject(item));
          });
          return result;
        } else if (rules instanceof Object) {
          return this.checkRulesObject(rules);
        } else {
          return rules;
        }
      },
      //note 根据类型校验
      checkRulesObject(obj) {
        if (!obj) {
          return obj;
        }
        switch (obj.type) {
          case 'mobile':
          case 'phone':
          case 'mobilePhone':
          case 'daterange':
          case 'number':
          case 'identification':
          case 'checkIdcardList':
          case 'checkAddress':
          case 'area':
          case 'faxx':
          case 'number1':
          case 'workerNum':
          case 'noMoreDay':
          case 'stamp':
          case 'userName':
          case 'notNumber':
          case 'number2':
          case 'socialCode':
          case 'sex':
            return {
              ...obj, ...{
                required: obj.required,
                validator: PtUtils.validators[obj.type].validator,
                trigger: obj.trigger || 'change',
                message: obj.message
              }
            };
          case 'linkage':
            return {
              ...obj, ...{
                required: obj.required, validator: (rule, value, callback) => {
                  PtUtils.validators[obj.type].validator(rule, value, callback, this.realModel)
                }, trigger: obj.trigger || 'change', message: obj.message
              }
            };
          default:
            return obj;
        }
      },
      //note 记录下标和key
      handleClose(props) {
        this.tempIdx = props.idx;
        this.key = props.column.key
      },
      //note 在表格对应位置赋值
      dataChange(value) {
        this.realModel[this.tempIdx][this.key] = value
      }
    },
    mounted() {
      if (this.validator === true) {
        this.fullModel.templateCache.validators.push(this);
      }
      if (!this.realModel) {
        this.realModel = []
      }
      if (this.realModel instanceof Array) {
        if (this.realModel.length < this.minRows) {
          while (this.realModel.length < this.minRows) {
            this.realModel.push({});
          }
        }
      }
      this.act = !this.act;
    }
  }
</script>

<style lang="less">
  .formTable {
    .ivu-input {
      height: 32px;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .ivu-input-icon {
      margin-top: 10px;
    }
    .ivu-form-item-error-tip {

      background: none;
      line-height: normal;
      padding-left: 0px;
      padding-bottom: 0px;
      width: auto;
      right: 0px;
      top: 37px;
      left: 0px;

    }
    .ivu-select-default {
      width: 150px !important;
    }
    .ivu-input-wrapper-small .ivu-input-icon{
      top:10px;
      line-height: 32px;
    }
    .ivu-select{
      margin-top: 10px;
    }
  }
</style>

