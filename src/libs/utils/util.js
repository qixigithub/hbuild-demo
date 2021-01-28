import _ from 'lodash'
import validator from './validators'

const util = {};

//note 统一提示框
util.alert = function (opts) {
  // const defaultOpts = {
  //   scrollable: true,
  //   type: "info"
  // };
  // const option = {...defaultOpts, ...opts};
  // this.$Modal[option.type]({...option, ...{title: util.lang.alertTitle[option.type]}});
};

//note 克隆对象
util.clone = function (obj) {
  return _.assign({}, obj);
};
util.clone2 = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};
//note 计算公式
util.mathFormatStr = function (model, str) {
  if (!!str && !!model) {
    const temp = str.split('|');
    let expression = temp[0];
    const params = temp[1].split(',');
    params.forEach(item => {
      expression = expression.replace('%s', model[item] || 0);
    });
    try {
      return eval(expression);
    } catch (e) {
      console.log(e)
    }
    return;
  }
  return 0;
};
//note 显示文本配置
util.lang = {
  exampleMsg: "显示文本配置",
  alertTitle: {
    info: '提示',
    success: '提示',
    warning: '警告',
    error: '错误'
  }
};
util.getCaptcha = function () {
  return config.api('captcha/verification');
};
util.regexp = validator;

export default util;

