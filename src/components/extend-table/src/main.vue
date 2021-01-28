<template>
  <div>
    <Table :columns="checkColumns(columns)" :data="fullModel[prop]" :width="width" border stripe
           style="margin-bottom: 10px"></Table>
    <Button type="primary" style="margin-right: 8px;margin-bottom: 10px" @click="addOne">{{btnName}}</Button>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'
  import tableRender from './extend-talbe-render'

  export default {
    name: 'TyExtendTable',
    mixins: [PtMixins.component],
    props: {
      prop: "",
      columns: {
        default() {
          return []
        }
      },
      width: {
        type: String,
        default: 'auto'
      },
      num: {

        type: String
      },
      btnName: {
        type: String,
        default() {
          return "增加代表"
        }
      },
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      minRow: {
        default: 2
      },
      maxRow: {
        type: Number
      }
    },
    data() {
      return {}
    },
    methods: {
      checkColumns(cols) {
        let result = []
        if (cols instanceof Array) {
          cols.forEach((item, key) => {
            console.log(tableRender[item.type])
            result.push({...item, ...{render: tableRender[item.type](this, this.fullModel[this.prop], key)}})
          })
        }
        return result
      },
      addOne() {
        //note 万一以后要有上限了呢
        if (this.fullModel[this.prop] instanceof Array) {
          // if(this.realModel.length<this.maxLength)
          this.fullModel[this.prop].push({})
          // }
        }
      }
    },
    created() {

    },
    mounted() {
    }
  }
</script>

