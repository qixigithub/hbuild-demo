import ExtendTable from './src/main';

ExtendTable.install = function(Vue) {
  Vue.component(ExtendTable.name, ExtendTable);
};

export default ExtendTable;

