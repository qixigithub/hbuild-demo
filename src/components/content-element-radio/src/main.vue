<template>
  <div class="ty-content-element-radio">
    <Row type="flex" :justify="extend.justify||'center'">
      <Col :span="extend.span||12">
        <Form :label-width="extend.labelWidth||205">
          <FormItem v-for="(item,key) in innerArray"
                    :key="key"
                    :label="item.label+':'"
                    v-show="item.isShow"
          >
            <div class="radio"
                 :class="{'radioactive': item2.isSelected}"
                 v-for="(item2, key2) in item.options" :key="key2"
                 @click="switchOption(key, key2)"
            >
              {{item2.name}}
            </div>
            <template v-if="item.exact">
              <ty-content-element-lookup-fee v-if="item.exact[0].type==='lookup-fee'"/>
            </template>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentElementRadio',
    mixins: [PtMixins.component],
    props: {
      //note
      extend: {
        type: Object,
        default() {
          return {}
        }
      },
      items: {
        type: Array,
        default: []
      }
    },
    methods: {
      // note 切换单选项
      switchOption(index1, index2) {
        this.innerArray[index1].options.forEach(item => {
          item.isSelected = false
        });
        this.innerArray[index1].options[index2].isSelected = true;
        this.innerArray.forEach(item => {
          item.options.forEach(item2 => {
            if (item2.isSelected) {
              this.fullModel[item.prop] = item2.value;
            }
          })
        });
        this.linkageChangeValue(this.innerArray[index1].prop, this.innerArray[index1].options[index2].value, this.innerArray);
      },
      // note 联动改变其他的值
      linkageChangeValue(originKey, originValue, innerArray) {
        let event = this.extend.eventType;
        event && PtUtils.bus.$emit(event);
        const lcv = this.extend.linkageChangeValue;
        if (lcv instanceof Array) {
          lcv.forEach(item => {
            if (item.originKey === originKey) {
              item.values.forEach(valItem => {
                if (valItem.dependValue === originValue) {
                  if (item.changeKey) {
                    if (item.isValue) {
                      this.fullModel[item.changeKey] = valItem.changeValue
                    } else {
                      innerArray.forEach(arrayItem => {
                        if (arrayItem.prop === item.changeKey) {
                          arrayItem.isShow = valItem.changeValue
                        }
                      })
                    }
                  }
                }
              })
            }
          })
        }
      },
      // note 根据外部数据初始化组件
      init() {
        const innerArray = PtUtils.util.clone2(this.items);
        innerArray.forEach(item => {
          item.options.forEach(opitem => {
            if (this.fullModel[item.prop] === opitem.value) {
              opitem.isSelected = true;
            } else {
              opitem.isSelected = false;
            }
          })
        });
        innerArray.forEach(item => {
          this.linkageChangeValue(item.prop, this.fullModel[item.prop], innerArray);
        });
        this.innerArray = innerArray;
      }
    },
    data() {
      return {
        innerArray: []
      }
    },
    created() {
      this.init();
    }
  }
</script>

