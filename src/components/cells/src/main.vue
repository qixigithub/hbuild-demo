<template>
  <div class="cells">
    <div v-for="(item,index) in cellData" :key="index">
      <div class="cellHeader" v-show="item.showHeader">
        <p>
          {{item.headerTitle}}
          <span v-if="item.moreTitle=='date'">
               集体合同签订时间:{{moment(fullModel[item.moreTitle]).format("YYYY年MM月DD日")}}
          </span>
        </p>
      </div>
      <Row>
        <template v-if="item.same">
          <Col v-for="(cell,index) in dataArray" :key="index" :span="cell.span?cell.span:6">
            <ty-cell-item-child :child="cell" :infoData="fullModel"></ty-cell-item-child>
          </Col>
        </template>
        <template v-else>
          <Col v-for="(cell,index) in item.data" :key="index" :span="cell.span?cell.span:6">
            <ty-cell-item v-bind="cell" :infoData="fullModel" :span="cell"></ty-cell-item>
          </Col>
        </template>
      </Row>
      <div class="cellFooter" v-show="item.showFooter">
        <p v-if="realShow">
          参考费用：{{fullModel.fee|money}}元
        </p>
        <p v-else>
          支付金额：{{fullModel.fee|money}}元
        </p>
      </div>
    </div>
    <div v-if="arrow">
      <Icon type="ios-arrow-up" size="18" color="darkgray" v-show="flag===false" @click="up"/>
      <Icon type="ios-arrow-down" size="18" color="darkgray" v-show="flag===true" @click="down"/>
    </div>
    <div class="cellFooter" v-show="footer">
      <p v-if="realShow">
        参考费用：{{fullModel.fee|money}}元
      </p>
      <p v-else>
        支付金额：{{fullModel.fee|money}}元
      </p>
    </div>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyCells',
    mixins: [PtMixins.component],
    props: {
      footer: {
        type: Boolean,
        default: false
      },
      arrow: {
        type: Boolean,
        default: true
      },
      basicInfo: {
        type: Object,
      }
    },
    computed: {
      realModel() {
        return this.basicInfo;
      },
      realShow() {
        if (this.fullModel.state === '0' || this.fullModel.state === '34' || this.fullModel.state === '23' || this.fullModel.state === '1' || this.fullModel.state === '2' || this.fullModel.state === '3' || this.fullModel.state === '4' || this.fullModel.state === '330' || this.fullModel.state === '211' || this.fullModel.state === '311' || this.fullModel.state === '210' || this.fullModel.state === '310' || this.fullModel.state === '390') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      //note 收起
      up() {
        this.flag = true;
        this.changeData();
      },
      //note 展开
      down() {
        this.cellData = this.cell;
        this.cellData[0].data = this.data1;
        this.flag = false;

      },
      changeData() {
        this.cellData = this.cellData.filter((item, index) => {
          return index < 1;
        })
        this.cellData[0].data = this.cellData[0].data.filter((item, index) => {
          return index < this.num1;
        })
      },
      getData() {
        this.cell = this.realModel.cells;
        this.cellData = this.realModel.cells;
        this.data1 = this.realModel.cells[0].data;
      },
      init() {
        this.fullData = this.fullModel.templateCache;
        if (this.fullData) {
          if (this.fullData.tableExact) {
            let columns = this.fullData.tableExact.columns;
            let data = this.fullModel[this.fullData.tableExact.data];
            data.forEach(item => {
              columns.forEach(val => {
                this.dataArray.push({title: val.title, value: item[val.prop]});
              })
            })
            //单个枚举值处理
            if (this.fullData.tableExact.label) {
              let label = this.fullData[this.fullData.tableExact.label];
              this.dataArray.forEach(item => {
                label.forEach(val => {
                  if (item.value == val.value) {
                    console.log(val.label);
                    item.value = val.label;
                  }
                })
              })
            }
          }
        }
      }
    },
    data() {
      return {
        dataArray: [],
        flag: true,
        cellData: [],
        data1: [],
        cell: [],
        sum: 0,
        num: 0,
        sum1: 0,
        num1: 0,
        templateCache: '',
        fullData: ''
      }
    },
    created() {
      this.getData();
      this.cellData.forEach(item => {
        if (this.sum > 48 || this.sum > 48) {
          return false;
        } else {
          item.span ? this.sum += item.span : this.sum += 6;
          this.num++;
        }
      })
      this.cellData[0].data.forEach(item => {
        if (this.sum1 === 48 || this.sum1 > 48) {
          return false;
        } else {
          item.span ? this.sum1 += item.span : this.sum1 += 6;
          this.num1++;
        }
      })
      this.changeData();
      this.init();
      // console.log(this.realShow)
    }
  }
</script>

