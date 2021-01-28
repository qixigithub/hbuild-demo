<template>
  <div>
    <div class="demo-upload-list" v-for="item in getPicList">
      <template v-if="item.status === 'finished'">
        <img :src="item.fileUrl" style="width: 120px;">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.fileUrl)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <div class="showProgress" style="background:white;padding:0px">
          <i-circle :percent="item.percent">
            <span class="demo-Circle-inner" style="font-size:24px"> {{Number(item.percent).toFixed(0)+"%"}}</span>
          </i-circle>
        </div>
      </template>
    </div>
    <div class="ivu-upload" :style="style">
      <div class="ivu-upload ivu-upload-drag">
        <div style="line-height: 20px;">
          <img class="defaultPic" src="../../../images/u882.svg" alt=""
               style="padding-top: 30px;width: 24px;">
          <img class="mouseHoverPic" src="../../../images/u882_mouseOver.svg" alt=""
               style="padding-top: 30px;width: 24px;">
          <p style="margin-top: 10px;">上传文件</p></div>
        <input :id=uploadId type="file"
               style="display:block;font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"
               multiple="" accept="">
      </div>
    </div>
    <div ref="images" v-viewer.static="{navbar: 0,title: funTitle}" v-show="false">
      <img :src="imgUrl" width="500px">
    </div>

    <p :style="pStyle">
      <Icon type="ios-information-circle-outline" style="font-size: 16px"/>
      您上传的附件有误，请上传正确信息，如继续上传可能会影响审批结果！
      <Icon type="ios-close" style="color: #cccccc; font-size: 24px" @click="hideInfo"/>
    </p>
    <p :title="item.name.length>46? item.name:''" style="marginTop:'8px';color: rgb(102, 102, 102)"
       v-for="item in getFileList">
      <template v-if="item.status === 'finished'">
        <img src="../../../images/p0.svg" style="width: 16px;vertical-align: text-bottom"
             v-if="item.name.split('.')[item.name.split('.').length -1].toLowerCase() == 'doc'||item.name.split('.')[item.name.split('.').length -1].toLowerCase() == 'docx'">
        <img src="../../../images/p1.svg" style="width: 16px;vertical-align: text-bottom"
             v-if="item.name.split('.')[item.name.split('.').length -1].toLowerCase() == 'xls'||item.name.split('.')[item.name.split('.').length -1].toLowerCase() == 'xlsx'">
        <img src="../../../images/p2.svg" style="width: 16px;vertical-align: text-bottom"
             v-if="item.name.split('.')[item.name.split('.').length -1].toLowerCase() == 'pdf'">
        {{item.name.length>46?item.name.slice(0,46)+'...':item.name}}
        <Icon type="ios-close" style="color: #cccccc; font-size: 24px;margin-right: 10px" @click="deleteFile(item)"/>
      </template>
      <template v-else>
        <div class="showProgress" style="background:white;padding:0px">
          <Progress :percent="getNumFixed(item.percent)"/>
        </div>
      </template>
    </p>

    <div :id=getUploadDialog class="ivu-spin-fullscreen-wrapper" style="display: none;z-index: 100;">
      <div class="ivu-modal-mask upload-ivu-modal-mask">

      </div>
      <div class="uploadDialog">
        <div class="ivu-spin-main" style="width: 130px;height: 130px;">


          <template v-if="Number(getPercent).toFixed(0) !=100">
            <i-circle :percent="getPercent">
              <span class="demo-Circle-inner upload-demo-Circle-inner " style="color: #2D8CF0 !important;"> {{Number(getPercent).toFixed(0)+"%"}}</span>
            </i-circle>
          </template>
          <template v-else>
            <i-circle :percent="getPercent" stroke-color="#3BAB78">
              <Icon type="ios-checkmark" size="100" style="color:#2D8CF0"></Icon>
            </i-circle>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import PtMixins from '../../../libs/mixins'
  import plupload from 'plupload'

  export default {
    name: 'TyUploads',
    mixins: [PtMixins.component],
    props: {
      uploadId: {
        type: String,
        default() {
          return '1'
        }
      },
      defaultList: {
        type: Array,
        default() {
          return []
        }
      },
      picNum: {
        type: String,
        default() {
          return '1'
        }
      },
      uploadProp: {
        type: Object,
        default() {
          return {}
        }
      },
      upType: {
        type: String
      },
      serviceCode: {
        type: String
      }
    },
    computed: {
      getUploadDialog() {
        return "dialog" + this.uploadId
      },
      getPercent() {
        return this.picProecss
      },
      getPicList() {
        return this.picList
      },
      getFileList() {
        return this.fileList
      }
    },
    data() {
      return {
        picProecss: 0,//标记图片的进度
        accessid: this.$store.state.common&&this.$store.state.common.uploadConfigInfo.accessid,
        policy: this.$store.state.common&&this.$store.state.common.uploadConfigInfo.policy,
        signature: this.$store.state.common&&this.$store.state.common.uploadConfigInfo.signature,
        dicPath: this.$store.state.common&&this.$store.state.common.uploadConfigInfo.dir + "/",//文件上传目录 uploads/tmp/
        host: this.$store.state.common&&this.$store.state.common.uploadConfigInfo.host,//上传主机地址
        fileName: '',//设置全局文件名称
        isMultiple: false,
        style: {
          display: 'inline-block',
          position: 'relative'
        },
        pStyle: {
          marginTop: '8px',
          color: '#F85555',
          display: 'none'
        },
        uploadList: [],
        fileList: [],
        picList: [],
        imgUrl: '',
        limitType: ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'doc', 'xlsx', 'xls']
      }
    },

    methods: {
      funTitle(a) {
        let arr = a.src.split('/');
        let length = arr.length;
        return decodeURI(arr[length - 1]);
      },
      showUploadDialog() {
        let uploadDialog = document.getElementById(this.getUploadDialog);
        uploadDialog.style.display = "block";
      },
      hideUploadDialog() {
        let uploadDialog = document.getElementById(this.getUploadDialog);
        uploadDialog.style.display = "none";
      },
      //去掉小數
      getNumFixed(num) {
        return Number(num.toFixed(0));
      },
      getFileType: function (name) {
        let fileType = true;//默认true是图片，false是文件
        let nameSplitLength = name.split('.').length - 1;//分割文件名，取最后一个
        if (name.split('.')[nameSplitLength].toLowerCase() == 'png' || name.split('.')[nameSplitLength].toLowerCase() == 'jpg' || name.split('.')[nameSplitLength].toLowerCase() == 'jpeg') {

        } else {
          fileType = false;
        }
        return fileType;
      },
      initPlUploader() {
        let _this = this
        this.plUploader = new plupload.Uploader({
          runtimes: 'html5,flash,silverlight,html4',
          url: 'http://oss.aliyuncs.com',
          browse_button: _this.uploadId,
          multi_selection: false,//一次最多上传文件个数
          filters: {
            mime_types: [
              {title: '文件类型', extensions: 'jpg,jpeg,png,pdf,docx,doc,xlsx,xls'}
            ],
            max_file_size: '60mb',
            prevent_duplicates: true
          },
          init: {
            FilesAdded: function (up, files) {
              console.log('有新文件添加至队列')
              up.start();
            },
            BeforeUpload: this.beforeUpload,
            UploadProgress: this.uploadProgress,
            FileUploaded: this.fileUploaded,
            uploadError: this.uploadError,
            Error: this.error
          }
        })
        this.plUploader.init()
      },
      uploadError(file, err) {
        //当文件上传出错时触发
        debugger;

      },
      set_upload_param(up, filename, ret) {
        let json = {
          name: filename,
          key: _this.dicPath + filename,
          host: _this.host,
          accessid: _this.accessid,
          policy: _this.policy,
          signature: _this.signature
        }
        let new_multipart_params = {
          'key': json.key,
          'policy': json.policy,
          'OSSAccessKeyId': json.accessid,
          'success_action_status': '200', //让服务端返回200,不然，默认会返回204
          'signature': json.signature,
        };
        up.setOption({
          'url': json.host,
          'multipart_params': new_multipart_params
        });
        up.start();
      },
      handleView(name) {
        this.imgUrl = name;
        const viewer = this.$refs.images.$viewer;
        viewer.show()
      },
      uploadProgress: function (up, file) {
        console.log("file.percent:" + file.percent);
        this.jindu1 = file.percent;
        //这里面设置进度条，双向数据绑定进度
        this.picProecss = file.percent;

      },
      handleRemove(file) {
        this.ProcceedsService && this.ProcceedsService.deleteAttach({uuid: file.unid}).then(data => {
          this.picList.splice(this.picList.indexOf(file), 1)
          this.uploadList.splice(this.uploadList.indexOf(file), 1)
          this.style.display = 'inline-block'
          PtUtils.util.alert({type: 'success', content: "删除成功!"});
          this.$emit('check');
          this.sendDataToTable()
        })
      },
      fileUploaded: function (up, file, info) {
        up.removeFile(file);
        if (info.status == 200) {
          let filePath = this.host + "/" + this.dicPath + file.name;
          let fileName = file.name;

          let newFilePath = this.host + "/" + this.dicPath + file.name;
          let newFileName = file.name;
          //更新图片列表和文件列表的状态
          console.log('upload to oss success, object name:' + file.name);
          clearTimeout(timeout);
          console.log(file)
          let filePathUpload = this.dicPath + file.name;
          this.uploadProp.name = fileName
          this.uploadProp.fileUrl = filePathUpload
          this.uploadProp.ossId = filePath
          this.uploadProp.amount = this.uploadList.length
          this.uploadProp.ext = fileName.split('.')[fileName.split('.').length - 1]
          this.uploadProp.serviceCode = this.serviceCode
          this.uploadProp.takeType = 2
          //   file.fileUrl = filePath
          this.hideUploadDialog();
          this.ProcceedsService && this.ProcceedsService.uploadAttach(this.uploadProp).then(data => {
            /*
            1、需求修改，把添加文件放在上传成功之后
            */
            file.name = newFileName;
            file.status = 'finished';
            file.fileUrl = newFileName;
            file.ossId = newFileName;
            file.unid = data.unid;
            if (this.getFileType(file.name)) {
              //true  img
              this.picList.push(file);
            } else {
              this.fileList.push(file);
            }

            this.uploadList.push(file);
            let uploadListIndex = this.uploadList.length - 1;
            this.uploadList[uploadListIndex].name = fileName
            this.uploadList[uploadListIndex].fileUrl = filePath
            this.uploadList[uploadListIndex].ossId = filePath
            this.$emit('singleData', data);
            this.uploadList[uploadListIndex].unid = data.unid

            this.sendDataToTable()
          }).catch(data => {
            console.log(data);
            if (this.getFileType(fileName)) {
              this.picList.splice(this.picList.indexOf(file), 1);
            } else {
              this.fileList.splice(this.fileList.indexOf(file), 1);
            }
            if (data.message === 'Network Error') {
              PtUtils.util.alert({
                type: 'error',
                content: '登录失效, 请重新登录'
              });
            }
            util&&util.login()
          });
        }
        else {
          console.log('非成功:' + info.response);
          if (this.getFileType(file.name)) {
            this.picList.splice(this.picList.indexOf(file), 1);
          } else {
            this.fileList.splice(this.fileList.indexOf(file), 1);
          }
        }
      },
      error: function (up, err) {
        //当validate不通过时，会以派送错误事件的形式通知调用者。通
        console.log("\nError xml:" + err.response);
        this.hideUploadDialog();
        if (err.code == "-601") {
          //文件拓展名非我們要的 比如上传.gif
          clearTimeout(timeout);
          this.pStyle.display = 'block'
          return;
        }
        if (err.code == "-200") {
          //网络异常，出现断网或者类似情况
          if (this.getFileType(this.fileName)) {
            this.picList.splice(this.picList.length - 1, 1);
          } else {
            this.fileList.splice(this.fileList.length - 1, 1);
          }
          clearTimeout(timeout);
          PtUtils.util.alert({type: 'error', content: "网络异常,请检查!"});
        }
        /* */
        this.pStyle.display = 'block'
      },
      handleMaxSize(file) {
        PtUtils.util.alert({type: 'error', content: '上传文件最多不能超过60M'});
      },
      beforeUpload: function (up, file) {
        if (this.uploadList.length == this.picNum) {
          this.style.display = 'none'
        }
        let _this = this;
        this.fileName = file.name;
        const check = (this.uploadList.length) < this.picNum;
        if (!check) {
          PtUtils.util.alert({type: 'error', content: '最多上传' + this.picNum + '个文件'});
          up.removeFile(file);
        } else {
          file.status = 'unFinished'
          file.percent = 0
          this.set_upload_param(up, file.name, true);
          this.showUploadDialog();
          //note 上传超时处理
          CancelToken = axios.CancelToken;
          source = CancelToken.source();
          timeout = setTimeout(() => {
            source.cancel();
            _this.hideUploadDialog();
            PtUtils.util.alert({type: 'error', content: "上传超时,请重试!"});
            up.removeFile(file);
            clearTimeout(timeout);
          }, 1000 * 120)
        }
        return check;
      },
      hideInfo() {
        this.pStyle.display = 'none'
      },
      deleteFile(file) {
        this.ProcceedsService && this.ProcceedsService.deleteAttach({uuid: file.unid}).then(data => {
          this.fileList.splice(this.fileList.indexOf(file), 1);
          this.uploadList.splice(this.uploadList.indexOf(file), 1);
          this.style.display = 'inline-block'
          PtUtils.util.alert({type: 'success', content: "删除成功!"});
          this.sendDataToTable()
        })
      },
      uploading() {
        if (this.uploadList.length == this.picNum) {
          this.style.display = 'none'
        }
      },
      sendDataToTable() {
        this.$emit('getData', this.uploadList)
      }
    },
    created() {
      if (this.picNum > 1) {
        this.isMultiple = true
      }
      if (this.upType) {
        this.limitType = this.upType.split(',')
      }
    },
    mounted() {
      this.uploadList = this.defaultList;
      for (let i in this.uploadList) {
        let fileLength = this.uploadList[i].name.split('.');
        const ext = fileLength[fileLength.length - 1];
        this.uploadList[i].status = 'finished'
        if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
          this.picList.push(this.uploadList[i])
        } else {
          this.fileList.push(this.uploadList[i])
        }
      }
      if (this.uploadList.length == this.picNum) {
        this.style.display = 'none'
      }
      this.initPlUploader();
    }
  }
</script>

<style lang="less">
  .mouseHoverPic {
    display: none;
  }

  .ivu-upload-drag:hover {
    border: 1px dashed #4a89dc;
  }

  .ivu-upload-drag:hover .defaultPic {
    display: none;
  }

  .ivu-upload-drag:hover .mouseHoverPic {
    display: inline-block;
  }

  .ivu-upload-drag:hover p {
    color: #4a89dc;
  }

  .upload-ivu-modal-mask {
    z-index: 100 !important;
    /* opacity: 0.16 !important;*/
  }

  .uploadDialog {
    position: absolute;
    top: 438px;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  .ivu-icon-ios-eye-outline {
    line-height: 120px;
  }

  .bgGray {
    background-color: #f1f1f1 !important;
    opacity: .5;
    z-index: 1000 !important;
  }

  .ivu-chart-circle {
    display: inline-block;
    position: relative;
    width: 130px !important;
    height: 130px !important;
    background: white;
    border-radius: 50%;
  }

  .ivu-chart-circle-inner {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50% !important;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .demo-Circle-inner {
    font-size: 14px !important;
  }

  .upload-demo-Circle-inner {
    font-size: 24px !important;
    color: #2D8CF0;
  }

  .demo-upload-list {
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #999;
    font-size: 24px;
    cursor: pointer;
    margin: 0 2px;
  }

  .demo-upload-list-cover i:first-child {
    font-size: 40px;
  }

  .demo-upload-list-cover i:last-child {
    position: absolute;
    left: 4px;
    top: 4px;
  }

  .demo-upload-list-cover i:first-child:hover,
  .demo-upload-list-cover i:last-child:hover {
    color: #fff;
  }
</style>

