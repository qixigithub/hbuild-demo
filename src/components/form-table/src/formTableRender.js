/**
 *@author       谢辉
 *@date         2018/10/18 23:57
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description
 */
export default {
  icoDel: (vm, data, fullmodel) => {
    return (h, params) => {
      return h(
        'div',
        vm.$refs.table.$scopedSlots.icoDel({
          idx: params.index
        })
      )
    }
  },
  input: (vm, data, fullmodel) => {
    return (h, params) => {
      data[params.index] = params.row;
      return h(
        'div',
        vm.$refs.table.$scopedSlots.input({
          row: params.row,
          idx: params.row._index,
          column: params.column
        })
      )
    }
  },
  dataRange: (vm, data, fullmodel) => {
    return (h, params) => {
      data[params.index] = params.row;
      return h(
        'div',
        vm.$refs.table.$scopedSlots.dataRange({
          row: params.row,
          idx: params.row._index,
          column: params.column
        })
      )
    }
  },
  select: (vm, data, fullmodel, item) => {
    return (h, params) => {
      data[params.index] = params.row;
      return h(
        'div',
        vm.$refs.table.$scopedSlots.select({
          row: params.row,
          idx: params.row._index,
          column: params.column,
          options: fullmodel.templateCache[item.options]
        })
      )
    }
  }
}
