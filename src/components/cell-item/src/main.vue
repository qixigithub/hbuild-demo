<template>
  <Card class="cell-item" :dis-hover="hover" >
    <div class="title" v-if="this.show1===true">
      <p>
        <span>{{title}}</span>
      </p>
    </div>
    <template v-if="this.desc!==undefined">
      <Tooltip :content="this.desc" max-width="200" placement="top-end">
        {{des}}
      </Tooltip>
    </template>
    <template v-else>
      <span class="cell-content" v-if="this.show===true">{{des}}</span>
      <Table :columns="columns1" :data="data2"></Table>
    <!--  {{this.infoData.templateCache}}-->
    </template>
  </Card>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyCellItem',
    mixins: [PtMixins.component],
    props: {
      span: {
        type: Object
      },
      hover: {
        type: Boolean,
        default: true
      },
      cell: {
        type: Object,
      },
      infoData: {
        type: Object,
      },
      title: {
        type: String,
        default: ''
      },
      prop: {
        type: String
      },
      num: {
        type: String
      },
      itemProp: {
        type: String
      },
      itemPropList: {
        type: Array
      },
      label: {
        type: String
      },
      tit: {
        type: [String, Boolean, Number]
      },
      isTitle: {
        type: [String, Boolean, Number]
      },
      unit: {
        type: String,
      },
      descript: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        columns11: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ],
        className: 'cell-item',
        flag: '',
        show: true,
        show1: true,
        explicitConcealed: true
      }
    },
    methods: {
      showCellItem() {
        if (this.span.show) {
          if (this.infoData[this.span.show.type] == this.span.show.value) {
            this.explicitConcealed = false
          }
        }
      }
    },
    computed: {
      columns1() {
        if (this.infoData.templateCache) {
          let cache = this.infoData.templateCache;

          if (this.itemPropList) {
            return this.itemPropList;
          }
        }
      },
      data2() {
        return [];

      },
      desc() {
        debugger;
        if (this.prop.indexOf(".") !== -1) {
          // array
          let props = this.prop.split(".");
          let val1 = this.infoData[props[0]][props[1]];
          let detail = this.handleVal(val1);
          return detail;
        } else {
          //prop      string
          let val2 = this.infoData[this.prop];
          let detai2 = this.handleVal(val2);
          return detai2;
        }
      },
      des() {
        //给cell-item加span属性 不会截取
        if (this.span.span) {
          return this.desc;
        } else {
          if (this.desc !== undefined && this.desc.length > 30) {
            return this.desc.substring(0, 26) + '...';
          } else {
            return this.desc;
          }
        }
      }
    },
    methods: {
      //note 处理table
      handleTable(index, item, data) {
        if (item.label) {
          switch (item.label) {
            case "select":
              //selectedData是下拉的所有数据  data是后台返回的数据
              let selectData = this.infoData.templateCache[item.itemProp];
              selectData.forEach((v1, i1) => {
                data.forEach((v2, i2) => {
                  for (let i in v2) {
                    if (i == item.key) {
                      if (v2[i] == v1.value) {
                        v2[i] = v1.label;
                      }
                    }
                  }
                })
              })
              break;
            default:
              break;
          }
        }
      },
      //note 处理数据
      handleVal(val) {
        function dealDate(times) {
          if (times[0] == '' && times[1] == "") {
            return ""
          } else {
            return moment(times[0]).format("YYYY年MM月DD日HH时") + ' 至 ' + moment(times[1]).format("YYYY年MM月DD日HH时");
          }
        }

        if (this.label) {
          switch (this.label) {
            case 'currentTime':
              let time = moment(new Date()).format("YYYY年MM月DD日");
              let real = this.infoData;
              if (this.prop.indexOf('.') != -1) {
                let params = this.prop.split('.');
                while (params.length > 0) {
                  real = real[params.shift()];
                }
              } else {
                real = this.infoData[this.prop];
              }
              real = time;
              return time;
              break;
            case 'checkbox':
              let checkBoxData = val;
              let check = '';
              checkBoxData.forEach(item => {
                check += item + ','
              })
              return check.substring(check.length - 1, 0);
              break;
            case 'Reform':
              if (val === 1) {
                return "是"
              } else {
                return "否"
              }
              break;
            case 'isOut':
              if (val === 1) {
                return "有"
              } else {
                return "无"
              }
              break;
            case 'boolean':
              //note 下拉框枚举值处理 通过value显示对应的label
              let val1 = val, params = this.itemProp.split('.')[1],
                cache = this.infoData.templateCache, returnVal = '';
              if (cache[params]) {
                cache[params].forEach(item => {
                  if (item.value == val1) {
                    returnVal = item.label;
                  }
                })
              }
              return returnVal
              break;
            case 'date':
              //note 时间数组
              let times = val;
              if (times[0] == '' && times[1] == "") {
                return ""
              } else {
                return moment(new Date(times[0])).format("YYYY年MM月DD日") + ' 至 ' + moment(new Date(times[1])).format("YYYY年MM月DD日");
              }
              break;
            case 'dateWithHour':
              return dealDate(val);
              break;
            case 'dataList':
              let res = '';
              val.map((item) => {
                res += dealDate(item) + '\n';
              });
              return res;
              break;
            case 'single':
              //note 单个时间
              return val == '' ? '' : moment(new Date(val)).format("YYYY年MM月DD日");
              break;
            case 'select':
              let paramSelect = this.itemProp && this.itemProp.split('.')[1];
              if (this.infoData.templateCache[paramSelect]) {
                this.infoData.templateCache[paramSelect].forEach(item => {
                  if (item.value == val) {
                    this.flag = item.label;
                  }
                })
              } else if (this.itemPropList) {
                this.itemPropList.forEach(item => {
                  if (item.value == val) {
                    this.flag = item.label;
                  }
                })
              }
              return this.flag;
              break;
            case 'checkboxMultipleRadio':
              //note 道路运输事项多选套单选第三步数据回显
              let flag = ''
              let paramchecked = this.itemProp.split('.')[1];
              if (this.infoData.templateCache[paramchecked]) {
                for (let i of val) {
                  for (let j of this.infoData.templateCache[paramchecked]) {
                    if (i.checkValue == j.value) {
                      flag += j.label;
                      if (j.radioList) {
                        j.radioList.forEach((e) => {
                          if (i.radioValue == e.value) {
                            flag += "（" + e.name + "）";
                          }
                        })
                      }
                      flag += "；"
                    }
                  }
                }
                flag = flag.slice(0, flag.length - 1)
              }
              return flag;
              break;
            case 'checkboxMultiple':
              //note 食品经营许可证第三步数据回显
              let flag1 = ''
              let paramchecked1 = this.itemProp.split('.')[1];
              if (this.infoData.templateCache[paramchecked1]) {
                for (let i of val) {
                  for (let j of this.infoData.templateCache[paramchecked1]) {
                    if (i == j.value) {
                      flag1 += j.label;
                      flag1 += "；"
                    }
                  }
                }
                flag = flag1.slice(0, flag1.length - 1)
              }
              return flag;
              break;
            case 'checkboxMultipleCanyin':
              //note 小餐饮第三步数据回显
              let flag2 = '';
              let paramchecked2 = this.itemProp.split('.')[1];
              if (this.infoData.templateCache[paramchecked2]) {
                val.split("").forEach((e, index) => {
                  if (index < val.length - 1 && e == '1') {
                    flag2 += this.infoData.templateCache[paramchecked2][index].label;
                    flag2 += "；"
                  }
                  if (index == val.length - 1 && e == "1") {
                    flag2 += this.infoData.FWQT;
                    flag2 += "；"
                  }
                })
                flag = flag2.slice(0, flag2.length - 1)
              }
              return flag;
              break;
            case 'table':
              //note 隐藏cell-item 显示table
              if (this.showFlagA) {
                if (this.showFlagA.key) {
                  let arr = this.showFlagA.key.split('.');
                  console.log(arr,this.infoData[arr[0]][arr[1]],this.showFlagA.value)
                  if (this.infoData[arr[0]][arr[1]] == this.showFlagA.value) {
                    this.showTable = false
                    this.show1 = false
                  }
                }
              }
              this.show = false;
              //note 隐藏cell 标题
              if (this.tit || this.isTitle) {
                this.show1 = false;
              }
              break;
            default:
              return val;
              break;
          }
        } else if (this.unit) {
          //note 展示需要加单位的时候
          return val + `${this.unit}`;
        } else {
          return val;
        }
      },
      //note 联动的显隐 this.span  当前cell-item的数据
      showCellItem() {
        if (this.span.showFlag) {
          let current = this.checkShowFlagArray(this.span.showFlag, this.span.showFlagType);
          return current
        } else if (this.span.show) {
          let val = this.span.show.value, val1 = this.infoData[this.span.show.type];
          let sign = this.span.show.showType;
          //either 这种情况是存在的时候显示  其余情况则是存在的时候隐藏
          let splitFullModalVals, splitValues;
          if (sign === 'either') {
            this.explicitConcealed = false;
            switch (this.span.show.dataType) {
              case 'single2array':
                splitFullModalVals = val1.split(",");
                if (splitFullModalVals.includes(val)) {
                  this.explicitConcealed = true;
                }
                break;
              case 'array2arrayContain':
                splitFullModalVals = val1.split(",");
                splitValues = val.split(",");
                splitFullModalVals.forEach(o => {
                  if (splitValues.includes(o)) {
                    this.explicitConcealed = true;
                  }
                })
                break;
              case 'array2arrayBeContain':
                splitFullModalVals = val1.split(",");
                splitValues = val.split(",");
                splitValues.forEach(o => {
                  if (splitFullModalVals.includes(o)) {
                    this.explicitConcealed = true;
                  }
                })
                break;
              case 'array2single':
              default:
                if (val.indexOf(",") !== -1) {
                  //存在.
                  let splitVal = val.split(",");
                  splitVal.forEach(item => {
                    if (val1 == item) {
                      this.explicitConcealed = true
                    }
                  })
                } else {
                  if (val1 == val) {
                    this.explicitConcealed = true
                  }
                }
                break;
            }

          } else {
            if (val.indexOf(",") !== -1) {
              //存在.
              let splitVal = val.split(",");
              splitVal.forEach(item => {
                if (val1 == item) {
                  this.explicitConcealed = false
                }
              })
            } else {
              if (val1 == val) {
                this.explicitConcealed = false
              }
            }
          }
        }
      },
      checkShowFlagArray(array, type) {
        let result;
        if (type === 'either') {
          result = false;
          array.forEach(item => {
            if (this.fullModel[item.key] == item.value) {
              result = true;
            }
          })
        } else {
          result = true;
          array.forEach(item => {
            if (this.fullModel[item.key] != item.value) {
              result = false;
            }
          })
        }
        return result;
      }
    },
    data() {
      return {
        className: 'cell-item',
        flag: '',
        show: true,
        show1: true,
        //显隐
        explicitConcealed: true,
        showTable: true
      }
    },
    created() {
      // this.showCellItem();
    }
  }
</script>
<style lang="less">
  .ivu-tooltip-inner-with-width{
    word-wrap:break-word;
  }
</style>
