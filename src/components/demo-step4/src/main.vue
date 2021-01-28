<template>
  <div class="ty-demo-step4">
    <ty-main :data="pageData"></ty-main>
  </div>
</template>

<script>
  export default {
    name: 'TyDemoStep4',

    data() {
      return {
        pageData: {
          "page": {
            "title": "办结",
            "maxSteps": 5,
            "fullModel": {
              "timeLineData": [
                {
                  "color": "green",
                  "dealTimeStr": "2018-05-05 14:22:10",
                  "workerName": "张三",
                  "operateType": "同意",
                  "content": "发布1.0版本"
                },
                {
                  "color": "green",
                  "dealTimeStr": "2018-05-05 14:22:10",
                  "workerName": "张三",
                  "operateType": "流转",
                  "content": "发布1.0版本"
                },
                {
                  "color": "red",
                  "dealTimeStr": "2018-05-05 14:22:10",
                  "workerName": "张三",
                  "operateType": "处理",
                  "content": "发布1.0版本"
                },
                {
                  "color": "blue",
                  "dealTimeStr": "2018-05-05 14:22:10",
                  "workerName": "张三",
                  "operateType": "派发",
                  "content": "发布1.0版本"
                }
              ],
              "infoAttachment": [
                {
                  "name": "企业营业执照",
                  "fileUrl": "1"
                },
                {
                  "name": "房屋租赁合同",
                  "fileUrl": "2"
                },
                {
                  "name": "消防意见书",
                  "fileUrl": "3"
                },
                {
                  "name": "广告未设置前整体原景彩图",
                  "fileUrl": "4"
                },
                {
                  "name": "广告未设置后整体彩图",
                  "fileUrl": "5"
                }
              ],
              "advertisement": {
                "url": "",
                "license": "../assets/img/license.jpg",
                "qrCode": "../assets/img/license.jpg",
                "expiryDate": "2018年8月10号-2018年9月10号",
                "detailDate": "审批编号：2018 年 25 号",
                "detailTitle": "《 西安高新区户外广告设置使用安全责任书 》",
                "detailContent": ""
              },
              "state": "5",
              "applyName": "",
              "fee": "111",
              "address": "",
              "setAddress": "",
              "datetime": ["2018-09-11T16:00:00.000Z", "2018-09-11T16:00:00.000Z"],
              "legalMan": "",
              "legalManTelPhone": "",
              "contactMan": "",
              "telPhone": "",
              "length": "",
              "width": "",
              "advType": "0",
              "amount": "",
              "material": "",
              "isOut": "",
              "setContent": "",
              "remark": "",
              "customerFullName": "",
              "bankCount": "",
              "bankNanme": "",
              "shopAreaDesc": "",
              "templateCache": {
                "validators": [],
                "advList": [
                  {
                    "label": "楼体(立面)广告",
                    "value": "1",
                    "feeType": "楼体(立面)广告",
                    "feeExpression": "%s*%s*%s*%s|width,length,feeScale,amount",
                    "feeScale": 100,
                    "feeUnit": "个/年"
                  },
                  {
                    "label": "电子显示屏广告",
                    "value": "0",
                    "feeType": "电子显示屏广告",
                    "feeExpression": "%s*%s|feeScale,amount",
                    "feeScale": 7000,
                    "feeUnit": "个/年"
                  }
                ],
                "tipAdvData": {
                  "amount": 0,
                  "width": 0,
                  "height": 0,
                  "feeExpression": "",
                  "feeType": "",
                  "feeScale": 0,
                  "feeUnit": "个/年"
                }
              }
            }
          },
          "elements": [
            {
              "type": "box",
              "data": [
                {
                  "type": "steps",
                  "data": {
                    "current": 4,
                    "steps": [
                      {
                        "title": "填写资料"
                      },
                      {
                        "title": "上传附件"
                      },
                      {
                        "title": "提交审核"
                      },
                      {
                        "title": "支付缴费"
                      },
                      {
                        "title": "已办结"
                      }
                    ]
                  }
                },
                {
                  "type": "time-line",
                  "data": {
                    "model": "timeLineData",
                    "qrCodeShow": true,
                    "pending": false
                  }
                }
              ]
            },
            {
              "type": "box",
              "nopadding": true,
              "border": "none",
              "data": [
                {
                  "type": "pap-download-scan",
                  "data": {
                    "model": "advertisement",
                    "title": "西安高新区广告设置许可证",
                    "btnName": "下载证照",
                    "detailWarn": "下载前请仔细阅读《西安高新区户外广告设置使用安全责任书》，然后点击“同意并下载”按钮",
                    "detail": "请下载本许可证，打印并张贴在广告设置位附近。该证照有效期为一年，到期继续设置的，请提前再次申请审批"
                  }
                }
              ]
            },
            {
              "type": "box",
              "data": [
                {
                  "type": "info-base",
                  "data": {
                    "arrow": true,
                    "footer": true,
                    "basicInfo": {
                      "cells": [
                        {
                          "col": 4,
                          "headerTitle": "基本信息",
                          "showHeader": true,
                          "showFooter": false,
                          "data": [
                            {
                              "title": "企业名称",
                              "prop": "applyName"
                            },
                            {
                              "title": "企业地址",
                              "prop": "address"
                            },
                            {
                              "title": "法定代表人",
                              "prop": "legalMan"
                            },
                            {
                              "title": "法定代表人联系电话",
                              "prop": "legalManTelPhone"
                            },
                            {
                              "title": "联系人",
                              "prop": "contactMan"
                            },
                            {
                              "title": "联系人联系电话",
                              "prop": "telPhone"
                            },
                            {
                              "title": "设置时间",
                              "label": "date",
                              "prop": "datetime"
                            },
                            {
                              "title": "长度",
                              "prop": "length"
                            },
                            {
                              "title": "宽度",
                              "prop": "width"
                            },
                            {
                              "title": "数量",
                              "prop": "amount"
                            },
                            {
                              "title": "设置地点",
                              "prop": "setAddress"
                            },
                            {
                              "title": "设置内容",
                              "prop": "setContent"
                            },
                            {
                              "title": "工艺材料",
                              "prop": "material"
                            },
                            {
                              "title": "广告类型",
                              "label": "select",
                              "itemProp": "templateCache.advList",
                              "prop": "advType"
                            },
                            {
                              "title": "外立面改造",
                              "label": "isOut",
                              "prop": "isOut",
                              "show": {
                                "type": "advType",
                                "value": 0
                              }
                            },
                            {
                              "title": "商铺面积",
                              "prop": "shopAreaDesc"
                            },
                            {
                              "title": "备注",
                              "prop": "remark"
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              ]
            },
            {
              "type": "box",
              "data": [
                {
                  "type": "info-base",
                  "data": {
                    "arrow": true,
                    "footer": false,
                    "basicInfo": {
                      "cells": [
                        {
                          "col": 4,
                          "headerTitle": "缴费证明单据",
                          "showHeader": true,
                          "data": [
                            {
                              "title": "缴款人全称",
                              "prop": "customerFullName"
                            },
                            {
                              "title": "银行账户",
                              "prop": "bankCount"
                            },
                            {
                              "title": "开户银行",
                              "prop": "bankNanme"
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              ]
            },
            {
              "type": "box",
              "data": [
                {
                  "type": "info-attachment",
                  "data": {
                    "model": "infoAttachment",
                    "headerTitle": "申请附件信息",
                    "showHeader": true,
                    "btnData": {
                      "1": [
                        {
                          "name": "下载附件",
                          "flag": "download"
                        }
                      ],
                      "2": [
                        {
                          "name": "下载附件",
                          "flag": "download"
                        }
                      ],
                      "3": [
                        {
                          "name": "下载附件",
                          "flag": "download"
                        }
                      ],
                      "4": [
                        {
                          "name": "下载附件",
                          "flag": "download"
                        }
                      ],
                      "5": [
                        {
                          "name": "下载附件",
                          "flag": "download"
                        }
                      ],
                      "more": [
                        {
                          "name": "下载附件",
                          "flag": "download"
                        }
                      ],
                      "210": [
                        {
                          "name": "下载附件",
                          "flag": "download"
                        }
                      ],
                      "310": [
                        {
                          "name": "下载附件",
                          "flag": "download"
                        }
                      ]
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    }
  }
</script>

