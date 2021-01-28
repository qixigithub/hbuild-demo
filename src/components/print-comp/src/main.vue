<template>
  <div class="ty-print-comp">
    <print-config :getId="'证照id'"></print-config>
  </div>
</template>

<script>
import PtMixins from '../../../libs/mixins'
import printConfig from './components/print-config'

export default {
  name: 'TyPrintComp',
  mixins: [PtMixins.component],
  components: {
    printConfig
  }
}
</script>

