import ContentBox from './src/main';

ContentBox.install = function(Vue) {
  Vue.component(ContentBox.name, ContentBox);
};

export default ContentBox;

