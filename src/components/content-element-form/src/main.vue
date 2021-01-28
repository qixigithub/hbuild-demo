<template>
  <div class="ty-content-element-form">
    <Row type="flex" :justify="extend.justify||'center'">
      <Col :span="extend.span||12">
        <Form ref="formValidate" class="ty-content-element-form" :model="realModel"
              :label-width="extend.labelWidth||205"
              :rules="rules"
              v-bind="extend">
          <FormItem v-for="item,key in items"
                    :key="key"
                    :ref="`item${key}`"
                    v-bind="item"
                    :rules="checkRules(item.rules||rules[item.prop])"
                    :label="item.label+':'"
                    :style="formItemStyle(item)">
            <ty-content-element-form-item @update-parent="updateUI" v-bind="item" :model="realModel"
                                          @display-change="(value)=>{displayChange(`item${key}`,value)}"/>
          </FormItem>
        </Form>
      </Col>
      <div style="display: none">{{act}}</div>
    </Row>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentElementForm',
    mixins: [PtMixins.component],
    props: {
      rules: {
        default() {
          return {}
        }
      },
      validator: {
        type: Boolean
      },
      extend: {
        default() {
          return {};
        }
      },
      prop: {
        type: [String, Array]
      },
      items: {
        default() {
          return [
            {
              type: 'input',
              label: '输入框',
              prop: 'data1',
            },
            {
              type: 'label',
              label: '输入框',
              value: '11111'
            }
          ]
        }
      }
    },
    data() {
      return {
        flag: '',
        act: false
      }
    },
    methods: {
      updateUI() {
        this.act = !this.act;
      },
      displayChange(ref, value) {
        this.$refs[ref][0].$el.hidden = !value;
      },
      formValidator() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.flag = true;
          } else {
            this.flag = false
          }
        })
        return this.flag
      },
      //note 检测校验规则类型
      checkRules(rules) {
        if (rules instanceof Array) {
          let result = []
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
          case 'sevenNumber':
          case 'bankCard':
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
      formItemStyle(item) {
        if (item.extend && item.extend.itemWidth) {
          const itemWidth = (this.extend.labelWidth || 205);
          return {width: (item.extend.itemWidth + itemWidth) + 'px'}
        }
        return {}
      }
    },

    created() {
      if (this.validator === true) {
        this.fullModel.templateCache.validators.push(this);
      }
    }
  }
</script>

