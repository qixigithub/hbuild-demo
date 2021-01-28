<template>
  <div class="rebirthRadio">
    <Row :gutter="16" style="margin-top: 8px">
      <Col span="6" v-for="item,index in rebirthStepData" :key="index">
        <div class="step" @click="check(item.id)" :class="{active: item.id == curId}">
          <p>{{item.content}}</p>
          <img class="angle" src="../../../images/u1380.png">
          <img class="right" src="../../../images/u1382.png">
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TySpecialRadio',
    mixins: [PtMixins.component],
    props: {
      rebirthStepData: {
        type: Array
      },
      value: [Number, String]
    },
    data() {
      return {
        curId: null // 当前选择的一项的id
      }
    },
    methods: {
      // note 点击单选框进行的操作
      check(curId) {
        this.curId = curId;
        this.$emit("input", curId)
      }
    },
    created() {
      this.curId = this.value
    }
  }
</script>

