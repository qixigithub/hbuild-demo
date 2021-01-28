<template>
    <div class="mailLicence" v-if="mailLicenceFlag">
      <div class="header">
        <p>{{licenceName}}</p>
      </div>
      <div class="content" v-show="isSend===true">
        <template v-if="arr.length < 1">
          <p style="height: 30px;line-height: 30px;margin-top: 10px;padding-left: 20px;">您还没有收货地址信息，请先添加!</p>
        </template>
        <template v-else>
          <ul class="single" v-if="flag===false">
            <li>
              <span>{{arr[0].addressProvinceName}}{{arr[0].addressCityName}}{{arr[0].addressAreaName}}{{arr[0].addressStreetName}}{{arr[0].addressDetail}} </span>
              <span>{{arr[0].fullName}}</span>
              <span>{{arr[0].telePhone}}</span>
              <span style="display: none;">删除</span>
              <span  @click="updateMail(arr[0])">修改</span>
              <span>默认收件地址</span>
            </li>
          </ul>
        </template>
        <template>
          <ul v-if="flag===true">
            <li @click="activeChange(item)" :class="{ active: item.checked===true }" v-for="(item,index) in arr" :key="index">
              <span :class="{ active: item.checked===true }">{{item.addressProvinceName}}{{item.addressCityName}}{{item.addressAreaName}}{{item.addressStreetName}}{{item.addressDetail}}</span>
              <span :class="{ active: item.checked===true }">{{item.fullName}}</span>
              <span :class="{ active: item.checked===true }">{{item.telePhone}}</span>
              <span  v-show="item.defaultAddress=='0'" @click="delMail(item,index)">删除</span>
              <span  @click="updateMail(item)">修改</span>
              <span :class="{ actives: item.defaultAddress=='1'}" @click="changeStatus(item,index)">{{item.defaultAddress=='1'?'默认收件地址':'设为默认地址'}}</span>
              <img src="./assets/images/u2568.png" v-show="item.checked===true">
              <img src="./assets/images/u2570.svg" v-show="item.checked===true" style="width: 12px; height: 12px">
            </li>
          </ul>
        </template>
      </div>
      <div class="content" v-show="isSend===false">
        <ul class="single">
          <li>
            <a>您已提交邮寄地址：</a>
            <span>{{sendPostData.addressProvinceName}}{{sendPostData.addressCityName}}{{sendPostData.addressAreaName}}{{sendPostData.addressStreetName}}{{sendPostData.addressDetail}} </span>
            <span>{{sendPostData.fullName}}<a style="margin-left: 10px;color: #999999">{{sendPostData.telePhone}}</a></span>
          </li>
        </ul>
      </div>
      <div class="footers" v-show="isSend===true">
        <p>
          <span @click="showAllData">{{arr.length < 2 || flag===true?'新增收件地址':'显示全部地址'}}</span>
          <span @click="management">管理收件地址</span>
          <span class="btn" @click="sendMail">寄送至此地址</span>
        </p>
      </div>
      <Modal
        v-model="modal1"
        class-name="mail-modal"
        title="title1"
        width="800">
        <div class="header" slot="header">{{title1}}</div>
        <Form :label-width="100" ref="page" :model="formData"  :rules="ruleValidate">
          <FormItem label="姓名："  prop="fullName"  class="input-width">
            <Input v-model="formData.fullName" placeholder="请输入收件人姓名"  />
          </FormItem>
          <FormItem label="手机号：" prop="telePhone" class="input-width">
            <Input v-model="formData.telePhone" placeholder="请输入收件人手机号码"  />
          </FormItem>
          <FormItem label="所在地区：" prop="address" class="input-width">
            <Cascader v-model="formData.address" :data="data" :load-data="loadData"  ></Cascader>
          </FormItem>
          <FormItem label="详细地址：" prop="addressDetail" class="input-width">
            <Input v-model="formData.addressDetail" type="textarea" :rows="4"  placeholder="请输入详细收件地址" />
          </FormItem>
        </Form>
        <div class="footer" slot="footer">
          <div class="sub" @click="submit">提交</div>
          <div class="can" @click="cancel">取消</div>
        </div>
      </Modal>
      <Modal
        v-model="modal2"
        class-name="send-modal"
        width="320">
        <div style="display: none;"  class="header" slot="header">{{title1}}</div>
        <div class="content">
          <Icon type="ios-information-circle-outline"  />
          <p class="title1">是否确定邮寄</p>
          <div class="cc">
            <p class="title2">收件地址信息提交后不可再进行更改</p>
            <div @click="sure" class="leftBtn">确定</div>
            <div @click="temporarily" class="rightBtn">暂不</div>
          </div>
        </div>
        <div style="display: none;" class="footer" slot="footer">
          <div class="sub" @click="submit">提交</div>
          <div class="can" @click="cancel">取消</div>
        </div>
      </Modal>
    </div>
</template>

<script>
/**
 *@author       刘文军
 *@date         2018/11/27 19:44
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description
 */
export default {
  name: 'TyMailLicence',
  props:{
    licenceName:{
      type:String,
      default:'邮寄证照'
    },
    mailMessage:{
      type:Array,
      default(){
        return [
          {checked:false,isActive:0,name:'liuwenjun1',phone:15838995173,address:'凤城八路',detailAddress:'西安地铁大厦'},
          {checked:true,isActive:1,name:'liuwenjun2',phone:15838995173,address:'凤城八路',detailAddress:'西安地铁大厦'},
          {checked:false,isActive:0,name:'liuwenjun3',phone:15838995173,address:'凤城八路',detailAddress:'西安地铁大厦'},
        ];
      }
    }
  },
  watch:{

  },
  data(){
    return {
      mailLicenceFlag:false,
      title1:'新增收件地址',
      addType:'',
      arr:[],
      sendPostData:[],
      //判断是否发送了邮件
      isSend:true,
      editAddressId:null,
      data: [],
      formData:{
        fullName:'',
        address:[],
        addressDetail:'',
        telePhone:''
      },
      ruleValidate:{
        fullName:[
          {required: true,message:"姓名不能为空",trigger: "blur"}
        ],
        telePhone:[
          {required: true,validator:this.validateTel,trigger: "blur"}
        ],
        address:[
          {required: true,validator:this.validateAddress,trigger: "change"}
        ],
        addressDetail:[
          {required: true,message:"详细地址不能为空",trigger: "blur"}
        ]
      },
      flag:false,
      modal1:false,
      modal2:false,
      submitMailShow:false
    }
  },
  methods:{
    //是否让邮件出现
    isShow(){
      this.mailLicenceFlag=!this.mailLicenceFlag;
    },
    //note 省市级数据
    getRegionCode() {
      // Service.regionCode({parentAddrCode: '1'}).then(res => {
      //   for (let i = 0; i < res.length; i++) {
      //     res[i].value = res[i].addrCode
      //     res[i].label = res[i].addrName
      //     res[i].loading = false
      //     res[i].children = []
      //   }
      //   this.data = res
      // })
    },
    loadData(item, callback) {
      // if (callback) {
      //   item.loading = true;
      //   Service.regionCode({parentAddrCode: item.addrCode}).then(res => {
      //     if (res) {
      //       for (let i = 0; i < res.length; i++) {
      //         res[i].value = res[i].addrCode
      //         res[i].label = res[i].addrName
      //         if (res[i].addrLevel < '5') {
      //           res[i].loading = false
      //           res[i].children = []
      //         }
      //       }
      //       item.children = res
      //       item.loading = false;
      //       callback();
      //     }
      //   })
      // }
    },
    //排序
    compare(property){
      return function(a,b){
        let value1 = a[property];
        let value2 = b[property];
        return value2 - value1;
      }
    },
    //note 提交
    submit(){
      if(this.addType=='add'){
        this.$refs.page.validate((valid)=>{
          if(valid){
            Service.addressAdd({customerId:300109182,userId:this.userId,operSys:'0',
              fullName:this.formData.fullName,telePhone:this.formData.telePhone,
              addressDetail:this.formData.addressDetail,addressCountry:'中国',
              addressProvince:this.formData.address[0],addressCity:this.formData.address[1],
              addressArea:this.formData.address[2],addressStreet:this.formData.address[3]}).then(res=>{
              PtUtils.util.alert({
                type: 'success',
                content: '新增地址信息成功!'
              });
              this.modal1=false;
              this.initData();
            })
          }else{
            PtUtils.util.alert({type: 'warning', content:"有信息未填写!"});
          }
        })
      }else{
        this.$refs.page.validate((valid)=>{
          if(valid){
            Service.addressEdit({addressId:this.editAddressId,customerId:300109182,userId:this.userId,operSys:'0',
              fullName:this.formData.fullName,telePhone:this.formData.telePhone,
              addressDetail:this.formData.addressDetail,addressCountry:'中国',
              addressProvince:this.formData.address[0],addressCity:this.formData.address[1],
              addressArea:this.formData.address[2],addressStreet:this.formData.address[3]}).then(res=>{
              PtUtils.util.alert({
                type: 'success',
                content: '修改地址信息成功!'
              });
              this.modal1=false;
              this.initData();
            })
          }else{
            PtUtils.util.alert({type: 'warning', content:"有信息未填写!"});
          }
        })
      }

    },
    cancel(){
      this.modal1=false
    },
    //note 手机号校验
    validateTel(rule, value, callback){
      let reg = PtUtils.validators.regexp.mobile.regexp;
      if (value == '') {
        callback(new Error('手机号不能为空'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    },
    //note 地址校验
    validateAddress(rule, value, callback){
      if (value.length ===0) {
        callback(new Error('地址不能为空'));
      }else {
        callback();
      }
    },
    //改变li的css
    activeChange(item){
      this.arr.forEach(item=>{
        item.checked=false;
      })
      item.checked=true;
    },
    //note 寄送邮件
    sendMail(){
      // this.$Modal.confirm({
      //   width:330,
      //   render: (h) => {
      //     let Icon='Icon';
      //     return (<div class={{content:true}}>
      //         <Icon type="ios-information-circle-outline"  />
      //         <p class={{title1:true}}>是否确定邮寄</p>
      //         <div class={{cc:true}}>
      //           <p class={{title2:true}}>收件地址信息提交后不可再进行更改</p>
      //           <div onClick={this.sure} class={{leftBtn:true}}>确定</div>
      //           <div onClick={this.temporarily} class={{rightBtn:true}}>暂不</div>
      //         </div>
      //       </div>)
      //   }
      // })
      this.modal2=true
    },
    //寄送邮件的确认
    sure(){
      this.arr.forEach(item=>{
        if(item.checked===true){
          Service.sendPostCard({applyNo:444433,customerId:300109182,country:item.addressCountry,province:item.addressProvince,
            city:item.addressCity,area:item.addressArea,towns:item.addressStreet,receiverAddr:item.addressDetail,
            receiverName:item.fullName,receiverPhone:item.telePhone
          }).then(res=>{
            this.sendPostData=item;
            this.isSend=false;
            this.temporarily();
          })
        }
      })
    },
    //寄送邮件的取消
    temporarily(){
      this.modal2=false;
    },
    //note 改变默认地址
    changeStatus(data){
      this.arr.forEach(item=>{
        item.num=0;
        item.defaultAddress=0;
      })
      data.num=1;
      data.defaultAddress=1;
      this.arr.sort(this.compare('num'));
      Service.updateDefaultAddress({operSys:'0',userId:this.userId,addressId:data.addressId}).then(res=>{
        PtUtils.util.alert({
          type: 'success',
          content: '设置默认地址成功!'
        });
      })
    },
    //展示全部信息
    showAllData(){
      if(this.arr.length >1 && this.flag===false){
        this.flag=true;
      }else{
        this.title1='新增地址信息';
        this.addType='add';
        this.formData.fullName='';
        this.formData.telePhone='';
        this.formData.address=[];
        this.formData.addressDetail='';
        this.modal1=true;

      }
    },
    //note 删除地址信息
    delMail(item,index){
      Service.addressDel({operSys:'0',userId:this.userId,addressId:item.addressId}).then(res=>{
        this.arr.splice(index,1);
        PtUtils.util.alert({
          type: 'success',
          content: '删除地址信息成功!'
        });
      })
    },
    //note 修改地址信息
    updateMail(item){
      this.title1='修改地址信息';
      this.addType='edit';
      this.modal1=true;
      Service.getAddressData({ customerId:300109182,addressId:item.addressId}).then(res=>{
        console.log(res);
        this.editAddressId=res.addressId;
        this.formData.fullName=res.fullName;
        this.formData.telePhone=res.telePhone;
        this.formData.addressDetail=res.addressDetail;
        this.formData.address=[res.addressProvince,res.addressCity,res.addressArea,res.addressStreet]
      })
    },
    //初始化
    initData(){
      this.arr=[];
      Service.getAllAddressData({customerId: 300109182}).then(res => {
        if(res&&res.length > 0){
          res.forEach(item=>{
            this.arr.push({...item,checked:item.defaultAddress==1?true:false,num:item.defaultAddress==1?1:0})
          })
          this.arr.sort(this.compare('num'));
        }
      })
    },
    management(){
      this.$router.push({
        name:'home-member-center-addressAdd'
      })
    }
  },
  computed:{
    customId(){
      return this.$store.state.common.userInfo.customerNo;
    },
    userId(){
      return this.$store.state.common.userInfo.userId;
    }
  },
  created(){
    PtUtils.bus.$on('showMail', this.isShow);
    // this.initData();
    // this.getRegionCode();
  }
}
</script>

