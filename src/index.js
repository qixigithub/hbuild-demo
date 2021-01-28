/* 由'./build/bin/build-comps-index.js' 自动生成*/

import PtUtils from './libs/utils';
import accounting from 'accounting';
import DsStore from './components/.DS_Store/index.js';
import AttachFileTable from './components/attach-file-table/index.js';
import Attachment from './components/attachment/index.js';
import Budongchan from './components/budongchan/index.js';
import ButtonOprator from './components/button-oprator/index.js';
import ButtonSwitch from './components/button-switch/index.js';
import CellItem from './components/cell-item/index.js';
import CellItemChild from './components/cell-item-child/index.js';
import Cells from './components/cells/index.js';
import CheckboxMultiple from './components/checkboxMultiple/index.js';
import ContentBox from './components/content-box/index.js';
import ContentBoxItem from './components/content-box-item/index.js';
import ContentElementForm from './components/content-element-form/index.js';
import ContentElementFormItem from './components/content-element-form-item/index.js';
import ContentElementIframe from './components/content-element-iframe/index.js';
import ContentElementLookupFee from './components/content-element-lookup-fee/index.js';
import ContentElementLookupMap from './components/content-element-lookup-map/index.js';
import ContentElementLookupNumber from './components/content-element-lookup-number/index.js';
import ContentElementLookupProject from './components/content-element-lookup-project/index.js';
import ContentElementLookupQuery from './components/content-element-lookup-query/index.js';
import ContentElementRadio from './components/content-element-radio/index.js';
import ContentElementTextTpl from './components/content-element-text-tpl/index.js';
import ContentElementTipAdv from './components/content-element-tip-adv/index.js';
import ContentElementTipAlert from './components/content-element-tip-alert/index.js';
import ContentElementTitle from './components/content-element-title/index.js';
import Demo from './components/demo/index.js';
import DemoStep2 from './components/demo-step2/index.js';
import DemoStep3 from './components/demo-step3/index.js';
import DemoStep4 from './components/demo-step4/index.js';
import Demo2Step1 from './components/demo2-step1/index.js';
import EndDateChoose from './components/endDateChoose/index.js';
import ExtendTable from './components/extend-table/index.js';
import FormTable from './components/form-table/index.js';
import HelloWorld from './components/hello-world/index.js';
import InputIdCard from './components/inputIDCard/index.js';
import IvTable from './components/iv-table/index.js';
import LookupQuery from './components/lookup-query/index.js';
import MailLicence from './components/mail-licence/index.js';
import Main from './components/main/index.js';
import MultipleRadioSelection from './components/multipleRadioSelection/index.js';
import MultipleSelection from './components/multipleSelection/index.js';
import PapDownloadScan from './components/pap-download-scan/index.js';
import PrintComp from './components/print-comp/index.js';
import ScanComp from './components/scan-comp/index.js';
import SelectInput from './components/select-input/index.js';
import SpecialRadio from './components/special-radio/index.js';
import Steps from './components/steps/index.js';
import TimeLine from './components/time-line/index.js';
import Uploads from './components/uploads/index.js';


const components = [
  DsStore,
  AttachFileTable,
  Attachment,
  Budongchan,
  ButtonOprator,
  ButtonSwitch,
  CellItem,
  CellItemChild,
  Cells,
  CheckboxMultiple,
  ContentBox,
  ContentBoxItem,
  ContentElementForm,
  ContentElementFormItem,
  ContentElementIframe,
  ContentElementLookupFee,
  ContentElementLookupMap,
  ContentElementLookupNumber,
  ContentElementLookupProject,
  ContentElementLookupQuery,
  ContentElementRadio,
  ContentElementTextTpl,
  ContentElementTipAdv,
  ContentElementTipAlert,
  ContentElementTitle,
  Demo,
  DemoStep2,
  DemoStep3,
  DemoStep4,
  Demo2Step1,
  EndDateChoose,
  ExtendTable,
  FormTable,
  HelloWorld,
  InputIdCard,
  IvTable,
  LookupQuery,
  MailLicence,
  Main,
  MultipleRadioSelection,
  MultipleSelection,
  PapDownloadScan,
  PrintComp,
  ScanComp,
  SelectInput,
  SpecialRadio,
  Steps,
  TimeLine,
  Uploads,
];

const install = function(Vue, opts = {}) {
  //当有全局组件需要注册到Vue.prototype或者window时,或者需要执行的语句,可以在component.index.tpl添加,例如
  //Vue.prototype.$alert = MessageBox.alert;
  window.PtUtils=PtUtils;
  Vue.filter('money', function (value) {
      return accounting.formatMoney(value,"￥", 2);
    });
  components.map(component => {
    Vue.component(component.name, component);
  });

};

/* html通过script标签引入时自动注册全局vue*/
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  version: '1.0.25',
  install,
  DsStore,
  AttachFileTable,
  Attachment,
  Budongchan,
  ButtonOprator,
  ButtonSwitch,
  CellItem,
  CellItemChild,
  Cells,
  CheckboxMultiple,
  ContentBox,
  ContentBoxItem,
  ContentElementForm,
  ContentElementFormItem,
  ContentElementIframe,
  ContentElementLookupFee,
  ContentElementLookupMap,
  ContentElementLookupNumber,
  ContentElementLookupProject,
  ContentElementLookupQuery,
  ContentElementRadio,
  ContentElementTextTpl,
  ContentElementTipAdv,
  ContentElementTipAlert,
  ContentElementTitle,
  Demo,
  DemoStep2,
  DemoStep3,
  DemoStep4,
  Demo2Step1,
  EndDateChoose,
  ExtendTable,
  FormTable,
  HelloWorld,
  InputIdCard,
  IvTable,
  LookupQuery,
  MailLicence,
  Main,
  MultipleRadioSelection,
  MultipleSelection,
  PapDownloadScan,
  PrintComp,
  ScanComp,
  SelectInput,
  SpecialRadio,
  Steps,
  TimeLine,
  Uploads
};

