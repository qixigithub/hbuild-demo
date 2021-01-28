<template>
  <div class="print-config-style">
    <div class="print-config-nav">
      <Select v-model="fontFamily" size="small" style="width:80px" @on-change='setFontFamily'>
        <Option v-for="item in fontList" :value="item.value" :key="item.label">{{ item.label }}</Option>
      </Select>
      <Select v-model="fontSize" size="small" style="width:80px" @on-change='setFontSize'>
        <Option v-for="item in fontSizeOpts" :value="item.value" :key="item.label">{{ item.label }}</Option>
      </Select>
      <!-- <Select v-model="fontColor" size="small" style="width:80px" @on-change='setFontColor'>
        <Option v-for="item in fontColorOpts" :value="item.value" :key="item.label">{{ item.label }}</Option>
      </Select> -->
      <ColorPicker v-model="fontColor" @on-change='setFontColor' size="small" recommend />
      <Button type="primary" @click="doPrint('打印预览...')">打印预览...</Button>
      <Button type="primary" @click="doPrint('打印...')">打印...</Button>
      <Button type="primary" @click="doPrint('打印')">打印</Button>
      <!-- <Button type="primary" @click="toPrint">window打印</Button> -->
      <!-- <Button type="primary" @click="jump">查看打印页面</Button> -->
    </div>
    <div class="print-config-body">
      <!-- <div class="left-options">
        <Button type="primary" @click="addInput">增加</Button>
      </div> -->
      <div class="right-content" id="print">
        <img src="./img/1+电影放映经营许可正本.jpg" alt="" class="screen-only"/>
        <!-- <img src="../../public/img/1+电影放映经营许可正本.jpg" :width="certificateData.width" :height="certificateData.height" :alt="certificateData.name" class="screen-only"/> -->
        <div v-drag1='self' :style="it.divStyle" :data-id='i' v-for="(it,i) in inputList" :key="i">
          <pre v-html="it.value" :style="it.fontStyle" @dblclick="hiddenSpan(it)" v-if="it.showSpan"></pre>
          <Input v-model="it.value" :placeholder="it.placeHolder" @on-focus='initFont(it,i)' style="width:80px;" :style="it.fontStyle" @on-blur="showSpan(it)" v-else/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入字体配置文件 大小/颜色/字体
import fontConfig from './js/font-config'
export default {
  name: 'print-config',
  props: {
    getId: {
      //证照Id,用于获取当前证照信息
      default: '',
      type: String
    }
  },
  data () {
    return {
      self: this,// 自定义指令传递当前组件this
      inputId: 0,// 缓存当前输入框下标
      fontFamily: '宋体',//当前输入框文字字体
      fontSize: '12px',//当前输入框文字大小
      fontColor: '#000',//当前输入框文字颜色
      reqData: { // note 示例数据
        imgUrl: '../../public/img/1+电影放映经营许可正本.jpg',
        name: '电影放映经营许可正本',
        width: 1124,
        height: 780,
        inputList: [{
          id: '0',
          prop: '放证字号',
          fontStyle: {
            fontFamily: '宋体',
            fontSize: '12px',
            color: '#000'
          },
          divStyle: {
            position: 'absolute',
            left: '5px',
            top: '100px'
          },
          showSpan: false,
          value: ''
        }],
        propArr: [
          {
            id: '0',
            prop: '放证字号',
          },
          {
            id: '1',
            prop: '单位名称',
          },
          {
            id: '2',
            prop: '法人代表',
          },
          {
            id: '3',
            prop: '地址',
          },
          {
            id: '4',
            prop: '企业类型或经济性质',
          },
          {
            id: '5',
            prop: '注册资金',
          },
          {
            id: '6',
            prop: '经营项目',
          },
          {
            id: '7',
            prop: '经营区域',
          },
          {
            id: '8',
            prop: '有效期',
          },
          {
            id: '9',
            prop: '发证日期',
          }
        ]
      },
      certificateData: {// 页面配置信息
        imgUrl: '../../public/img/1+电影放映经营许可正本.jpg',
        name: '电影放映经营许可正本',
        width: 1124,
        height: 780,
        inputList: [],
        propArr: [
          {
            id: '0',
            prop: '放证字号',
          },
          {
            id: '1',
            prop: '单位名称',
          },
          {
            id: '2',
            prop: '法人代表',
          },
          {
            id: '3',
            prop: '地址',
          },
          {
            id: '4',
            prop: '企业类型或经济性质',
          },
          {
            id: '5',
            prop: '注册资金',
          },
          {
            id: '6',
            prop: '经营项目',
          },
          {
            id: '7',
            prop: '经营区域',
          },
          {
            id: '8',
            prop: '有效期',
          },
          {
            id: '9',
            prop: '发证日期',
          }
        ]
      },
      inputList: [],//页面输入框列表
      fontColorOpts: fontConfig.fontColorOpts,
      fontSizeOpts: fontConfig.fontSizeOpts,
      fontList: fontConfig.fontList
    }
  },
  directives: {
    drag1: {
      // note 拖拽指令,保存拖拽后的位置
      inserted: function (el, binding) {
        el.onmousedown = function (e) {
          //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
          el.style.cursor = 'all-scroll'
          var divx = e.clientX - el.offsetLeft;
          var divy = e.clientY - el.offsetTop;
          //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
          document.onmousemove = function (e) {
            //获取移动后div的位置：鼠标位置-divx/divy
            var l = e.clientX - divx;
            var t = e.clientY - divy;
            // el.style.left = l + 'px';
            // el.style.top = t + 'px';
            let that = binding.value
            let idx = el.getAttribute('data-id')
            that.inputList[idx].divStyle.left = l + 'px'
            that.inputList[idx].divStyle.top = t + 'px'
          }
          document.onmouseup = function (e) {
            el.style.cursor = ''
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }
      }
    }
  },
  methods: {
    getData () {
      // 请求服务获取当前证件信息 this.getId

    },
    toPrint () {
      let go = confirm("是否需要打印？");
      if (go) {
        let print = document.getElementById('print')
        let content = print.innerHTML;
        // const { href } = this.$router.resolve({ path: '/print-html', query: { html: content } });
        // window.open(href, '_blank');
        this.$router.push({ path: '/print-html', query: { html: content } })
      }
    },
    jump () {
      // note 跳转打印查看页面
      this.certificateData.inputList = this.inputList
      let certificateData = this.certificateData
      this.$router.push({
        name: 'html-view',
        params: {
          certificateData
        }
      })
    },
    doPrint (how) {
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].value) {
          this.inputList[i].showSpan = true
        }
      }
      // note 打印方法
      let html = document.getElementById('print').innerHTML;
      let myDoc = {
        inputs: true, //录入打印
        settings: {
          paperName: 'A4',
          orientationMixed: true, //纵横打印
          portrait: false // 横向打印
        },
        noMargins: true, //无边距打印
        // documents: document,
        documents: {
          html: '<div>' + html + '</div>'
        },
        enableScreenOnlyClass: true, // 确保 42行的图片不会被打印出来
        copyrights: "天源迪科"
      }
      //定义回调方法		  
      myDoc.done = function (err) {
        if (!err)
          alert('打印成功.');
        else
          alert(err);
      }
      let jcp = getJCP();
      // getJCP().print(myDoc);
      if (how == '打印预览...')
        jcp.printPreview(myDoc, false);
      else if (how == '打印...')
        jcp.print(myDoc, true);
      else
        jcp.print(myDoc);
    },
    setFontFamily (val) {
      // note 设置当前输入框对应文字字体
      this.inputList[this.inputId].fontStyle.fontFamily = val
    },
    setFontSize (val) {
      // note 设置当前输入框对应文字大小
      this.inputList[this.inputId].fontStyle.fontSize = val
    },
    setFontColor (val) {
      // note 设置当前输入框对应文字颜色
      this.inputList[this.inputId].fontStyle.color = val
    },
    initFont (item, idx) {
      // note 初始化字体调整下拉框
      this.inputId = idx
      this.fontFamily = item.fontStyle.fontFamily
      this.fontSize = item.fontStyle.fontSize
      this.fontColor = item.fontStyle.color
    },
    initInputList () {
      // note 根据数据中propArr初始化输入框inputList
      this.certificateData.propArr.forEach((item, i) => {
        let obj = {
          fontStyle: {
            fontFamily: '宋体',
            fontSize: '12px',
            color: '#000'
          },
          divStyle: {
            position: 'absolute',
            left: '-80px',
            top: 100 + 36 * i + 'px'
          },
          id: item.id,
          placeHolder: item.prop,
          showSpan: false,
          value: ''
        }
        this.inputList.push(obj)
      })
    },
    // addInput () {
    //   let idx = this.inputList.length + 1
    //   let obj = {
    //     fontStyle: {
    //       fontFamily: '宋体',
    //       fontSize: '12px',
    //       color: '#000'
    //     },
    //     divStyle: {
    //       position: 'absolute',
    //       left: '-26px',
    //       top: 36 * idx + 'px'
    //     },
    //     showSpan: false,
    //     value: ''
    //   }
    //   this.inputList.push(obj)
    // },
    showSpan (item) {
      // note 隐藏输入框显示文字
      if (item.value == '') {
        return
      }
      this.$set(item, 'showSpan', true)
    },
    hiddenSpan (item) {
      // note 隐藏文字显示输入框
      this.$set(item, 'showSpan', false)
    }
  },
  mounted () {
    this.initInputList()
  }
}
</script>

<style lang="less">
.print-config-style {
  // .print-config-nav {
  // }
  .print-config-body {
    overflow: auto;
    padding-left: 10%;
    text-align: left;
    // width: 80%;
    // height: 400px;
    .left-options {
      // display: inline-block;
      // width: 10%;
      vertical-align: top;
    }
    .right-content {
      display: inline-block;
      position: relative;
      text-align: left;
      // margin: 0 auto;
      // width: 90%;
      // height: 100%;
      // border: 1px solid #000;
      // padding-top: 5px;
      .ivu-input-wrapper {
        .ivu-input {
          font-size: inherit;
        }
      }
      .print-config-nav {
        position: absolute;
        top: -40px;
      }
    }
  }
}
</style>
