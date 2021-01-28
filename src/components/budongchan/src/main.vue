<template>
  <div class="ty-budongchan">
    <Select v-model="model1" style="width:100px" @on-change="selectType">
      <Option v-for="item in cardType" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <span v-if="model1=='1'">
      <Input v-model="model2" style="width: 100px" @on-change="changeData"/>
      <Select v-model="model3" style="width:50px" @on-change="changeData" clearable>
        <Option v-for="item in numType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      -
      <Input v-model="model4" style="width: 50px" @on-change="changeData"/>
      -
      <Input v-model="model5" style="width: 30px" @on-change="changeData"/>
      -
      <Input v-model="model6" style="width: 50px" @on-change="changeData"/>
      -
      <Input v-model="model7" style="width: 50px" @on-change="changeData"/>
      ～
      <Input v-model="model8" style="width: 30px" @on-change="changeData"/>
    </span>
    <span v-if="model1=='2'">
      <Input v-model="model9" placeholder="陕（2019）西安市不动产权第xxx号" style="width: 219px" @on-change="changeData"/>
    </span>
  </div>
</template>

<script>
import PtMixins from '../../../libs/mixins'
export default {
    name: 'TyBudongchan',
    mixins: [PtMixins.component],
    props: {
    prop: {
      type: [String, Array]
    },
    extend: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      model1: "",
      model2: "",
      model3: "",
      model4: "",
      model5: "",
      model6: "",
      model7: "",
      model8: "",
      model9: "",
      cardType: [
        {
          value: "1",
          label: "房产证号"
        },
        {
          value: "2",
          label: "不动产证号"
        }
      ],
      numType: [
        {
          value: "Ⅰ",
          label: "Ⅰ"
        },
        {
          value: "Ⅱ",
          label: "Ⅱ"
        },
        {
          value: "Ⅲ",
          label: "Ⅲ"
        },
        {
          value: "Ⅳ",
          label: "Ⅳ"
        }
      ]
    }
  },
  methods: {
    selectType(val) {
      this.realModel[this.extend.key] = val;
      this.realModel[this.prop] = '';
      this.model2 = "";
      this.model3 = "";
      this.model4 = "";
      this.model5 = "";
      this.model6 = "";
      this.model7 = "";
      this.model8 = "";
      this.model9 = "";
    },
    changeData() {
      if (this.model1 == '1') {
        if (!this.model3) {
          this.model3 = ""
        }
        this.realModel[this.prop] = this.model2 + this.model3 + '-' + this.model4 + '-' + this.model5 + '-' + this.model6 + '-' + this.model7 + '～' + this.model8;
        Bus.$emit('valiteFormItem', this.prop)
      } else {
        this.realModel[this.prop] = this.model9
        Bus.$emit('valiteFormItem', this.prop)
      }
    },
    //note 不动产证全角转半角，去空格
    changemodel() {
      // this.model9 = this.ToDBC(this.model9);
      this.model9 = this.model9.replace(/\s*/g, "")
      this.model9 = this.model9.replace(/\(/g, "（")
      this.model9 = this.model9.replace(/\)/g, "）")
      this.changeData();
    },
  },
  mounted() {
    if (this.realModel[this.extend.key]) {
      this.model1 = this.realModel[this.extend.key];
      if (this.model1 == '1') {
        if(!this.realModel[this.prop]){
          return
        }
        let arr = this.realModel[this.prop].split('-');
        console.log(arr[0][arr[0].length - 1])
        if (arr[0][arr[0].length - 1] == 'Ⅰ' || arr[0][arr[0].length - 1] == 'Ⅱ' || arr[0][arr[0].length - 1] == 'Ⅲ' || arr[0][arr[0].length - 1] == 'Ⅳ') {
          this.model2 = arr[0].substring(0, arr[0].length - 1);
          this.model3 = arr[0].charAt(arr[0].length - 1);
        } else {
          this.model2 = arr[0].substring(0, arr[0].length);
          this.model3 = '';
        }
        this.model4 = arr[1];
        this.model5 = arr[2];
        this.model6 = arr[3];
        this.model7 = arr[4].substring(0, arr[4].indexOf("～"));
        this.model8 = arr[4].substring(arr[4].indexOf("～") + 1, arr[4].length)
      } else if (this.model1 == '2') {
        this.model9 = this.realModel[this.prop]
      }
    } else {
      this.model1 = '1';
      this.realModel[this.extend.key] = '1'
    }
  },
  watch: {
    'model9': 'changemodel'
  }
}
</script>

