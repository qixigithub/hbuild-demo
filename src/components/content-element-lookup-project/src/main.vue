<template>
  <div class="ty-content-element-lookup">
    <div class="ty-content-element-lookup-project">
      <Button type="success" @click="open" ghost>项目查询</Button>
      <Modal class="ty-content-element-lookup-project" :scrollable="true"
             v-model="modal" width="750">
        <div slot="header">
          <span>项目查询</span>
        </div>
        <ty-content-element-tip-alert :closable="false" content="可输入项目名称、建设地点、批准文号等关键词进行查询。"/>
        <div style="min-height: 100px">
          <IvTable ref="table" v-bind="table" @onRowClick="onRowClick"/>
        </div>
        <div slot="footer">
          <Button type="primary" @click="ok">确定</Button>
          <Button @click="cancel">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentElementLookupProject',
    mixins: [PtMixins.component],
    props: {
      eventType: {
        type: String
      }
    },
    data() {
      return {
        selectIndex: -1,
        modal: false,
        table: {
          url: 'test',
          // pageNo: 1,
          singleSelect: true,
          height: 300,
          queryParam: function (param) {
            console.log('queryParam:', param)
            return _.assign({}, param);
          },
          responseHandler: function (val) {
            console.log('responseHandler:', val)
            return val;
          },
          columns: [
            {
              title: "选择",
              width: 80,
              align: 'center',
              render: this.renderSelect
            },
            {
              title: '项目名称',
              key: 'inquiryCode',
              align: 'center',
            },
            {
              title: '建设地点',
              key: 'professionalOrgName',
              align: 'center',
              width: 180
            },
            {
              title: '批准文号',
              key: 'purchaseCategoryName',
              align: 'center',
              width: 180
            },
          ]
        }
      }
    },
    methods: {
      //note 渲染单选按钮
      renderSelect(h, {index}) {
        return h('Radio', {
            props: {
              value: index === this.selectIndex
            },
          }
        )
      },
      //note 监听行点击
      onRowClick(row, index) {
        this.$refs.table.query();
      },
      //note 弹出并搜索
      open() {
        this.modal = true
      },
      //note 确定
      ok() {
        if (this.eventType) {
          PtUtils.bus.$emit(this.eventType, this.$refs.table.selection)
        }
        this.$emit('change', this.$refs.table.selection)
        this.modal = false;
      },
      //note 取消
      cancel() {
        this.modal = false;
      }
    }
  }
</script>

