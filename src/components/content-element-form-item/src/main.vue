<template>
  <Row v-if="validateType" :style="rowStyles">
    <Col :span="extend.span || 24">
      <Label v-if="type==='label'"
             v-bind="extendMix">
        {{model[prop]}}
      </Label>
      <Input v-else-if="type==='input'"
             v-bind="extendMix"
             @on-change="changeListener"
             v-model="model[prop]"
             :maxlength="extendMix.maxLength||500"
             @on-keydown="onKeyDown"/>
      <InputNumber v-else-if="type==='input-number'"
                   v-bind="extendMix"
                   @on-change="changeListener"
                   v-model="model[prop]"
                   :min=1
                   :max="999999999">
      </InputNumber>
      <DatePicker v-else-if="type==='date-picker'"
                  :value="model[prop]"
                  @on-change="changeListener"
                  :style="{width:(extend.width?`${extend.width}px`:0) || '100%'}"
                  v-bind="extendMix"
                  split-panels
                  :editable="false"
                  :options="dateOptions(extendMix.options)">
      </DatePicker>
      <Row v-else-if="type==='select'">
        <Col>
          <Select v-bind="extendMix" v-model="model[prop]"
                  @on-change="changeListener">
            <template v-if="dynamic">
              <Option v-for="item,key in selectData"
                      :key="key"
                      :disabled="item.disabled"
                      v-bind="item.extend"
                      :value="item.value">{{item.label}}
              </Option>
            </template>
            <template v-else>
              <Option v-for="item,key in itemsValue"
                      :key="key"
                      v-bind="item.extend"
                      :value="item.value">{{item.label}}
              </Option>
            </template>
          </Select>
        </Col>
      </Row>
      <Row v-else-if="type==='selectLabel'">
        <Col>
          <Select v-bind="extendMix" v-model="model[prop]"
                  @on-change="changeListenerLabel" :label-in-value="true">
            <template v-if="dynamic">
              <Option v-for="item,key in selectData"
                      :key="key"
                      :disabled="item.disabled"
                      v-bind="item.extend"
                      :value="item.value">{{item.label}}
              </Option>
            </template>
            <template v-else>
              <Option v-for="item,key in itemsValue"
                      :key="key"
                      v-bind="item.extend"
                      :value="item.value">{{item.label}}
              </Option>
            </template>
          </Select>
        </Col>
      </Row>
      <Row v-else-if="type==='selectLink'">
        <Col>
          <Select v-bind="extendMix" v-model="model[prop]"
                  @on-change="changeListenerLabel" :label-in-value="true">
            <Option v-for="item,key in itemsValueLink"
                    :key="key"
                    v-bind="item.extend"
                    :value="item.value"
                    :label="item.label">
            </Option>
          </Select>
        </Col>
      </Row>
      <RadioGroup v-else-if="type==='radio'"
                  v-model="model[prop]"
                  v-bind="extendMix"
                  @on-change="changeListener">
        <Radio v-for="item,key in itemsValue"
               :key="key"
               :label="item.value"
               v-bind="item.extend||{}">
          {{item.label}}
        </Radio>
      </RadioGroup>
      <Row v-else-if="type==='date-picker-daterange'">
        <template v-for="item,key in itemsValue">
          <Col span="11" :key="key">
            <FormItem v-bind="item">
              <DatePicker :style="{width:(item.extend.width?`${item.extend.width}px`:0) || '100%'}"
                          v-bind="item.extend"
                          :value="model[prop]"
                          @on-change="changeListener"
                          :editable="false"
                          :options="dateOptions(item.extend.options)">
              </DatePicker>
            </FormItem>
          </Col>
          <Col style="text-align:center" span="2" v-if="key<itemsValue.length-1">-</Col>
        </template>
      </Row>
      <Row v-else-if="type==='tip-alert'" v-bind="extend">
        <ty-content-element-tip-alert :content="extend.content"></ty-content-element-tip-alert>
      </Row>
      <Row v-else-if="type==='form-table'" v-bind="extend">
        <tip-alert :content="extend.content"></tip-alert>
        <ty-form-table
          :columns="extend.columns"
          :data="model[prop]"
          :btnMsg="extend.btnMsg"
          v-on:extendTableData="extendTableData"
        ></ty-form-table>
      </Row>
      <Row v-else-if="type==='yuan'" v-bind="extend">
        <extend-table
          :btnName="extend.btnName"
          num="1"
          width="320"
          :columns="extend.columns"
          :tableData2="model[prop]"
          :maxRow="extend.maxRow"
          v-on:extendTableData="extendTableData"
        />
      </Row>
      <Row v-else-if="type==='textarea'" v-bind="extend">
        <ty-content-element-text-tpl
          :contentType="extend.content"
        />
      </Row>
      <Row v-else-if="type==='checkboxMultiple'" v-bind="extend">
        <ty-multiple-selection :prop="prop" :itemsProp="itemsProp" :extend="extend"></ty-multiple-selection>
      </Row>
      <Row v-else-if="type==='dateTimeRange'" v-bind="extend">
        <ty-date-time-picker :prop="prop" :extend="extend"></ty-date-time-picker>
      </Row>
      <Row v-else-if="type==='dateTimeRangeList'" v-bind="extend">
        <ty-date-time-picker-list :prop="prop" :extend="extend"></ty-date-time-picker-list>
      </Row>
      <Row v-else-if="type==='checkboxMultipleRadio'" v-bind="extend">
        <ty-multiple-radio-selection :prop="prop" :itemsProp="itemsProp" :extend="extend"></ty-multiple-radio-selection>
      </Row>
      <Row v-else-if="type==='dynamic-search'" v-bind="extend">
        <ty-dynamic-search :prop="prop" :extend="extend"></ty-dynamic-search>
      </Row>
      <Row v-else-if="type==='select-input'" v-bind="extend">
        <ty-select-input :prop="prop" :extend="extend"></ty-select-input>
      </Row>
      <Row v-else-if="type==='formSelect'" v-bind="extend">
        <ty-form-select :prop="prop" :extend="extend"></ty-form-select>
      </Row>
      <Row v-else-if="type==='pureTable'" v-bind="extend">
        <ty-pure-table></ty-pure-table>
      </Row>
      <Row v-else-if="type==='linkageInput'" v-bind="extend">
        <ty-link-input :prop="prop" :extend="extend"></ty-link-input>
      </Row>
      <Row v-else-if="type==='plate-input'" v-bind="extend">
        <ty-plate-input :prop="prop" :extend="extend"></ty-plate-input>
      </Row>
      <Row v-else-if="type==='timeLabel'" v-bind="extend">
        <ty-time-label :prop="prop"></ty-time-label>
      </Row>
      <Row v-else-if="type==='budongchan'" v-bind="extend">
        <ty-budongchan
          :prop="prop" :extend="extend"
        />
      </Row>
      <Row v-else-if="type==='budongchanTable'" v-bind="extend">
        <ty-budongchan-table
          :prop="prop" :extend="extend"
        />
      </Row>
      <Row v-else-if="type==='endDateChoose'" v-bind="extend">
        <ty-endDate-choose
          :prop="prop" :extend="extend"
        />
      </Row>
      <Row v-else-if="type==='inputIDCard'" v-bind="extend">
        <ty-input-IDCard
          :prop="prop" :extend="extend"
        />
      </Row>
      <Row v-else-if="type==='inputBankNum'" v-bind="extend">
        <ty-input-BankNum
          :prop="prop" :extend="extend"
        />
      </Row>
    </Col>
    <template v-if="excat">
      <template v-for="itemExcat in excat">
        <Col span="24" style="margin-top: 10px">
          <ty-content-element-lookup-map v-if="itemExcat.type==='lookup-map'" v-bind="itemExcat" @change="excatChange"/>
          <ty-content-element-lookup-fee v-if="itemExcat.type==='lookup-fee'" v-bind="itemExcat" @change="excatChange"/>
          <ty-content-element-lookup-project v-if="itemExcat.type==='lookup-project'" v-bind="itemExcat"
                                             @change="excatChange"/>
          <ty-content-element-lookup-number v-if="itemExcat.type==='lookup-number'" v-bind="itemExcat"
                                            @change="excatChange"/>
          <ty-content-element-lookup-query v-if="itemExcat.type==='lookup-query'" :extend="extend"
                                           v-bind="itemExcat.data"
                                           :modelData="model"
                                           :sign="prop"/>
          <ty-content-element-tip-adv v-if="itemExcat.type==='tip-adv'" v-bind="itemExcat.data"/>
        </Col>
      </template>
    </template>
  </Row>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentElementFormItem',
    mixins: [PtMixins.component],
    props: {
      type: {
        default: 'label'
      },
      //note 双向绑定对象
      model: {
        default() {
          return {};
        }
      },
      //note 额外的元素
      excat: {
        type: Array,
        default() {
          return []
        }
      },
      //note 字段在绑定对象中对应的key值
      prop: {
        type: [String, Array]
      },
      placeholder: {
        type: [String, Array]
      },
      itemsProp: {
        type: String,
      },
      items: {
        default() {
          return [];
        }
      },
      options: {
        type: Array,
      },
      extend: {
        type: Object,
        default() {
          return {}
        }
      },
      dynamic: {
        type: Object
      }
    },
    data() {
      return {
        isShow: true,
        selectData: [],
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '就医省市名称',
            key: 'orgName'
          },
          {
            title: '就医省市编码',
            key: 'insuranceOrgCode'
          }
        ],
        data1: [],
        modal1: false,
        prohibitData: [610100, 610102, 610103, 610104, 610111, 610112
          , 610113, 610114, 610115, 610116, 610122, 610124, 610125, 610126
          , 610127, 610128, 610134, 610155],
      };
    },
    computed: {
      validateType() {
        return !!this.type;
      },
      labelHtml() {
        if (this.extendMix.transformation && model[this.prop] != '') {
          return util.DX(this.model[this.prop])
        } else if (this.extendMix.h) {
          this.model[this.prop] = moment(new Date()).format("YYYY-MM-DD")
          return moment(new Date()).format("YYYY-MM-DD")
        }
        return this.model[this.prop];
      },
      extendMix() {
        return {...{clearable: true, onChange: null, readonly: false, disabled: false}, ...this.extend};
      },
      itemsValue() {
        if (this.extend && this.extend.options) {
          return this.extend.options
        }
        if (!!this.itemsProp) {
          let params = this.itemsProp.split('.');
          let result = this.model;
          while (params.length > 0) {
            result = result[params.shift()];
          }
          return result;
        }
        return this.items;
      },
      itemsValueLink(item) {
        //note 两个select的联动
        let model = this.model;
        item.$el && (model[this.prop] = '');
        if (!!this.itemsProp) {
          let referField = this.extend.referField;
          let params = this.itemsProp.split('.');
          let result = this.model;
          while (params.length > 0) {
            result = result[params.shift()];
          }
          return result[model[referField]];
        }
        return this.items;
      },
      rowStyles() {
        let style = {};
        const itemWidth = this.extendMix.width;
        if (itemWidth) {
          style.width = `${itemWidth}px`;
        }
        return style;
      }
    },
    methods: {
      //note 单选
      singleSelect(data, index) {
        let extendData = this.extendMix;
        this.fullModel[this.prop] = data[extendData.spark.label];
        if (!!extendData.spark.code) {
          this.fullModel[extendData.spark.code] = data[extendData.spark.value];
        }
      },
      //note 模态框确认
      modalOk() {

      },
      //note 模态框取消
      modalCancel() {

      },
      //note 动态获取下拉框数据
      dynamicData() {
        this.selectData = [];
        if (this.dynamic) {
          ComponentService.qrySelectData(this.dynamic.url, {...this.dynamic.params}).then(res => {
            if (res instanceof Array) {
              if (res && res.length > 0) {
                res.forEach(item => {
                  this.selectData.push({
                    label: this.dynamic.label && item[this.dynamic.label] ? item[this.dynamic.label] : item.label,
                    value: this.dynamic.value && item[this.dynamic.value] ? item[this.dynamic.value] : item.value,
                    disabled: false
                  })
                  if (this.dynamic.needDisable) {
                    if (this.selectData.length > 0) {
                      this.selectData.forEach(item => {
                        if (this.prohibitData.includes(Number(item.value))) {
                          item.disabled = false;
                        } else {
                          item.disabled = true;
                        }
                      })
                    }
                  }
                })
              } else {
                this.selectData = []
              }
            } else {
              for (let i in res) {
                if (this.dynamic.needDisable) {
                  if (this.prohibitData.includes(Number(i))) {
                    this.selectData.push({label: res[i], value: i, disabled: false});
                  } else {
                    this.selectData.push({label: res[i], value: i, disabled: true});
                  }
                } else {
                  this.selectData.push({label: res[i], value: i, disabled: false});
                }
              }
            }
          })
        }
      },
      //note input框失去焦点事件
      onBlur() {
        let blurData = this.extendMix;
        if (blurData.spark) {
          this.isCorrect(blurData.spark);
        }
        if (blurData.isCheck) {
          this.isAllowContinue(blurData.interface);
        }
      },
      //note 失去焦点时触发接口判断当前信息是否正确
      isCorrect(data) {
        let param = {};
        if (data.params) {
          for (let i in data.params) {
            param[i] = this.fullModel[data.params[i]]
          }
        }
        ComponentService.qrySelectData(data.url, param).then(res => {
          if (res) {
            if (res.length > 1) {
              this.data1 = res;
              this.modal1 = true;
            } else if (res.length === 1) {
              this.fullModel[this.prop] = res[0][data.label];
              if (!!data.code) {
                this.fullModel[data.code] = res[0][data.value];
              }
            } else {
              util.alert({type: 'error', content: "未检索到信息，请核实录入信息是否正确!"});
            }
          }
        })
      },
      //note 获取接口信息判断是否可以继续进行事项
      isAllowContinue(data) {
        if (data instanceof Array) {

        } else if (data instanceof Object) {
          let paramData = data.params;
          let param = {};
          console.log(paramData)
          for (let i in paramData) {
            param[i] = this.model[paramData[i]];
          }
          Service.queryAllowData(data.url, param).then(res => {
            if (res) {
              this.model['isAllow'] = true;
            }
          }).catch((e) => {
            this.model['isAllow'] = false;
            this.model['errorValMessage'] = `${e.message}`;
            util.alert({type: 'warning', content: `${e.message}`});
          })
        }
      },
      //note 禁止某些按键
      onKeyDown(event) {
        if (this.extendMix.onKeyDown instanceof Function) {
          this.extendMix.onKeyDown.apply(null, event)
        }
        if (this.extendMix.disableKeys instanceof Array) {
          if (this.extendMix.disableKeys.indexOf(event.keyCode) != -1) {
            event.preventDefault();
          }
        } else {
          if (event.keyCode === 32) {
            event.preventDefault();
          }
        }
      },
      //note 元素联动检查是否隐藏/显示
      checkShowHide() {
        const showFlag = this.extend.showFlag;
        if (showFlag instanceof Array) {
          //showFlag是数组
          this.isShow = this.checkShowFlagArray(showFlag);
          // if(!this.isShow){
          //   this.realModel[this.prop]='';
          // }
        } else if (showFlag instanceof Object) {
          //showFlag是对象
          if (this.realModel[showFlag.key] == showFlag.value) {
            this.isShow = this.checkShowFlagArray(showFlag);
          }
        } else {
          this.isShow = true;
        }
        this.$emit('display-change', this.isShow)
      },
      checkShowFlagArray(array) {
        let result;
        const type = this.extend.showFlagType;
        if (type === 'either') {
          result = false;
          array.forEach(item => {
            switch (item.dataType) {
              case 'array2single':  //item.value是数组,依赖值是单值
                if (item.value.includes(this.realModel[item.key])) {
                  result = true;
                }
                break;
              case 'single2array': //item.value是单值,依赖值是数组
                const split1=this.realModel[item.key].split(',');
                if (split1.includes(item.value)) {
                  result = true;
                }
                break;
              case 'array2arrayContain':  //item.value是数组,依赖值是数组,并且包含关系
                const split2=this.realModel[item.key].split(',');
                split2.forEach(o=>{
                  if(item.value.includes(o)){
                    result=true;
                  }
                });
                break;
              case 'array2arrayBeContain':  //item.value是数组,依赖值是数组,并且被包含关系
                const split3=this.realModel[item.key].split(',');
                item.value.forEach(o=>{
                  if(split3.includes(o)){
                    result=true;
                  }
                });
                break;
              case 'single2single':
              default:
                if (this.realModel[item.key] == item.value) {
                  result = true;
                }
            }
          })
        } else {
          result = true;
          console.log(this.realModel);

          array.forEach(item => {
            console.log(typeof (this.realModel[item.key]));
            console.log(typeof (item.value));
            if(typeof (item.value)=="boolean"){
              if (this.realModel[item.key] != item.value) {
                this.realModel[this.prop] = '';
                result = false;
              }
            }else{
              console.log(JSON.parse(item.value));
              if (this.realModel[item.key] != JSON.parse(item.value)) {
                this.realModel[this.prop] = '';
                result = false;
              }
            }

          })
        }
        return result;
      },
      dateOptions(options, dependField) {
        // this.realModel
        if (!options) return null;
        return {
          disabledDate: this.disabledDate(options, dependField ? this.realModel[dependField] : '')
        }
      },
      disabledDate(options, dependFieldValue) {
        const disable = options.disabledDate;
        if (typeof(disable) === 'string') {
          const arr = disable.split('|');
          switch (arr[0]) {
            case 'before':
              return (date) => {
                return date && date <= Date.parse(moment(this.model[arr[1]], arr[2]))
              };
            case 'after':
              return (date) => {
                return date && date >= Date.parse(moment(this.model[arr[1]], arr[2]))
              };
            case 'beforeToday':
              return (date) => {
                return date && date <= Date.now() - 1000 * 60 * 60 * 24;
              };
            case 'afterToday':
              return (date) => {
                return date && date >= Date.now();
              };
            case 'afterStartTime':
              let creatFn = Options[arr[0]];
              return creatFn(dependFieldValue);
            case 'beforeTodayAndAfterEnd':
              return (date) => {
                return date && ((date <= Date.now() - 1000 * 60 * 60 * 24) || (date >= Date.parse(moment(dependFieldValue))));
              };
              break;
            case 'beforeStartAndAfterDays':   //禁选早于依赖日期或者大于依赖日期一定天数的日期
              return (date) => {
                if (!!dependFieldValue) {
                  return date && ((date < Date.parse(moment(dependFieldValue))) || (date > Date.parse(moment(dependFieldValue)) + 1000 * 60 * 60 * 24 * options.days));
                }
                return date;
              };
              break;
            case 'beforeStartAndAfterDaysIncludeStart':   //禁选早于依赖日期或者大于依赖日期一定天数的日期 包含起始日期
              return (date) => {
                if (!!dependFieldValue) {
                  return date && ((date <= Date.parse(moment(dependFieldValue))) || (date > Date.parse(moment(dependFieldValue)) + 1000 * 60 * 60 * 24 * options.days));
                }
                return date;
              };
              break;
            case 'beforeStartAndAfterDaysIncludeEnd':   //禁选早于依赖日期或者大于依赖日期一定天数的日期 包含结束日期
              return (date) => {
                if (!!dependFieldValue) {
                  return date && ((date < Date.parse(moment(dependFieldValue))) || (date >= Date.parse(moment(dependFieldValue)) + 1000 * 60 * 60 * 24 * options.days));
                }
                return date;
              };
              break;
            case 'beforeStartAndAfterDaysIncludeBoth':   //禁选早于依赖日期或者大于依赖日期一定天数的日期 包含起止日期
              return (date) => {
                if (!!dependFieldValue) {
                  return date && ((date <= Date.parse(moment(dependFieldValue))) || (date >= Date.parse(moment(dependFieldValue)) + 1000 * 60 * 60 * 24 * options.days));
                }
                return date;
              };
              break;
            case 'afterStartAndbeforeDays':   //禁选早于依赖日期一定天数的日期或者晚于依赖日期
              return (date) => {
                if (!!dependFieldValue) {
                  return date && ((date < Date.parse(moment(dependFieldValue)) - 1000 * 60 * 60 * 24 * options.days) || (date > Date.parse(moment(dependFieldValue))));
                }
                return date;
              };
              break;
            case 'afterStartAndbeforeDaysIncludeStart':   //禁选早于依赖日期一定天数的日期或者晚于依赖日期 包含起始日期
              return (date) => {
                if (!!dependFieldValue) {
                  return date && ((date <= Date.parse(moment(dependFieldValue)) - 1000 * 60 * 60 * 24 * options.days) || (date > Date.parse(moment(dependFieldValue))));
                }
                return date;
              };
              break;
            case 'afterStartAndbeforeDaysIncludeEnd':   //禁选早于依赖日期一定天数的日期或者晚于依赖日期 包含结束日期
              return (date) => {
                if (!!dependFieldValue) {
                  return date && ((date < Date.parse(moment(dependFieldValue)) - 1000 * 60 * 60 * 24 * options.days) || (date >= Date.parse(moment(dependFieldValue))));
                }
                return date;
              };
              break;
            case 'afterStartAndbeforeDaysIncludeBoth':   //禁选早于依赖日期一定天数的日期或者晚于依赖日期 包含起止日期
              return (date) => {
                if (!!dependFieldValue) {
                  return date && ((date <= Date.parse(moment(dependFieldValue)) - 1000 * 60 * 60 * 24 * options.days) || (date >= Date.parse(moment(dependFieldValue))));
                }
                return date;
              };
              break;
            default:
              return null;
          }
        }
        return disable;
      },
      changeListener(value, sign) {
        if (sign !== 'trigger') {
          if (this.extendMix.trigger) {
            this.getTriggerData(this.extendMix.trigger);
          }
        }
        if (this.type === 'date-picker' || this.type === 'date-picker-daterange') {
          if (value instanceof Array) {
            let dates = []
            value = value.forEach(v => {
              if (v) {
                dates.push(moment(v).format('YYYY-MM-DD'))
              }
            });
            this.model[this.prop] = dates
          } else if (value instanceof Object) {
            this.model[this.prop] = moment(value).format('YYYY-MM-DD');
          } else if (typeof(value) === 'string') {
            this.model[this.prop] = value;
          }
        }
        this.linkageChangeValue(value);
        if (this.extendMix.onChange) {
          this.extendMix.onChange.apply(null, value)
        }
        this.busEmit(value);
      },
      changeListenerLabel(val) {
        if (!val) return;
        this.model[`${this.prop}Desc`] = val.label.replace(/\s*/g, "");
      },
      //note 联动改变数值和元素属性 分out和into两种情况
      linkageChangeValue(value) {
        const lcv = this.extendMix.linkageChangeValue
        if (lcv instanceof Array) {
          lcv.forEach(item => {
            const type = item.type || 'out';
            if (item.values) {
              item.values.forEach(valItem => {
                //note out触发其他元素数据改变
                if (type == 'out') {
                  if (valItem.dependValue == value || typeof(valItem.dependValue) === 'undefined') {
                    if (item.changeKey && (!item.noChangeExist || !this.model[item.changeKey])) {
                      if (valItem.changeValue || valItem.changeValue == 0) {
                        this.model[item.changeKey] = valItem.changeValue
                      } else {
                        if (item.multiple && !item.noChangeExist) {
                          this.model[item.changeKey] = this.model[valItem.changeParam] * item.multiple;
                        } else {
                          this.model[item.changeKey] = this.model[valItem.changeParam];
                        }
                      }
                    }
                  }
                } else if (type == 'into') {
                  //note into其他元素触发自身元素数据改变
                  console.log(valItem.dependValue, this.model[item.changeKey])
                  if (valItem.dependValue == this.model[item.changeKey]) {
                    if (item.changeKey && (!item.noChangeExist || !this.model[this.prop])) {
                      if (valItem.changeValue || valItem.changeValue == 0) {
                        this.model[this.prop] = valItem.changeValue
                      } else {
                        this.model[this.prop] = this.model[valItem.changeParam];
                      }
                    }
                    if (valItem.changeAttrs) {
                      const changeAttrs = valItem.changeAttrs;
                      Object.keys(changeAttrs).forEach(key => {
                        this.extendMix[key] = changeAttrs[key];
                        // debugger
                        // if(key=='el-type'){
                        //   this.model[type]=changeAttrs[key]
                        //   this.$emit('update-parent')
                        // }
                      })
                    }
                  }
                } else if (type == 'isShow') {
                  if (item.showValue) {
                    if (valItem.changeValue == true || valItem.changeValue == false) {
                      if (this.model[valItem.changeParam] === item.showValue) {
                        this.model[item.changeKey] = valItem.changeValue;
                      } else {
                        this.model[item.changeKey] = !valItem.changeValue;
                      }
                    } else {
                      if (this.model[valItem.changeParam] === item.showValue) {
                        this.model[item.changeKey] = true;
                      } else {
                        this.model[item.changeKey] = false;
                      }
                    }
                  } else {
                    this.model[item.changeKey] = this.model[valItem.changeParam];
                  }
                  PtUtils.bus.$emit('checkShowHide');
                }
              })
            }
          })
        }
      },
      busEmit(value) {
        if (this.extendMix && this.extendMix.eventType) {
          PtUtils.bus.$emit(this.extendMix.eventType, value)
        }
      },
      extendTableData(data) {
        this.model[this.prop] = data
      },
      excatChange(value) {
        this.model[this.prop] = value
      },
      //note 字段初始默认其他字段的值
      fieldDefaultOtherValue(fieldValue) {
        this.excat.forEach(item => {
          if (item.type == "default-otherValue") {
            this.model[this.prop] = fieldValue ? fieldValue : this.model[item.prop];
          }
        });
      },
      //note 联动掉接口赋值
      getTriggerData(data) {
        if (data.type == 'addParam') {
          this.selectData.forEach(item => {
            if (this.realModel[this.prop] == item.value) {
              this.realModel[this.extendMix.trigger.prop] = item.label;
            }
          })
        } else {
          let param = {};
          for (let i in data.params) {
            param[i] = this.realModel[data.params[i]];
          }
          ComponentService.qrySelectData(data.url, param).then(res => {
            this.realModel[data.assignment] = res.accountId;
          })
        }
      },
    },
    created() {
      if (this.dynamic) {
        this.dynamicData();
      }
      this.fieldDefaultOtherValue(this.model && this.model[this.prop]);
      this.changeListener(this.model && this.model[this.prop], 'trigger');
    },
    mounted() {
      if (this.extend.showFlag) {
        this.checkShowHide();
        PtUtils.bus.$on('checkShowHide', this.checkShowHide);
      }
    },
    destroyed() {
      if (this.extend.showFlag) {
        PtUtils.bus.$off('checkShowHide', this.checkShowHide);
      }
    }
  }
</script>

