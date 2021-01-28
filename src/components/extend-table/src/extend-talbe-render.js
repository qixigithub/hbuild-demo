/**
 *@author       谢辉
 *@date         2018/10/18 23:57
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description
 */
export default {
  icoDel: (vm, data,index) => {
    return (h, params) => {
      return h('div', [
        h('Icon', {
          props: {
            type: 'ios-trash-outline'
          },
          style: {
            fontSize: '24px'
          },
          on: {
            click: () => {
              data.splice(params.index, 1)
            }
          }
        })
      ]);
    }
  },
  input: (vm, data,index) => {
    return (h, params) => {
      return h('div', [
        h('input', {
          style: {
            height: '35px',
            width: '100%',
            borderWidth: '1px',
            fontSize: '16px',
            fontWeight: 400,
            paddingLeft: '8px'
          },
          domProps: {
            value: params.row[vm.columns[index].key],
          },
          on: {
            // blur: () => {
            //   params.row[vm.columns[i].key] = event.target.value;
            //   this.propData[params.index] = params.row;
            //   // console.log(event.target.value)
            //   this.$emit('extendTableData', this.propData)
            // }
          }
        })
      ]);
    }
  }
}
