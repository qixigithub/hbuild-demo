<template>
  <div class="attachment-wrap">
    <div class="attachmentHeader" v-show="showHeader">
      <p>{{headerTitle}}</p>
    </div>
    <div class="attachment" v-for="(item,index) in realModel" :key="index">
      <!--<span class="title">{{item.attrName}} -&#45;&#45; {{item.name}}</span>-->
      <span class="title">《{{item.attrName}}》   （{{item.name}}）</span>
      <div class="btn-group">
        <!--<Button class="btn"  v-for="(button,index) in realBtn" :key="index" @click="allClick(button.flag,item)" >{{button.name}}</Button>-->
        <Button class="btn" @click="downLoad(item.fileUrl,item)">下载附件</Button>
      </div>
      <Modal
        title="Title"
        v-model="show"
        width="600px"
        class-name="i-picture">
        <img v-bind:src="urlImg" width="600px" height="600px"/>
      </Modal>
    </div>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'

  export default {
    name: 'TyAttachment',
    mixins: [PtMixins.component],
    props: {
      headerTitle: {
        type: String
      },
      showHeader: {
        type: Boolean,
        default: false
      },
      btnData: {
        type: Object
      }
    },
    computed: {
      //note 最终真是绑定对象获取
      realState() {
        return this.fullModel.state.charAt(0);
      },
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
      },
      realBtn() {
        if (this.fullModel.state === undefined) {
          return {};
        } else {
          if (this.btnData[this.fullModel.state]) {
            return this.btnData[this.fullModel.state]
          } else {
            if (this.realState === '3') {
              return this.btnData['more']
            } else {
              return {};
            }
          }
        }
      }
    },
    methods: {
      allClick(flag, data) {
        flag === 'see' ? this.see(data.fileUrl) : this.downLoad(data.fileUrl, data)
      },
      see(url) {
        this.show = true;
        this.urlImg = url;
      },
      downLoad(url, data) {
        window.open(encodeURI(Config.api('file/dowloadFile?fileName=' + url + '&realfileName=' + data.name)))
        // let index = url .lastIndexOf("\/");
        // let str  = url .substring(index + 1, url .length);
        // window.location.href=window.location.href.split("#")[0]+'file'+'/'+'dowloadFile?'+'fileName='+str+'&&realfileName='+data.name;
      }
    },
    data() {
      return {
        urlImg: '',
        show: false
      }
    }
  }
</script>

