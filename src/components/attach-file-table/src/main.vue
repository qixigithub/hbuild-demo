<template>
  <div class="attachFileTable">
    <ty-content-element-tip-alert :content="tipContent"></ty-content-element-tip-alert>
    <Table class="pageTable" ref="table" :columns="columns1" :data="realModel" border
           :disabled-hover=disabledHover>
    </Table>
    <!--我的资料库的模态框-->
    <Modal
      v-model="modal1"
      title="我的资料库"
      width="650px"
      class="database"
      v-if="type == 'withAction'"
      @on-ok="chooseData">
      <Alert type="warning" show-icon>请单击您要上传的附件，然后点击确定按钮</Alert>
      <div style="width: 300px; height: 36px;"><Input v-model="searchName" search enter-button placeholder="请输入上传资料名称"
                                                      @on-search="searchAttach"/></div>
      <ty-iv-table ref="table"
                v-bind="table"
                auto-load="false"
                v-on:onCurrentChange="onCurrentChange">
      </ty-iv-table>
    </Modal>
    <!--示例图片的模态框-->
    <Modal class="demoPic" v-model="modal2" title="示例图片" width="500px">
      <!--<img :src="demoPic" alt="" width="500px" height="500px">-->
      <el-carousel trigger="click" arrow="always" height="500px" width="500px" :initial-index="value">
        <el-carousel-item v-for="(item,index) in demoPic" :key="index">
          <img :src="item.url" alt="" width="500px" height="500px">
        </el-carousel-item>
      </el-carousel>
    </Modal>

    <Modal class="demoPic" v-model="modal3" title="示例图片" width="500px">
      <img :src="demoPic1" alt="" width="500px" height="500px">
    </Modal>

    <Spin size="large" fix v-if="spinShow">
      <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
      <div>审核中, 请稍等</div>
    </Spin>
  </div>
</template>

<script>
  export default {
    name: 'TyAttachFileTable',
    props: {
      //note 全量绑定数据传递
      fullModel: {
        type: [Object, Array],
      },
      //note 绑定数据参数,默认$root,绑定fullModel,可自行设定绑定参数,
      //比如设置 second则绑定fullModel.second对象
      model: {
        type: [String, Object],
        default: '$root',
      },
      type: {
        type: String
      },
      demoPicType: {
        type: Boolean
      },
    },
    data() {
      return {
        spinShow: false,
        value: 0,
        current: 0,
        singleData: '',
        disabledHover: true,
        modal1: false,
        modal2: false,
        modal3: false,
        tipContent: '',
        tableColumns: '',
        demoPic: '',
        demoPic1: '',
        dataBase: [],
        uploadProp: {},
        searchName: '',
        columns1: [
          {
            title: '附件名称',
            align: 'center',
            width: 293,
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '100%',
                  textAlign: 'left',
                  position: "relative",
                  paddingTop: "18px"
                }
              }, [
                h('p', {
                  style: {
                    fontSize: '14px',
                    marginBottom: '8px'
                  }
                }, params.row.name),
                h('Button', {
                  style: {
                    padding: '2px 8px !important',
                    display: params.row.imageList.length > 0 ? 'block' : 'none'
                  },
                  props: {
                    type: 'warning',
                    ghost: true,
                    shape: 'circle',
                    icon: 'ios-search',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // note  附件资料的示例图片
                      this.value = 0
                      this.demoPic = params.row.imageList

                      setTimeout(() => {
                        this.modal2 = true
                      }, 200)

                    }
                  }
                }, '点击查看图例'),
                h('p', {
                  style: {
                    color: '#3BAB78',
                    marginTop: '10px',
                    marginBottom: '8px',
                    display: params.row.desc.length > 0 ? 'block' : 'none'
                  }
                }, '附件要求：'),
                h('p', {
                  style: {
                    color: '#999999'
                  }
                }, params.row.desc),
                h('img', {
                  attrs: {
                    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAAEEfUpiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzk3RTlBNjVDODcxMTFFODkxRDBBRDE0NjUyMUVBOUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzk3RTlBNjZDODcxMTFFODkxRDBBRDE0NjUyMUVBOUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OTdFOUE2M0M4NzExMUU4OTFEMEFEMTQ2NTIxRUE5RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3OTdFOUE2NEM4NzExMUU4OTFEMEFEMTQ2NTIxRUE5RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhGmfXUAAAOuSURBVHjaYjzDwPCfAQiYVVQY/t65w8AAEgDhz1evgiXAAs8WL4ZwYAIMSAAggBjRBcAqfr5+/f/DyZMQCRDj1YYNuM0ACCAUM7hCQhh4nZwYXmZlgfkmQHlMS6ASKEZ+e/AA4XB0gM0EZAAQQIyEFDAhc7QePGBQ3LsXxS1MyD646eLC8O3mTQb1q1cRDgVZcbei4j8shEAYww3wuED3IswNIEmQFeiScCvw+oSQNwECCGc4gNzFbmDAwGVszPCmshKrZpxxJbdhA8PnEycYxGJjGb7fvs3w5/NnBgFbW3AwgfyD7BeUgAZ5FARAmn8CFX44eJCBTVKSQTImhuGaggKD4Z07jOgBAXaBSHs7A5uMDMMzoI286ekMLIKCDLwWFgyPAgKwBi3WMAAZwmtmxvDz2TOGDxs3QqJ+zRpGBkIAFg2w7EMo1PHGAj6nkh3PhABAADFSYgBQYyMTLklQWtB9/RqvZlMGhgacBgi5uoJp4///cWoGsVmw2fzt+nWGX0Dbmbm5Gb4/fAg2BESDEhOyZoxohOE/X7/+P6+iAi5tYBhU6typrJyBNx3cTE8H0yDNIENAAKT5sr39/9PItuIyAGQLjA0y5FpIyP8H7e24NcOiEeRvUI7jNTJieDZpEgOvjQ04X6AHGE4XwPwLS8owl+CzGaM+ANEgAAtEojQjhwHIr7Bik2jN6IEIqoxI0oxuAMmakQ0gSzPMALI1gwBFmoEAIMAoKg9ApbjawoUM1728GH4CS3BSyxK8xQEuwG5vz2Dw9Su4rAFVWiAgVVdHksWgoheWO5hI9vGaNQxPgNmNmYsLLPb32zd4uQVrPIBqGEIWY60Y8VkM8jXIx2937ABXX6DyTiwykuEvUBzUKAGVd6AqDRQyfz9+BDsCFFq4LCY5DUgtXgyu3tlERcEhAGovCFZUMEhmZIAdwSYmxnDN0hLeziFYCBFyAKiZ9fncOXiphi3xfblyheHvly8Mj4CtAQNgG+QsIyPRFsMAC3LiEggPZ2Dm5QXzb2prg+P1ZWMjgwqwpfDrxQtwEH8HOgwEQFFwx9wcrvduVdVMYFBnUJQNQT5Tnj4dHpSgRAWKX1jTGdRkg7UYsVWQ5ACUShWUyC4D4xhkMaeyMsOXCxfgIQIC0j094NYayOeUWoyzToVVyLAuAAiDqgqQOKHqkSolIah5+fftW4a/wDjW3LaN4QKwaUGNoCY5F4DSA8gRPw4epInFBB1AKx/jTYT0tJh6FTqlYMAshgIAVXZSd9TPmNUAAAAASUVORK5CYII='
                  },
                  style: {
                    position: "absolute",
                    top: "1px",
                    left: "-9px",
                    display: params.row.inneed == '必要' ? 'block' : 'none'
                  }
                })
              ])
            }
          },
          {
            title: '上传结果',
            key: 'fileUrl',
            align: 'center',
            // render: (h, params) => {
            //   // console.log(params.row.fileUrl)
            //   let _this = this
            //   if (params.row.uploadType == 'picture') {
            //     return h('Uploads',{
            //       props: {
            //         defaultList: params.row.fileUrl,
            //         picNum: params.row.num?params.row.num:'1'
            //       },
            //       on: {
            //         getData (data) {
            //           // console.log(_this.$refs.table.rebuildData)
            //           _this.realModel = _this.$refs.table.rebuildData
            //           // console.log(_this.fullModel)
            //         }
            //       }
            //     })
            //   } else {
            //     return h('Upload',{
            //       props:{
            //         action:_this.appConfig.api('','upload'),
            //         defaultFileList: params.row.fileUrl,
            //         name:'ossUpFile'
            //       },
            //       on: {
            //         'on-success': () => {
            //           console.log('上传成功')
            //         },
            //         'on-progress': () => {
            //           console.log('上传中')
            //         },
            //         'before-upload': ()=> {
            //           console.log('1111')
            //         }
            //       }
            //     },[
            //       h('Button',{
            //         props:{
            //           icon:'ios-cloud-upload-outline'
            //         },
            //         style: {
            //           border:'1px dashed #ccc',
            //           backgroundColor:'#fff',
            //           width:'120px',
            //           borderRadius:'4px'
            //         }
            //       },'上传文件')
            //     ])
            //   }
            // }
            render: (h, params) => {
              // console.log(params.row.upType)
              return h('TyUploads', {
                props: {
                  defaultList: params.row.applicationAttrInfoList,
                  picNum: params.row.num ? params.row.num : '999',
                  uploadProp: {
                    attrId: params.row.id,
                    attrName: params.row.name,
                    projId: this.fullModel.projId
                  },
                  upType: params.row.upType,
                  uploadId: params.row.id,
                  serviceCode: this.fullModel.serviceCode
                },
                style: {
                  padding: '18px 0'
                },
                on: {
                  getData: (data) => {
                    this.current = params.row._index;
                    this.realModel[params.row._index].applicationAttrInfoList = data
                    if (data.length == 0) {
                      this.realModel[params.row._index].codeFlag = 0;
                      this.realModel[params.row._index].headFlag = 0;
                      this.realModel[params.row._index].qianziFlag = 0;
                      this.realModel[params.row._index].sealFlag = 0;
                    }
                  },
                  singleData: (data) => {
                    this.singleData = data;
                  },
                  check: () => {
                    if (params.row.check == '1') {
                      this.queryGroupOcrFlag()
                    }
                  }
                }
              })
            }
          },
          {
            title: '智能核查',
            key: 'status',
            align: 'center',
            width: 170,
            render: (h, params) => {
              const checkType = params.row.checkType ? params.row.checkType.split(',') : []
              if (params.row.check == '1') {
                return h('div', [
                  h('img', {
                    attrs: {
                      src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDI0IDEwMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojOEJCRkYyO30KCS5zdDF7Zm9udC1mYW1pbHk6J01pY3Jvc29mdFlhSGVpJzt9Cgkuc3Qye2ZvbnQtc2l6ZToxMTMuOTk0N3B4O30KCS5zdDN7b3BhY2l0eTowLjQ7ZmlsbDp1cmwoI1NWR0lEXzFfKTt9Cgkuc3Q0e2ZpbGw6IzUwQTBGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MDksNzQxLjhjMTcyLjcsMCwzMTIuMy0xMzkuNiwzMTIuMy0zMTIuM1M2ODEuNywxMTcuMiw1MDksMTE3LjJTMTk2LjcsMjU2LjgsMTk2LjcsNDI5LjUKCVMzMzYuMyw3NDEuOCw1MDksNzQxLjh6IE01MDksNzc4LjZjLTE5MS4xLDAtMzQ5LjEtMTU4LTM0OS4xLTM0OS4xUzMxNy45LDgwLjQsNTA5LDgwLjRzMzQ5LjEsMTU4LDM0OS4xLDM0OS4xCglTNzAwLjEsNzc4LjYsNTA5LDc3OC42eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTA5LDYzMS42YzExMC4yLDAsMjAyLjEtOTEuOSwyMDIuMS0yMDIuMVM2MTkuMiwyMjcuNCw1MDksMjI3LjRzLTIwMi4xLDkxLjktMjAyLjEsMjAyLjEKCVMzOTguOCw2MzEuNiw1MDksNjMxLjZ6IE01MDksNjY4LjNjLTEzMi4zLDAtMjM4LjgtMTA2LjYtMjM4LjgtMjM4LjhTMzc2LjcsMTkwLjcsNTA5LDE5MC43czIzOC44LDEwNi42LDIzOC44LDIzOC44CglTNjQxLjMsNjY4LjMsNTA5LDY2OC4zeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTA5LDUyMS40YzUxLjQsMCw5MS45LTQwLjQsOTEuOS05MS45cy00MC40LTkxLjktOTEuOS05MS45cy05MS45LDQwLjQtOTEuOSw5MS45UzQ1Ny42LDUyMS40LDUwOSw1MjEuNHoKCSBNNTA5LDU1OC4xYy02OS44LDAtMTI4LjYtNTguOC0xMjguNi0xMjguNlM0MzkuMiwzMDAuOSw1MDksMzAwLjlzMTI4LjYsNTguOCwxMjguNiwxMjguNlM1NzguOCw1NTguMSw1MDksNTU4LjF6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05ODkuNyw2Mi4xSDc2Ni44Yy0xNC4yLDAtMjguNS0xMS45LTI4LjUtMjguNWMwLTE0LjIsMTEuOS0yOC41LDI4LjUtMjguNWgyMjIuOWMxNC4yLDAsMjguNSwxMS45LDI4LjUsMjguNQoJUzEwMDYuMyw2Mi4xLDk4OS43LDYyLjF6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05NjMuNiwyNTYuNlYzMy43YzAtMTQuMiwxMS45LTI4LjUsMjguNS0yOC41YzE0LjIsMCwyOC41LDExLjksMjguNSwyOC41djIyMi45YzAsMTQuMi0xMS45LDI4LjUtMjguNSwyOC41CglTOTYzLjYsMjczLjIsOTYzLjYsMjU2LjZ6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02MC4xLDMzLjd2MjIyLjljMCwxNC4yLTExLjksMjguNS0yOC41LDI4LjVjLTE0LjIsMC0yOC41LTExLjktMjguNS0yOC41VjMzLjdDMy4yLDE5LjQsMTUsNS4yLDMxLjYsNS4yCglDNDguMiw3LjYsNjAuMSwxOS40LDYwLjEsMzMuN3oiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTI1NC42LDYyLjFIMzEuNmMtMTQuMiwwLTI4LjUtMTEuOS0yOC41LTI4LjVDMy4yLDE5LjQsMTUsNS4yLDMxLjYsNS4yaDIyMi45YzE0LjIsMCwyOC41LDExLjksMjguNSwyOC41CglTMjcxLjIsNjIuMSwyNTQuNiw2Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzEuNiw5NjUuN2gyMjIuOWMxNC4yLDAsMjguNSwxMS45LDI4LjUsMjguNWMwLDE0LjItMTEuOSwyOC41LTI4LjUsMjguNUgzMS42Yy0xNC4yLDAtMjguNS0xMS45LTI4LjUtMjguNQoJQzMuMiw5NzkuOSwxNy40LDk2NS43LDMxLjYsOTY1Ljd6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02MC4xLDc3MS4ydjIyMi45YzAsMTQuMi0xMS45LDI4LjUtMjguNSwyOC41Yy0xNC4yLDAtMjguNS0xMS45LTI4LjUtMjguNVY3NzEuMmMwLTE0LjIsMTEuOS0yOC41LDI4LjUtMjguNQoJQzQ4LjIsNzQ1LjEsNjAuMSw3NTcsNjAuMSw3NzEuMnogTTk2My42LDk5NC4xVjc3MS4yYzAtMTQuMiwxMS45LTI4LjUsMjguNS0yOC41YzE0LjIsMCwyOC41LDExLjksMjguNSwyOC41djIyMi45CgljMCwxNC4yLTExLjksMjguNS0yOC41LDI4LjVTOTYzLjYsMTAxMC43LDk2My42LDk5NC4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzY2LjgsOTY1LjdoMjIyLjljMTQuMiwwLDI4LjUsMTEuOSwyOC41LDI4LjVjMCwxNC4yLTExLjksMjguNS0yOC41LDI4LjVINzY2LjhjLTE0LjIsMC0yOC41LTExLjktMjguNS0yOC41CglDNzQwLjcsOTc5LjksNzUyLjYsOTY1LjcsNzY2LjgsOTY1Ljd6Ii8+Cjx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMjg0LjEwMDYgOTA3LjYzMzUpIiBjbGFzcz0ic3QwIHN0MSBzdDIiPuaZuuiDveaguOafpTwvdGV4dD4KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI1MTMiIHkxPSIyNjguMDE2OCIgeDI9Ijg1OS43MDgxIiB5Mj0iMjY4LjAxNjgiPgoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzUwQTBGRiIvPgoJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRjtzdG9wLW9wYWNpdHk6MCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNTE1LDg1LjVjMTkxLjEsMCwzNTAsMTcyLjQsMzQ0LjYsMzY1LjFMNTEzLDQ0OS45TDUxNSw4NS41eiIvPgo8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNNTQyLjEsMTE3LjJjMTEsMCwxOC40LTcuMywxOC40LTE0LjdjMC0xMS03LjMtMTguNC0xNC43LTE4LjRoLTczLjVjLTExLDAtMTguNCwxMS0xNC43LDE4LjQKCWMwLDExLDExLDE4LjQsMTguNCwxNC43aDE0Ljd2NzMuNWgtNy4zYy0xMSwwLTE4LjQsMTEtMTQuNywxOC40YzMuNyw3LjMsNy4zLDIyLDE4LjQsMTguNGgzLjd2MjAyLjFjMCwxMSw3LjMsMTguNCwxOC40LDE4LjQKCXMxOC40LTcuMywxOC40LTE4LjRWMjI3LjRoMy43YzExLDAsMTguNC03LjMsMTguNC0xNC43cy0zLjctMTguNC0xNC43LTIyaC03LjN2LTczLjVDNTI3LjQsMTE3LjIsNTQyLjEsMTE3LjIsNTQyLjEsMTE3LjJ6Ii8+Cjwvc3ZnPgo='
                    },
                    style: {
                      height: '60px',
                      width: '60px',
                      margin: '0 auto',
                      display: params.row.applicationAttrInfoList.length == 0 ? 'block' : 'none'
                    },
                  }),
                  h('p', {
                    style: {
                      fontSize: '14px',
                      lineHeight: '28px',
                      display: params.row.applicationAttrInfoList.length != 0 && checkType.find(item => {
                        return item == 1
                      }) ? 'block' : 'none'
                    }
                  }, [
                    h('span', params.row.headFlag == 1 ? '标题核查通过' : '标题核查不通过'),
                    h('Icon', {
                      props: {
                        type: 'ios-alert',
                      },
                      style: {
                        marginLeft: '5px',
                        color: 'orange',
                        display: params.row.headFlag != 1 ? 'inlineblock' : 'none'
                      }
                    }),
                    h('Icon', {
                      props: {
                        type: 'ios-checkmark-circle',
                      },
                      style: {
                        marginLeft: '5px',
                        color: 'green',
                        display: params.row.headFlag == 1 ? 'inlineblock' : 'none'
                      }
                    })
                  ]),
                  h('p', {
                    style: {
                      fontSize: '14px',
                      lineHeight: '28px',
                      display: params.row.applicationAttrInfoList.length != 0 && checkType.find(item => {
                        return item == 2
                      }) ? 'block' : 'none'
                    }
                  }, [
                    h('span', params.row.sealFlag == 1 ? '印章核查通过' : '印章核查不通过'),
                    h('Icon', {
                      props: {
                        type: 'ios-alert',
                      },
                      style: {
                        marginLeft: '5px',
                        color: 'orange',
                        display: params.row.sealFlag != 1 ? 'inlineblock' : 'none'
                      }
                    }),
                    h('Icon', {
                      props: {
                        type: 'ios-checkmark-circle',
                      },
                      style: {
                        marginLeft: '5px',
                        color: 'green',
                        display: params.row.sealFlag == 1 ? 'inlineblock' : 'none'
                      }
                    })
                  ]),
                  h('p', {
                    style: {
                      fontSize: '14px',
                      lineHeight: '28px',
                      display: params.row.applicationAttrInfoList.length != 0 && checkType.find(item => {
                        return item == 3
                      }) ? 'block' : 'none'
                    }
                  }, [
                    h('span', params.row.qianziFlag == 1 ? '签字核查通过' : '签字核查不通过'),
                    h('Icon', {
                      props: {
                        type: 'ios-alert',
                      },
                      style: {
                        marginLeft: '5px',
                        color: 'orange',
                        display: params.row.qianziFlag != 1 ? 'inlineblock' : 'none'
                      }
                    }),
                    h('Icon', {
                      props: {
                        type: 'ios-checkmark-circle',
                      },
                      style: {
                        marginLeft: '5px',
                        color: 'green',
                        display: params.row.qianziFlag == 1 ? 'inlineblock' : 'none'
                      }
                    })
                  ]),
                  // h('p', {
                  //   style: {
                  //     fontSize: '14px',
                  //     lineHeight: '28px',
                  //     display: params.row.applicationAttrInfoList.length != 0 && checkType.find(item => {
                  //       return item == 4
                  //     }) ? 'block' : 'none'
                  //   }
                  // }, [
                  //   h('span', params.row.codeFlag != 1 ? '事项编码为空' : '事项编码不为空'),
                  //   h('Icon', {
                  //     props: {
                  //       type: 'ios-alert',
                  //     },
                  //     style: {
                  //       marginLeft: '5px',
                  //       color: 'orange',
                  //       display: params.row.codeFlag == 1 ? 'inlineblock' : 'none'
                  //     }
                  //   }),
                  //   h('Icon', {
                  //     props: {
                  //       type: 'ios-checkmark-circle',
                  //     },
                  //     style: {
                  //       marginLeft: '5px',
                  //       color: 'green',
                  //       display: params.row.codeFlag != 1 ? 'inlineblock' : 'none'
                  //     }
                  //   })
                  // ]),
                ])
              } else {
                return h('img', {
                  attrs: {
                    src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDI0IDEwMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRjRGNEY0O30KCS5zdDF7ZmlsbDojQ0NDQ0NDO30KCS5zdDJ7b3BhY2l0eTowLjU7ZmlsbDojQURBREFEO30KCS5zdDN7Zm9udC1mYW1pbHk6J01pY3Jvc29mdFlhSGVpJzt9Cgkuc3Q0e2ZvbnQtc2l6ZToxMTMuOTk0N3B4O30KPC9zdHlsZT4KPHBhdGggZD0iTTE1Ni4xLDEwNjYuNSIvPgo8cGF0aCBkPSJNLTQwNCw5ODQuOSIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDAzLDUxMi4zTDI1Ni44LDY0NS44bC0yLjMsODUuMWwxNDAuNCwxOC40bDIwNC44LTEzLjhjMCwwLDI4LjgtNDkuNSwzNi44LTUyLjlzOTQuMy04OS43LDk0LjMtODkuNwoJbC0yLjMtMjkuOWwtMTYuMS0xNi45TDU1Niw1MDJjMCwwLTExMy45LTIuMy0xMTcuNC0yLjNDNDM1LjIsNDk5LjcsNDAzLDUxMi4zLDQwMyw1MTIuM3oiLz4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzQwLjcsMzI4LjFjMCw4OC43LDcxLjksMTYwLjcsMTYwLjYsMTYwLjdjODguNywwLDE2MC43LTcxLjksMTYwLjctMTYwLjZjMCwwLDAtMC4xLDAtMC4xCgkJYzAtODguNy03MS45LTE2MC42LTE2MC42LTE2MC42UzM0MC43LDIzOS40LDM0MC43LDMyOC4xeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTUwMS40LDUxMS43Yy0xMDEsMC0xODMuNi04Mi42LTE4My42LTE4My42czgyLjYtMTgzLjYsMTgzLjYtMTgzLjZTNjg1LDIyNy4xLDY4NSwzMjguMQoJCVM2MDIuMyw1MTEuNyw1MDEuNCw1MTEuN3ogTTUwMS40LDQ2NS44Yzc1LjcsMCwxMzcuNy02MiwxMzcuNy0xMzcuN3MtNjItMTM3LjctMTM3LjctMTM3LjdzLTEzNy43LDYyLTEzNy43LDEzNy43CgkJUzQyNS42LDQ2NS44LDUwMS40LDQ2NS44eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcxMi41LDU0Ni4xbC0zMi4xLDMzLjNjLTQ0LjctNDIuNS0xMDYuNy02Ny43LTE3My4zLTY3LjdjLTEzMC44LDAtMjM1LjIsMTA4LjUtMjM1LjIsMjIyLjFIMjI2CgkJYzAtMTQwLDEyNi4yLTI2OCwyODEuMS0yNjhDNTg2LjMsNDY1LjgsNjU5LjcsNDk1LjYsNzEyLjUsNTQ2LjF6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjc1LjMsNzQ1LjZsLTg2LjMsMTMuNWwxMy45LTg1LjlsMTQ5LjYtMTQ5LjZsNzIuNCw3Mi40TDY3NS4zLDc0NS42eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYxNiw3MzMuNmw0OC43LTcuNWwxMjguNi0xMjguNmwtNDAuOC00MC44TDYyMy45LDY4NS4zQzYyMy45LDY4NS4zLDYxNiw3MzMuNiw2MTYsNzMzLjZ6IE02NzUuMyw3NDcKCQlsLTg2LjMsMTMuNWwxMy41LTg2LjNsMTQ5LjYtMTQ5LjZsNzIuOCw3Mi44TDY3NS4zLDc0N0w2NzUuMyw3NDd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjcxLjQsNzM0LjRMNjE2LDY3OC45Yy0yLjQtMi40LTIuNC01LjUsMC03LjljMi40LTIuNCw1LjUtMi40LDcuOSwwbDU1LjQsNTUuNGMyLjQsMi40LDIuNCw1LjUsMCw3LjkKCQlDNjc3LjMsNzM2LjMsNjczLjQsNzM2LjMsNjcxLjQsNzM0LjR6IE03NzIuMyw2MzMuNEw3MTYuOSw1NzhjLTIuNC0yLjQtMi40LTUuNSwwLTcuOWMyLjQtMi40LDUuNS0yLjQsNy45LDBsNTUuNCw1NS40CgkJYzIuNCwyLjQsMi40LDUuNSwwLDcuOUM3NzguMiw2MzUuNCw3NzQuMyw2MzUuNCw3NzIuMyw2MzMuNHoiLz4KPC9nPgo8cmVjdCB4PSIyMjYuNyIgeT0iNzE0LjciIGNsYXNzPSJzdDEiIHdpZHRoPSIzNzIuOCIgaGVpZ2h0PSI0NS4xIi8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05ODguNyw2MS4xSDc2NS44Yy0xNC4yLDAtMjguNS0xMS45LTI4LjUtMjguNWMwLTE0LjIsMTEuOS0yOC41LDI4LjUtMjguNWgyMjIuOWMxNC4yLDAsMjguNSwxMS45LDI4LjUsMjguNQoJUzEwMDUuMyw2MS4xLDk4OC43LDYxLjF6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05NjIuNiwyNTUuNlYzMi43YzAtMTQuMiwxMS45LTI4LjUsMjguNS0yOC41YzE0LjIsMCwyOC41LDExLjksMjguNSwyOC41djIyMi45YzAsMTQuMi0xMS45LDI4LjUtMjguNSwyOC41CglTOTYyLjYsMjcyLjIsOTYyLjYsMjU1LjZ6IE01OS4xLDMyLjd2MjIyLjljMCwxNC4yLTExLjksMjguNS0yOC41LDI4LjVjLTE0LjIsMC0yOC41LTExLjktMjguNS0yOC41VjMyLjdDMi4yLDE4LjQsMTQsNC4yLDMwLjYsNC4yCglDNDcuMiw2LjYsNTkuMSwxOC40LDU5LjEsMzIuN3oiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTI1My42LDYxLjFIMzAuNmMtMTQuMiwwLTI4LjUtMTEuOS0yOC41LTI4LjVDMi4yLDE4LjQsMTQsNC4yLDMwLjYsNC4yaDIyMi45YzE0LjIsMCwyOC41LDExLjksMjguNSwyOC41CglTMjcwLjIsNjEuMSwyNTMuNiw2MS4xeiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzAuNiw5NjQuN2gyMjIuOWMxNC4yLDAsMjguNSwxMS45LDI4LjUsMjguNWMwLDE0LjItMTEuOSwyOC41LTI4LjUsMjguNUgzMC42Yy0xNC4yLDAtMjguNS0xMS45LTI4LjUtMjguNQoJQzIuMiw5NzguOSwxNi40LDk2NC43LDMwLjYsOTY0Ljd6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01OS4xLDc3MC4ydjIyMi45YzAsMTQuMi0xMS45LDI4LjUtMjguNSwyOC41Yy0xNC4yLDAtMjguNS0xMS45LTI4LjUtMjguNVY3NzAuMmMwLTE0LjIsMTEuOS0yOC41LDI4LjUtMjguNQoJQzQ3LjIsNzQ0LjEsNTkuMSw3NTYsNTkuMSw3NzAuMnogTTk2Mi42LDk5My4xVjc3MC4yYzAtMTQuMiwxMS45LTI4LjUsMjguNS0yOC41YzE0LjIsMCwyOC41LDExLjksMjguNSwyOC41djIyMi45CgljMCwxNC4yLTExLjksMjguNS0yOC41LDI4LjVTOTYyLjYsMTAwOS43LDk2Mi42LDk5My4xeiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNzY1LjgsOTY0LjdoMjIyLjljMTQuMiwwLDI4LjUsMTEuOSwyOC41LDI4LjVjMCwxNC4yLTExLjksMjguNS0yOC41LDI4LjVINzY1LjhjLTE0LjIsMC0yOC41LTExLjktMjguNS0yOC41CglDNzM5LjcsOTc4LjksNzUxLjYsOTY0LjcsNzY1LjgsOTY0Ljd6Ii8+Cjx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMjY5LjEwMDYgOTA3LjYzMzUpIiBjbGFzcz0ic3QyIHN0MyBzdDQiPuS6uuW3peaguOafpTwvdGV4dD4KPC9zdmc+Cg=='
                  },
                  style: {
                    height: '60px',
                    width: '60px'
                  },
                })
              }
            }
          },
          {
            title: '操作',
            align: 'center',
            width: 130,
            render: (h, params) => {
              if (params.row.type == '申请表') {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginTop: '5px',
                      marginBottom: '5px',
                      padding: '5px 10px !important',
                      borderRadius: '0'
                    },
                    on: {
                      click: () => {
                        //  todo  资料附件 下载申请表按钮
                        // templateType = 2 为 formList 1为 attachmentList
                        let applyUrl = []
                        if (params.row.templateType == 1) {
                          applyUrl = params.row.attachmentList
                        } else if (params.row.templateType == 2 || params.row.templateType == '') {
                          applyUrl = params.row.formList
                        }
                        if (applyUrl.length == 0) {
                          PtUtils.util.alert({type: 'error', content: "抱歉还没有申请表"});
                          return
                        } else {
                          let url = applyUrl[0].url;
                          //212事项直接下载 其他事项调用接口下载
                          // if(this.serviceCode=='20DD392AFE0540179E3A3CA7052A69E7'){
                          //   window.open(url,'_blank');
                          // }else{
                          //   window.location.href = window.location.href.split("#")[0] + 'word' + '/' + 'createWord?projId=' + this.fullModel.projId + '&&fileUrl=' + url
                          // }
                          //note 202 事项下载申请表用调接口, 其他直接下载
                          if (this.fullModel.serviceCode === "AF33786F4745422BAF81FF80F1AFDACE"
                            || this.fullModel.serviceCode === "D1D8C418B39A41F0B02CC8F58D4585F6"
                            || this.fullModel.serviceCode === "962EC4BFD6C94055BE35803677DFAD60") {
                            window.open(window.location.href.split("#")[0] + 'word' + '/' + 'createWord?projId=' + this.fullModel.projId + '&&fileUrl=' + url)
                          } else {
                            window.open(url);
                          }
                        }
                      }
                    }
                  }, '下载申请表'),
                  h('br'),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginBottom: '5px',
                      padding: '5px 10px !important',
                      borderRadius: '0'
                    },
                    on: {
                      click: () => {
                        this.uploadProp.attrId = params.row.id
                        this.uploadProp.attrName = params.row.name
                        this.uploadProp.projId = this.fullModel.projId
                        this.searchName = ''
                        this.modal1 = true
                        this.current = params.row._index
                        this.$refs.table.query({enclosureName: ''})
                      }
                    }
                  }, '我的资料库')
                ])
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginBottom: '5px',
                      padding: '5px 10px !important',
                      borderRadius: '0'
                    },
                    on: {
                      click: () => {
                        this.uploadProp.attrId = params.row.id
                        this.uploadProp.attrName = params.row.name
                        this.uploadProp.projId = this.fullModel.projId
                        this.searchName = ''
                        this.modal1 = true
                        this.current = params.row._index
                        this.$refs.table.query({enclosureName: ''})
                      }
                    }
                  }, '我的资料库')
                ])
              }
            }
          }]
      }
    },
    computed: {
      //note 最终真是绑定对象获取
      // realModel:{
      //   get(){
      //     if(this.fullModel === undefined){
      //       return {};
      //     }
      //     if(typeof(this.model) === 'string'){
      //       if(this.model==='$root'){
      //         return this.fullModel;
      //       }
      //       let params=this.model.split('.');
      //       let result=this.fullModel;
      //       while(params.length>0){
      //         result=result[params.shift()];
      //       }
      //       return result;
      //     }else if(typeof(this.model) === 'object'){
      //       return this.model;
      //     }else if(typeof(this.model) === 'array'){
      //       return this.model;
      //     }
      //     return {};
      //   },
      //  set(value){
      //    if(this.fullModel === undefined){
      //      return {};
      //    }
      //    if(typeof(this.model) === 'string'){
      //      if(this.model==='$root'){
      //        return
      //      }
      //      this.fullModel[this.model]=value;
      //    }else if(typeof(this.model) === 'array'){
      //      this.model=value;
      //    }
      //  }
      // }
      realModel() {
        for (let i = 0; i < this.fullModel.sxMateList.length; i++) {
          if (this.fullModel.sxMateList[i].name == "政务服务网") {
            return this.fullModel.sxMateList[i].sxStageList[0].sxConditionList[0].sxInfoMateList
          }
        }
      },
      table() {
        return {
          noDataText: '没有符合条件的数据，请重新输入条件进行查询！',
          url:this.appConfig&&this.appConfig.api('certificate/getMyDataLibrary'),
          pageNo: 1,
          pageSize: 10,
          height: 400,
          singleSelect: true,
          columns:
            [
              // {
              //   type: 'selection',
              //   width: 60,
              //   align: 'center'
              // },
              {
                title: '序号',
                type: 'index',
                width: 60
              },
              {
                title: '事项名称',
                key: 'matterName'
              },
              {
                title: '事项资料名称',
                key: 'permitName'
              },
              {
                title: '上传资料名称',
                key: 'enclosureName',
                width: 120
              },
              {
                title: '上传时间',
                key: 'createDate'
              },
              {
                title: '办件资料文件',
                key: 'enclosureUrl',
                render: (h, params) => {
                  if (
                    params.row.enclosureUrl.split('.')[params.row.enclosureUrl.split('.').length - 1].toLowerCase() == 'jpg' ||
                    params.row.enclosureUrl.split('.')[params.row.enclosureUrl.split('.').length - 1].toLowerCase() == 'jpeg' ||
                    params.row.enclosureUrl.split('.')[params.row.enclosureUrl.split('.').length - 1].toLowerCase() == 'png'
                  ) {
                    return h('img', {
                      attrs: {
                        src: params.row.enclosureUrl
                      },
                      style: {
                        height: '60px',
                        width: '60px'
                      },
                      on: {
                        click: () => {
                          this.demoPic1 = params.row.enclosureUrl
                          this.modal3 = true
                        }
                      }
                    })
                  } else {
                    return h('a', {
                      on: {
                        click: () => {
                          window.open(params.row.enclosureUrl)
                        }
                      }
                    }, '下载查看文件')
                  }

                }
              }
            ]
        }
      }
    },
    watch: {
      singleData: {
        handler(newObj, oldObj) {
          this.imgOcrAbility(newObj)
        },
        deep: true
      }
    },
    methods: {
      // note 图片识别
      imgOcrAbility(data) {
        console.log(this.current)
        let params = {};
        if (this.realModel[this.current].check == "1") {
          params = {
            ...data,
            checkType: this.realModel[this.current].checkType,
            headName: this.realModel[this.current].headName
          }
          this.spinShow = true
          this.AttachFileTableService&&this.AttachFileTableService.ocrAbility({...params}).then(res => {
            this.queryGroupOcrFlag();
          })
        }
      },
      // note 图片识别之后回显
      queryGroupOcrFlag() {
        this.AttachFileTableService&& this.AttachFileTableService.queryGroupOcrFlag({
          projId: this.fullModel.projId,
          attrId: this.realModel[this.current].id
        }).then(res => {
          this.spinShow = false
          this.realModel[this.current].codeFlag = res.codeFlag;
          this.realModel[this.current].headFlag = res.headFlag;
          this.realModel[this.current].qianziFlag = res.qianziFlag;
          this.realModel[this.current].sealFlag = res.sealFlag;
        })
      },
      //note 选择资料库里的文件点击确定之后
      chooseData() {
        //  note 单个上传
        console.log(this.realModel[this.current].num)
        if (this.realModel[this.current].applicationAttrInfoList.length < this.realModel[this.current].num) {
          if (JSON.stringify(this.dataBase) != '[]') {
            this.uploadProp.serviceCode = this.fullModel.serviceCode
            this.uploadProp.takeType = 3
            this.uploadProp.name = this.dataBase.enclosureName
            this.uploadProp.fileUrl = this.dataBase.enclosureUrl
            this.uploadProp.ossId = this.dataBase.enclosureUrl
            this.uploadProp.amount = this.realModel[this.current].applicationAttrInfoList.length + 1
            this.uploadProp.ext = this.dataBase.enclosureUrl.split('.')[this.dataBase.enclosureUrl.split('.').length - 1]

            this.AttachFileTableService&& this.AttachFileTableService.uploadAttach(this.uploadProp).then(data => {
              PtUtils.util.alert({type: 'success', content: "上传成功!"});
              this.realModel[this.current].applicationAttrInfoList.push(data)
              this.imgOcrAbility(data)
            });
            this.dataBase = []
          }
        } else {
          PtUtils.util.alert({type: 'error', content: '最多上传' + this.realModel[this.current].num + '个文件'});
        }

      },
      //note 这是选择了资料库的文件
      onCurrentChange(data) {
        this.dataBase = data
      },
      //  note 搜索
      searchAttach() {
        if (this.searchName != '') {
          this.$refs.table.query({enclosureName: this.searchName, pageNo: 1})
        } else {
          this.$refs.table.query({enclosureName: '', pageNo: 1})
        }
      }
    },
    created() {
      if (this.type == 'noAction') {
        this.columns1 = this.columns1.splice(this.columns1.length - 1, 1)
      }
      if (this.fullModel.type == '1') {
        this.tipContent = '请点击<a>下载申请表</a>按钮下载本次事项的申请表。上传照片与扫描件，图片必须清晰，必须与主题相符，支持png、jpg、jpeg、pdf、docx、doc、xlsx、xls文件格式'
      } else {
        this.tipContent = '上传照片与扫描件，图片必须清晰，必须与主题相符，支持png、jpg、jpeg、pdf、docx、doc、xlsx、xls文件格式'
      }
    }
  }
</script>

<style lang="less">
  .attachFileTable {
    .database {
      .ivu-modal {
        width: 800px !important;
        top: 50px;
      }
    }
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
    .ivu-spin {
      background-color: rgba(241, 241,241, 0.5);
      z-index: 9999;
    }
    .ivu-spin-fix {
      position: fixed;
    }
  }
</style>

