import PrintComp from './src/main';

PrintComp.install = function(Vue) {
  Vue.component(PrintComp.name, PrintComp);
};

export default PrintComp;

