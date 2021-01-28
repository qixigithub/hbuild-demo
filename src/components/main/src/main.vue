<template>
  <div class="ty-main">
    <template v-for="item,key in data.elements">
      <ty-content-box v-if="item.type==='box'" v-bind="item"/>
      <ty-button-oprator v-if="item.type==='btns-oprator'" v-bind="item.data" :fix="true"/>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TyMain',
  provide(){
    return {
      template:this
    }
  },
  props: {
    data: {
      default() {
        return {
          page: {
            fullModel:{
              default(){
                return {}
              }
            }
          },
          //页面元素数据
          elements: {
            default() {
              return [
                {
                  type: 'step',
                  current: 1,
                  steps: [],
                  extend: {}//扩展配置
                }
              ]
            }
          }
        }
      }
    },
  },
  data(){
    return {
      flag:'',// 1 验证通过 0 验证不通过
      code:''
    }
  },
  computed:{
    tplData(){
      return {
        page:this.data.page,
        fullModel:this.data.page.fullModel,
        element:this.data.elements
      }
    }
  },
  methods:{
    //note 保存
    saveClick(){
       debugger;
       this.validate();
    },
    clear(){
      this.code="";
      this.flag="";
    },
    getData(){
      return this.data.page.fullModel || {};
    },
    //note 全量校验
    validate(){
      console.log("全量校验");
      console.log(this.data);

      if(!this.data.page.fullModel&&typeof (this.data.page.fullModel)=="undefined"){
        return;
      }
      console.log(this.data.page.fullModel);
      let valiLength=this.data.page.fullModel.templateCache.validators.length/2;
      this.data.page.fullModel.templateCache.validators.forEach((item,index)=>{

        if(index>=valiLength&&this.code!==0){
          console.log(index);
          if(item.formValidator()){
            this.flag=true;
          }else{
            this.code=0;
            this.flag=false;
          }
          console.log(this.flag);
        }else{
          return false;
        }
      })
      console.log(" console.log(this.flag);:"+this.flag);
      if(this.flag){
        this.clear()
        return true;
      }else{
        this.clear()
        return false;
      }
    }
  },
  created() {

    //note 公共总线事件监听
/*    Bus.$on('nextStep', this.nextStep);
    Bus.$on('nextStepClick', this.nextStepClick);
    Bus.$on('prevStepClick', this.prevStepClick);
    Bus.$on('submitClick', this.submitClick);
    Bus.$on('submitPayClick', this.submitPayClick);*/
    PtUtils.bus.$off('saveClick');
    PtUtils.bus.$off('nextStepClick');
    PtUtils.bus.$on('saveClick', this.saveClick);
    PtUtils.bus.$on('nextStepClick', this.saveClick);
   /* Bus.$on('guideClick', this.guideClick);*/
  }
}
</script>

