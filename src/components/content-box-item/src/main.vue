<template>
  <div class="ty-content-box-item">
    <div v-if="isShow">
      <div class="ty-content-box-item" v-if="type==='title'">
        <ty-content-element-title v-bind="data"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='steps'">
        <ty-steps v-bind="data"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='form'">
        <ty-content-element-form v-bind="data"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='tip-adv'">
        <ty-content-element-tip-adv v-bind="data"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='tip-alert'">
        <ty-content-element-tip-alert v-bind="data"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='table-attach-file'">
        <ty-attach-file-table v-bind="data" :fullModel="fullModel"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='extend-table'">
        <ty-extend-table v-bind="data" v-on:extendTableData="extendTableData" :fullModel="fullModel"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='time-line'">
        <ty-time-line v-bind="data" :fullModel="fullModel"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='info-base'">
        <ty-cells v-bind="data" :fullModel="fullModel"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='info-attachment'">
        <ty-attachment v-bind="data" :fullModel="fullModel"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='pap-download-scan'">
        <ty-pap-download-scan v-bind="data" :fullModel="fullModel"/>
      </div>
      <!--<div class="ty-content-box-item" v-else-if="type==='payment'">-->
        <!--<ty-payment v-bind="data"/>-->
      <!--</div>-->
      <div class="ty-content-box-item" v-else-if="type==='rebirth-radio'">
        <ty-special-radio v-bind="data"/>
      </div>
      <!--<div class="ty-content-box-item" v-else-if="type==='list-table'">-->
        <!--<ty-list-table v-bind="data"/>-->
      <!--</div>-->
      <!--<div class="ty-content-box-item" v-else-if="type==='guide-item'">-->
        <!--<ty-guide-item v-bind="data"/>-->
      <!--</div>-->
      <!--<div class="ty-content-box-item" v-else-if="type==='table-list'">-->
        <!--<ty-table v-bind="data"/>-->
      <!--</div>-->
      <div class="ty-content-box-item" v-else-if="type==='btns-oprator'">
        <ty-button-oprator v-bind="data"/>
      </div>
      <!--<div class="ty-content-box-item" v-else-if="type==='iframe'">-->
        <!--<ty-content-element-iframe v-bind="data"/>-->
      <!--</div>-->
      <!--<div class="ty-content-box-item" v-else-if="type==='table-retire'">-->
        <!--<ty-content-element-table-retire v-bind="data"/>-->
      <!--</div>-->
      <div class="ty-form-Table" v-else-if="type==='form-table'">
        <ty-form-table v-bind="data"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='form-radio'">
        <ty-content-element-radio v-bind="data"/>
      </div>
      <div class="ty-content-box-item" v-else-if="type==='lookup-fee'">
        <ty-content-element-look-fee v-bind="data"/>
      </div>
    </div>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentBoxItem',
    mixins: [PtMixins.component],
    props: {
      type: {
        type: String,
        default: ''
      },
      state: {
        type: String,
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      },
      prop: {
        type: String
      }
    },
    methods: {
      extendTableData: function (data) {
        this.fullModel[this.prop] = data
        // console.log(this.fullModel)
      }
    },
    computed: {
      isShow() {
        if (this.state) {
          return this.state === this.fullModel.state;
        }
        return true;
      }
    }
  }
</script>

