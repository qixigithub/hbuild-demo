import CellItem from './src/main';

CellItem.install = function(Vue) {
  Vue.component(CellItem.name, CellItem);
};

export default CellItem;

