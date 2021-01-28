<template>
  <div class="ty-endDateChoose">
    <DatePicker @on-change="handelChane" type="date" :value="chooseTime" :options="beforeDate" placeholder="请选择,有效期为一年"
                style="width: 200px"></DatePicker>
    -
    <Input v-model="endDate" style="width: 200px;background-color: #fff" disabled/>
  </div>
</template>

<script>
import PtMixins from '../../../libs/mixins'
export default {
    name: 'TyEndDateChoose',
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
      beforeDate: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      chooseTime: "",
      endDate: ""
    }
  },
  methods: {
    handelChane(val) {

      this.chooseTime = val;
      let setValidityDate = this.chooseTime;
      let endDate = setValidityDate.split('-');
      let endDateYear = parseInt(endDate[0]) + 1;
      let endDateMouth = endDate[1];
      let endDateDays = parseInt(endDate[2]) < 10 ? ('0' + (parseInt(endDate[2]) - 1)) : parseInt(endDate[2]) - 1;
      let endDateTime = endDateYear + "-" + endDateMouth + "-" + endDateDays;
      if (val === "") {
        endDateTime = '';
        this.realModel.setValidityDate = []
      }
      console.log(endDateTime)
      this.endDate = endDateTime
      console.log(this.realModel)
      if (val !== "" && endDateTime !== "") {
        let startDate = this.realModel.setValidityDate.splice(0, 1, val);
        let endDate = this.realModel.setValidityDate.splice(1, 1, endDateTime);
        console.log(this.realModel.setValidityDate)
      }

    }
  },
  // computed:{
  //     getEndDate(){
  //       console.log(this.chooseTime)
  //
  //     }
  //
  //
  // }
  mounted() {
    if (this.realModel.setValidityDate.length != 0) {
      this.chooseTime = this.realModel.setValidityDate[0];
      this.endDate = this.realModel.setValidityDate[1]
    }


  }
}
</script>

