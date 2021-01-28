<template>
  <div class="ty-steps">
    <Steps v-bind="$props" style="margin-bottom: 20px;">
      <Step v-for="step,index in steps" v-bind="step" :key="index"/>
    </Steps>
  </div>
</template>

<script>
import PtMixins from '../../../libs/mixins'
export default {
    name: 'TySteps',
    mixins: [PtMixins.component],
    props:{
    current:0,
    steps:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

