import Attachment from './src/main';

Attachment.install = function(Vue) {
  Vue.component(Attachment.name, Attachment);
};

export default Attachment;

