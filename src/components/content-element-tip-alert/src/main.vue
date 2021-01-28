<template>
  <div class="ty-component-element-alert">
    <Alert :type="type" v-bind="extend" show-icon :closable="closable">
      <div v-html="content"/>
    </Alert>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentElementTipAlert',
    mixins: [PtMixins.component],
    props: {
      //note alert类型
      type: {
        default: 'warning'
      },
      closable: {
        default: true
      },
      //note 内容
      content: {
        default: '请点击<a>“下载申请表”</a> 按钮下载本次事项的申请表，并与物业、业主或业主委员会确认。'
      },
      extend: {}
    }
  }
</script>

<style lang="less">
  .ty-component-element-alert {
    .ivu-alert {
      border-radius: 0;
    }
    .ivu-alert-warning {
      background-color: rgba(252, 237, 230, 1);
    }
    .ivu-alert-none {
      background-color: rgba(252, 237, 230, 1);
    }
  }
</style>

