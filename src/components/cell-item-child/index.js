import CellItemChild from './src/main';

CellItemChild.install = function(Vue) {
  Vue.component(CellItemChild.name, CellItemChild);
};

export default CellItemChild;

