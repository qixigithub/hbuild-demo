<template>
  <div class="ty-content-element-lookup ty-content-element-lookup-map">
    <a class="search-map" @click="open">点击查看地图</a>
    <Modal class="ty-content-element-lookup-map" :scrollable="true"
           v-model="modal" width="750">
      <div slot="header">
        <span>定位</span>
      </div>
      <div id="outer-box">
        <iframe id="mapPage" width="100%" height="100%" frameborder=0
                src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=WGOBZ-66WH6-JMLSV-M3PTI-KJTHK-PLF24&referer=myapp">
        </iframe>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'TyContentElementLookupMap',
    data() {
      return {
        modal: false,
        place: '',
      }
    },
    methods: {
      //note 地图监听
      mapHandler(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        const loc = event.data;
        if (loc && loc.module === 'locationPicker') {
          //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          this.place = loc.poiname + loc.poiaddress;
        }
      },
      //note 弹出
      open() {
        this.modal = true;
        window.removeEventListener('message', this.mapHandler, false);
        window.addEventListener('message', this.mapHandler, false);
      },
      //note 确定
      ok() {
        if (this.eventType) {
          PtUtils.bus.$emit(this.eventType, this.place)
        }
        this.$emit('change', this.place)
        this.modal = false;
      },
      //note 取消
      cancel() {
        this.modal = false;
      },
    }
  }
</script>

<style>
  #outer-box {
    height: 400px;
  }

  .map {
    float: left;
    height: 100%;
    width: 450px;
  }

  #panel {
    /*position: absolute;*/
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    overflow: auto;
    width: 300px;
    z-index: 999;
    border-left: 1px solid #eaeaea;
    background: #fff;
  }

  #searchBar {
    height: 30px;
    background: #ccc;
  }

  #searchInput {
    width: 100%;
    height: 30px;
    line-height: 30%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0 5px;
  }

  #searchResults {
    overflow: auto;
    height: calc(100% - 30px);
  }

  .amap_lib_placeSearch,
  .amap-ui-poi-picker-sugg-container {
    border: none !important;
  }

  .amap_lib_placeSearch .poibox.highlight {
    background-color: #CAE1FF;
  }

  .poi-more {
    display: none !important;
  }
</style>

