<template>
  <div class="ty-demo-step3">
    <ty-main :data="pageData"></ty-main>
  </div>
</template>

<script>
  export default {
    name: 'TyDemoStep3',
    data() {
      return {
        pageData: {
          "page": {
            "title": "提交审核",
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
              "state": "4",
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
                    "feeScale": 110,
                    "feeUnit": "元/平方米（年）"
                  },
                  {
                    "label": "电子显示屏广告",
                    "value": "0",
                    "feeType": "电子显示屏广告",
                    "feeExpression": "%s*%s|feeScale,amount",
                    "feeScale": 7000,
                    "feeUnit": "元/年"
                  }
                ]
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
                    "current": 2,
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
                              "title": "联系人电话",
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

