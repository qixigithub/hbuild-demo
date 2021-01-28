/**
 *@author       谢辉
 *@date         2018/9/28 00:29
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description  注册自定义校验
 */

function execValidator(type) {
  return Validate[type].validator;
}

const Validate = {
  //note custom
  custom: {
    /**
     * 增加联动校验选项requireKeyValues预判,如果有则处理,没有则正常处理validator校验
     * @param {Object} rule
     * @param {*} value
     * @param {Function} callback
     * @param {Object} modal
     */
    validator: (rule, value, callback, {modal}) => {
      rule.validateType = rule.validateType || 'require'
      if (rule.requireKeyValues) {
        let result = false;
        //note 添加判断类型，默认满足一个条件
        if (rule.customType == 'all') {
          result = true;
          rule.requireKeyValues.forEach((item, index) => {
            if (item instanceof Object) {
              if (!item.values.includes(modal[item.key])) {
                result = false;
              }
            }
          });
        } else {
          rule.requireKeyValues.forEach(item => {
            if (item instanceof Object) {
              switch (item.dataType) {

                case 'array2arrayContain':  //item.value是数组,依赖值是数组,并且包含关系
                  const split1 = modal[item.key].split(',');
                  split1.forEach(o => {
                    if (item.values.includes(o)) {
                      result = true;
                    }
                  });
                  break;
                case 'array2arrayBeContain':  //item.value是数组,依赖值是数组,,并且被包含关系
                  const split2 = modal[item.key].split(',');
                  item.values.forEach(o => {
                    if (split2.includes(o)) {
                      result = true;
                    }
                  });
                  break;
                case 'array2single':  //item.value是数组,依赖值是单值
                default:
                  if (item.values.indexOf(modal[item.key]) != -1) {
                    result = true;
                  }
                  break;
              }
            }
          });
        }
        if (result) {
          execValidator(rule.validateType)(rule, value, callback, modal)
        } else {
          callback();
        }
      } else {
        execValidator(rule.validateType)(rule, value, callback, modal);
      }
    }
  },
  //note 必填
  require: {
    validator: (rule, value, callback) => {
      if (!!value) {
        if (value instanceof Array) {
          if (value.length === 0) {
            callback(new Error(rule.message || '不能为空'));
            return
          }
        }
        callback();
        return
      }
      callback(new Error(rule.message || '不能为空'));
    }
  },
  //note 子集校验
  subset: {
    validator: (rule, value, callback, realModel) => {
      const customOption = rule.customOption;
      //获取父子数据
      let father = realModel[customOption.key];
      let child = value;
      if (customOption.split) {
        //如果设置了公共分隔符字段,父子按照分隔符分割
        father = father.split(customOption.split);
        child = child.split(customOption.split);
      }
      //设置result初始为true
      let result = true;
      if (child instanceof Array) {
        //如果子是数组,遍历子元素
        child.forEach(childItem => {
          if (customOption.isCollection) {
            //如果是集合对比,需要customOption中设置collectionKeys数组
            father.forEach(fatherItem => {
              let keyResult = true
              customOption.collectionKeys.forEach(k => {
                let childValue = childItem
                if (typeof (childItem) === 'object') {
                  childValue = childItem[key]
                }
                if (fatherItem[k] !== childValue) {
                  keyResult = false;
                }
              })
              if (!keyResult) {
                result = false
              }
            })
          } else {
            //如果子中有元素不在父内则result为false;
            if (!father.includes(childItem)) {
              result = false;
            }
          }
        })
      } else {
        //如果子不是数组,查看子是否在父内
        if (customOption.isCollection) {
          let keyResult = false;
          father.forEach(fatherItem => {
            customOption.collectionKeys.forEach(k => {
              let childValue = child;
              if (typeof (child) === 'object') {
                childValue = child[key]
              }
              console.log(fatherItem[k], childValue)
              if (fatherItem[k] === childValue) {
                keyResult = true;
              }
            })
          });
          if (!keyResult) {
            result = false
          }
        } else {
          if (!father.includes(child)) {
            result = false;
          }
        }
      }
      if (result) {
        callback();
      } else {
        callback(new Error(rule.message || '子集校验失败`'));
      }
    }
  },
  //note 无交集校验
  noIntersection: {
    validator: (rule, value, callback, realModel) => {
      const customOption = rule.customOption;
      //获取父子数据
      let father = realModel[customOption.key];
      let child = value;
      if (customOption.split) {
        //如果设置了公共分隔符字段,父子按照分隔符分割
        father = father.split(customOption.split);
        child = child.split(customOption.split);
      }
      //设置result初始为true
      let result = true;
      if (child instanceof Array) {
        //如果子是数组,遍历子元素
        child.forEach(childItem => {
          if (customOption.isCollection) {
            //如果是集合对比,需要customOption中设置collectionKeys数组
            father.forEach(fatherItem => {
              let keyResult = true
              customOption.collectionKeys.forEach(k => {
                let childValue = childItem
                if (typeof (childItem) === 'object') {
                  childValue = childItem[key]
                }
                if (fatherItem[k] !== childValue) {
                  keyResult = false;
                }
              });
              if (keyResult) {
                result = false;
              }
            })
          } else {
            //如果子中有元素在父内则result为false;
            if (father.includes(childItem)) {
              result = false;
            }
          }
        })
      } else {
        //如果子不是数组,查看子是否在父内
        if (customOption.isCollection) {
          father.forEach(fatherItem => {
            let keyResult = true
            customOption.collectionKeys.forEach(k => {
              let childValue = child;
              if (typeof (child) === 'object') {
                childValue = child[key]
              }
              if (fatherItem[k] !== childValue) {
                keyResult = false;
              }
            })
            if (keyResult) {
              result = false
            }
          })
        } else {
          //如果子不是数组,查看子是否在父内
          if (father.includes(child)) {
            result = false;
          }
        }
      }
      if (result) {
        callback();
      } else {
        callback(new Error(rule.message || '无交集校验失败`'));
      }
    }
  },
  //note 支持数字和字母
  numAndLetter: {
    regexp: /^[0-9a-zA-Z]*$/,
    validator: (rule, value, callback) => {
      if (value.match(rule.regexp || Validate.numAndLetter.regexp)) {
        callback();
      } else {
        callback(new Error(rule.message || '只能输入字母和数字，请重新输入！'));
      }
    }
  },
  //note 手机
  mobile: {
    // regexp: /^(\+)?(0|86|086|17951)?(\-)?(13[0-9]|15[012356789]|16[56]|17[012345678]|18[0-9]|19[89]|14[579])[0-9]{8}$/,
    regexp: /^(\+)?(0|86|086|17951)?(\-)?[0-9]{11}$/,
    validator: (rule, value, callback) => {
      if (value.match(rule.regexp || Validate.mobile.regexp)) {
        callback();
      } else {
        callback(new Error(rule.message || '联系电话格式不正确，请重新输入！'));
      }
    }
  },
  //note 自定义身份证校验
  customIdCard: {
    regexp: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    validator: (rule, value, callback, modal) => {
      if (value) {
        if (value.length != 18) {
          callback(new Error(rule.message || '身份证号码为18位！'));
        } else if (value.match(rule.regexp)) {
          // debugger
          if (modal[rule.prop] == '') {
            callback(new Error('请先输入原质量负责人身份证号!'));
          } else if (modal[rule.prop] == value) {
            callback(new Error('不能与原质量负责人身份证号相同'));
          } else {
            callback();
          }
        } else {
          // debugger
          callback(new Error(rule.message || '身份证必须是数字或者数字与字母组合！'));
        }
      } else {
        callback();
      }
    }
  },
  //note 座机
  phone: {
    regexp: /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
    validator: (rule, value, callback) => {
      if (value.match(rule.regexp || Validate.phone.regexp)) {
        callback();
      } else {
        callback(new Error(rule.message || '电话格式不正确,如果是座机区号和分机号要用"-"隔开'));
      }
    }
  },
  //note 手机加座机
  mobilePhone: {
    validator: (rule, value, callback) => {
      if (value.match(Validate.phone.regexp) || value.match(Validate.mobile.regexp)) {
        callback();
      } else {
        console.log(rule.message || '建议输入手机号码接收短信验证码');
        callback(new Error(rule.message || '建议输入手机号码接收短信验证码'));
      }
    }
  },
  //note 手机加座机 可空
  mobilePhone1: {
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(Validate.phone.regexp) || value.match(Validate.mobile.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '建议输入手机号码接收短信验证码'));
        }
      } else {
        callback();
      }

    }
  },
  //note 银行账号校验
  bankCard: {
    regexp: /^[0-9]*$/,
    validator: (rule, value, callback) => {
      if (value) {
        value = value.toString()
        if (value.match(rule.regexp || Validate.bankCard.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '银行账号格式不正确'));
        }
      } else {
        callback();
      }
    }
  },
  //note 数字校验
  number: {
    regexp: /^[1-9]{1}[0-9]*$/,
    regexp1: /^[1-9]{1}[0-9]*$|^[+]{0,1}(\d+\.\d+)$/,
    validator: (rule, value, callback) => {
      if (value) {
        value = value.toString()
        if (rule.dot) {
          if (value.match(rule.regexp1 || Validate.number.regexp1)) {
            callback();
          } else {
            callback(new Error(rule.message || '必须输入正数'));
          }
        } else {
          if (value.match(rule.regexp || Validate.number.regexp)) {
            callback();
          } else {
            callback(new Error(rule.message || '必须输入正整数'));
          }
        }
      } else {
        callback(new Error(rule.message || '不能为空'));
      }
    }
  },
  //note 数字校验不加为空校验
  number5: {
    regexp: /^[1-9]{1}[0-9]*$/,
    regexp1: /^[1-9]{1}[0-9]*$|^[+]{0,1}(\d+\.\d+)$/,
    validator: (rule, value, callback) => {
      if (value) {
        value = value.toString()
        if (rule.dot) {
          if (value.match(rule.regexp1 || Validate.number.regexp1)) {
            callback();
          } else {
            callback(new Error(rule.message || '必须输入正数'));
          }
        } else {
          if (value.match(rule.regexp || Validate.number.regexp)) {
            callback();
          } else {
            callback(new Error(rule.message || '必须输入正整数'));
          }
        }
      } else {
        callback();
      }
    }
  },
  //note 身份证有效期校验
  validDate: {
    regexp: /^(\d{1,4})(\.)(\d{1,2})\2(\d{1,2})-((\d{1,4})(\.)(\d{1,2})\2(\d{1,2})|长期)$/,
    validator: (rule, value, callback) => {
      if (value) {
        value = value.toString()
        if (value.match(rule.regexp || Validate.validDate.regexp)) {
          if (value.indexOf('长期') != -1) {
            callback();
          } else {
            let [from, to] = value.split('-');
            from = from.replace(/\./g, '-');
            to = to.replace(/\./g, '-');
            if (moment(from).unix() < moment(to).unix()) {
              callback();
            } else {
              callback(new Error('有效期开始时间不能大于结束时间'));
            }
          }
        } else {
          callback(new Error(rule.message || '例如：2013.03.05-2023.03.05或2018.10.10-长期'));
        }
      } else {
        callback();
      }
    }

  },
  //note 身份证校验
  identification: {
    // regexp:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    regexp: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.length != 18) {
          console.log(rule.message || '身份证号码为18位！');
          callback(new Error(rule.message || '身份证号码为18位！'));
        } else if (value.match(rule.regexp || Validate.identification.regexp)) {
          callback();
        } else {
          console.log(rule.message || '身份证必须是数字或者数字与字母组合！！');
          callback(new Error(rule.message || '身份证必须是数字或者数字与字母组合！'));
        }
      } else {
        console.log(rule.message || '请输入身份证号！');
        callback(new Error(rule.message || '请输入身份证号！'));
      }
    }
  },
  //note 身份证校验非必填
  identification2: {
    // regexp:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    regexp: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.length != 18) {
          callback(new Error(rule.message || '身份证号码为18位！'));
        } else if (value.match(rule.regexp || Validate.identification.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '身份证必须是数字或者数字与字母组合！'));
        }
      } else {
        callback();
      }
    }
  },
  //note 日期校验
  daterange: {
    validator: (rule, value, callback) => {
      if (value && !!value[0] && !!value[1]) {
        const unit = rule.unit || '天'
        if (rule.range) {
          if (unit === '天') {
            const dateRange = Date.parse(value[1]) - Date.parse(value[0]) + 1;
            if (dateRange / (60 * 60 * 24 * 1000) > rule.range) {
              return callback(new Error(rule.message || `起止时间不得超过${rule.range}天`));
            }
          } else if (unit === '年') {
            var d1 = new Date(value[0]);
            var d2 = new Date(value[1]);
            d1.setFullYear(d1.getFullYear() + rule.range);
            d1.setDate(d1.getDate() - 1);
            if (Date.parse(d2) > Date.parse(d1)) {
              return callback(new Error(rule.message || `起止时间不得超过${rule.range}年`));
            }
          }
        }
        callback();
      } else {
        callback(new Error(rule.message || '起止时间不能为空'));
      }
    }
  },
  //note extendTable里的身份证号校验
  checkIdcardList: {
    validator: (rule, value, callback) => {
      if (value.length < 3) {
        return callback(new Error(rule.message || `请至少填写3人信息`));
      }
      for (let i = 0; i < value.length; i++) {
        if (i < 3) {
          if (JSON.stringify(value[i]) == '{}') {
            return callback(new Error(rule.message || `请至少填写3人信息`));
          } else if (!value[i].lengthValid || value[i].lengthValid == undefined) {
            return callback(new Error(`请填写姓名, 字数在255之内`));
          } else if (!value[i].valid || value[i].valid == undefined) {
            return callback(new Error(`请填写正确的身份证号`));
          }
        } else {
          if (JSON.stringify(value[i]) == '{}') {
            value.splice(i, 0)
          } else if (!value[i].lengthValid || value[i].lengthValid == undefined) {
            return callback(new Error(`请填写姓名, 字数在255之内`));
          } else if (!value[i].valid || value[i].valid == undefined) {
            return callback(new Error(`请填写正确的身份证号`));
          }
        }
      }
      callback();
    },
  },
  //note 职工总数的校验
  workerNum: {
    validator: (rule, value, callback) => {
      if (!value) {
        return callback(new Error(rule.message || `职工总数不能为0`));
      } else if (value - parseInt(value) != 0) {
        return callback(new Error(`职工人数不能为小数`));
      } else if (value.toString().length > 10) {
        return callback(new Error(`职工总数长度不能超过10`));
      }
      callback();
    }
  },
  //note 时间不能超过7天
  noMoreDay: {
    validator: (rule, value, callback) => {
      const now = new Date();
      const dateRange = Date.parse(now) - Date.parse(value) + 1;
      if (dateRange < 0) {
        return callback(new Error(rule.message || `应在签订合同日${rule.range}个工作日内提交申请`));
      } else {
        if (dateRange / (60 * 60 * 24 * 1000) > rule.range) {
          return callback(new Error(rule.message || `应在签订合同日${rule.range}个工作日内提交申请`));
        }
      }
      callback();
    }
  },
  // note 预案地址校验
  checkAddress: {
    validator: (rule, value, callback) => {
      let flag = true;
      for (let i = 0; i < value.length; i++) {
        if (flag = true) {
          if (value[i].nameValid == true) {

          } else {
            flag = false;
            return callback(new Error(`请填写完整预案地址!`));
          }
        }
      }
      callback();
    }
  },
  // note 占地面积
  area: {
    regexp: /^\d+%$/,
    regexp1: /^[1-9]{1}[0-9]*$|^[+]{0,1}(\d+\.\d+)$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp1 || Validate.area.regexp1)) {
          callback();
        } else if (value.match(rule.regexp || Validate.area.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '必须输入数字'));
        }
      } else {
        callback();
      }
    }
  },
  //note 食品，面积增加校验50平以下，增加校验，问题重新梳理
  area2: {
    regexp: /^([1-9]|([1-4][0-9]))$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.area2.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请输入面积50平以下'));
        }
      } else {
        callback();
      }
    }
  },

  //note 传真
  faxx: {
    regexp: /^(\d{3,4}-)?\d{7,8}$/,
    regexp1: /^(\d{3,4}\+)?\d{7,8}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.faxx.regexp)) {
          callback();
        } else if (value.match(rule.regexp1 || Validate.faxx.regexp1)) {
          callback();
        } else {
          callback(new Error(rule.message || '请输入正确的传真'));
        }
      } else {
        callback();
      }
    }
  },
  // note 数字首字母可以为0
  number1: {
    regexp: /^[0-9]{1}[0-9]*$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.number1.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '必须输入数字'));
        }
      } else {
        callback();
      }
    }
  },
  // note 正整数不包括0
  number2: {
    regexp: /^[1-9]\d*$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.number2.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '必须输入不为0的数字'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
  // note 数字两位小数
  number3: {
    regexp: /^[0-9]+([.]{1}[0-9]{1,2})?$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.number3.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '只能输入数字，精确至两位小数'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
  //note 不包括0，保留两位小数
  number6: {
    regexp: /^[0-9]+([.]{1}[0-9]{1,2})?$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value != 0) {
          if (value.match(rule.regexp || Validate.number6.regexp)) {
            callback();
          } else {
            callback(new Error(rule.message || '只能输入不为0的数字，精确至两位小数'));
          }
        } else {
          callback(new Error(rule.message || '只能输入不为0的数字，精确至两位小数'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
// note 数字四位小数
  fourDecimalNumber: {
    regexp: /^\d+(?:\.\d{1,4})?$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.fourDecimalNumber.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '只能输入数字，最多支持4位小数'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
  // note 仅支持两位整数
  number4: {
    regexp: /^[0-9]{1,2}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.number4.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '只能输入两位有效正整数'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
  // note 数字四位小数
  number5: {
    regexp: /^[0-9]+([.]{1}[0-9]{1,4})?$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.number5.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '只能输入数字，精确至四位小数'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
  // note 邮编
  stamp: {
    regexp: /^[0-9]{6}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.stamp.regexp)) {
          callback();
        } else if (value.toString().length > 6) {
          return callback(new Error(`邮编总长度不能大于6`));
        } else {
          callback(new Error(rule.message || '请输入正确格式的邮政编码'));
        }
      } else {
        callback();
      }
    }
  },
  // note 邮编 显影 控制校验
  stamp1: {
    regexp: /^[0-9]{6}$/,
    validator: (rule, value, callback) => {
      if (value.match(rule.regexp || Validate.stamp.regexp)) {
        callback();
      } else if (value.toString().length > 6) {
        return callback(new Error(`邮编总长度不能大于6`));
      } else {
        callback(new Error(rule.message || '请输入正确格式的邮政编码'));
      }

    }
  },
  // note 邮箱
  email: {
    regexp: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.email.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请输入正确格式的邮箱'));
        }
      } else {
        callback();
      }
    }
  },
  // note 输入文本内容不超过多少字
  notMoreWords: {
    validator: (rule, value, callback) => {
      if (!rule.num) {
        return;
      }
      const num = rule.num;
      if (value) {
        if (value.length > num) {
          callback(new Error(rule.message || `文本内容不能超过${num}个字`));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
  },
  //note 只支持中英文
  userName: {
    regexp: /^[^0-9]+$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.userName.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请输入正确格式的姓名'));
        }
      } else {
        callback();
      }
    }
  },
  // note 不输入的时候的校验
  notNumber: {
    regexp: /^[0-9]{1}[0-9]*$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.notNumber.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '必须输入数字'));
        }
      } else {
        callback();
      }
    }
  },
  // note 统一社会信用代码校验（18位，纯数字或数字与大小字母混合，大写字母不包括IOZSV）
  socialCode: {
    regexp: /^(?=.*\d)[^_IOZSVa-z\W]{18}$/g,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.socialCode.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请填写正确的统一社会信用代码'));
        }
      } else {
        callback();
      }
    }
  },
  // note 车牌号校验（）
  vehicleLicense: {
    // regexp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g,
    regexp: /^[陕]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.vehicleLicense.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请填写正确的车辆车牌号码'));
        }
      } else {
        callback();
      }
    }
  },
  // note 机动车车牌号校验
  jidongche: {
    regexp: /^[0-9a-zA-Z]*$/,
    validator: (rule, value, callback) => {
      let val = value.substring(1)
      if (val.match(rule.regexp || Validate.numAndLetter.regexp)) {
        if (val.length > 20) {
          setTimeout(() => {
            callback(new Error(rule.message || '长度不能大于20位'));
          }, 100)
        } else {
          callback();
        }
      } else {
        callback(new Error(rule.message || '只能输入字母和数字，请重新输入！'));
      }
    }
  },
  // note 联动必填校验
  linkage: {
    validator: (rule, value, callback, modal) => {
      let result = true;
      if (rule.requireKeyValues instanceof Array) {
        rule.requireKeyValues.forEach(item => {
          if (item instanceof Object) {
            if (item.values.indexOf(modal[item.key]) != -1) {
              if (value === "" || value === undefined || value === null) {
                result = false;
              }
            }
          }
        });
        if (result) {
          callback();
        } else {
          callback(new Error(rule.message || '不能为空'));

        }
      }
    }
  },
  // note 环评批复文号格式为[20XX]XXX 校验
  sevenNumber: {
    regexp: /^[\u4e00-\u9fa5]+环评批复(\[|\【)20[0-9]{2}(\】|\])[0-9]{3}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.sevenNumber.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请使用正确格式!'));
        }
      }
    }
  },
// note 社会保障卡卡号 sna/sns开头加9位数字
  insuranceCardNum: {
    regexp: /^(sna|SNA|sns|SNS)[0-9]{8}(\d|x|X)$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.insuranceCardNum.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请使用正确格式!'));
        }
      }
    }
  },
  // note 日期时间间隔选择字段
  dateTimeDuration: {
    validator: (rule, value, callback) => {
      if (isExistEmpty(value)) return;

      function getTimeSlamp(date) {
        let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
        let year = dateObj[1];
        let month = dateObj[2] - 1;
        let day = dateObj[3];
        let hour = dateObj[4];
        return new Date(year, month, day, hour).getTime();
      }


      function computeRange(range) {
        return getTimeSlamp(range[1]) - getTimeSlamp(range[0]);
      }

      function isOutRange(rangeArr) {
        for (let i = 0; i < rangeArr.length; i++) {
          if (computeRange(rangeArr[i]) >= 12 * 3600 * 1000) {
            return true;
          }
        }
        return false;
      }

      if (!isOutRange(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请使用正确格式!'));
      }
    }
  },
  dataDurationInNight: {
    validator: (rule, value, callback) => {

      if (isExistEmpty(value)) return;

      let hourRangeOne = [22, 23];
      let hourRangeTwo = [0, 6];
      let outOfHourRange = [7, 21];

      function getDay(date) {
        let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
        let year = dateObj[1];
        let month = dateObj[2] - 1;
        let day = dateObj[3];
        let hour = dateObj[4];
        return {day, hour, month, year};
      }

      function isInSpecialDuration(hour, range) {
        return hour >= range[0] && hour <= range[1];
      }

      function isInNightDuration(item) {

        let result = true;
        let preDay = getDay(item[0]).day;
        let nextDay = getDay(item[1]).day;
        let prevHour = getDay(item[0]).hour;
        let nextHour = getDay(item[1]).hour;

        if (isInSpecialDuration(prevHour, outOfHourRange) || isInSpecialDuration(nextHour, outOfHourRange)) {
          result = false;
          return result;
        }

        if (preDay === nextDay && isInSpecialDuration(prevHour, hourRangeTwo) && isInSpecialDuration(nextHour, hourRangeOne)) {
          result = false;
          return result;
        }
        return result;
      }

      function isFitRangeCondition(arr) {
        return arr.every((item) => {
          return isInNightDuration(item)
        })
      }

      if (isFitRangeCondition(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请填写正确的格式'))
      }
    }
  },
  // note required
  dateTimeRequired: {
    validator: (rule, value, callback) => {

      if (!isExistEmpty(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请使用正确格式!'));
      }

    }
  },
  dateTimeOverlap: {
    validator: (rule, value, callback) => {
      if (isExistEmpty(value)) return;

      function isOverlap(rangePrev, rangeNext) {
        let rangePrevStart = getTimeSlamp(rangePrev[0]);
        let rangePrevEnd = getTimeSlamp(rangePrev[1]);
        let rangeNextStart = getTimeSlamp(rangeNext[0]);
        let rangeNextEnd = getTimeSlamp(rangeNext[1]);

        return !(rangePrevStart > rangeNextEnd || rangePrevEnd < rangeNextStart);
      }

      function getTimeSlamp(date) {
        let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
        let year = dateObj[1];
        let month = dateObj[2] - 1;
        let day = dateObj[3];
        let hour = dateObj[4];
        return new Date(year, month, day, hour).getTime();
      }

      function isRangeArrOverlap(rangeArr) {
        for (let i = 0; i < rangeArr.length; i++) {
          let rangePrev = rangeArr[i];
          for (let j = i + 1; j < rangeArr.length; j++) {
            let rangeNext = rangeArr[j];
            if (isOverlap(rangePrev, rangeNext)) {
              return true;
            }
          }
        }
        return false;
      }

      if (!isRangeArrOverlap(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请使用正确格式!'));
      }

    }
  },
  dataTimeExistInDataRange: {
    validator: (rule, value, callback, realModel) => {
      // if (isDateTimeEmpty(value) || isDateEmpty(realModel[rule.dependField])) return;
      if (isDateTimeEmpty(value) || isDateEmpty(realModel[rule.dependField])) {
        callback()
        return
      }

      function getTimeSlamp(date) {
        let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
        let year = dateObj[1];
        let month = dateObj[2] - 1;
        let day = dateObj[3];
        let hour = dateObj[4];
        return new Date(year, month, day, hour).getTime();
      }

      function isInDataRange(arr, range) {

        let rangeStart = getTimeSlamp(range[0]);
        let rangeEnd = getTimeSlamp(range[1]);

        for (let i = 0; i < arr.length; i++) {

          if (!arr[i][0]) {
            continue;
          }

          let start = getTimeSlamp(arr[i][0]);
          let end = getTimeSlamp(arr[i][1]);
          if (start < rangeStart || end > rangeEnd) {
            return false;
          }

        }

        return true;
      }

      if (!isInDataRange(value, realModel[rule.dependField])) {
        callback(new Error(rule.message || '请使用正确格式!'));
      } else {
        callback();
      }
    }
  },
  dataRangeIncludeDataTime: {
    validator: (rule, value, callback, realModel, validateField) => {


      if (!value || isDateEmpty(value) || isDateTimeEmpty(realModel[rule.affectField])) {
        return;
      }
      validateField(rule.affectField);
      callback();
    }
  },
  dateRangeRequired: {
    validator: (rule, value, callback) => {

      if (!isDateEmpty(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请使用正确格式!'));
      }
    }
  },
  // 中文校验
  chinese: {
    regexp: /^[\u4e00-\u9fa5]*$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.chinese.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请使用正确格式!'));
        }
      }
    }
  },
  //note 不动产单元证号验证规则
  realEstateUnit: {
    regexp: /^[0-9a-zA-Z]*$/,
    validator: (rule, value, callback) => {
      if (value.match(rule.regexp || Validate.numAndLetter.regexp)) {
        if (value.length != 28) {
          callback(new Error(rule.message || '长度为28位'));
        } else {
          callback();
        }
      } else {
        callback(new Error(rule.message || '只能输入字母和数字，请重新输入！'));
      }
    }
  },
  //note 验证截止时间
  endTimeStr: {
    validator: (rule, value, callback, modal) => {
      if (!modal[rule.startTimeKey]) {
        callback(new Error(rule.message || '请先选择起始时间!'));
      }
      if (!value) {
        callback(new Error(rule.message || '请选择截止时间!'));
      }
      if (new Date(value) < new Date(modal[rule.startTimeKey])) {
        callback(new Error(rule.message || '截止时间应该大于起始时间!'));
      }
      callback()
    }
  },
  thanSome: {
    validator: (rule, value, callback, modal) => {
      console.log(modal[rule.requireKeyValues.key], value)
      if (!modal[rule.requireKeyValues.key]) {
        callback(new Error(rule.message || '请先填写被担保主债权数额!'));
      }
      if (parseFloat(value) < parseFloat(modal[rule.requireKeyValues.key])) {
        callback(new Error(rule.message || '抵押物价值不能小于被担保主债权数额!'));
      }
      callback()
    }
  },
  // note 不动产产权验证
  estateRules: {
    validator: (rule, value, callback, modal) => {
      let result;
      if (rule.requireKeyValues.showFlag instanceof Array) {
        let type = rule.requireKeyValues.showFlagType;
        let array = rule.requireKeyValues.showFlag;
        if (type === 'either') {
          result = false;
          array.forEach(item => {
            if (modal[item.key] == item.value) {
              result = true;
            }
          })
        } else {
          result = true;
          array.forEach(item => {
            if (this.fullModel[item.key] != item.value) {
              result = false;
            }
          })
        }
      } else {
        result = true;
        if (rule.requireKeyValues.showFlag) {
          if (modal[rule.requireKeyValues.showFlag.key] != rule.requireKeyValues.showFlag.value) {
            result = false
          }
        }
      }
      if (!result) {
        callback()
      }
      if (value instanceof Array) {
        let showFlag;
        for (let i = 0; i < value.length; i++) {

          if (!budongchan(value[i][rule.requireKeyValues.prop], value[i][rule.requireKeyValues.key])) {
            showFlag = false;
          } else {
            if (budongchan(value[i][rule.requireKeyValues.prop], value[i][rule.requireKeyValues.key]) && i == value.length - 1) {
              showFlag = true;
            }
          }
        }
        // console.log(showFlag)
        // debugger
        if (!showFlag) {
          callback(new Error(rule.message || '请填写正确格式!'));
          return
        } else {
          callback()
        }
      } else {
        if (budongchan(value, modal[rule.requireKeyValues.key])) {
          callback()
        } else {
          callback(new Error(rule.message || '请填写正确格式!'));
        }
      }
    }
  },
};

function budongchan(value, key) {
  //note 不动产证号验证

  if (key == '1') {

    let arr = value.split('');
    let num1 = getWordCnt(arr)['-'];
    let num2 = getWordCnt(arr)['～'];
    let allNum = getWordCnt(arr);
    //note 验证‘-’数量
    if (num1 != 4) {
      return false
    }
    //note 验证‘～’数量
    if (num2 != 1) {
      return false
    }
    //note 验证数字
    let flag = true;
    let arr11 = value.split('-')
    let arr12 = arr11[4].split('～')
    arr11.splice(0, arr11.length - 1).forEach((i, index) => {
      let regexp = /^[0-9]*$/;
      if (index == 0) {
        if (i.charAt(i.length - 1) == 'Ⅰ' || i.charAt(i.length - 1) == 'Ⅱ' || i.charAt(i.length - 1) == 'Ⅲ' || i.charAt(i.length - 1) == 'Ⅳ') {
          i = i.substring(0, i.length - 1)
        }
      }
      if (!regexp.test(i)) {
        flag = false
      }
    })
    arr12.forEach((i, index) => {
      if (index == 0) {
        let regexp1 = /^[0-9a-zA-Z]*$/;
        if (!regexp1.test(i)) {
          flag = false
        }
      } else if (index == 1) {
        let regexp1 = /^[0-9]*$/;
        if (!regexp1.test(i)) {
          flag = false
        }
      }
    })
    // for (let i in _.omit(allNum, '-', '～', 'Ⅳ', 'Ⅱ', 'Ⅲ', 'Ⅰ')) {
    //   let regexp = /^[0-9]{1}[0-9]*$/;
    //   let regexp1 = /^[0-9a-zA-Z]*$/;
    //   if (!regexp.test(i)) {
    //     flag = false
    //   }
    // }
    if (!flag) {
      return false
    }

    // //note 验证是否选择'Ⅳ', 'Ⅱ', 'Ⅲ', 'Ⅰ'
    // if (value.indexOf("Ⅳ") != -1 || value.indexOf("Ⅲ") != -1 || value.indexOf("Ⅱ") != -1 || value.indexOf("Ⅰ") != -1) {
    //
    // } else {
    //   return false
    // }
    //note 验证各个输入框非空
    let arr1 = contains(value, '-');
    console.log(arr1)
    if (arr1[0] >= 1 && arr1[1] >= 3 && arr1[2] >= 5 && arr1[3] >= 7 && value.indexOf("～") >= 9
      && arr1[1] - arr1[0] >= 2 && arr1[2] - arr1[1] >= 2 && arr1[3] - arr1[2] >= 2 && value.indexOf("～") - arr1[3] >= 2
      && value.charAt(value.length - 1) != '～'
    ) {

    } else {
      return false
    }
    return true
  } else {
    //note 房产证号验证
    console.log(value)
    // debugger
    if (value === "" || value === undefined || value === null) {
      return false
    }
    return true
  }
}

function contains(arrays, obj) {
  let arr = [];
  arrays.split('').forEach((ele, index) => {
    if (ele == obj) {
      arr.push(index)
    }
  })
  return arr;
}

function getWordCnt(arr) {
  return arr.reduce(function (prev, next) {
    prev[next] = (prev[next] + 1) || 1;
    return prev;
  }, {});
}

function isDateTimeEmpty(arr) {

  if (!arr || !arr.length) {
    return true;
  }

  return _.flatten(arr).every((item) => {
    return !item;
  });

}


function isExistEmpty(arr) {

  if (!arr || !arr.length) return true;

  return _.flatten(arr).some((item) => {
    return !item;
  });

}

function isDateEmpty(arr) {

  if (!arr || !arr.length) {
    return true;
  }
  return arr.some((item) => {
    return !item;
  });

}

function getTimeSlamp(date) {
  let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
  let year = dateObj[1];
  let month = dateObj[2] - 1;
  let day = dateObj[3];
  let hour = dateObj[4];
  return new Date(year, month, day, hour).getTime();
}


export default Validate;
