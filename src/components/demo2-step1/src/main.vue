<template>
  <div class="ty-demo2-step1">
    <ty-main :data="pageData"></ty-main>
  </div>
</template>

<script>
  export default {
    name: 'TyDemo2Step1',
    data() {
      return {
        pageData: {
          "page": {
            "title": "填写资料",
            "maxSteps": 4,
            "fullModel": {
              "sex": "2",
              "applyName": "aa",
              "national": "06",
              "telPhone": "11111111111",
              "applyCardNumber": "610429199408110027",
              "applyTyperade": "",
              "streetOfficerade": "",
              "femaleName": "张瑶",
              "femaleFamilyrade": "01",
              "femaleIdCard": "610429199408110027",
              "femaleMaritalrade": "",
              "femaleMaritalDate": "",
              "femaleChildren": "",
              "femaleFamilyAddress": "",
              "femaleFamilyTyperade": "",
              "femaleCurrentAddress": "陕西省西安市雁塔区太白南路357号502室",
              "femaleWorkName": "西安市未央区塔萨舞蹈健身俱乐部",
              "femaleTelPhone": "",
              "maleName": "吕建斌",
              "maleIdCard": "610429199408110027",
              "maleFamilyrade": "02",
              "maleMaritalrade": "",
              "maleChildren": "",
              "maleFamilyAddress": "",
              "maleFamilyTyperade": "",
              "maleCurrentAddress": "陕西省西安市雁塔区太白南路357号502室",
              "maleWorkName": "西安市未央区塔萨舞蹈健身俱乐部",
              "maleTelPhone": "13142975248",
              "accessoryGroupId": "1",
              "marriage": "例如：本人李四，身份证号: 610123456789012345，地址：长安区细柳镇南三角村127号，2003年10月11日与张三，身份证号: 610123456789012345结婚，在2005年12月23日生育（收养）一女儿(儿子)李XX，在2007年2月12日生育（收养）一女儿(儿子)李XX， 身份证号: 610123456789012345。 （未离婚无以下内容）后于2010年10月24日离婚。\n2018年10月15日，本人与王五,身份证号: 610123456789012345，在长安区民政局再结婚登记。",
              "childrenMsg": [],
              "templateCache": {
                "streetOffice": [
                  {
                    "label": "丈八街道办事处",
                    "value": "1"
                  },
                  {
                    "label": "细柳街道办事处",
                    "value": "2"
                  }
                ],
                "validators": [],
                "applyType": [
                  {
                    "label": "再婚前一方生育过一个子女，另一方未生育过，再婚后已生育一个子女",
                    "value": "1"
                  },
                  {
                    "label": "再婚前双方合计生育两个以上子女，再婚后未生育子女",
                    "value": "2"
                  },
                  {
                    "label": "夫妻生育两个子女中有子女经医学鉴定为病残儿或者因伤致残，医学上认为夫妻可以再生育",
                    "value": "3"
                  },
                  {
                    "label": "夫妻未生育依法收养两个子女后又怀孕",
                    "value": "4"
                  }
                ],
                "femaleFamily": [
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
                "maleFamily": [
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
                "femaleFamilyType": [
                  {
                    "label": "农业户口",
                    "value": "1"
                  },
                  {
                    "label": "非农业户口",
                    "value": "2"
                  }
                ],
                "femaleMarital": [
                  {
                    "label": "初婚",
                    "value": "1"
                  },
                  {
                    "label": "再婚",
                    "value": "2"
                  }
                ],
                "maleMarital": [
                  {
                    "label": "初婚",
                    "value": "1"
                  },
                  {
                    "label": "再婚",
                    "value": "2"
                  }
                ],
                "maleFamilyType": [
                  {
                    "label": "农业户口",
                    "value": "1"
                  },
                  {
                    "label": "非农业户口",
                    "value": "2"
                  }
                ],
                "sexList": [
                  {
                    "label": "男",
                    "value": "1"
                  },
                  {
                    "label": "女",
                    "value": "2"
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
                  "type": "form",
                  "data": {
                    "validator": true,
                    "rules": {
                      "applyTyperade": [
                        {
                          "required": true,
                          "message": "申办不能为空"
                        }
                      ],
                      "streetOfficerade": [
                        {
                          "required": true,
                          "message": "街道办事处不能为空"
                        }
                      ]
                    },
                    "extend": {
                      "span": 12
                    },
                    "items": [
                      {
                        "type": "select",
                        "label": "申办类型",
                        "prop": "applyTyperade",
                        "itemsProp": "templateCache.applyType",
                        "extend": {
                          "linkageChangeValue": [
                            {
                              "changeKey": "accessoryGroupId",
                              "values": [
                                {
                                  "dependValue": 1,
                                  "changeValue": "CFD45E97B4EE4EC5B671B7FEFD085AB0"
                                },
                                {
                                  "dependValue": 2,
                                  "changeValue": "79E2545A4A484B168708DA5B8EFF2C8A"
                                },
                                {
                                  "dependValue": 3,
                                  "changeValue": "CC025B715B5A4F7CB0DB1AB4068A816F"
                                },
                                {
                                  "dependValue": 4,
                                  "changeValue": "B43E72649A9840B2B7F2E1DC10096063"
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "select",
                        "label": "街道办事处",
                        "prop": "streetOfficerade",
                        "itemsProp": "templateCache.streetOffice",
                        "extend": {
                          "placeholder": "请选择",
                          "itemWidth": 400
                        }
                      }
                    ]
                  }
                },
                {
                  "type": "title",
                  "data": {
                    "title": "女方信息"
                  }
                },
                {
                  "type": "form",
                  "data": {
                    "validator": true,
                    "rules": {
                      "femaleName": [
                        {
                          "required": true,
                          "message": "女方姓名不能为空",
                          "trigger": "blur"
                        },
                        {
                          "type": "userName"
                        },
                        {
                          "type": "userName",
                          "trigger": "blur"
                        }
                      ],
                      "femaleIdCard": [
                        {
                          "required": true,
                          "message": "女方身份证号不能为空",
                          "trigger": "blur"
                        },
                        {
                          "type": "identification"
                        },
                        {
                          "type": "identification",
                          "trigger": "blur"
                        }
                      ],
                      "femaleFamilyrade": [
                        {
                          "required": true,
                          "message": "女方民族不能为空"
                        }
                      ],
                      "femaleMaritalrade": [
                        {
                          "required": true,
                          "message": "女方婚姻状况不能为空"
                        }
                      ],
                      "femaleFamilyAddress": [
                        {
                          "required": true,
                          "message": "女方户口所在地不能为空"
                        }
                      ],
                      "femaleFamilyTyperade": [
                        {
                          "required": true,
                          "message": "女方户口性质不能为空"
                        }
                      ],
                      "femaleMaritalDate": [
                        {
                          "required": true,
                          "message": "结婚日期不能为空"
                        }
                      ],
                      "femaleChildren": [
                        {
                          "required": true,
                          "message": "子女数不能有空"
                        },
                        {
                          "type": "number1",
                          "trigger": "blur"
                        },
                        {
                          "type": "string",
                          "max": 2,
                          "message": "子女数不得超过两位数字",
                          "trigger": "blur"
                        }
                      ],
                      "femaleCurrentAddress": [
                        {
                          "required": true,
                          "message": "女方现居地址不能为空"
                        }
                      ],
                      "femaleWorkName": [
                        {
                          "required": true,
                          "message": "女方工作单位不能为空"
                        }
                      ],
                      "femaleTelPhone": [
                        {
                          "required": true,
                          "type": "mobilePhone"
                        },
                        {
                          "type": "mobilePhone",
                          "trigger": "blur"
                        }
                      ]
                    },
                    "extend": {
                      "span": 12
                    },
                    "items": [
                      {
                        "type": "input",
                        "label": "女方姓名",
                        "prop": "femaleName",
                        "extend": {
                          "linkageChangeValue": [
                            {
                              "type": "into",
                              "changeKey": "sex",
                              "values": [
                                {
                                  "dependValue": "2",
                                  "changeParam": "applyName",
                                  "changeAttrs": {
                                    "readonly": true,
                                    "clearable": false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "select",
                        "label": "女方民族",
                        "prop": "femaleFamilyrade",
                        "itemsProp": "templateCache.femaleFamily",
                        "extend": {
                          "placeholder": "请选择",
                          "itemWidth": 320,
                          "linkageChangeValue": [
                            {
                              "type": "into",
                              "changeKey": "sex",
                              "values": [
                                {
                                  "dependValue": "2",
                                  "changeParam": "national",
                                  "changeAttrs": {
                                    "disabled": true,
                                    "clearable": false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "input",
                        "label": "女方证件号码",
                        "prop": "femaleIdCard",
                        "extend": {
                          "linkageChangeValue": [
                            {
                              "type": "into",
                              "changeKey": "sex",
                              "values": [
                                {
                                  "dependValue": "2",
                                  "changeParam": "applyCardNumber",
                                  "changeAttrs": {
                                    "readonly": true,
                                    "clearable": false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "input",
                        "label": "女方联系电话",
                        "prop": "femaleTelPhone",
                        "extend": {
                          "linkageChangeValue": [
                            {
                              "type": "into",
                              "changeKey": "sex",
                              "values": [
                                {
                                  "dependValue": "2",
                                  "changeParam": "telPhone",
                                  "changeAttrs": {
                                    "readonly": true,
                                    "clearable": false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "select",
                        "label": "女方婚姻状况",
                        "prop": "femaleMaritalrade",
                        "itemsProp": "templateCache.femaleMarital",
                        "extend": {
                          "placeholder": "请选择",
                          "itemWidth": 320
                        }
                      },
                      {
                        "type": "date-picker",
                        "label": "结婚日期",
                        "prop": "femaleMaritalDate",
                        "extend": {
                          "format": "yyyy-MM-dd",
                          "itemWidth": 320,
                          "options": {
                            "disabledDate": "afterToday"
                          }
                        }
                      },
                      {
                        "type": "input",
                        "label": "子女数",
                        "prop": "femaleChildren",
                        "extend": {
                          "placeholder": "请输入"
                        }
                      },
                      {
                        "type": "input",
                        "label": "女方户口所在地",
                        "prop": "femaleFamilyAddress",
                        "extend": {
                          "placeholder": "例如：XXX公安局"
                        }
                      },
                      {
                        "type": "select",
                        "label": "女方户口性质",
                        "prop": "femaleFamilyTyperade",
                        "itemsProp": "templateCache.femaleFamilyType",
                        "extend": {
                          "placeholder": "请选择",
                          "itemWidth": 320
                        }
                      },
                      {
                        "type": "input",
                        "label": "女方现住址",
                        "prop": "femaleCurrentAddress",
                        "extend": {
                          "placeholder": "例如：X省X市X区X栋1-1001"
                        }
                      },
                      {
                        "type": "input",
                        "label": "女方工作单位",
                        "prop": "femaleWorkName",
                        "extend": {
                          "placeholder": "例如：XXX公司"
                        }
                      }
                    ]
                  }
                },
                {
                  "type": "title",
                  "data": {
                    "title": "男方信息"
                  }
                },
                {
                  "type": "form",
                  "data": {
                    "validator": true,
                    "rules": {
                      "maleName": [
                        {
                          "required": true,
                          "message": "男方姓名不能为空",
                          "trigger": "blur"
                        },
                        {
                          "type": "userName"
                        },
                        {
                          "type": "userName",
                          "trigger": "blur"
                        }
                      ],
                      "maleIdCard": [
                        {
                          "required": true,
                          "message": "男方身份证号不能为空",
                          "trigger": "blur"
                        },
                        {
                          "type": "identification"
                        },
                        {
                          "type": "identification",
                          "trigger": "blur"
                        }
                      ],
                      "maleFamilyrade": [
                        {
                          "required": true,
                          "message": "男方民族不能为空"
                        }
                      ],
                      "maleMaritalrade": [
                        {
                          "required": true,
                          "message": "男方婚姻状况不能为空"
                        }
                      ],
                      "maleChildren": [
                        {
                          "required": true,
                          "message": "子女数不能有空"
                        },
                        {
                          "type": "number1",
                          "trigger": "blur"
                        },
                        {
                          "type": "string",
                          "max": 2,
                          "message": "子女数不得超过两位数字",
                          "trigger": "blur"
                        }
                      ],
                      "maleFamilyTyperade": [
                        {
                          "required": true,
                          "message": "男方户口性质不能为空"
                        }
                      ],
                      "maleFamilyAddress": [
                        {
                          "required": true,
                          "message": "男方户口所在地不能为空"
                        }
                      ],
                      "maleFamilyType": [
                        {
                          "required": true,
                          "message": "男方户口性质不能为空"
                        }
                      ],
                      "maleCurrentAddress": [
                        {
                          "required": true,
                          "message": "男方现居地址不能为空"
                        }
                      ],
                      "maleWorkName": [
                        {
                          "required": true,
                          "message": "男方工作单位不能为空"
                        }
                      ],
                      "maleTelPhone": [
                        {
                          "required": true,
                          "type": "mobilePhone"
                        },
                        {
                          "type": "mobilePhone",
                          "trigger": "blur"
                        }
                      ]
                    },
                    "extend": {
                      "span": 12
                    },
                    "items": [
                      {
                        "type": "input",
                        "label": "男方姓名",
                        "prop": "maleName",
                        "extend": {
                          "linkageChangeValue": [
                            {
                              "type": "into",
                              "changeKey": "sex",
                              "values": [
                                {
                                  "dependValue": "1",
                                  "changeParam": "applyName",
                                  "changeAttrs": {
                                    "readonly": true,
                                    "clearable": false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "input",
                        "label": "男方证件号码",
                        "prop": "maleIdCard",
                        "extend": {
                          "linkageChangeValue": [
                            {
                              "type": "into",
                              "changeKey": "sex",
                              "values": [
                                {
                                  "dependValue": "1",
                                  "changeParam": "applyCardNumber",
                                  "changeAttrs": {
                                    "readonly": true,
                                    "clearable": false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "select",
                        "label": "男方民族",
                        "prop": "maleFamilyrade",
                        "itemsProp": "templateCache.maleFamily",
                        "extend": {
                          "placeholder": "请选择",
                          "itemWidth": 320,
                          "linkageChangeValue": [
                            {
                              "type": "into",
                              "changeKey": "sex",
                              "values": [
                                {
                                  "dependValue": "1",
                                  "changeParam": "national",
                                  "changeAttrs": {
                                    "disabled": true,
                                    "clearable": false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "input",
                        "label": "男方联系电话",
                        "prop": "maleTelPhone",
                        "extend": {
                          "linkageChangeValue": [
                            {
                              "type": "into",
                              "changeKey": "sex",
                              "values": [
                                {
                                  "dependValue": "1",
                                  "changeParam": "telPhone",
                                  "changeAttrs": {
                                    "readonly": true,
                                    "clearable": false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "type": "select",
                        "label": "男方婚姻状况",
                        "prop": "maleMaritalrade",
                        "itemsProp": "templateCache.maleMarital",
                        "extend": {
                          "eventType": "advTipUpdate",
                          "placeholder": "请选择",
                          "itemWidth": 320
                        }
                      },
                      {
                        "type": "select",
                        "label": "男方户口性质",
                        "prop": "maleFamilyTyperade",
                        "itemsProp": "templateCache.maleFamilyType",
                        "extend": {
                          "placeholder": "请选择",
                          "itemWidth": 320
                        }
                      },
                      {
                        "type": "input",
                        "label": "子女数",
                        "prop": "maleChildren",
                        "extend": {
                          "placeholder": "请输入"
                        }
                      },
                      {
                        "type": "input",
                        "label": "男方户口所在地",
                        "prop": "maleFamilyAddress",
                        "extend": {
                          "placeholder": "例如：XXX公安局"
                        }
                      },
                      {
                        "type": "input",
                        "label": "男方现住址",
                        "prop": "maleCurrentAddress",
                        "extend": {
                          "placeholder": "例如：X省X市X区X栋1-1001"
                        }
                      },
                      {
                        "type": "input",
                        "label": "男方工作单位",
                        "prop": "maleWorkName",
                        "extend": {
                          "placeholder": "例如：XXX公司"
                        }
                      }
                    ]
                  }
                },
                {
                  "type": "title",
                  "data": {
                    "title": "婚育情况证明"
                  }
                },
                {
                  "type": "form",
                  "data": {
                    "validator": true,
                    "rules": {
                      "marriage": [
                        {
                          "required": true,
                          "message": "婚育情况不能为空"
                        }
                      ]
                    },
                    "extend": {
                      "span": 12
                    },
                    "items": [
                      {
                        "type": "input",
                        "label": "婚育情况",
                        "prop": "marriage",
                        "extend": {
                          "placeholder": "请输入",
                          "type": "textarea",
                          "rows": 8,
                          "disableKeys": []
                        }
                      }
                    ]
                  }
                },
                {
                  "type": "title",
                  "data": {
                    "title": "家庭现有子女信息"
                  }
                },
                {
                  "type": "form-table",
                  "prop": "childrenMsg",
                  "data": {
                    "validator": true,
                    "model": "childrenMsg",
                    "btnMsg": "添加",
                    "columns": [
                      {
                        "title": "操作",
                        "width": 60,
                        "type": "icoDel"
                      },
                      {
                        "title": "子女姓名",
                        "width": 200,
                        "key": "name",
                        "align": "center",
                        "type": "input",
                        "rules": {
                          "required": true,
                          "message": "请输入称呼",
                          "trigger": "blur",
                          "type": "userName"
                        }
                      },
                      {
                        "title": "子女性别",
                        "width": 200,
                        "key": "gender",
                        "align": "center",
                        "type": "select",
                        "options": "sexList",
                        "rules": {
                          "required": true,
                          "message": "请选择性别",
                          "trigger": "change"
                        }
                      },
                      {
                        "title": "子女证件号码",
                        "key": "cardNum",
                        "align": "center",
                        "type": "input",
                        "rules": {
                          "required": true,
                          "type": "identification",
                          "trigger": "blur"
                        }
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
                    "label": "办事指南",
                    "type": "success",
                    "click": "guideClick"
                  },
                  {
                    "label": "下一步",
                    "type": "error",
                    "click": "nextStepClick"
                  },
                  {
                    "label": "保存",
                    "type": "warning",
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

