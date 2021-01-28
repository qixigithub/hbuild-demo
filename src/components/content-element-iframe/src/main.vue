<template>
  <iframe ref="iframe" :src="realModel.url||''" width="100%" height="500px" frameborder="none"></iframe>

</template>

<script>
import PtMixins from '../../../libs/mixins'
export default {
    name: 'TyContentElementIframe',
    mixins: [PtMixins.component],
  methods: {
    postMessageHandler(e) {
      if (e.data.type === 'payRedirect') {
        location.reload();
        top.location.href = e.data.url;
      }
    }
  },
  created() {
    window.addEventListener('message', this.postMessageHandler)
  },
  destroyed() {
    window.removeEventListener('message', this.postMessageHandler)
  }
}
</script>

<style scoped>
  .ty-content-element-iframe {
    width: 100%;
    height: 100%;
  }
</style>

