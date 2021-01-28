import ContentElementIframe from './src/main';

ContentElementIframe.install = function(Vue) {
  Vue.component(ContentElementIframe.name, ContentElementIframe);
};

export default ContentElementIframe;

