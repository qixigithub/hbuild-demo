<template>
  <div class="ty-multipleSelection">
    <div class="multiple">
      <CheckboxGroup v-model="realModel[prop]" @on-change="change">
        <Checkbox :disabled="dis" v-for="(item,index) in checkBoxData" :key="index" :label="item.value">
          <span>{{item.label}}</span>
        </Checkbox>

      </CheckboxGroup>
      <template v-if="extend.btnShow===false?false:true">
        <Checkbox :disabled="dis" v-model="single">其它</Checkbox><Input v-if="single" @on-blur="blur" :disabled="dis" v-model="textVal" class="checkInput" />
      </template>
    </div>

  </div>
</template>

<script>
import PtMixins from '../../../libs/mixins'
export default {
    name: 'TyMultipleSelection',
    mixins: [PtMixins.component],
  props:{
    //note 字段在绑定对象中对应的key值
    prop: {
      type: [String, Array]
    },
    itemsProp: {
      type: [String, Array]
    },
    extend: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    dis(){
      if(this.extend.isDisabled===false){
        return true
      }
      return false
    }
  },
  watch:{
    single(newVal,oldVal){
      if(!newVal&&this.textVal!==''){
        let modalData=this.realModel[this.prop];
        if(modalData.length>0){
          let index1=modalData.indexOf(this.textVal2);
          modalData.splice(index1,1);
          this.textVal='';
          this.$set(this.other1,this.other1.length-1,'0');
        }
      }
    },
    textVal(newVal,oldVal){
      debugger;
      this.realModel[this.extend.bind]=newVal;
      this.realModel[this.extend.otherBtn]=newVal;
      if(this.textVal!==''){
        this.$set(this.other1,this.other1.length-1,'1');
      }
    },
    other1(newVal,oldVal){
      let val=newVal.join("");
      this.realModel[this.extend.bind]=val;
    }
  },
  data(){
    return{
      check:[],
      num:true,
      single:false,
      //请求的数据
      checkBoxData:this.extend.mockData,
      //文本框数据
      textVal:'',
      textVal2:'',
      other:'0',
      other1:[]
    }
  },
  methods:{
    getItemsProps(itemProps){
      debugger;
      if (!!itemProps) {
        let params = itemProps.split('.');
        let result = this.realModel["templateCache"];
        result=result[params[1]]
        console.log("--->");
        console.log(result);
        return result;
      }else{
        return [];
      }
    },
    change(data){
      debugger;
      this.other1.forEach((item,index)=>{
        this.$set(this.other1,index,0);
      })
      data.forEach((item,index)=>{
        this.checkBoxData.forEach((item1,index1)=>{
          if(item==item1.value){
            this.$set(this.other1,index1,'1');
          }
        })
      })
    },
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    },
    blur(){
      // if(this.single){
      //   if(this.num){
      //     this.realModel[this.prop].unshift(this.textVal);
      //     this.num=false;
      //   }else{
      //     this.realModel[this.prop].shift();
      //     this.realModel[this.prop].unshift(this.textVal);
      //   }
      //  }
      let modalData=this.realModel[this.prop],index=modalData.indexOf(this.textVal),
        index1=modalData.indexOf(this.textVal2);
      if(this.single){
        if(index===-1){
          if(index1===-1){
            modalData.push(this.textVal);
            this.textVal2=this.textVal;
          }else{
            modalData.splice(index1,1);
            modalData.push(this.textVal);
            this.textVal2=this.textVal;
          }
        }
      }
    },
    //note 初始化
    init(){
      if(this.extend.url&&this.extend.url!==''){
        ComponentService.qrySelectData(this.extend.url,this.extend.params?this.extend.params:{}).then(res=>{
          if(res){
            this.checkBoxData=res;
          }
        })
      }
    }
  },
  created(){
    this.init();
  },
  mounted(){
    this.checkBoxData=this.extend.mockData||this.getItemsProps(this.itemsProp);

    this.checkBoxData.forEach((item,index)=>{
      this.check.push(item.value);
    })
    if(this.realModel[this.extend.bind]===''){
      for(let i=0;i<this.checkBoxData.length;i++){
        this.other+='0';
      }
      this.other1=this.other.split("");
    }else{
      this.other=this.realModel[this.extend.bind];
      this.other1=this.other.split("");
    }
    let diff=this.getArrDifference(this.check.concat(this.realModel[this.prop]),this.check);
    if(diff.length>0){
      this.single=true;
      this.textVal=diff[0];
    }

  }
}
</script>
<style scoped lang="less">
  .multiple{
    .ivu-checkbox-group{
      .ivu-checkbox-wrapper{
        margin-right: 32px;
      }
    }
    .checkInput{
      margin-left: 5px;
      border-left: none;
      border-right: none;
      border-top: none;
      border-bottom: 1px solid black;
      width: 92px;
    }
  }
</style>
