<template>
  <div class="lookup-query">
    <Button @click="query" type="info">查询</Button>
    <Modal
      v-model="modal1"
      title="文件查询"
      ok-text="确认"
      ok-cancel="取消"
      width="640px"
      @on-ok="ok"
      @on-cancel="cancel">
      <Table border :columns="columns1" :data="data1"></Table>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'TyContentElementLookupQuery',
    props: {
      sign: {
        type: String
      },
      modelData: {
        type: Object
      }
    },
    data() {
      return {
        modal1: false,
        columns1: [
          {
            title: '选择',
            width: 60,
            render: (h, {row, column}) => {
              return h('div', {}, [
                h('Radio', {
                  on: {
                    'on-change': () => {
                      this.modelData['isSuperOrg'] = Number(row.isNeedSupervision);
                    }
                  }
                })
              ])
            }
          },
          {
            title: '环评批复文号',
            key: 'eiaRelayNumber'
          },
          {
            title: '是否需要监理机构',
            key: 'isNeedSupervision',
            render: (h, {row, column}) => {
              if (row.isNeedSupervision == '0') {
                return h('span', '不需要')
              } else if (row.isNeedSupervision == '1') {
                return h('span', '需要')
              }
            }
          }
        ],
        data1: []
      }
    },
    methods: {
      ok() {

      },
      cancel() {

      },
      query() {

        // this.modelData['applyName']=111;
        // console.log(this.modelData[this.sign]);
      }
    }
  }
</script>

