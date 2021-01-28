import ContentBoxItem from './src/main';

ContentBoxItem.install = function(Vue) {
  Vue.component(ContentBoxItem.name, ContentBoxItem);
};

export default ContentBoxItem;

