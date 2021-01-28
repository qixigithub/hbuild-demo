<template>
    <div class="ty-content-element-lookup">
      <div class="ty-content-element-lookup-fee">
        <a class="charge-standard" @click="open">点击查看收费标准</a>
        <Modal :scrollable="true"
               v-model="modal" width="750">
          <div style="min-height: 100px;padding:12px 0; margin: 0">
            <div class="content-model1"><span class="content-title">收费单位名称：</span>西安高新技术产业开发区城市管理局</div>
            <div class="content-model"><span class="content-title">收费范围收费对象：</span>户外广告设置空间经营者</div>
            <div class="content-model"><span class="content-title">批准收费的机关及文号：</span>市物函[2006]69号</div>
            <ty-iv-table ref="table" v-bind="table"/>
          </div>
        </Modal>
      </div>
    </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentElementLookupFee',
    mixins: [PtMixins.component],
    data() {
      return {
        modal: false,
        table: {
          // url: 'test',
          data: [
            {inquiryCode: "一、楼体(立面)广告", professionalOrgName: "元/平方米（年）", purchaseCategoryName: 110},
            {inquiryCode: "二、电子显示屏广告", professionalOrgName: "元/个（年）", purchaseCategoryName: 7000},
          ],
          // pageNo: 1,
          autoLoad: false,
          singleSelect: true,
          // height: 400,
          // queryParam: function (param) {
          //   console.log('queryParam:', param)
          //   return _.assign({test: 1}, param);
          // },
          // responseHandler: function (val) {
          //   console.log('responseHandler:', val)
          //   return val;
          // },
          columns: [
            {
              title: '收费项目',
              key: 'inquiryCode',
              align: 'left',
            },
            {
              title: '计费单位',
              key: 'professionalOrgName',
              align: 'left',
              width: 140
            },
            {
              title: '收费标准',
              key: 'purchaseCategoryName',
              align: 'right',
              width: 180,
              render: (h, params) => {
                return h('span', (params.row.purchaseCategoryName).toFixed(2));
              }
            },
          ]
        }
      }
    },
    methods: {
      //note 弹出
      open() {
        this.modal = true
      },
    }
  }
</script>

<style lang="less">
  .content-model1 {
    .content-title {
      color: #333;
    }
  }

  .content-model {
    display: inline-block;
    width: 355px;
    .content-title {
      color: #333;
    }
  }
</style>

