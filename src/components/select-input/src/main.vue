<template>
  <div class="ty-select-input">
    <div class="select-input">
      <label>西安市</label>
      <Select v-model="realModel.areaAddress" :disabled="extend.disabled" style="width:100px" :label-in-value="true"
              @on-change="changeSelect"
      >
        <Option v-for="(item,index) in selectData" :key="index" :value="item.regionCode">
          {{item.regionName}}
        </Option>
      </Select>
      <Input v-model="realModel.specificAddress" :placeholder="extend.placeholder" :disabled="extend.disabled"
             @on-change="change" style="width: 275px"/>
    </div>
  </div>
</template>

<script>
import PtMixins from '../../../libs/mixins'
export default {
    name: 'TySelectInput',
    mixins: [PtMixins.component],
  props: {
    prop: {
      type: String
    },
    extend: {
      type: Object
    }
  },
  data() {
    return {
      value: '莲湖区',
      selectData: JSON.parse(localStorage.getItem('departmentList'))
    }
  },
  methods: {
    change() {
      if (this.realModel.areaAddressDesc && this.realModel.specificAddress) {
        this.realModel[this.prop] = (`西安市${this.realModel.areaAddressDesc}${this.realModel.specificAddress}`).replace(/\s+/g, "")
      } else {
        this.realModel[this.prop] = ''
      }
    },
    changeSelect(val) {
      this.realModel.areaAddressDesc = val.label;
      if (this.realModel.areaAddressDesc && this.realModel.specificAddress) {
        this.realModel[this.prop] = (`西安市${this.realModel.areaAddressDesc}${this.realModel.specificAddress}`).replace(/\s+/g, "")
      } else {
        this.realModel[this.prop] = ''
      }
    }
  },
  created() {
      debugger;
    // this.selectData.unshift({regionName: '西安市', regionCode: '610100000000'})
    console.log(this.selectData)
  }
}
</script>

