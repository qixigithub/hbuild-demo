<template>
  <div class="timeLine" v-bind="realModel">
    <Row type="flex">
      <template v-if="this.$route.query.step=='5' || this.$route.query.step=='4'">
        <Col span="6" v-if="this.fullModel.state==='0'||this.fullModel.state==='23'||this.fullModel.state==='34'"
             class="notPass">
          <span class="code">办件编号:{{fullModel.projId}}</span>
          <div class="notice">
            <Icon type="ios-close-circle" color="#F85555" size="52"/>
            <p class="p1">不予许可</p>
          </div>
        </Col>
        <Col span="6" v-else="this.fullModel.state!=='0'" class="handle">
          <span class="code">办件编号:{{fullModel.projId}}</span>
          <p class="title">已 办 结</p>
          <div class="notice">
            <p>您的事项已办结</p>
          </div>
          <div class="btn">
            <!--<Button class="bt1" @click="detail">查看发票详情</Button>-->
            <Button class="bt2" type="warning" ghost @click="evaluate">去评价</Button>
          </div>
        </Col>
      </template>
      <template v-else>
        <Col span="6"
             v-if="this.fullModel.state==='1' ||this.fullModel.state==='2'||this.fullModel.state==='3'||this.fullModel.state==='330'||this.fullModel.state==='211'||this.fullModel.state==='311'||this.fullModel.state==='390'"
             class="examine">
          <span class="code">办件编号:{{fullModel.projId}}</span>
          <p class="p1">提交成功，等待审核！</p>
          <div class="notice">
            <p class="p2">承诺{{fullModel.promiseComptime}}内办结</p>
            <p class="p2"></p>
          </div>
          <div class="time">
            <Icon type="md-alarm" size="20" color="orange"/>
            <span>已用&nbsp;<template v-if="fullModel.days!==undefined">
                {{fullModel.days}}
              </template><template v-else>
                1
              </template>&nbsp;个（工作日）</span>
          </div>
        </Col>
        <Col span="6" v-else-if="this.fullModel.state==='4'" class="complete">
          <span class="code">办件编号:{{fullModel.projId}}</span>
          <div class="notice">
            <Icon type="ios-checkmark-circle" color="#2BA738" size="52"/>
            <p class="p1">审核通过</p>
          </div>
          <div class="pay">
            <Button type="warning" ghost @click="pay">去付款</Button>
          </div>
        </Col>
        <Col span="6" v-else-if="this.fullModel.state==='210' ||this.fullModel.state==='310'" class="supplement">
          <span class="code">办件编号:{{fullModel.projId}}</span>
          <div class="notice">
            <Icon type="ios-alert" color="#F93" size="52"/>
            <p class="p1">补齐补正</p>
          </div>
          <div class="perfect">
            <Button type="warning" ghost @click="perfect">去完善信息</Button>
          </div>
        </Col>
        <Col span="6" v-else-if="this.fullModel.state==='handlePass'" class="complete">
          <span class="code">办件编号:{{fullModel.projId}}</span>
          <div class="notice">
            <Icon type="ios-checkmark-circle" color="#2BA738" size="52"/>
            <p class="p1">审批通过</p>
          </div>
          <div class="pay">
            <Button class="bt2" type="warning" ghost @click="evaluate">去评价</Button>
          </div>
        </Col>
        <Col span="6" v-else-if="this.fullModel.state==='notPass'" class="notPass">
          <span class="code">办件编号:{{fullModel.projId}}</span>
          <div class="notice">
            <Icon type="ios-close-circle" color="#F85555" size="52"/>
            <p class="p1">审批不通过</p>
          </div>
        </Col>
        <Col span="6" v-else-if="this.fullModel.state==='0'||this.fullModel.state==='34'||this.fullModel.state==='23'"
             class="notPass">
          <span class="code">办件编号:{{fullModel.projId}}</span>
          <div class="notice">
            <Icon type="ios-close-circle" color="#F85555" size="52"/>
            <p class="p1">不予许可</p>
          </div>
        </Col>
        <Col span="6" class="empty" v-else>

        </Col>
      </template>
      <Col span="16">
        <Timeline :pending="pending">
          <TimelineItem v-for="(item,index) in realModel " :key="index" :color="item.color">
            <!--<p v-html="item.dealTimeStr+'   '+item.workerName+'  '+item.operateType+', 处理意见：'+item.content"></p>-->
            <p v-html="item.dealTimeStr+'  '+item.operateType+', 处理意见：'+item.content"></p>
          </TimelineItem>
          <div v-if="qrCodeShow===true" class="eBox">
            <!--<img :src="fullModel.qrCode">-->
            <img :src="codeUri">
            <template v-if="this.$route.query.step=='5' || this.$route.query.step=='4'">
              <p v-if="this.fullModel.state!=='0'">
                审批流程跟踪
              </p>
              <p v-else>
                事项二维码
              </p>
            </template>
            <template
              v-else-if="this.fullModel.state==='1' ||this.fullModel.state==='2'||this.fullModel.state==='3'||this.fullModel.state==='330'||this.fullModel.state==='211'||this.fullModel.state==='311'||this.fullModel.state==='210'||this.fullModel.state==='310'||this.fullModel.state==='390'">
              <p>审批流程跟踪</p>
            </template>
            <template v-else>
              <p>事项二维码</p>
            </template>
          </div>
        </Timeline>
      </Col>
    </Row>
  </div>
</template>

<script>
  import PtMixins from '../../../libs/mixins'
  export default {
    name: 'TyTimeLine',
    mixins: [PtMixins.component],
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      },
      step: {
        type: String
      },
      qrCodeShow: {
        type: Boolean
      },
      pending: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      'fullModel.day': function (val, oldVal) {
        if (val === 0) {
          this.$router.push({
            name: 'home',
          })
        }
      },
    },
    methods: {
      //note 完善信息
      perfect() {
        let url = window.location.href.split('?')[0] + '?' + `projId=${this.$route.query.projId}&step=${2}&serviceCode=${this.$route.query.serviceCode}&name=${this.$route.query.name}`;
        location.href = url;
        location.reload();
      },
      //note 支付
      pay() {
        PtUtils.bus.$emit('nextStep')
      },
      //note 查看详情
      detail() {
        this.$router.push({
          name: 'home',
          query: {...this.params}
        })
      },
      //note 评价
      evaluate() {
        //note 列表传评价状态 status
        if (this.$route.query.status) {
          //列表传来status“0”，未评价
          if (this.$route.query.status == '0') {
            this.$router.push({
              name: 'home-member-center-evaluate-want',
              query: {
                projId: this.$route.query.projId,
                serviceName: this.$route.query.name,
                applyTime: this.applyTime,
                handleTime: this.handleTime
              }
            })
            //列表传来status“1”，已评价
          } else if (this.$route.query.status == '1') {
            this.$router.push({
              name: 'home-member-center-evaluate-detail',
              query: {
                projId: this.$route.query.projId,
                isItem: true
              }
            })
          }
          //note 调评价详情服务，传projId
        } else {
          this.EvaluateService&&this.EvaluateService.getData({
            projId: this.$route.query.projId,
          }).then(data => {
            if (data.status == 0) {
              this.$router.push({
                name: 'home-member-center-evaluate-want',
                query: {
                  projId: this.$route.query.projId,
                  serviceName: this.$route.query.name,
                  applyTime: this.applyTime,
                  handleTime: this.handleTime
                }
              })
            } else if (data.status == 1) {
              this.$router.push({
                name: 'home-member-center-evaluate-detail',
                query: {
                  projId: this.$route.query.projId,
                  isItem: true
                }
              })
            }
          });
        }
      },
      jump() {
        if (this.template.tplData.page.maxSteps == '5') {
          if (this.$route.query.step == 3) {
            if (this.fullModel.state == 1 || this.fullModel.state == 2 || this.fullModel.state == 3 || this.fullModel.state == 4 || this.fullModel.state == 210 || this.fullModel.state == 310 || this.fullModel.state == 211 || this.fullModel.state == 311 || this.fullModel.state == 330 || this.fullModel.state == 390) {

            } else {
              let url = window.location.href.split('?')[0] + '?' + `projId=${this.template.tplData.page.fullModel.projId}&step=${this.template.tplData.page.maxSteps}&serviceCode=${this.template.tplData.page.fullModel.serviceCode}&name=${this.$route.query.name}`;
              location.reload();
              location.href = url;
            }
          }
        } else if (this.template.tplData.page.maxSteps == '4') {
          if (this.$route.query.step == 3) {
            if (this.fullModel.state == 1 || this.fullModel.state == 2 || this.fullModel.state == 3 || this.fullModel.state == 210 || this.fullModel.state == 310 || this.fullModel.state == 211 || this.fullModel.state == 311 || this.fullModel.state == 330 || this.fullModel.state == 390) {

            } else {
              let url = window.location.href.split('?')[0] + '?' + `projId=${this.template.tplData.page.fullModel.projId}&step=${this.template.tplData.page.maxSteps}&serviceCode=${this.template.tplData.page.fullModel.serviceCode}&name=${this.$route.query.name}`;
              location.reload();
              location.href = url;
            }
          }
        }
      }
    },
    computed: {
      codeUri() {
        return this.appConfig&& this.appConfig.qrCode(this.fullModel.projId)
      },
      realState() {
        let stateVal = this.fullModel.state;
        return stateVal.charAt(0);
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
      },
      applyTime() {
        if (this.realModel.length > 0) {
          return this.realModel[0].dealTimeStr
        } else {
          return ''
          // return moment(new Date()).format("YYYY年MM月DD日")
        }
      },
      handleTime() {
        if (this.realModel.length > 0) {
          return this.realModel[this.realModel.length - 1].dealTimeStr
        } else {
          return ''
        }
      }
    },
    created() {
      this.jump();
    }
  }
</script>

