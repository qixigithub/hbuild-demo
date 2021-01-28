<template>
  <!--底部操作按钮模板-->
  <div class="ty-button-oprator-container" :style="{height:`${height}px`||'50px'}">
    <div class="ty-button-oprator" :class="btnsClasses" :style="{backgroundColor:bgColor||'transparent'}">
      <template v-for="(btn) in buttons">
        <ty-button-switch v-if="btn.type==='switch'" :flag.sync="_switchFlag" @change="btn.change||null" v-bind="btn"/>
        <Button v-else @click="btnClick(btn.click)"
                v-bind="btn" >{{btn.label}}</Button>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TyButtonOprator',
    props: {
      //类型,top为中上部,table列表上面的操作按钮组,
      //     bottom为底部操作按钮组
      type: {
        default: 'bottom'
      },
      height:{
        default:50
      },
      bgColor:{
        default:'#fdf8f5'
      },
      //对齐方式 left center right三种,默认为center
      align: {
        default: 'center'
      },
      //是否有展开收齐功能以及当前显示状态的标志
      switchFlag:{
        type:Boolean
      },
      width:{
        default:1200,
      },
      //按钮数据集合,里面包含各个按钮自己的参数
      buttons:{
        default(){
          return [];
        }
      },
      fix: {
        default:false
      }
    },
    data() {
      return {
      }
    },
    computed:{
      btnsClasses(){
        return [
          {'fix':this._fix},
          this._align
        ];
      },
      //开关标志计算属性
      _switchFlag:{
        get(){
          return this.switchFlag;
        },
        set(val){
          this.$emit('update:switchFlag',val);
        }
      },
      _fix(){
        switch(typeof(this.fix)){
          case 'string':
            return this.fix==='true'
          case 'boolean':
            return this.fix;
          default:
            return false;
        }
      },
      //对戏方式class名称计算属性,直接添加到class中
      _align() {
        switch (this.align) {
          case 'center':
            return 'tc';
            break;
          case 'left':
            return 'tl';
            break;
          case 'right':
            return 'tr';
            break;
          default:
            return 'tr';
        }
      }
    },
    methods:{
      btnClick(data){
        debugger;
        switch(typeof(data)){
          case 'string':
            PtUtils.bus.$emit(data);
            break;
          case 'function':
            data.apply();
            break;
        }
      }
    }
  }
</script>

