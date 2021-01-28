<template>
  <div class="ty-content-element-lookup">
    <div class="ty-content-element-lookup-project">
      <Button type="success" @click="open" ghost>编号查询</Button>
      <Modal class="ty-content-element-lookup-project" :scrollable="true"
             v-model="modal" width="750">
        <div slot="header">
          <span>编号查询</span>
        </div>
        <ty-content-element-tip-alert :closable="false" content="请勾选您要上传的附件，然后点击确定按钮"/>
        <Row style="margin-bottom:10px">
          <Col span="12">
            <Input search enter-button placeholder="请输入关键词">
            <Button slot="append" icon="ios-search" v-model="key" @click="search"/>
            </Input>
          </Col>
          <Col span="6" offset="1">
            <Button type="success" @click="addPlan" ghost>新增危废转移计划</Button>
          </Col>
        </Row>
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
    name: 'TyContentElementLookupNumber',
    mixins: [PtMixins.component],
  props: {
    eventType: {
      type: String
    }
  },
  data() {
    return {
      key: '',
      selectIndex: -1,
      modal: false,
      table: {
        url: 'test',
        // pageNo: 1,
        singleSelect: true,
        height: 300,
        queryParam: function (param) {
          console.log('queryParam:', param)
          return _.assign({key: this.key}, param);
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
            title: '危废转移计划编号',
            key: 'inquiryCode',
            align: 'center',
          },
          {
            title: '创建时间',
            key: 'professionalOrgName',
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
      this.selectIndex = index;
    },
    //note 新增计划
    addPlan() {

    },
    //note 弹出并搜索
    open() {
      this.modal = true;
      this.$refs.table.query({key: this.key});
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

