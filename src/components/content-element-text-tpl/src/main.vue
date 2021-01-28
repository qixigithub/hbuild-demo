<template>
  <div class="textTpl">
    <p>{{content}}</p>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyContentElementTextTpl',
    mixins: [PtMixins.component],
    props: {
      contentType: {
        type: String
      }
    },
    data() {
      return {
        content: ''
      }
    },
    methods: {
      onChange() {
        if (this.contentType == 'commitment') {
          this.content = this.realModel.applyName + this.realModel.legalMan + '承诺所填写各项内容真实、准确、完整，如存在弄虚作假，隐瞒欺骗等情况及由此导致的一切后果由' + this.realModel.applyName + this.realModel.legalMan + '承担全部责任。'
          this.realModel.commitment = this.content
        }
      },
      replaceTxt(value) {
        const txt = value || this.realModel.templateCache.commitment;
      }
    },
    created() {
      if (this.contentType == 'commitment') {
        this.content = this.realModel.applyName + this.realModel.legalMan + '承诺所填写各项内容真实、准确、完整，如存在弄虚作假，隐瞒欺骗等情况及由此导致的一切后果由' + this.realModel.applyName + this.realModel.legalMan + '承担全部责任。'
        this.realModel.commitment = this.content
      }
      if (this.contentType == 'commitmentLetter') {
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.content = '本公司于' + year + '年' + month + '月' + day + '日签署发布了突发环境事件应急预案，备案条件具备，备案文件齐全，先报送备案；本单位承诺，本单位在办理备案中所提供的相关文件及其信息均经本单位确认真实，无虚假，且未隐瞒事实。'
        this.realModel.commitmentLetter = this.content
      }
      this.replaceTxt();
      PtUtils.bus.$on('changeLegal', this.onChange);
    }
  }
</script>

<style lang="less">
  .textTpl {
    textarea {
      height: 100%;
      width: 100%;
      padding-left: 8px;
    }
  }
</style>

