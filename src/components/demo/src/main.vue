<template>
  <div class="ty-demo">
    <ty-main :data="pageData"></ty-main>
  </div>
</template>

<script>
export default {
  name: 'TyDemo',
  data(){
    return {
      pageData:{
        "page": {
          "fullModel": {
            "templateCache": {
              "validators": [

              ],
              "tableArr": [

              ],
              "selectArr": [
                {
                  "selectName": "XB",
                  "option": [
                    {
                      "label": "男",
                      "value": "1"
                    },
                    {
                      "label": "女",
                      "value": "2"
                    }
                  ]
                },
                {
                  "selectName": "MZ",
                  "option": [
                    {
                      "label": "汉族",
                      "value": "01"
                    },
                    {
                      "value": "02",
                      "label": "蒙古族"
                    },
                    {
                      "value": "03",
                      "label": "回族"
                    },
                    {
                      "value": "04",
                      "label": "藏族"
                    },
                    {
                      "value": "05",
                      "label": "维吾尔族"
                    },
                    {
                      "value": "06",
                      "label": "苗族"
                    },
                    {
                      "value": "07",
                      "label": "彝族"
                    },
                    {
                      "value": "08",
                      "label": "壮族"
                    },
                    {
                      "value": "09",
                      "label": "布依族"
                    },
                    {
                      "value": "10",
                      "label": "朝鲜族"
                    },
                    {
                      "value": "11",
                      "label": "满族"
                    },
                    {
                      "value": "12",
                      "label": "侗族"
                    },
                    {
                      "value": "13",
                      "label": "瑶族"
                    },
                    {
                      "value": "14",
                      "label": "白族"
                    },
                    {
                      "value": "15",
                      "label": "土家族"
                    },
                    {
                      "value": "16",
                      "label": "哈尼族"
                    },
                    {
                      "value": "17",
                      "label": "哈萨克族"
                    },
                    {
                      "value": "18",
                      "label": "傣族"
                    },
                    {
                      "value": "19",
                      "label": "黎族"
                    },
                    {
                      "value": "20",
                      "label": "傈僳族"
                    },
                    {
                      "value": "21",
                      "label": "佤族"
                    },
                    {
                      "value": "22",
                      "label": "畲族"
                    },
                    {
                      "value": "23",
                      "label": "高山族"
                    },
                    {
                      "value": "24",
                      "label": "拉祜族"
                    },
                    {
                      "value": "25",
                      "label": "水族"
                    },
                    {
                      "value": "26",
                      "label": "东乡族"
                    },
                    {
                      "value": "27",
                      "label": "纳西族"
                    },
                    {
                      "value": "28",
                      "label": "景颇族"
                    },
                    {
                      "value": "29",
                      "label": "柯尔克孜族"
                    },
                    {
                      "value": "30",
                      "label": "土族"
                    },
                    {
                      "value": "31",
                      "label": "达斡尔族"
                    },
                    {
                      "value": "32",
                      "label": "仫佬族"
                    },
                    {
                      "value": "33",
                      "label": "羌族"
                    },
                    {
                      "value": "34",
                      "label": "布朗族"
                    },
                    {
                      "value": "35",
                      "label": "撒拉族"
                    },
                    {
                      "value": "36",
                      "label": "毛难族"
                    },
                    {
                      "value": "37",
                      "label": "仡佬族"
                    },
                    {
                      "value": "38",
                      "label": "锡伯族"
                    },
                    {
                      "value": "39",
                      "label": "阿昌族"
                    },
                    {
                      "value": "40",
                      "label": "普米族"
                    },
                    {
                      "value": "41",
                      "label": "塔吉克族"
                    },
                    {
                      "value": "42",
                      "label": "怒族"
                    },
                    {
                      "value": "43",
                      "label": "乌孜别克族"
                    },
                    {
                      "value": "44",
                      "label": "俄罗斯族"
                    },
                    {
                      "value": "45",
                      "label": "鄂温克族"
                    },
                    {
                      "value": "46",
                      "label": "崩龙族"
                    },
                    {
                      "value": "47",
                      "label": "保安族"
                    },
                    {
                      "value": "48",
                      "label": "裕固族"
                    },
                    {
                      "value": "49",
                      "label": "京族"
                    },
                    {
                      "value": "50",
                      "label": "塔塔尔族"
                    },
                    {
                      "value": "51",
                      "label": "独龙族"
                    },
                    {
                      "value": "52",
                      "label": "鄂伦春族"
                    },
                    {
                      "value": "53",
                      "label": "赫哲族"
                    },
                    {
                      "value": "54",
                      "label": "门巴族"
                    },
                    {
                      "value": "55",
                      "label": "珞巴族"
                    },
                    {
                      "value": "56",
                      "label": "基诺族"
                    },
                    {
                      "value": "97",
                      "label": "其他"
                    },
                    {
                      "value": "98",
                      "label": "外国血统"
                    }
                  ]
                },
                {
                  "selectName": "SFZ_LX",
                  "option": [
                    {
                      "label": "中华人民共和国居民身份证",
                      "value": "1"
                    },
                    {
                      "label": "港澳台有效身份证件",
                      "value": "2"
                    },
                    {
                      "label": "外国（地区）护照",
                      "value": "3"
                    },
                    {
                      "label": "其他有效身份证件",
                      "value": "4"
                    }
                  ]
                },
                {
                  "selectName": "ZW",
                  "option": [
                    {
                      "label": "董事长兼总经理",
                      "value": "1"
                    },
                    {
                      "label": "董事兼总经理",
                      "value": "2"
                    },
                    {
                      "label": "执行董事兼总经理",
                      "value": "3"
                    },
                    {
                      "label": "董事长",
                      "value": "4"
                    },
                    {
                      "label": "副董事长",
                      "value": "5"
                    },
                    {
                      "label": "董事",
                      "value": "6"
                    },
                    {
                      "label": "执行董事",
                      "value": "7"
                    },
                    {
                      "label": "总经理",
                      "value": "8"
                    },
                    {
                      "label": "副总经理",
                      "value": "9"
                    },
                    {
                      "label": "经理",
                      "value": "10"
                    },
                    {
                      "label": "负责人",
                      "value": "11"
                    },
                    {
                      "label": "总务主任",
                      "value": "12"
                    },
                    {
                      "label": "专职管理员",
                      "value": "13"
                    },
                    {
                      "label": "其他人员",
                      "value": "14"
                    }
                  ]
                }
              ],
              "selectLinkArr": [

              ],
              "targetData": [
                "applyName",
                "mainProject",
                "secondaryProject",
                "applyCardNumber",
                "spouseSex",
                "spouseNational",
                "spouseEducationalLevel"
              ],
              "XB": [
                {
                  "label": "男",
                  "value": "1"
                },
                {
                  "label": "女",
                  "value": "2"
                }
              ],
              "mutiBox":[
                {
                  "label": "道路普通货物运输",
                  "value": "1",
                  "show": false,
                  "radioList": [
                  ]
                },
                {
                  "label": "道路普通货物运输",
                  "value": "2",
                  "show": false,
                  "radioList": [
                    {
                      "name": "集装箱",
                      "isSelected": false,
                      "value": "1"
                    },
                    {
                      "name": "冷藏保鲜",
                      "isSelected": false,
                      "value": "2"
                    },
                    {
                      "name": "罐式运输",
                      "isSelected": false,
                      "value": "3"
                    }
                  ]
                },
                {
                  "label": "大型物件运输",
                  "value": "3",
                  "show": false,
                  "radioList": [
                    {
                      "name": "一类",
                      "isSelected": false,
                      "value": "1"
                    },
                    {
                      "name": "二类",
                      "isSelected": false,
                      "value": "2"
                    },
                    {
                      "name": "三类",
                      "isSelected": false,
                      "value": "3"
                    },
                    {
                      "name": "四类",
                      "isSelected": false,
                      "value": "4"
                    }
                  ]
                }
              ],
              "MZ": [
                {
                  "label": "汉族",
                  "value": "01"
                },
                {
                  "value": "02",
                  "label": "蒙古族"
                },
                {
                  "value": "03",
                  "label": "回族"
                },
                {
                  "value": "04",
                  "label": "藏族"
                },
                {
                  "value": "05",
                  "label": "维吾尔族"
                },
                {
                  "value": "06",
                  "label": "苗族"
                },
                {
                  "value": "07",
                  "label": "彝族"
                },
                {
                  "value": "08",
                  "label": "壮族"
                },
                {
                  "value": "09",
                  "label": "布依族"
                },
                {
                  "value": "10",
                  "label": "朝鲜族"
                },
                {
                  "value": "11",
                  "label": "满族"
                },
                {
                  "value": "12",
                  "label": "侗族"
                },
                {
                  "value": "13",
                  "label": "瑶族"
                },
                {
                  "value": "14",
                  "label": "白族"
                },
                {
                  "value": "15",
                  "label": "土家族"
                },
                {
                  "value": "16",
                  "label": "哈尼族"
                },
                {
                  "value": "17",
                  "label": "哈萨克族"
                },
                {
                  "value": "18",
                  "label": "傣族"
                },
                {
                  "value": "19",
                  "label": "黎族"
                },
                {
                  "value": "20",
                  "label": "傈僳族"
                },
                {
                  "value": "21",
                  "label": "佤族"
                },
                {
                  "value": "22",
                  "label": "畲族"
                },
                {
                  "value": "23",
                  "label": "高山族"
                },
                {
                  "value": "24",
                  "label": "拉祜族"
                },
                {
                  "value": "25",
                  "label": "水族"
                },
                {
                  "value": "26",
                  "label": "东乡族"
                },
                {
                  "value": "27",
                  "label": "纳西族"
                },
                {
                  "value": "28",
                  "label": "景颇族"
                },
                {
                  "value": "29",
                  "label": "柯尔克孜族"
                },
                {
                  "value": "30",
                  "label": "土族"
                },
                {
                  "value": "31",
                  "label": "达斡尔族"
                },
                {
                  "value": "32",
                  "label": "仫佬族"
                },
                {
                  "value": "33",
                  "label": "羌族"
                },
                {
                  "value": "34",
                  "label": "布朗族"
                },
                {
                  "value": "35",
                  "label": "撒拉族"
                },
                {
                  "value": "36",
                  "label": "毛难族"
                },
                {
                  "value": "37",
                  "label": "仡佬族"
                },
                {
                  "value": "38",
                  "label": "锡伯族"
                },
                {
                  "value": "39",
                  "label": "阿昌族"
                },
                {
                  "value": "40",
                  "label": "普米族"
                },
                {
                  "value": "41",
                  "label": "塔吉克族"
                },
                {
                  "value": "42",
                  "label": "怒族"
                },
                {
                  "value": "43",
                  "label": "乌孜别克族"
                },
                {
                  "value": "44",
                  "label": "俄罗斯族"
                },
                {
                  "value": "45",
                  "label": "鄂温克族"
                },
                {
                  "value": "46",
                  "label": "崩龙族"
                },
                {
                  "value": "47",
                  "label": "保安族"
                },
                {
                  "value": "48",
                  "label": "裕固族"
                },
                {
                  "value": "49",
                  "label": "京族"
                },
                {
                  "value": "50",
                  "label": "塔塔尔族"
                },
                {
                  "value": "51",
                  "label": "独龙族"
                },
                {
                  "value": "52",
                  "label": "鄂伦春族"
                },
                {
                  "value": "53",
                  "label": "赫哲族"
                },
                {
                  "value": "54",
                  "label": "门巴族"
                },
                {
                  "value": "55",
                  "label": "珞巴族"
                },
                {
                  "value": "56",
                  "label": "基诺族"
                },
                {
                  "value": "97",
                  "label": "其他"
                },
                {
                  "value": "98",
                  "label": "外国血统"
                }
              ],
              "SFZ_LX": [
                {
                  "label": "中华人民共和国居民身份证",
                  "value": "1"
                },
                {
                  "label": "港澳台有效身份证件",
                  "value": "2"
                },
                {
                  "label": "外国（地区）护照",
                  "value": "3"
                },
                {
                  "label": "其他有效身份证件",
                  "value": "4"
                }
              ],
              "ZW": [
                {
                  "label": "董事长兼总经理",
                  "value": "1"
                },
                {
                  "label": "董事兼总经理",
                  "value": "2"
                },
                {
                  "label": "执行董事兼总经理",
                  "value": "3"
                },
                {
                  "label": "董事长",
                  "value": "4"
                },
                {
                  "label": "副董事长",
                  "value": "5"
                },
                {
                  "label": "董事",
                  "value": "6"
                },
                {
                  "label": "执行董事",
                  "value": "7"
                },
                {
                  "label": "总经理",
                  "value": "8"
                },
                {
                  "label": "副总经理",
                  "value": "9"
                },
                {
                  "label": "经理",
                  "value": "10"
                },
                {
                  "label": "负责人",
                  "value": "11"
                },
                {
                  "label": "总务主任",
                  "value": "12"
                },
                {
                  "label": "专职管理员",
                  "value": "13"
                },
                {
                  "label": "其他人员",
                  "value": "14"
                }
              ]
            },
            "applyName": "",
            "mainProject": "",
            "secondaryProject": [

            ],
            "applyCardNumber": "",
            "spouseSex": "",
            "spouseNational": "",
            "spouseEducationalLevel": "",
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
            "state": "",
            "isOut": 0,
            "datetime": [

            ],
            "address": "",
            "remark": "",
            "accessoryGroupId": "",
            "legalMan": "",
            "legalManTelPhone": "",
            "contactMan": "",
            "telPhone": "",
            "setAddress": "",
            "setContent": "",
            "material": ""
          },
          "title": "",
          "maxSteps": null
        },
        "elements": [
          {
            "type": "box",
            "data": [
              {
                "type": "steps",
                "data": {
                  "current": 0,
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
                      "title": "已办结"
                    }
                  ]
                }
              },
              {
                "type": "title",
                "data": {
                  "title": "5"
                }
              },
              {
                "type": "form",
                "data": {
                  "validator": true,
                  "rules": {

                  },
                  "extend": {
                    "span": 17,
                    "labelWidth": 222,
                    "itemWidth": 320,
                    "placeholder": "",
                    "maxlength": "220",
                    "eventType": "",
                    "rows": 0
                  },
                  "items": [
                    {
                      "label": "申请单位",
                      "busiId": "528",
                      "prop": "applyName",
                      "type": "input",
                      "extend": {
                        "linkageChangeValue": [

                        ],
                        "placeholder": "",
                        "disabled": false,
                        "itemWidth": 320
                      }
                    },
                    {
                      "type": "checkboxMultipleRadio",
                      "label": "车辆经营范围",
                      "prop": "vehicleBusinessScope",
                      "itemsProp": "templateCache.mutiBox",
                      "extend": {
                        "mockData11": [
                          {
                            "label": "道路普通货物运输",
                            "value": "1",
                            "show": false,
                            "radioList": [
                            ]
                          },
                          {
                            "label": "道路普通货物运输",
                            "value": "2",
                            "show": false,
                            "radioList": [
                              {
                                "name": "集装箱",
                                "isSelected": false,
                                "value": "1"
                              },
                              {
                                "name": "冷藏保鲜",
                                "isSelected": false,
                                "value": "2"
                              },
                              {
                                "name": "罐式运输",
                                "isSelected": false,
                                "value": "3"
                              }
                            ]
                          },
                          {
                            "label": "大型物件运输",
                            "value": "3",
                            "show": false,
                            "radioList": [
                              {
                                "name": "一类",
                                "isSelected": false,
                                "value": "1"
                              },
                              {
                                "name": "二类",
                                "isSelected": false,
                                "value": "2"
                              },
                              {
                                "name": "三类",
                                "isSelected": false,
                                "value": "3"
                              },
                              {
                                "name": "四类",
                                "isSelected": false,
                                "value": "4"
                              }
                            ]
                          }
                        ],
                        "params": {}
                      }
                    },
                    {
                      "label": "主要经营项目",
                      "busiId": "539",
                      "prop": "mainProject",
                      "dynamic": {
                        "label": "",
                        "value": "",
                        "url": "",
                        "paramsList": [

                        ]
                      },
                      "itemsProp": "templateCache.SFZ_LX",
                      "type": "radio",
                      "items": [

                      ]
                    },
                    {
                      "label": "次要经营项目",
                      "busiId": "543",
                      "prop": "secondaryProject",
                      "dynamic": {
                        "label": "",
                        "value": "",
                        "url": "",
                        "paramsList": [

                        ]
                      },
                      "itemsProp": "templateCache.ZW",
                      "type": "checkboxMultiple"
                    },
                    {
                      "label": "统一社会信用代码",
                      "busiId": "545",
                      "prop": "applyCardNumber",
                      "type": "label",
                      "excat": [
                        {
                          "type": "",
                          "isHidden": false,
                          "data": {
                            "type": "",
                            "btnName": ""
                          }
                        }
                      ]
                    },
                    {
                      "label": "性别",
                      "busiId": "546",
                      "prop": "spouseSex",
                      "itemsProp": "templateCache.XB",
                      "type": "selectLabel",
                      "extend": {
                        "showFlag": [

                        ],
                        "linkageChangeValue": [

                        ],
                        "placeholder": "",
                        "itemWidth": 320,
                        "eventType": ""
                      },
                      "items": [

                      ]
                    },
                    {
                      "label": "民族",
                      "busiId": "547",
                      "prop": "spouseNational",
                      "itemsProp": "templateCache.MZ",
                      "type": "select",
                      "extend": {
                        "showFlag": [

                        ],
                        "linkageChangeValue": [

                        ],
                        "itemWidth": 320,
                        "placeholder": "",
                        "eventType": ""
                      },
                      "items": [

                      ]
                    },
                    {
                      "label": "文化程度",
                      "busiId": "548",
                      "prop": "spouseEducationalLevel",
                      "itemsProp": "",
                      "type": "selectLink",
                      "extend": {
                        "showFlag": [

                        ],
                        "linkageChangeValue": [

                        ],
                        "itemWidth": 320,
                        "placeholder": ""
                      },
                      "items": [

                      ]
                    }
                  ]
                }
              }
            ]
          },
          {
            "type": "btns-oprator",
            "data": {
              "buttons": [
                {
                  "type": "success",
                  "label": "办事指南",
                  "click": "guideClick"
                },
                {
                  "type": "error",
                  "label": "下一步",
                  "click": "nextStepClick"
                },
                {
                  "type": "warning",
                  "label": "保存",
                  "click": "saveClick"
                }
              ]
            }
          }
        ]
      }
    }
  }
}
</script>

