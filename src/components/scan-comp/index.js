import ScanComp from './src/main';

ScanComp.install = function(Vue) {
  Vue.component(ScanComp.name, ScanComp);
};

export default ScanComp;

