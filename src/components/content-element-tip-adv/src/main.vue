<template>
  <div class="foot-tip-msg">
    <Icon type="ios-alert-outline" size="24" color="#FF9933"/>
    <span class="reminder">{{title||realModel.title}}</span>
    <p class="foot-msg">收费类型：{{feeType||realModel.feeType}}</p>
    <p class="foot-msg">收费标准：{{feeType||realModel.feeScale}}{{feeUnit||realModel.feeUnit}}</p>
    <p class="foot-tip">此为参考费用，最终费用由审核人员确认之后再定</p>
    <div class="foot-money">
      <span class="foot-msg">参考费用：</span>
      <span class="money">{{fee||amountFee | money}}元</span>
    </div>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentElementTipAdv',
    mixins: [PtMixins.component],
    props: {
      //note 总线事件名称
      eventType: {
        type: String,
      },
      //标题
      title: {
        type: String
      },
      //收费类型
      feeType: {
        type: String
      },
      //收费标准
      feeScale: {
        type: String
      },
      //单位
      feeUnit: {
        type: String
      },
      //总价
      fee: {
        type: String
      }
    },
    computed: {
      //note 计算总价
      amountFee() {
        return this.fullModel.fee = PtUtils.util.mathFormatStr(this.realModel, this.realModel.feeExpression);
      },
    },
    created() {
      //note 回显数据初始化显示,通过发送总线事件实现
      if (this.eventType) {
        PtUtils.bus.$emit(this.eventType);
      }
    }
  }
</script>

<style lang="less">
  .foot-tip-msg {
    overflow: hidden;
    zoom: 1;
    border: 1px solid #FF9933;
    background-color: #FEF4E8;
    margin-top: 20px;
    padding: 20px;
    .reminder {
      font-size: 16px;
      color: #FF9933;
      padding-left: 10px
    }
    .foot-msg {
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #666666;
      line-height: 28px;
    }
    .foot-tip {
      font-size: 14px;
      color: #CC0000;
      line-height: 28px;
    }
    .foot-money {
      float: right;
      .money-icon {
        color: #CC0000;
        padding-left: 5px;
        font-weight: 700;
        font-size: 16px;
      }
      .money {
        font-weight: 700;
        font-style: normal;
        color: #CC0000;
        font-size: 24px;
        line-height: 24px;
      }
    }
  }
</style>

