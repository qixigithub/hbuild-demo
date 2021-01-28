<template>
  <div class="licenceBox" v-bind="realModel">
    <div class="picBox fl">
      <img src="../../../images/u4329.svg">
    </div>
    <div class="licenceContent fl">
      <p>{{title}}</p>
      <p class="validTime"></p>
      <p class="detail"></p>
      <Button @click="downLoad(fullModel.fileUrlZz)">{{btnName}}</Button>
      <Button class="send" @click="sendCard">邮寄证照</Button>
    </div>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyPapDownloadScan',
    mixins: [PtMixins.component],
    props: {
      title: {
        type: String
      },
      btnName: {
        type: String
      },
      detailWarn: {
        type: String
      },
      detail: {
        type: String
      }
    },
    data() {
      return {
        modal1: false,
        downUrl: this.url,
        formData: {}
      }
    },
    computed: {
      realState() {
        if (this.fullModel.state == 0 || this.fullModel.state == 23 || this.fullModel.state == 34 || this.fullModel.fileUrlZz == undefined) {
          return false
        } else {
          return true
        }
      },
      //note 最终真是绑定对象获取
      realModel() {
        if (this.fullModel === undefined) {
          return {};
        }
        if (typeof(this.model) === 'string') {
          if (this.model === '$root') {
            return this.fullModel;
          }
          let params = this.model.split('.');
          let result = this.fullModel;
          while (params.length > 0) {
            result = result[params.shift()];
          }
          return result;
        } else if (typeof(this.model) === 'object') {
          return this.model;
        } else if (typeof(this.model) === 'array') {
          return this.model;
        }
        return {};
      }
    },
    methods: {
      sendCard() {
        this.$router.push({
          name: 'home-member-center-sendCard',
          query: {
            projId: this.fullModel.projId,
            name: this.$route.query.name
          }
        })
      },
      downLoad(url) {
        window.open(url)
        // window.location.href=url;
      },
      ok() {
        this.CommonService &&this.CommonService.downLoad(this.downUrl, this.formData).then(() => {

        })
      },
      cancel() {
      }
    }
  }
</script>

