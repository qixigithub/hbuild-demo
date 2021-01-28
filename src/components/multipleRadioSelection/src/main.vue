<template>
  <div class="ty-multipleRadioSelection">
    <CheckboxGroup v-model="social" @on-change="change">
      <template v-for="(item,index) in getCheckBoxData">
        <Checkbox :key="index" :label="item.value">
          <span>{{item.label}}</span><input v-if="item.show" v-model="textVal" class="checkInput"/>
        </Checkbox>
        <Form :label-width="extend.labelWidth||205" class="ty-radio">
          <FormItem>
            <template v-for="(option,key2) in item.radioList">
              <template v-if="option.isSelected">
              </template>
              <div class="radio" :key="key2"
                   :class="{'radioactive': option.isSelected}"
                   @click="switchRadioList(index, key2)">
                {{option.name}}
              </div>
            </template>
          </FormItem>
        </Form>
      </template>
    </CheckboxGroup>
  </div>
</template>

<script>
import PtMixins from '../../../libs/mixins'
export default {
    name: 'TyMultipleRadioSelection',
    mixins: [PtMixins.component],
  props: {
    //note 字段在绑定对象中对应的key值
    prop: {
      type: [String, Array]
    },
    itemsProp: {
      type: [String, Array]
    },
    extend: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    checkBoxData(newVal, oldVal) {
      // console.log(newVal+"----"+oldVal);
    },
    textVal(newVal, oldVal) {
      this.changeInput();
    },
    social(newVal, oldVal) {
      // console.log(newVal,oldVal,this.checkBoxData,'57')
      // debugger
      let val = [];
      this.checkBoxData.forEach((item, index) => {
        newVal.forEach(item2 => {
          //note 如果二者相等,则存储，然后把fullModal中的prop给修改
          if (item2 === item.value) {
            let obj = {};
            if (item.radioList.length > 0) {
              if (!(item.radioList.some((e, index) => {
                return e.isSelected == true
              }))) {
                this.checkBoxData[index].radioList[0].isSelected = true;
                item.radioSelectd = '1'
              }
            }
            obj.checkValue = item2;
            obj.radioValue = item.radioSelectd;
            // console.log(item, '111111111111111111111111')
            val.push(obj);
          }
        })
        if (item.value === '') {
          item.show = false;
          this.textVal = '';
        }
      })
      this.realModel[this.prop] = val;
      PtUtils.bus.$emit('valiteFormItem',this.prop)
      if (newVal.length < oldVal.length) {
        //note 多选减少
        let newArr = _.difference(oldVal, newVal);
        this.checkBoxData.forEach(item => {
          //note 如果二者相等,则存储，然后把fullModal中的prop给修改
          if (newArr[0] === item.value) {
            item.radioList.forEach(item2 => {
              item2.isSelected = false
            });
          }
        })
        // console.log(newArr);
      }
      /*newVal.forEach((item,index)=>{
        if(item===''){
          if(this.textVal!==''){
            val.push(this.textVal);
          }
        }else{
          val.push(item);
        }
      })*/
      // this.realModel[this.prop]=val;
    }
  },
  computed: {
    getCheckBoxData() {
      return this.checkBoxData;
    },
  },
  data() {
    return {
      //模拟radio的数据
      innerArray: [{
        "label": "外立面改造",
        "prop": "isOut",
        "isShow": true,
        "options": [
          {
            "isSelected": true,
            "name": "有外立面改造",
            "value": 1
          },
          {
            "name": "无外立面改造",
            "value": 0
          }
        ]
      }],
      //请求的数据
      checkBoxData: this.extend.mockData,
      //复选框绑定的数据
      social: [],
      //文本框数据
      textVal: ''
    }
  },
  methods: {
    getItemsProps(itemProps){
      debugger;
      if (!!itemProps) {
        let params = itemProps.split('.');
        let result = this.realModel["templateCache"];
        result=result[params[1]]
        console.log("--->");
        console.log(result);
        return result;
      }else{
        return [];
      }
    },
    //note 监听多选框
    changeCheck(val) {
      // debugger;
      // console.log(val)
    },
    // note 切换单选项
    switchRadioList(index1, index2) {
      // debugger;
      this.checkBoxData[index1].radioList.forEach(item => {
        item.isSelected = false
      });
      this.checkBoxData[index1].radioList[index2].isSelected = true;
      this.social.push(this.checkBoxData[index1].value);
      this.social = Array.from(new Set(this.social));//note 數組去重
      this.checkBoxData.forEach(item => {
        if (item.radioList) {
          item.radioList.forEach(item2 => {
            if (item2.isSelected) {
              //this.fullModel[item.prop] = item2.value;
              item.radioSelectd = item2.value;
            }
          })
        }
      });
    },
    //note 文本框值改变触发
    changeInput() {

      /*  this.social.forEach(item=>{
          if(item===''){
            val.push(this.textVal);
          }else{
            val.push(item);
          }
        })*/
      let val = [];
      this.checkBoxData.forEach(item => {
        this.social.forEach(item2 => {
          //note 如果二者相等,则存储，然后把fullModal中的prop给修改
          if (item2 === item.value) {
            let obj = {};
            obj.checkValue = item2;
            obj.radioValue = item.radioSelectd;
            val.push(obj);
          }
        })
        if (item.value === '') {
          item.show = false;
          this.textVal = '';
        }
      })
      this.realModel[this.prop] = val;

      // console.log(this.realModel[this.prop],'10000000000000000000000')
    },
    change(data) {
      // console.log(data,this.checkBoxData,this.realModel[this.prop],this.textVal,'===')
      //note 如果要是改变值，那么就把modal中的area对象中的给改了
      let next = true;
      data.forEach(item => {
        if (item === '') {
          next = false;
        }
      })
      if (!next) {
        this.checkBoxData.forEach(item => {
          if (item.value === '') {
            item.show = true;
          }
        })
      } else {
        this.checkBoxData.forEach(item => {
          if (item.value === '') {
            item.show = false;
            this.textVal = '';
          }
        })
      }
    },
    //note 初始化  multipleRadioSelection.vue
    init() {
      debugger;
      this.checkBoxData=this.extend.mockData||this.getItemsProps(this.itemsProp);
      let fullModel = this.realModel[this.prop];
      //给所有的单选赋值让他被选中
      let checkArr = [];
      if(fullModel){
        fullModel.forEach(item2 => {
          checkArr.push(item2.checkValue);
          this.checkBoxData.forEach(item => {
            if (item.radioList) {
              if (item2.checkValue == item.value) {
                //this.fullModel[item.prop] = item2.value;
                item.radioList.forEach(item3 => {
                  item3.isSelected = false;
                });
                item.radioList.forEach(item3 => {
                  if (item3.value == item2.radioValue) {
                    //note 匹配到了把他设置为选中
                    item3.isSelected = true;
                  }
                });
              }
            }
          })
        });
      }
      //note 给所有的多选框附上单选选中的值
      this.checkBoxData.forEach((item,index) => {
        if (item.radioList) {
          item.radioList.forEach(item2 => {
            if (item2.isSelected) {
              //this.fullModel[item.prop] = item2.value;
              this.checkBoxData[index].radioSelectd = item2.value;
            }
          })
        }
      });
      //note 给多选框赋值
      this.social = checkArr;
      if (this.extend.url && this.extend.url !== '') {
        /* ComponentService.qrySelectData(this.extend.url,this.extend.params?this.extend.params:{}).then(res=>{
           if(res){
             res.forEach(item=>{
               item.show=false;
             })
             res.push({label:'其它',value:"",show:false})
             this.checkBoxData=res;
           }
         })*/
      }
    }
  },
  created() {
    this.init();
  }
}
</script>

