<template>
  <div class="ty-inputIDCard">
    <Input v-model="cardNumber" placeholder="请输入身份证号码" style="width: 320px" @on-blur="handleNumber" clearable/>
  </div>
</template>

<script>
import PtMixins from '../../../libs/mixins'
export default {
    name: 'TyInputIDCard',
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
        cardNumber: ''
      }
    },
    methods: {
      handleNumber() {
        this.realModel[this.prop] = this.cardNumber;
        console.log(this.cardNumber)
        let birthday = '';
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(this.cardNumber) === false) {
          // alert("身份证输入不合法");
          Bus.$emit('valiteFormItem', this.prop)
          return false;
        }
        if (this.cardNumber != null && this.cardNumber != "") {
          if (this.cardNumber.length == 15) {
            this.cardNumber = "19" + this.cardNumber.substr(6, 6);
          } else if (this.cardNumber.length == 18) {
            birthday = this.cardNumber.substr(6, 8);
          }
          birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
          // console.log(birthday)
          // console.log(this.extend.birthdayKey)
          // console.log(this.realModel.spouseBirthday)
          this.realModel[this.extend.birthdayKey] = birthday
        }
      }
    },
    mounted() {
     debugger;
      if (this.realModel[this.prop]) {
        this.cardNumber = this.realModel[this.prop];
        this.handleNumber()
      }
    },
  created() {
    debugger;
    // this.selectData.unshift({regionName: '西安市', regionCode: '610100000000'})
    console.log(this.selectData)
  }
}
</script>

