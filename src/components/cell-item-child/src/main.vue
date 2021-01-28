<template>
  <Card :title="child.title" class="cell-item" :dis-hover="hover">
    <span>{{child.value}}</span>
  </Card>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyCellItemChild',
    mixins: [PtMixins.component],
    props: {
      hover: {
        type: Boolean,
        default: true
      },
      child: {
        type: Object
      }
    }
  }
</script>

