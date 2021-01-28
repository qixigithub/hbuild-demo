<template>
  <div class="ty-component-element-title">
    <div class="title">
      <template v-if="anchorLink">
        <a :href="anchorLink" :id="anchor">
          {{title}}
        </a>
      </template>
      <template v-else>
        {{title}}
      </template>
    </div>
    <Divider v-if="divider" dashed></Divider>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'
  export default {
    name: 'TyContentElementTitle',
    mixins: [PtMixins.component],
    props: {
      //note 标题
      title: {
        type: String,
        default: ''
      },
      //note 是否使用锚点
      anchor: {
        type: String,
        default: ''
      },
      //note 是否有分割线
      divider: {
        default: true
      }
    },
    data() {
      return {}
    },
    computed: {
      //note 获取锚点链接
      anchorLink() {
        if (this.anchor && this.anchor !== '') {
          return `#${this.anchor}`
        }
        return false
      }
    }
  }
</script>

